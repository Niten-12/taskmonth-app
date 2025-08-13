// import React from "react";
// import { useDrag } from "react-dnd";
// import { getCategoryColor } from "../utils/calendarUtils";

// export default function TaskBar({ task, onClick, onResizeStart }) {
//   // Decide background by type/category
//   let bgColor = "#f1c40f";
//   if (task.type === "Task") {
//     bgColor = getCategoryColor(task.category);
//   } else if (task.type === "Event") {
//     bgColor =
//       task.eventType === "Virtual"
//         ? "linear-gradient(90deg, #1abc9c, #16a085)"
//         : "linear-gradient(90deg, #f39c12, #e67e22)";
//   }

//   // Drag-to-move: attach to whole bar (so user can pick anywhere)
//   const [{ isDraggingMove }, dragMoveRef] = useDrag({
//     type: "TASK_MOVE",
//     item: { id: task.id },
//     collect: (monitor) => ({ isDraggingMove: monitor.isDragging() }),
//   });

//   // Drag-to-resize: attach only to the right handle
//   const [{ isDraggingResize }, dragResizeRef] = useDrag({
//     type: "TASK_RESIZE",
//     item: () => {
//       if (onResizeStart) onResizeStart(task);
//       return { id: task.id };
//     },
//     collect: (monitor) => ({ isDraggingResize: monitor.isDragging() }),
//   });

//   const isDragging = isDraggingMove || isDraggingResize;

//   return (
//     <div
//       ref={dragMoveRef}
//       onClick={(e) => {
//         e.stopPropagation();
//         if (onClick) onClick(task);
//       }}
//       style={{
//         background: bgColor,
//         color: task.type === "Task" ? "#000" : "#fff",
//         padding: "3px 6px",
//         borderRadius: "6px",
//         fontSize: "12px",
//         marginTop: "3px",
//         whiteSpace: "nowrap",
//         overflow: "hidden",
//         textOverflow: "ellipsis",
//         fontWeight: "500",
//         boxShadow: "0px 2px 6px rgba(0,0,0,0.3)",
//         border: "1px solid rgba(255,255,255,0.15)",
//         cursor: "grab",
//         userSelect: "none",
//         display: "flex",
//         justifyContent: "space-between",
//         alignItems: "center",
//         opacity: isDragging ? 0.6 : 1,
//       }}
//       title={`${task.name}${
//         task.type === "Task" ? ` (${task.category})` : ` (${task.eventType})`
//       }`}
//     >
//       {/* Left: icon + name */}
//       <span>
//         {task.type === "Event" ? "📅 " : "✅ "}
//         {task.name}
//       </span>

//       {/* Right: resize drag handle */}
//       <div
//         ref={dragResizeRef}
//         style={{
//           width: "6px",
//           height: "70%",
//           cursor: "ew-resize",
//           background: "rgba(255,255,255,0.6)",
//           borderRadius: "2px",
//           marginLeft: "6px",
//           flexShrink: 0,
//         }}
//         onClick={(e) => e.stopPropagation()}
//       />
//     </div>
//   );
// }
// src/components/TaskBar.jsx
// import React from "react";
// import { useDrag } from "react-dnd";
// import { getCategoryColor } from "../utils/calendarUtils";

// export default function TaskBar({ task, onClick, onResizeStart }) {
//   let bgColor = "#f1c40f";
//   if (task.type === "Task") {
//     bgColor = getCategoryColor(task.category);
//   } else if (task.type === "Event") {
//     bgColor =
//       task.eventType === "Virtual"
//         ? "linear-gradient(90deg, #1abc9c, #16a085)"
//         : "linear-gradient(90deg, #f39c12, #e67e22)";
//   }

//   // Move full task range
//   const [{ isDraggingMove }, dragMoveRef] = useDrag({
//     type: "TASK_MOVE",
//     item: { id: task.id },
//     collect: (monitor) => ({ isDraggingMove: monitor.isDragging() }),
//   });

//   // Resize from right handle
//   const [{ isDraggingResize }, dragResizeRef] = useDrag({
//     type: "TASK_RESIZE",
//     item: () => {
//       if (onResizeStart) onResizeStart(task);
//       return { id: task.id };
//     },
//     collect: (monitor) => ({ isDraggingResize: monitor.isDragging() }),
//   });

//   const isDragging = isDraggingMove || isDraggingResize;

//   return (
//     <div
//       ref={dragMoveRef}
//       onClick={(e) => {
//         e.stopPropagation();
//         if (onClick) onClick(task);
//       }}
//       style={{
//         background: bgColor,
//         color: task.type === "Task" ? "#000" : "#fff",
//         padding: "3px 6px",
//         borderRadius: "6px",
//         fontSize: "12px",
//         marginTop: "3px",
//         whiteSpace: "nowrap",
//         overflow: "hidden",
//         textOverflow: "ellipsis",
//         fontWeight: "500",
//         boxShadow: "0px 2px 6px rgba(0,0,0,0.3)",
//         border: "1px solid rgba(255,255,255,0.15)",
//         cursor: "grab",
//         userSelect: "none",
//         display: "flex",
//         justifyContent: "space-between",
//         alignItems: "center",
//         opacity: isDragging ? 0.6 : 1,
//       }}
//       title={`${task.name}${
//         task.type === "Task" ? ` (${task.category})` : ` (${task.eventType})`
//       }`}
//     >
//       <span>
//         {task.type === "Event" ? "📅 " : "✅ "}
//         {task.name}
//       </span>

//       {/* Resize handle */}
//       <div
//         ref={dragResizeRef}
//         style={{
//           width: "6px",
//           height: "70%",
//           cursor: "ew-resize",
//           background: "rgba(255,255,255,0.6)",
//           borderRadius: "2px",
//           marginLeft: "6px",
//           flexShrink: 0,
//         }}
//         onClick={(e) => e.stopPropagation()}
//       />
//     </div>
//   );
// }
import React from "react";
import { useDrag } from "react-dnd";
import { getCategoryColor } from "../utils/calendarUtils";

export default function TaskBar({ task, onClick, onResizeStart }) {
  let bgColor = "#f1c40f";
  if (task.type === "Task") {
    bgColor = getCategoryColor(task.category);
  } else if (task.type === "Event") {
    bgColor =
      task.eventType === "Virtual"
        ? "linear-gradient(90deg, #1abc9c, #16a085)"
        : "linear-gradient(90deg, #f39c12, #e67e22)";
  }

  const [{ isDraggingMove }, dragMoveRef] = useDrag({
    type: "TASK_MOVE",
    item: { id: task.id },
    collect: (monitor) => ({ isDraggingMove: monitor.isDragging() }),
  });

  // Left side resize
  const [, dragLeftRef] = useDrag({
    type: "TASK_RESIZE",
    item: () => {
      if (onResizeStart) onResizeStart(task, "left");
      return { id: task.id, side: "left" };
    },
  });

  // Right side resize
  const [, dragRightRef] = useDrag({
    type: "TASK_RESIZE",
    item: () => {
      if (onResizeStart) onResizeStart(task, "right");
      return { id: task.id, side: "right" };
    },
  });

  return (
    <div
      ref={dragMoveRef}
      onClick={(e) => {
        e.stopPropagation();
        onClick?.(task);
      }}
      style={{
        background: bgColor,
        color: task.type === "Task" ? "#000" : "#fff",
        padding: "3px 6px",
        borderRadius: "6px",
        fontSize: "12px",
        marginTop: "3px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        opacity: isDraggingMove ? 0.6 : 1,
        cursor: "grab",
      }}
    >
      {/* Left resize handle */}
      <div
        ref={dragLeftRef}
        title="Drag from left to resize start date"
        style={{
          width: "5px",
          height: "70%",
          cursor: "ew-resize",
          background: "rgba(255,255,255,0.6)",
          borderRadius: "2px",
          marginRight: "4px",
        }}
        onClick={(e) => e.stopPropagation()}
      />

      {/* Task name */}
      <span style={{ flex: 1, textAlign: "center", overflow: "hidden" }}>
        {task.type === "Event" ? "📅" : "✅"} {task.name}
      </span>

      {/* Right resize handle */}
      <div
        ref={dragRightRef}
        title="Drag from right to resize end date"
        style={{
          width: "5px",
          height: "70%",
          cursor: "ew-resize",
          background: "rgba(255,255,255,0.6)",
          borderRadius: "2px",
          marginLeft: "4px",
        }}
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  );
}
