import { Link } from "react-router-dom";

function Home() {
  return (
    <div style={{
      padding: "4rem 2rem",
      textAlign: "center",
      maxWidth: "700px",
      margin: "0 auto",
    }}>
      <h1 style={{ fontSize: "2.5rem", color: "#1a73e8", marginBottom: "1rem" }}>
        Welcome to CampusEventUI 🎓
      </h1>
      <p style={{ fontSize: "1.1rem", color: "#555", marginBottom: "2rem", lineHeight: "1.8" }}>
        Stay updated with the latest campus events. Browse upcoming activities,
        join events, and manage your schedule all in one place.
      </p>

      <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
        <Link
          to="/events"
          style={{
            background: "#1a73e8",
            color: "#fff",
            padding: "0.75rem 2rem",
            borderRadius: "8px",
            textDecoration: "none",
            fontWeight: "600",
            fontSize: "1rem",
          }}
        >
          Browse Events
        </Link>
        <Link
          to="/dashboard"
          style={{
            background: "#fff",
            color: "#1a73e8",
            padding: "0.75rem 2rem",
            borderRadius: "8px",
            textDecoration: "none",
            fontWeight: "600",
            fontSize: "1rem",
            border: "2px solid #1a73e8",
          }}
        >
          Go to Dashboard
        </Link>
      </div>

      <div style={{
        display: "flex",
        gap: "1.5rem",
        justifyContent: "center",
        marginTop: "3rem",
        flexWrap: "wrap",
      }}>
        {[
          { icon: "📅", title: "Upcoming Events", desc: "Never miss an activity on campus" },
          { icon: "🔒", title: "Secure Dashboard", desc: "Manage events with protected access" },
          { icon: "⚡", title: "Real-Time Updates", desc: "Data refreshes automatically" },
        ].map(({ icon, title, desc }) => (
          <div
            key={title}
            style={{
              background: "#fff",
              border: "1px solid #e0e0e0",
              borderRadius: "12px",
              padding: "1.5rem",
              width: "180px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
            }}
          >
            <div style={{ fontSize: "2rem" }}>{icon}</div>
            <h3 style={{ margin: "0.5rem 0", fontSize: "0.95rem" }}>{title}</h3>
            <p style={{ fontSize: "0.8rem", color: "#777" }}>{desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;