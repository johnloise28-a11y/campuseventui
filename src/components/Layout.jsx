import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import { useEvents } from "../context/EventProvider";

function Layout() {
  const { darkMode } = useEvents();

  return (
    <div style={{
      minHeight: "100vh",
      background: darkMode ? "#121212" : "#f5f7fa",
      color: darkMode ? "#f0f0f0" : "#111",
      transition: "background 0.3s, color 0.3s",
    }}>
      <Navbar />
      <Outlet />
    </div>
  );
}

export default Layout;