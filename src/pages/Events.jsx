import { useState } from "react";
import { Link } from "react-router-dom";
import { useEvents } from "../context/EventProvider";

function Events() {
  const { state, loading, error, lastUpdated, darkMode } = useEvents();
  const [search, setSearch] = useState("");

  const filtered = state.events.filter((event) =>
    event.title.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return (
    <p style={{ padding: "2rem", textAlign: "center", color: darkMode ? "#f0f0f0" : "#111" }}>
      Loading events...
    </p>
  );

  if (error) return (
    <p style={{ padding: "2rem", color: "red", textAlign: "center" }}>
      Error: {error}
    </p>
  );

  return (
    <div style={{ padding: "2rem", maxWidth: "1100px", margin: "0 auto" }}>
      <h1 style={{
        textAlign: "center",
        fontSize: "2.5rem",
        marginBottom: "0.5rem",
        color: darkMode ? "#f0f0f0" : "#111",
      }}>
        Events
      </h1>

      <p style={{ textAlign: "center", color: darkMode ? "#aaa" : "gray", fontSize: "0.85rem", marginBottom: "1.5rem" }}>
        Last updated: {lastUpdated.toLocaleTimeString()}
      </p>

      <div style={{ display: "flex", justifyContent: "center", marginBottom: "2rem" }}>
        <input
          type="text"
          placeholder="Search events..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: "0.6rem 1.2rem",
            width: "100%",
            maxWidth: "500px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            fontSize: "1rem",
            background: darkMode ? "#2a2a2a" : "#fff",
            color: darkMode ? "#f0f0f0" : "#111",
          }}
        />
      </div>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
        gap: "1.2rem",
      }}>
        {filtered.map((event) => (
          <div
            key={event.id}
            style={{
              background: darkMode ? "#1e1e1e" : "#fff",
              border: `1px solid ${darkMode ? "#333" : "#e0e0e0"}`,
              borderRadius: "12px",
              padding: "1.5rem",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              transition: "transform 0.2s",
              textAlign: "center",
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-4px)"}
            onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}
          >
            <span style={{
              background: darkMode ? "#1a3a6e" : "#e8f0fe",
              color: darkMode ? "#90bbff" : "#1a73e8",
              fontSize: "0.78rem",
              padding: "3px 12px",
              borderRadius: "20px",
              display: "inline-block",
              marginBottom: "0.5rem",
            }}>
              Event #{event.id}
            </span>

            <span style={{
              marginLeft: "0.5rem",
              background: event.status === "active"
                ? (darkMode ? "#1a3a2a" : "#e6f4ea")
                : (darkMode ? "#3a1a1a" : "#fce8e6"),
              color: event.status === "active" ? "#1e8e3e" : "#d93025",
              fontSize: "0.75rem",
              padding: "3px 10px",
              borderRadius: "20px",
              display: "inline-block",
              marginBottom: "0.5rem",
            }}>
              {event.status}
            </span>

            <h3 style={{
              fontSize: "1rem",
              textTransform: "capitalize",
              margin: "0.5rem 0 0.75rem",
              color: darkMode ? "#f0f0f0" : "#111",
            }}>
              {event.title}
            </h3>

            <p style={{
              fontSize: "0.85rem",
              color: darkMode ? "#aaa" : "#666",
              marginBottom: "1.2rem",
              lineHeight: "1.5",
            }}>
              {event.body?.slice(0, 80)}...
            </p>

            <Link
              to={`/events/${event.id}`}
              style={{
                background: "#1a73e8",
                color: "#fff",
                padding: "0.5rem 1.2rem",
                borderRadius: "8px",
                textDecoration: "none",
                fontSize: "0.9rem",
                fontWeight: "500",
              }}
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Events;