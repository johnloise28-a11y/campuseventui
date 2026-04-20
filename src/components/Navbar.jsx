import { Link, useNavigate } from "react-router-dom";
import { useEvents } from "../context/EventProvider";

function Navbar() {
  const { isLoggedIn, logout, darkMode, toggleDarkMode } = useEvents();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav style={{
      background: darkMode ? "#1a1a2e" : "#1a73e8",
      padding: "1rem 2rem",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      transition: "background 0.3s",
    }}>
      <span style={{ color: "#fff", fontWeight: "bold", fontSize: "1.2rem" }}>
        🎓 CampusEventUI
      </span>

      <div style={{ display: "flex", gap: "1.2rem", alignItems: "center" }}>
        {[
          { to: "/", label: "Home" },
          { to: "/events", label: "Events" },
          { to: "/dashboard", label: "Dashboard" },
        ].map(({ to, label }) => (
          <Link
            key={to}
            to={to}
            style={{
              color: "#fff",
              textDecoration: "none",
              fontWeight: "500",
              fontSize: "0.95rem",
            }}
          >
            {label}
          </Link>
        ))}

        {/* Dark Mode Toggle */}
        <button
          onClick={toggleDarkMode}
          style={{
            background: darkMode ? "#f0f0f0" : "rgba(255,255,255,0.2)",
            color: darkMode ? "#111" : "#fff",
            border: "none",
            padding: "0.4rem 1rem",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "600",
            fontSize: "0.85rem",
          }}
        >
          {darkMode ? "☀️ Light" : "🌙 Dark"}
        </button>

        {/* Login / Logout */}
        {isLoggedIn ? (
          <button
            onClick={handleLogout}
            style={{
              background: "#fff",
              color: "#1a73e8",
              border: "none",
              padding: "0.4rem 1rem",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "600",
            }}
          >
            Logout
          </button>
        ) : (
          <Link
            to="/login"
            style={{
              background: "#fff",
              color: "#1a73e8",
              padding: "0.4rem 1rem",
              borderRadius: "8px",
              textDecoration: "none",
              fontWeight: "600",
            }}
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;