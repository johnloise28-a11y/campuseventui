import { useState } from "react";
import { useEvents } from "../context/EventProvider";

function Dashboard() {
  const { state, loading, addEvent, deleteEvent, toggleStatus } = useEvents();
  const [newTitle, setNewTitle] = useState("");

  const handleAdd = () => {
    if (!newTitle.trim()) return;
    addEvent({
      id: Date.now(),
      title: newTitle,
      body: "Manually added event.",
      status: "active",
    });
    setNewTitle("");
  };

  if (loading) return <p style={{ padding: "2rem", textAlign: "center" }}>Loading events...</p>;

  return (
    <div style={{ padding: "2rem", maxWidth: "800px", margin: "0 auto" }}>
      <h1 style={{ textAlign: "center", fontSize: "2.5rem" }}>Dashboard</h1>
      <p style={{ textAlign: "center", color: "#666", marginBottom: "2rem" }}>
        Welcome! Manage your campus events below.
      </p>

      {/* Add Event */}
      <div style={{ display: "flex", gap: "0.5rem", marginBottom: "2rem" }}>
        <input
          type="text"
          placeholder="New event title..."
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          style={{
            padding: "0.6rem 1rem",
            borderRadius: "8px",
            border: "1px solid #ccc",
            fontSize: "1rem",
            flex: 1,
          }}
        />
        <button
          onClick={handleAdd}
          style={{
            background: "#1a73e8",
            color: "#fff",
            border: "none",
            padding: "0.6rem 1.5rem",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "1rem",
            fontWeight: "600",
          }}
        >
          Add Event
        </button>
      </div>

      {/* Event List */}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        {state.events.map((event) => (
          <div
            key={event.id}
            style={{
              background: "#fff",
              border: "1px solid #e0e0e0",
              borderRadius: "10px",
              padding: "1rem 1.5rem",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
            }}
          >
            <div>
              <strong style={{ textTransform: "capitalize" }}>{event.title}</strong>
              <span style={{
                marginLeft: "0.75rem",
                background: event.status === "active" ? "#e6f4ea" : "#fce8e6",
                color: event.status === "active" ? "#1e8e3e" : "#d93025",
                padding: "2px 10px",
                borderRadius: "20px",
                fontSize: "0.78rem",
              }}>
                {event.status}
              </span>
            </div>

            <div style={{ display: "flex", gap: "0.5rem" }}>
              <button
                onClick={() => toggleStatus(event.id)}
                style={{
                  background: "#f1f3f4",
                  border: "none",
                  padding: "0.4rem 0.9rem",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontWeight: "500",
                }}
              >
                Toggle
              </button>
              <button
                onClick={() => deleteEvent(event.id)}
                style={{
                  background: "#fce8e6",
                  color: "#d93025",
                  border: "none",
                  padding: "0.4rem 0.9rem",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontWeight: "500",
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;