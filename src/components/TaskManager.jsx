// import React, { useState, useEffect } from "react";
// import { loadTasks, saveTasks } from "../storage/taskStorage";
// import TaskModal from "./TaskModal";
// import TaskSidebar from "./TaskSidebar";

// export default function TaskManager({ children }) {
//   const [tasks, setTasks] = useState([]);
//   const [isModalOpen, setModalOpen] = useState(false);
//   const [selectedDate, setSelectedDate] = useState("");
//   const [selectedTask, setSelectedTask] = useState(null);

//   useEffect(() => {
//     setTasks(loadTasks());
//   }, []);

//   const openModal = (date) => {
//     setSelectedDate(date);
//     setModalOpen(true);
//     setSelectedTask(null);
//   };

//   const closeModal = () => setModalOpen(false);

//   const saveTask = (taskData) => {
//     const newTask = {
//       id: Date.now(),
//       ...taskData,
//     };
//     const updatedTasks = [...tasks, newTask];
//     setTasks(updatedTasks);
//     saveTasks(updatedTasks);
//     closeModal();
//   };

//   const openSidebar = (task) => {
//     setSelectedTask(task);
//     setModalOpen(false);
//   };

//   const closeSidebar = () => setSelectedTask(null);
//   const toISO = (d) => new Date(d).toISOString().slice(0, 10);

//   // ✅ Resize task handler
//   const onTaskResizeEnd = (taskId, { side, date }) => {
//     const updatedTasks = tasks.map((t) => {
//       if (t.id !== taskId) return t;

//       if (side === "right") {
//         return { ...t, dueDate: toISO(date) };
//       } else if (side === "left") {
//         return { ...t, startDate: toISO(date) };
//       }
//       return t;
//     });

//     setTasks(updatedTasks);
//     saveTasks(updatedTasks);
//   };
//   // const onTaskResizeEnd = (taskId, newDueDate) => {
//   //   const updatedTasks = tasks.map((t) =>
//   //     t.id === taskId ? { ...t, dueDate: toISO(newDueDate) } : t
//   //   );
//   //   setTasks(updatedTasks);
//   //   saveTasks(updatedTasks);
//   // };

//   // };

//   const onTaskMove = (taskId, newStartDateStr) => {
//     const updatedTasks = tasks.map((task) => {
//       if (task.id !== taskId) return task;

//       const start = new Date(task.startDate);
//       const due = new Date(task.dueDate || task.startDate);
//       const durationMs = due - start;

//       const newStart = new Date(newStartDateStr);
//       const newDue = new Date(newStart.getTime() + durationMs);

//       return {
//         ...task,
//         startDate: toISO(newStart),
//         dueDate: toISO(newDue),
//       };
//     });

//     setTasks(updatedTasks);
//     saveTasks(updatedTasks);
//   };

//   return (
//     <>
//       {children({
//         tasks,
//         onDateClick: openModal,
//         onTaskClick: openSidebar,
//         onTaskResizeEnd,
//         onTaskMove, // ✅ pass move handler
//       })}

//       <TaskModal
//         isOpen={isModalOpen}
//         onClose={closeModal}
//         onSave={saveTask}
//         initialDate={selectedDate}
//       />

//       <TaskSidebar task={selectedTask} onClose={closeSidebar} />
//     </>
//   );
// }
import React, { useState, useEffect } from "react";
import { loadTasks, saveTasks } from "../storage/taskStorage";
import TaskModal from "./TaskModal";
import TaskSidebar from "./TaskSidebar";

export default function TaskManager({ children }) {
  const [tasks, setTasks] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {
    setTasks(loadTasks());
  }, []);

  const toISO = (d) => new Date(d).toISOString().slice(0, 10);

  const openModal = (date) => {
    setSelectedDate(date);
    setModalOpen(true);
    setSelectedTask(null);
  };

  const closeModal = () => setModalOpen(false);

  const saveTask = (taskData) => {
    const newTask = {
      id: Date.now(),
      ...taskData,
    };
    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
    closeModal();
  };

  const openSidebar = (task) => {
    setSelectedTask(task);
    setModalOpen(false);
  };

  const closeSidebar = () => setSelectedTask(null);

  // Resize handler (side-aware)
  const onTaskResizeEnd = (taskId, { side, date }) => {
    const updatedTasks = tasks.map((t) => {
      if (t.id !== taskId) return t;
      if (side === "right") {
        return { ...t, dueDate: toISO(date) };
      } else if (side === "left") {
        return { ...t, startDate: toISO(date) };
      }
      return t;
    });
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
  };

  const onTaskMove = (taskId, newStartDateStr) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id !== taskId) return task;
      const start = new Date(task.startDate);
      const due = new Date(task.dueDate || task.startDate);
      const durationMs = due - start;
      const newStart = new Date(newStartDateStr);
      const newDue = new Date(newStart.getTime() + durationMs);
      return {
        ...task,
        startDate: toISO(newStart),
        dueDate: toISO(newDue),
      };
    });
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
  };

  return (
    <>
      {children({
        tasks,
        onDateClick: openModal,
        onTaskClick: openSidebar,
        onTaskResizeEnd,
        onTaskMove,
      })}

      <TaskModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSave={saveTask}
        initialDate={selectedDate}
      />

      <TaskSidebar task={selectedTask} onClose={closeSidebar} />
    </>
  );
}
