import React, { useState } from "react";
import CalendarGrid from "./components/CalendarGrid";
import TaskManager from "./components/TaskManager";
import HeaderControls from "./components/HeaderControls";

export default function App() {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [searchValue, setSearchValue] = useState("");

  const handleFilterClick = () => {
    alert("Filter button clicked!");
  };

  return (
    <div
      style={{
        background: "#000",
        color: "#fff",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      <HeaderControls
        today={today}
        currentMonth={currentMonth}
        setCurrentMonth={setCurrentMonth}
        currentYear={currentYear}
        setCurrentYear={setCurrentYear}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        onFilterClick={handleFilterClick}
      />

      <TaskManager>
        {({ tasks, onDateClick, onTaskClick, onTaskResizeEnd, onTaskMove }) => (
          <CalendarGrid
            year={currentYear}
            month={currentMonth}
            tasks={tasks}
            onDateClick={onDateClick}
            onTaskClick={onTaskClick}
            onTaskResizeEnd={onTaskResizeEnd} // ✅ now directly from TaskManager
            onTaskMove={onTaskMove}
          />
        )}
      </TaskManager>
    </div>
  );
}
