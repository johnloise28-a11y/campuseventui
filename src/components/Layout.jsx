import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import { useState } from "react";

export default function Layout() {
  const [dark, setDark] = useState(false);

  const themeStyle = {
    backgroundColor: dark ? "#121212" : "#ffffff",
    color: dark ? "#ffffff" : "#000000",
    minHeight: "100vh",
    transition: "0.3s ease"
  };

  return (
    <div style={themeStyle}>
      {/* ✅ DARK MODE BUTTON */}
      <button
        onClick={() => setDark(!dark)}
        style={{
          margin: "10px",
          padding: "8px 12px",
          cursor: "pointer",
          borderRadius: "5px",
          border: "none",
          background: dark ? "#444" : "#ddd"
        }}
      >
        {dark ? "Light Mode ☀️" : "Dark Mode 🌙"}
      </button>

      <Navbar />
      <div style={{ padding: "15px" }}>
        <Outlet />
      </div>
    </div>
  );
}