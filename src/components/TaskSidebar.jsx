import React from "react";
import { useState } from "react";
export default function TaskSidebar({ task, onClose }) {
  const [activeTab, setActiveTab] = useState("overview");

  const tabs = [
    { id: "overview", label: "Overview", icon: "📄" },
    { id: "workarea", label: "Work Area", icon: "🛠️" },
    { id: "progress", label: "Progress ", icon: "📈" },
  ];

  if (!task) return null;

  // Reusable style for each info field container
  const boxStyle = {
    padding: "8px 10px",
    marginBottom: "10px",
    display: "flex",
    alignItems: "center", // label + value vertically aligned
    // justifyContent: "space-between", // label left, value right
    color: "#fff",
    fontSize: "14px",
    gap: "8px", // 🆕 gap between label and value
  };

  return (
    <>
      {/* Overlay */}
      <div
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          width: "100vw",
          height: "100vh",
          backgroundColor: "rgba(0,0,0,0.4)",
          zIndex: 9998,
        }}
        onClick={onClose}
      />

      {/* Sidebar */}
      <div
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          width: "290px",
          height: "100vh",
          backgroundColor: "#000",
          color: "#fff",
          padding: "20px",
          zIndex: 9999,
          display: "flex",
          flexDirection: "column",
          animation: "slideIn 0.3s forwards",
          borderTopLeftRadius: "12px",
          borderBottomLeftRadius: "12px",
          border: "1px solid #fff", // ✅ white border
          boxSizing: "border-box", // ✅ padding + border ka calculation fix
        }}
      >
        {/* Header */}
        {/* First Row → Close Button */}
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            marginBottom: "10px",
          }}
        >
          <button
            onClick={onClose}
            style={{
              background: "transparent",
              border: "none",
              color: "#fff",
              fontSize: "24px",
              cursor: "pointer",
            }}
          >
            &times;
          </button>
        </div>

        {/* Second Row → Clickable Tabs */}
        <div
          style={{
            display: "flex",
            gap: "10px", // Tabs ke beech ka gap chhota
            marginBottom: "20px",
            flexWrap: "nowrap", // Wrap disable kiya -> ek hi line me rahe
            overflowX: "auto", // Agar width kam ho to scroll ho jaaye
          }}
        >
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <div
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "4px", // Icon-text ke beech ka gap kam
                  color: isActive ? "#0f0" : "#fff",
                  fontWeight: isActive ? "bold" : "normal",
                  fontSize: "12px", // 📉 Icon + text dono chhota
                  lineHeight: "1", // Compact vertical spacing
                  borderBottom: isActive
                    ? "2px solid #0f0"
                    : "2px solid transparent",
                  paddingBottom: "2px",
                  whiteSpace: "nowrap", // Icon & text ek hi line me rahe
                  transition: "color 0.2s, border-bottom 0.2s",
                }}
              >
                <span style={{ fontSize: "12px" }}>{tab.icon}</span>
                <span>{tab.label}</span>
              </div>
            );
          })}
        </div>

        {/* Info Fields */}
        <div style={boxStyle}>
          <strong
            style={{
              color: "#bbb",
              fontSize: "12px", // 🆕 smaller label font
              fontWeight: "600",
            }}
          >
            Type :
          </strong>
          <span>{task.type || "N/A"}</span>
        </div>
        <div style={boxStyle}>
          <strong
            style={{
              color: "#bbb",
              fontSize: "12px", // 🆕 smaller label font
              fontWeight: "600",
            }}
          >
            Name :
          </strong>
          <span>{task.name || "N/A"}</span>
        </div>
        <div style={boxStyle}>
          <strong
            style={{
              color: "#bbb",
              fontSize: "12px", // 🆕 smaller label font
              fontWeight: "600",
            }}
          >
            Start Date :
          </strong>
          <span>{task.startDate || "N/A"}</span>
        </div>
        <div style={boxStyle}>
          <strong
            style={{
              color: "#bbb",
              fontSize: "12px", // 🆕 smaller label font
              fontWeight: "600",
            }}
          >
            Due Date :
          </strong>
          <span>{task.dueDate || "N/A"}</span>
        </div>
        <div style={boxStyle}>
          <strong
            style={{
              color: "#bbb",
              fontSize: "12px", // 🆕 smaller label font
              fontWeight: "600",
            }}
          >
            Priority :
          </strong>
          <select
            defaultValue={task.priority || "Low"}
            style={{
              background: "#222",
              color: "#fff",
              border: "1px solid #444",
              borderRadius: "5px",
              padding: "4px",
              fontSize: "14px",
            }}
          >
            <option>High</option>
            <option>Low</option>
          </select>
        </div>
        <div style={boxStyle}>
          <strong
            style={{
              color: "#bbb",
              fontSize: "12px", // 🆕 smaller label font
              fontWeight: "600",
            }}
          >
            Status :
          </strong>
          <select
            defaultValue={task.status || "To Do"}
            style={{
              background: "#222",
              color: "#fff",
              border: "1px solid #444",
              borderRadius: "5px",
              padding: "4px",
              fontSize: "14px",
            }}
          >
            <option>To Do</option>
            <option>In Progress</option>
            <option>Review</option>
            <option>Completed</option>
          </select>
        </div>
        <div style={boxStyle}>
          <strong
            style={{
              color: "#bbb",
              fontSize: "12px", // 🆕 smaller label font
              fontWeight: "600",
            }}
          >
            Created By :
          </strong>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              background: "#222",
              borderRadius: "8px",
              padding: "4px 8px",
              border: "1px solid #333",
              marginTop: "6px",
            }}
          >
            <div
              style={{
                width: "24px",
                height: "24px",
                borderRadius: "50%",
                background: "#444",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "14px",
              }}
            >
              👤
            </div>
            <span style={{ color: "#fff" }}>{task.createdBy || "Niten"}</span>
          </div>
        </div>

        <div style={boxStyle}>
          <strong
            style={{
              color: "#bbb",
              fontSize: "12px", // 🆕 smaller label font
              fontWeight: "600",
            }}
          >
            Assigned To :
          </strong>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              marginTop: "6px",
            }}
          >
            <button
              type="button"
              style={{
                width: "28px",
                height: "28px",
                borderRadius: "50%",
                border: "none",
                background: "#555",
                color: "#fff",
                fontWeight: "bold",
                fontSize: "18px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "0",
              }}
            >
              +
            </button>
            <span style={{ color: "#fff" }}>{task.assignedTo || ""}</span>
          </div>
        </div>

        {/* Description Section */}
        <div style={{ marginTop: "10px", marginBottom: "15px" }}>
          <strong
            style={{ color: "#bbb", display: "block", marginBottom: "4px" }}
          >
            Description
          </strong>
          <div
            style={{
              background: "#222",
              border: "1px solid #333",
              borderRadius: "8px",
              padding: "8px",
              minHeight: "90px",
              color: "#fff",
            }}
          >
            {task.description || ""}
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: "flex", gap: "10px", marginTop: "auto" }}>
          <button
            style={{
              flex: 1,
              background: "#3498db",
              border: "none",
              borderRadius: "8px",
              padding: "8px 0",
              color: "#fff",
              fontWeight: "bold",
              cursor: "pointer",
              boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
            }}
          >
            ✏️ Edit
          </button>
          <button
            style={{
              flex: 1,
              background: "#e74c3c",
              border: "none",
              borderRadius: "8px",
              padding: "8px 0",
              color: "#fff",
              fontWeight: "bold",
              cursor: "pointer",
              boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
            }}
          >
            🗑️ Delete
          </button>
        </div>
      </div>

      {/* Animation */}
      <style>
        {`
          @keyframes slideIn {
            from { transform: translateX(100%); }
            to { transform: translateX(0); }
          }
        `}
      </style>
    </>
  );
}
