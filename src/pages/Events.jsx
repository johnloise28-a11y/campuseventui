import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Events() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [lastUpdated, setLastUpdated] = useState(new Date());

  const fetchData = () => {
    setLoading(true);
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then((data) => {
        setPosts(data.slice(0, 20));
        setLastUpdated(new Date());
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  };

  // Initial fetch
  useEffect(() => {
    fetchData();
  }, []);

  // Auto-refresh every 30 seconds (Step 10 - Real-Time)
  useEffect(() => {
    const interval = setInterval(() => {
      fetchData();
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  const filtered = posts.filter((post) =>
    post.title.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <p style={{ padding: "2rem" }}>Loading events...</p>;
  if (error) return <p style={{ padding: "2rem", color: "red" }}>Error: {error}</p>;

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Events</h1>

      {/* Step 10 - Last Updated */}
      <p style={{ color: "gray", fontSize: "0.85rem" }}>
        Last updated: {lastUpdated.toLocaleTimeString()}
      </p>

      {/* Step 13 - Search Feature */}
      <input
        type="text"
        placeholder="Search events..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          padding: "0.5rem 1rem",
          marginBottom: "1.5rem",
          width: "100%",
          maxWidth: "400px",
          borderRadius: "8px",
          border: "1px solid #ccc",
          fontSize: "1rem",
        }}
      />

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1rem" }}>
        {filtered.map((post) => (
          <div
            key={post.id}
            style={{
              background: "#fff",
              border: "1px solid #e0e0e0",
              borderRadius: "12px",
              padding: "1.2rem",
              boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
              transition: "transform 0.2s",
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-4px)"}
            onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}
          >
            <span style={{
              background: "#e8f0fe",
              color: "#1a73e8",
              fontSize: "0.75rem",
              padding: "2px 8px",
              borderRadius: "20px",
              marginBottom: "0.5rem",
              display: "inline-block",
            }}>
              Event #{post.id}
            </span>
            <h3 style={{ margin: "0.5rem 0", fontSize: "1rem", textTransform: "capitalize" }}>
              {post.title}
            </h3>
            <p style={{ fontSize: "0.85rem", color: "#666", marginBottom: "1rem" }}>
              {post.body.slice(0, 80)}...
            </p>
            <Link
              to={`/events/${post.id}`}
              style={{
                background: "#1a73e8",
                color: "#fff",
                padding: "0.4rem 1rem",
                borderRadius: "8px",
                textDecoration: "none",
                fontSize: "0.85rem",
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