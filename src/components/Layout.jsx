import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import { useEvents } from "../context/EventProvider";

function Layout() {
  const { darkMode, toggleDarkMode } = useEvents();

  return (
    <div style={{
      minHeight: "100vh",
      background: darkMode ? "#121212" : "#f5f7fa",
      color: darkMode ? "#f0f0f0" : "#111",
      transition: "background 0.3s, color 0.3s",
    }}>

      {/* Dark Mode Button - Centered at Top */}
      <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "0.4rem",
        background: darkMode ? "#1a1a1a" : "#e8f0fe",
        borderBottom: `1px solid ${darkMode ? "#333" : "#c5d5f5"}`,
      }}>
        <button
          onClick={toggleDarkMode}
          style={{
            background: darkMode ? "#f0f0f0" : "#1a73e8",
            color: darkMode ? "#111" : "#fff",
            border: "none",
            padding: "0.3rem 1.5rem",
            borderRadius: "20px",
            cursor: "pointer",
            fontWeight: "600",
            fontSize: "0.85rem",
            display: "flex",
            alignItems: "center",
            gap: "0.4rem",
          }}
        >
          {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>
      </div>

      <Navbar />
      <Outlet />
    </div>
  );
}

export default Layout;