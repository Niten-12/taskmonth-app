import React, { useState } from "react";
import { format } from "date-fns";
import { FaFilter } from "react-icons/fa";

export default function App() {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());

  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // Generate calendar dates with month/year info
  const generateCalendar = () => {
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const prevMonthDays = new Date(currentYear, currentMonth, 0).getDate();

    let dates = [];

    // Previous month dates
    for (let i = firstDay - 1; i >= 0; i--) {
      dates.push({
        day: prevMonthDays - i,
        isCurrentMonth: false,
        month: currentMonth - 1 < 0 ? 11 : currentMonth - 1,
        year: currentMonth - 1 < 0 ? currentYear - 1 : currentYear,
      });
    }

    // Current month dates
    for (let i = 1; i <= daysInMonth; i++) {
      dates.push({
        day: i,
        isCurrentMonth: true,
        month: currentMonth,
        year: currentYear,
      });
    }

    // Next month dates to complete 6x7 grid
    const cellsToAdd = 42 - dates.length;
    for (let i = 1; i <= cellsToAdd; i++) {
      dates.push({
        day: i,
        isCurrentMonth: false,
        month: (currentMonth + 1) % 12,
        year: currentMonth + 1 > 11 ? currentYear + 1 : currentYear,
      });
    }

    return dates;
  };

  const dates = generateCalendar();

  // Click handler on date cell
  const onDateClick = (dateObj) => {
    console.log("Clicked date:", dateObj);
  };

  return (
    <div
      style={{
        backgroundColor: "#000",
        color: "#fff",
        minHeight: "100vh",
        padding: "20px",
        userSelect: "none",
      }}
      onCopy={(e) => e.preventDefault()}
      onCut={(e) => e.preventDefault()}
      onPaste={(e) => e.preventDefault()}
    >
      {/* Header Section */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        {/* Left: Current Date */}
        <div>
          <h2 style={{ margin: 0 }}>{format(today, "EEEE, dd MMMM yyyy")}</h2>
        </div>

        {/* Right: Controls */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <input
            type="text"
            placeholder="Search..."
            style={{
              padding: "5px 10px",
              borderRadius: "5px",
              border: "1px solid #555",
              backgroundColor: "#111",
              color: "#fff",
            }}
          />
          <FaFilter size={20} style={{ cursor: "pointer" }} />

          {/* Month Selector */}
          <select
            value={currentMonth}
            onChange={(e) => setCurrentMonth(parseInt(e.target.value))}
            style={{
              padding: "5px",
              borderRadius: "5px",
              backgroundColor: "#111",
              color: "#fff",
            }}
          >
            {Array.from({ length: 12 }).map((_, index) => (
              <option value={index} key={index}>
                {format(new Date(currentYear, index), "MMMM")}
              </option>
            ))}
          </select>

          {/* Year Selector */}
          <select
            value={currentYear}
            onChange={(e) => setCurrentYear(parseInt(e.target.value))}
            style={{
              padding: "5px",
              borderRadius: "5px",
              backgroundColor: "#111",
              color: "#fff",
            }}
          >
            {Array.from({ length: 5 }).map((_, index) => {
              const year = today.getFullYear() - 2 + index;
              return (
                <option key={year} value={year}>
                  {year}
                </option>
              );
            })}
          </select>
        </div>
      </div>

      {/* Weekday Headers */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
          textAlign: "center",
          marginBottom: "10px",
          fontWeight: "bold",
        }}
      >
        {weekdays.map((day, i) => (
          <div key={i}>{day}</div>
        ))}
      </div>

      {/* Dates Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
          gridAutoRows: "95px",
          textAlign: "center",
          gap: "5px",
        }}
      >
        {dates.map((dateObj, i) => {
          const monthName = format(
            new Date(dateObj.year, dateObj.month, dateObj.day),
            "MMM"
          );
          const lastDateOfMonth = new Date(
            dateObj.year,
            dateObj.month + 1,
            0
          ).getDate();

          let displayDate = dateObj.day;
          if (dateObj.day === 1 || dateObj.day === lastDateOfMonth) {
            displayDate = `${monthName} ${dateObj.day}`;
          }

          // Highlight today's date
          const isToday =
            dateObj.day === today.getDate() &&
            dateObj.month === today.getMonth() &&
            dateObj.year === today.getFullYear();

          return (
            <div
              key={i}
              onClick={() => onDateClick(dateObj)}
              style={{
                padding: "10px",
                backgroundColor: dateObj.isCurrentMonth
                  ? isToday
                    ? "#444"
                    : "#111"
                  : "#222",
                borderRadius: "5px",
                color: dateObj.isCurrentMonth ? "#fff" : "#888",
                cursor: "pointer",
                userSelect: "none",
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "center",
                paddingTop: "8px",
              }}
            >
              {displayDate}
            </div>
          );
        })}
      </div>
    </div>
  );
}
