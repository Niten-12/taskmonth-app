// import React from "react";
// import { useDrop } from "react-dnd";
// import TaskBar from "./TaskBar";

// export default function CalendarCell({
//   dateObj,
//   cellDate, // Already "YYYY-MM-DD" string
//   tasks,
//   isToday,
//   onDateClick,
//   onTaskClick,
//   onResizeStart,
//   draggingTaskId,
//   dragStartDate,
//   dragOverDate, // <-- receive value for preview
//   setDragOverDate,
//   onTaskMove,
// }) {
//   // Drop target for both resize & move
//   const [, dropRef] = useDrop({
//     accept: ["TASK_RESIZE", "TASK_MOVE"],
//     drop: (item, monitor) => {
//       const type = monitor.getItemType();
//       if (type === "TASK_MOVE") {
//         // pass as string to keep storage consistent
//         onTaskMove(item.id, cellDate);
//       }
//       // Resize finalize handled in CalendarGrid mouseup
//     },
//     hover: (_, monitor) => {
//       const type = monitor.getItemType();
//       if (type === "TASK_RESIZE" && draggingTaskId) {
//         setDragOverDate(cellDate);
//       }
//     },
//   });

//   // Filter tasks for this cell — compare as ISO strings
//   const dayTasks = tasks.filter((t) => {
//     const start = t.startDate || t.date;
//     const end = t.dueDate || t.startDate || t.date;
//     if (start && end) {
//       return cellDate >= start && cellDate <= end;
//     }
//     return start === cellDate;
//   });

//   // Debug: See which tasks are being shown here
//   // console.log("Render cell:", cellDate, "Tasks:", dayTasks);

//   // Is this cell in the current resize preview range?
//   let isInDragPreview = false;
//   if (draggingTaskId && dragStartDate && dragOverDate) {
//     const rangeStart =
//       dragStartDate < dragOverDate ? dragStartDate : dragOverDate;
//     const rangeEnd =
//       dragStartDate < dragOverDate ? dragOverDate : dragStartDate;
//     if (cellDate >= rangeStart && cellDate <= rangeEnd) {
//       isInDragPreview = true;
//     }
//   }

//   return (
//     <div
//       ref={dropRef}
//       style={{
//         border: "1px solid #333",
//         padding: "4px",
//         backgroundColor: isToday
//           ? "#404040"
//           : dateObj.isCurrentMonth
//           ? "#111"
//           : "#222",
//         color: isToday ? "#000" : dateObj.isCurrentMonth ? "#fff" : "#777",
//         cursor: "pointer",
//         minHeight: "80px",
//         borderRadius: isToday ? "8px" : "0",
//         boxShadow: isToday ? "0 0 10px rgba(46, 204, 113, 0.7)" : "none",
//         transition: "all 0.2s ease",
//         outline: isInDragPreview ? "2px dashed #0f0" : "none",
//         outlineOffset: isInDragPreview ? "-3px" : "0",
//         userSelect: "none",
//       }}
//       onClick={() => onDateClick(cellDate)}
//       onMouseEnter={() => {
//         // If resizing, keep updating preview
//         if (draggingTaskId) setDragOverDate(cellDate);
//       }}
//     >
//       {/* Date number circle */}
//       <div
//         style={{
//           fontSize: "14px",
//           fontWeight: "bold",
//           background: isToday ? "#27ae60" : "transparent",
//           color: isToday ? "#fff" : "inherit",
//           borderRadius: "50%",
//           width: "24px",
//           height: "24px",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//           marginBottom: "3px",
//           userSelect: "none",
//         }}
//       >
//         {dateObj.day}
//       </div>

//       {/* Tasks */}
//       {dayTasks.map((t) => (
//         <TaskBar
//           key={t.id}
//           task={t}
//           onClick={(task) => onTaskClick(task)}
//           onResizeStart={() => onResizeStart(t)}
//         />
//       ))}
//     </div>
//   );
// }
// src/components/CalendarCell.jsx
// import React from "react";
// import { useDrop } from "react-dnd";
// import TaskBar from "./TaskBar";

// export default function CalendarCell({
//   dateObj,
//   cellDate, // "YYYY-MM-DD"
//   tasks,
//   isToday,
//   onDateClick,
//   onTaskClick,
//   onResizeStart,
//   draggingTaskId,
//   dragStartDate,
//   dragOverDate,
//   setDragOverDate,
//   onTaskMove,
//   onTaskResizeEnd, // <-- Added direct prop
// }) {
//   const [, dropRef] = useDrop({
//     accept: ["TASK_RESIZE", "TASK_MOVE"],
//     drop: (item, monitor) => {
//       const type = monitor.getItemType();
//       // Move Task
//       if (type === "TASK_MOVE") {
//         onTaskMove(item.id, cellDate);
//       }
//       // Resize task finalization happens here
//       if (type === "TASK_RESIZE" && draggingTaskId) {
//         onTaskResizeEnd(item.id, cellDate); // finalized new due date
//       }
//     },
//     hover: (_, monitor) => {
//       const type = monitor.getItemType();
//       if (type === "TASK_RESIZE" && draggingTaskId) {
//         setDragOverDate(cellDate); // preview
//       }
//     },
//   });

//   const dayTasks = tasks.filter((t) => {
//     const start = t.startDate || t.date;
//     const end = t.dueDate || t.startDate || t.date;
//     if (start && end) {
//       return cellDate >= start && cellDate <= end;
//     }
//     return start === cellDate;
//   });

//   let isInDragPreview = false;
//   if (draggingTaskId && dragStartDate && dragOverDate) {
//     const rangeStart =
//       dragStartDate < dragOverDate ? dragStartDate : dragOverDate;
//     const rangeEnd =
//       dragStartDate < dragOverDate ? dragOverDate : dragStartDate;
//     if (cellDate >= rangeStart && cellDate <= rangeEnd) {
//       isInDragPreview = true;
//     }
//   }

//   return (
//     <div
//       ref={dropRef}
//       style={{
//         border: "1px solid #333",
//         padding: "4px",
//         backgroundColor: isToday
//           ? "#404040"
//           : dateObj.isCurrentMonth
//           ? "#111"
//           : "#222",
//         color: isToday ? "#000" : dateObj.isCurrentMonth ? "#fff" : "#777",
//         cursor: "pointer",
//         minHeight: "80px",
//         borderRadius: isToday ? "8px" : "0",
//         boxShadow: isToday ? "0 0 10px rgba(46, 204, 113, 0.7)" : "none",
//         outline: isInDragPreview ? "2px dashed #0f0" : "none",
//         outlineOffset: isInDragPreview ? "-3px" : "0",
//       }}
//       onClick={() => onDateClick(cellDate)}
//       onMouseEnter={() => {
//         if (draggingTaskId) setDragOverDate(cellDate);
//       }}
//     >
//       <div
//         style={{
//           fontSize: "14px",
//           fontWeight: "bold",
//           background: isToday ? "#27ae60" : "transparent",
//           color: isToday ? "#fff" : "inherit",
//           borderRadius: "50%",
//           width: "24px",
//           height: "24px",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//           marginBottom: "3px",
//         }}
//       >
//         {dateObj.day}
//       </div>

//       {dayTasks.map((t) => (
//         <TaskBar
//           key={t.id}
//           task={t}
//           onClick={(task) => onTaskClick(task)}
//           onResizeStart={() => onResizeStart(t)}
//         />
//       ))}
//     </div>
//   );
// }
// src/components/CalendarCell.jsx
import React from "react";
import { useDrop } from "react-dnd";
import TaskBar from "./TaskBar";

export default function CalendarCell({
  dateObj,
  cellDate,
  tasks,
  isToday,
  onDateClick,
  onTaskClick,
  onResizeStart,
  draggingTaskId,
  dragStartDate,
  dragOverDate,
  resizeSide,
  setDragOverDate,
  onTaskMove,
  onTaskResizeEnd,
}) {
  const [, dropRef] = useDrop({
    accept: ["TASK_RESIZE", "TASK_MOVE"],
    drop: (item, monitor) => {
      const type = monitor.getItemType();
      if (type === "TASK_MOVE") {
        onTaskMove(item.id, cellDate);
      }
      if (type === "TASK_RESIZE" && draggingTaskId) {
        onTaskResizeEnd(item.id, {
          side: item.side || resizeSide,
          date: cellDate,
        });
      }
    },
    hover: (_, monitor) => {
      const type = monitor.getItemType();
      if (type === "TASK_RESIZE" && draggingTaskId) {
        setDragOverDate(cellDate);
      }
    },
  });

  const dayTasks = tasks.filter((t) => {
    const start = t.startDate;
    const end = t.dueDate || t.startDate;
    return start && end
      ? cellDate >= start && cellDate <= end
      : start === cellDate;
  });

  let isInDragPreview = false;
  if (draggingTaskId && dragStartDate && dragOverDate) {
    let s, e;
    if (resizeSide === "left") {
      s = dragOverDate;
      e = dragStartDate;
    } else {
      s = dragStartDate;
      e = dragOverDate;
    }
    const startStr = s < e ? s : e;
    const endStr = s < e ? e : s;
    if (cellDate >= startStr && cellDate <= endStr) {
      isInDragPreview = true;
    }
  }

  return (
    <div
      ref={dropRef}
      style={{
        border: "1px solid #333",
        padding: "4px",
        backgroundColor: isToday
          ? "#404040"
          : dateObj.isCurrentMonth
          ? "#111"
          : "#222",
        color: isToday ? "#000" : dateObj.isCurrentMonth ? "#fff" : "#777",
        minHeight: "80px",
        outline: isInDragPreview ? "2px dashed #0f0" : "none",
      }}
      onClick={() => onDateClick(cellDate)}
      onMouseEnter={() => {
        if (draggingTaskId) setDragOverDate(cellDate);
      }}
    >
      {/* Date number */}
      <div
        style={{
          fontSize: "14px",
          fontWeight: "bold",
          background: isToday ? "#27ae60" : "transparent",
          color: isToday ? "#fff" : "inherit",
          borderRadius: "50%",
          width: "24px",
          height: "24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "3px",
        }}
      >
        {dateObj.day}
      </div>

      {dayTasks.map((t) => (
        <TaskBar
          key={t.id}
          task={t}
          onClick={(task) => onTaskClick(task)}
          onResizeStart={onResizeStart}
        />
      ))}
    </div>
  );
}
