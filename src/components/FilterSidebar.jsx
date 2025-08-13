import React, { useState, useEffect } from "react";

export default function FilterSidebar({ isOpen, onClose }) {
  const sectionTitleStyle = {
    fontSize: "13px",
    color: "#bbb",
    marginBottom: "5px",
    fontWeight: "600",
  };

  const optionStyle = {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    marginBottom: "6px",
    color: "#fff",
    fontSize: "14px",
    cursor: "pointer",
  };

  // State for selected filters
  const [selectedFilters, setSelectedFilters] = useState({
    type: [],
    priority: [],
    status: [],
    time: "",
  });

  // Count state
  const [filterCount, setFilterCount] = useState(0);

  // Update count whenever selections change
  useEffect(() => {
    const count =
      selectedFilters.type.length +
      selectedFilters.priority.length +
      selectedFilters.status.length +
      (selectedFilters.time ? 1 : 0);

    setFilterCount(count);
  }, [selectedFilters]);

  // Handle checkbox change
  const handleCheckboxChange = (category, value) => {
    setSelectedFilters((prev) => {
      const alreadySelected = prev[category].includes(value);
      let updated;
      if (alreadySelected) {
        updated = prev[category].filter((v) => v !== value);
      } else {
        updated = [...prev[category], value];
      }
      return { ...prev, [category]: updated };
    });
  };

  // Handle radio change (time filters)
  const handleRadioChange = (value) => {
    setSelectedFilters((prev) => ({ ...prev, time: value }));
  };

  // Clear all filters
  const clearAll = () => {
    setSelectedFilters({
      type: [],
      priority: [],
      status: [],
      time: "",
    });
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0,0,0,0.4)",
            zIndex: 9998,
          }}
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "280px",
          height: "100vh",
          backgroundColor: "#000",
          color: "#fff",
          padding: "20px",
          zIndex: 9999,
          transform: isOpen ? "translateX(0)" : "translateX(-100%)",
          transition: "transform 0.3s ease",
          borderTopRightRadius: "12px",
          borderBottomRightRadius: "12px",
          borderRight: "1px solid #fff",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Header with Counter */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <h2 style={{ margin: 0, fontSize: "18px" }}>
            Filters{" "}
            <span
              style={{
                background: "#0f0",
                color: "#000",
                padding: "2px 6px",
                borderRadius: "8px",
                fontSize: "12px",
                marginLeft: "6px",
              }}
            >
              {filterCount}
            </span>
          </h2>
          <button
            onClick={onClose}
            style={{
              background: "transparent",
              border: "none",
              color: "#fff",
              fontSize: "22px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            &times;
          </button>
        </div>

        <div style={{ overflowY: "auto" }}>
          {/* Section - Type */}
          <div style={{ marginBottom: "15px" }}>
            <div style={sectionTitleStyle}>Type</div>
            <label style={optionStyle}>
              <input
                type="checkbox"
                checked={selectedFilters.type.includes("Event")}
                onChange={() => handleCheckboxChange("type", "Event")}
              />{" "}
              Event
            </label>
            <label style={optionStyle}>
              <input
                type="checkbox"
                checked={selectedFilters.type.includes("Task")}
                onChange={() => handleCheckboxChange("type", "Task")}
              />{" "}
              Task
            </label>
          </div>

          {/* Section - Priority */}
          <div style={{ marginBottom: "15px" }}>
            <div style={sectionTitleStyle}>Priority</div>
            {["High", "Medium", "Low"].map((p) => (
              <label style={optionStyle} key={p}>
                <input
                  type="checkbox"
                  checked={selectedFilters.priority.includes(p)}
                  onChange={() => handleCheckboxChange("priority", p)}
                />{" "}
                {p}
              </label>
            ))}
          </div>

          {/* Section - Status */}
          <div style={{ marginBottom: "15px" }}>
            <div style={sectionTitleStyle}>Status</div>
            {["To Do", "In Progress", "Review", "Completed"].map((s) => (
              <label style={optionStyle} key={s}>
                <input
                  type="checkbox"
                  checked={selectedFilters.status.includes(s)}
                  onChange={() => handleCheckboxChange("status", s)}
                />{" "}
                {s}
              </label>
            ))}
          </div>

          {/* Section - Time Based Filters */}
          <div style={{ marginBottom: "15px" }}>
            <div style={sectionTitleStyle}>Time-Based Filters</div>
            {[
              "Tasks within 1 week",
              "Tasks within 2 weeks",
              "Tasks within 3 weeks",
              "Tasks within 1 month",
            ].map((t) => (
              <label style={optionStyle} key={t}>
                <input
                  type="radio"
                  name="timeFilter"
                  checked={selectedFilters.time === t}
                  onChange={() => handleRadioChange(t)}
                />{" "}
                {t}
              </label>
            ))}
          </div>
        </div>

        {/* Divider */}
        <hr style={{ border: "1px solid #333", margin: "10px 0" }} />

        {/* Clear All Button */}
        <button
          onClick={clearAll}
          style={{
            background: "#444",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            padding: "8px",
            cursor: "pointer",
            fontWeight: "bold",
            transition: "background 0.2s",
          }}
          onMouseOver={(e) => (e.target.style.background = "#666")}
          onMouseOut={(e) => (e.target.style.background = "#444")}
        >
          Clear All Filters
        </button>
      </div>
    </>
  );
}
