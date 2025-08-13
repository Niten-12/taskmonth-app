// import React, { useState } from "react";
// import { generateCalendar, formatDate } from "../utils/calendarUtils";
// import CalendarCell from "./CalendarCell";

// export default function CalendarGrid({
//   year,
//   month,
//   tasks,
//   onDateClick,
//   onTaskClick,
//   onTaskResizeEnd,
//   onTaskMove,
// }) {
//   const dates = generateCalendar(year, month);
//   const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

//   const todayDateStr = formatDate(
//     new Date().getFullYear(),
//     new Date().getMonth(),
//     new Date().getDate()
//   );

//   const [draggingTaskId, setDraggingTaskId] = useState(null);
//   const [dragStartDate, setDragStartDate] = useState(null);
//   const [dragOverDate, setDragOverDate] = useState(null); // <- value used for preview

//   const finalizeResize = () => {
//     if (draggingTaskId && dragOverDate) {
//       onTaskResizeEnd(draggingTaskId, dragOverDate);
//     }
//     setDraggingTaskId(null);
//     setDragStartDate(null);
//     setDragOverDate(null);
//   };

//   const handleTaskMove = (taskId, newStartDate) => {
//     onTaskMove(taskId, newStartDate);
//   };

//   // Called by TaskBar's resize drag start
//   const handleResizeStart = (task) => {
//     setDraggingTaskId(task.id);
//     setDragStartDate(task.startDate);
//     setDragOverDate(task.dueDate || task.startDate);
//   };

//   return (
//     <div>
//       {/* Weekday headers */}
//       <div
//         style={{
//           display: "grid",
//           gridTemplateColumns: "repeat(7, 1fr)",
//           textAlign: "center",
//           fontWeight: "bold",
//         }}
//       >
//         {weekdays.map((day, idx) => (
//           <div key={idx}>{day}</div>
//         ))}
//       </div>

//       {/* Dates grid */}
//       <div
//         style={{
//           display: "grid",
//           gridTemplateColumns: "repeat(7, 1fr)",
//           gap: "5px",
//         }}
//         onMouseUp={finalizeResize}
//       >
//         {dates.map((dateObj, i) => {
//           const cellDate = formatDate(dateObj.year, dateObj.month, dateObj.day);
//           const isToday = cellDate === todayDateStr;

//           return (
//             <CalendarCell
//               key={i}
//               dateObj={dateObj}
//               cellDate={cellDate}
//               tasks={tasks}
//               isToday={isToday}
//               onDateClick={onDateClick}
//               onTaskClick={onTaskClick}
//               onResizeStart={handleResizeStart}
//               draggingTaskId={draggingTaskId}
//               dragStartDate={dragStartDate}
//               dragOverDate={dragOverDate} // <-- pass value (fix)
//               setDragOverDate={setDragOverDate}
//               onTaskMove={handleTaskMove}
//             />
//           );
//         })}
//       </div>
//     </div>
//   );
// }

// src/components/CalendarGrid.jsx
// import React, { useState } from "react";
// import { generateCalendar, formatDate } from "../utils/calendarUtils";
// import CalendarCell from "./CalendarCell";

// export default function CalendarGrid({
//   year,
//   month,
//   tasks,
//   onDateClick,
//   onTaskClick,
//   onTaskResizeEnd,
//   onTaskMove,
// }) {
//   const dates = generateCalendar(year, month);
//   const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
//   const todayDateStr = formatDate(
//     new Date().getFullYear(),
//     new Date().getMonth(),
//     new Date().getDate()
//   );

//   const [draggingTaskId, setDraggingTaskId] = useState(null);
//   const [dragStartDate, setDragStartDate] = useState(null);
//   const [dragOverDate, setDragOverDate] = useState(null);

//   const handleResizeStart = (task) => {
//     setDraggingTaskId(task.id);
//     setDragStartDate(task.startDate);
//     setDragOverDate(task.dueDate || task.startDate);
//   };

//   return (
//     <div>
//       {/* Weekday headers */}
//       <div
//         style={{
//           display: "grid",
//           gridTemplateColumns: "repeat(7, 1fr)",
//           textAlign: "center",
//           fontWeight: "bold",
//         }}
//       >
//         {weekdays.map((day, idx) => (
//           <div key={idx}>{day}</div>
//         ))}
//       </div>

//       {/* Dates grid */}
//       <div
//         style={{
//           display: "grid",
//           gridTemplateColumns: "repeat(7, 1fr)",
//           gap: "5px",
//         }}
//       >
//         {dates.map((dateObj, i) => {
//           const cellDate = formatDate(dateObj.year, dateObj.month, dateObj.day);
//           const isToday = cellDate === todayDateStr;

//           return (
//             <CalendarCell
//               key={i}
//               dateObj={dateObj}
//               cellDate={cellDate}
//               tasks={tasks}
//               isToday={isToday}
//               onDateClick={onDateClick}
//               onTaskClick={onTaskClick}
//               onResizeStart={handleResizeStart}
//               draggingTaskId={draggingTaskId}
//               dragStartDate={dragStartDate}
//               dragOverDate={dragOverDate}
//               setDragOverDate={setDragOverDate}
//               onTaskMove={onTaskMove}
//               onTaskResizeEnd={onTaskResizeEnd} // pass to finalize drop
//             />
//           );
//         })}
//       </div>
//     </div>
//   );
// }
// src/components/CalendarGrid.jsx
import React, { useState } from "react";
import { generateCalendar, formatDate } from "../utils/calendarUtils";
import CalendarCell from "./CalendarCell";

export default function CalendarGrid({
  year,
  month,
  tasks,
  onDateClick,
  onTaskClick,
  onTaskResizeEnd,
  onTaskMove,
}) {
  const dates = generateCalendar(year, month);
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const todayDateStr = formatDate(
    new Date().getFullYear(),
    new Date().getMonth(),
    new Date().getDate()
  );

  const [draggingTaskId, setDraggingTaskId] = useState(null);
  const [dragStartDate, setDragStartDate] = useState(null);
  const [dragOverDate, setDragOverDate] = useState(null);
  const [resizeSide, setResizeSide] = useState(null);

  const handleResizeStart = (task, side) => {
    setDraggingTaskId(task.id);
    setDragStartDate(task.startDate);
    setDragOverDate(task.dueDate || task.startDate);
    setResizeSide(side);
  };

  return (
    <div>
      {/* Weekday headers */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
          textAlign: "center",
          fontWeight: "bold",
        }}
      >
        {weekdays.map((day, idx) => (
          <div key={idx}>{day}</div>
        ))}
      </div>

      {/* Date cells */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
          gap: "5px",
        }}
      >
        {dates.map((dateObj, i) => {
          const cellDate = formatDate(dateObj.year, dateObj.month, dateObj.day);
          const isToday = cellDate === todayDateStr;
          return (
            <CalendarCell
              key={i}
              dateObj={dateObj}
              cellDate={cellDate}
              tasks={tasks}
              isToday={isToday}
              onDateClick={onDateClick}
              onTaskClick={onTaskClick}
              onResizeStart={handleResizeStart}
              draggingTaskId={draggingTaskId}
              dragStartDate={dragStartDate}
              dragOverDate={dragOverDate}
              resizeSide={resizeSide}
              setDragOverDate={setDragOverDate}
              onTaskMove={onTaskMove}
              onTaskResizeEnd={onTaskResizeEnd}
            />
          );
        })}
      </div>
    </div>
  );
}
