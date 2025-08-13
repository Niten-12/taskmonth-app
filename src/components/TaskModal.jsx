import React, { useState, useEffect } from "react";
import "../styles/modal.css";

// Utility to always return "YYYY-MM-DD" string
const toISO = (d) => {
  if (!d) return "";
  return new Date(d).toISOString().slice(0, 10);
};

export default function TaskModal({ isOpen, onClose, onSave, initialDate }) {
  const [itemType, setItemType] = useState("Task"); // "Task" or "Event"
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState(initialDate || "");
  const [dueDate, setDueDate] = useState(initialDate || "");
  const [eventType, setEventType] = useState("Virtual"); // Only if Event

  useEffect(() => {
    setStartDate(initialDate);
    setDueDate(initialDate);
  }, [initialDate]);

  if (!isOpen) return null;

  const handleSave = () => {
    if (!name.trim()) return alert(`${itemType} name is required!`);

    // Always store ISO strings for start/due dates
    const newItem = {
      id: Date.now(),
      type: itemType,
      name,
      description,
      startDate: toISO(startDate),
      dueDate: dueDate ? toISO(dueDate) : toISO(startDate),
      ...(itemType === "Event" && { eventType }),
    };

    onSave(newItem);

    // Reset fields
    setName("");
    setDescription("");
    setStartDate(initialDate || "");
    setDueDate(initialDate || "");
    setEventType("Virtual");
    setItemType("Task");
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h3>Create New Item</h3>

        {/* Toggle Buttons */}
        <div className="toggle-buttons">
          <button
            className={itemType === "Event" ? "active" : ""}
            onClick={() => setItemType("Event")}
          >
            Event
          </button>
          <button
            className={itemType === "Task" ? "active" : ""}
            onClick={() => setItemType("Task")}
          >
            Task
          </button>
        </div>

        {/* Name Field */}
        <label>{itemType} Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        {/* Description Optional */}
        <label>Description:</label>
        <textarea
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Optional..."
          style={{ width: "100%", marginBottom: "10px" }}
        />

        {/* Start & Due Date Row */}
        <div style={{ display: "flex", gap: "10px" }}>
          <div style={{ flex: 1 }}>
            <label>Start Date:</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <div style={{ flex: 1 }}>
            <label>Due Date:</label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>
        </div>

        {/* Event Type (only if Event selected) */}
        {itemType === "Event" && (
          <>
            <label>Event Type:</label>
            <select
              value={eventType}
              onChange={(e) => setEventType(e.target.value)}
            >
              <option>Virtual</option>
              <option>In Person</option>
            </select>
          </>
        )}

        {/* Buttons */}
        <div className="modal-buttons">
          <button onClick={handleSave}>Create</button>
          <button className="cancel" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
