import { useState } from "react";
import { Link } from "react-router-dom";
import { useEvents } from "../context/EventProvider";

function Events() {
  const { state, loading, error, lastUpdated } = useEvents();
  const [search, setSearch] = useState("");

  const filtered = state.events.filter((event) =>
    event.title.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <p style={{ padding: "2rem", textAlign: "center" }}>Loading events...</p>;
  if (error) return <p style={{ padding: "2rem", color: "red", textAlign: "center" }}>Error: {error}</p>;

  return (
    <div style={{ padding: "2rem", maxWidth: "1100px", margin: "0 auto" }}>
      <h1 style={{ textAlign: "center", fontSize: "2.5rem", marginBottom: "0.5rem" }}>Events</h1>

      <p style={{ textAlign: "center", color: "gray", fontSize: "0.85rem", marginBottom: "1.5rem" }}>
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
              background: "#fff",
              border: "1px solid #e0e0e0",
              borderRadius: "12px",
              padding: "1.5rem",
              boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
              transition: "transform 0.2s",
              textAlign: "center",
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-4px)"}
            onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}
          >
            <span style={{
              background: "#e8f0fe",
              color: "#1a73e8",
              fontSize: "0.78rem",
              padding: "3px 12px",
              borderRadius: "20px",
              display: "inline-block",
              marginBottom: "0.75rem",
            }}>
              Event #{event.id}
            </span>

            <span style={{
              marginLeft: "0.5rem",
              background: event.status === "active" ? "#e6f4ea" : "#fce8e6",
              color: event.status === "active" ? "#1e8e3e" : "#d93025",
              fontSize: "0.75rem",
              padding: "3px 10px",
              borderRadius: "20px",
              display: "inline-block",
              marginBottom: "0.75rem",
            }}>
              {event.status}
            </span>

            <h3 style={{
              fontSize: "1rem",
              textTransform: "capitalize",
              margin: "0.5rem 0 0.75rem",
            }}>
              {event.title}
            </h3>

            <p style={{
              fontSize: "0.85rem",
              color: "#666",
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