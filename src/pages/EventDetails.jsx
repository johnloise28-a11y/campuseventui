import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";

function EventDetails() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Event not found");
        return res.json();
      })
      .then((data) => {
        setEvent(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p style={{ padding: "2rem" }}>Loading event details...</p>;
  if (error) return <p style={{ padding: "2rem", color: "red" }}>Error: {error}</p>;

  return (
    <div style={{ padding: "2rem", maxWidth: "700px", margin: "0 auto" }}>
      <Link to="/events" style={{ color: "#1a73e8", textDecoration: "none" }}>
        ← Back to Events
      </Link>

      <div style={{
        background: "#fff",
        border: "1px solid #e0e0e0",
        borderRadius: "12px",
        padding: "2rem",
        marginTop: "1.5rem",
        boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
      }}>
        <span style={{
          background: "#e8f0fe",
          color: "#1a73e8",
          fontSize: "0.85rem",
          padding: "4px 12px",
          borderRadius: "20px",
        }}>
          Event ID: {event.id}
        </span>

        <h1 style={{ marginTop: "1rem", textTransform: "capitalize" }}>
          {event.title}
        </h1>

        <p style={{ color: "#555", lineHeight: "1.7", marginTop: "1rem" }}>
          {event.body}
        </p>
      </div>
    </div>
  );
}

export default EventDetails;