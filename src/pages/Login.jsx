import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEvents } from "../context/EventProvider";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useEvents();
  const navigate = useNavigate();

  const handleLogin = () => {
    if (!username || !password) {
      setError("Please enter your username and password.");
      return;
    }
    if (username === "admin" && password === "1234") {
      login();
      navigate("/dashboard");
    } else {
      setError("Incorrect username or password.");
    }
  };

  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "80vh",
      background: "#f5f7fa",
    }}>
      <div style={{
        background: "#fff",
        padding: "2.5rem",
        borderRadius: "16px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
        width: "100%",
        maxWidth: "380px",
      }}>
        <h2 style={{ textAlign: "center", color: "#1a73e8", marginBottom: "0.5rem" }}>
          🔐 Login
        </h2>
        <p style={{ textAlign: "center", color: "#777", marginBottom: "1.5rem", fontSize: "0.9rem" }}>
          Use <strong>admin</strong> / <strong>1234</strong> to log in
        </p>

        {error && (
          <p style={{
            background: "#fce8e6",
            color: "#d93025",
            padding: "0.75rem",
            borderRadius: "8px",
            fontSize: "0.85rem",
            marginBottom: "1rem",
            textAlign: "center",
          }}>
            {error}
          </p>
        )}

        <div style={{ marginBottom: "1rem" }}>
          <label style={{ fontSize: "0.85rem", color: "#555", display: "block", marginBottom: "0.3rem" }}>
            Username
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter username"
            style={{
              width: "100%",
              padding: "0.6rem 1rem",
              borderRadius: "8px",
              border: "1px solid #ccc",
              fontSize: "1rem",
              boxSizing: "border-box",
            }}
          />
        </div>

        <div style={{ marginBottom: "1.5rem" }}>
          <label style={{ fontSize: "0.85rem", color: "#555", display: "block", marginBottom: "0.3rem" }}>
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            style={{
              width: "100%",
              padding: "0.6rem 1rem",
              borderRadius: "8px",
              border: "1px solid #ccc",
              fontSize: "1rem",
              boxSizing: "border-box",
            }}
          />
        </div>

        <button
          onClick={handleLogin}
          style={{
            width: "100%",
            padding: "0.75rem",
            background: "#1a73e8",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            fontSize: "1rem",
            fontWeight: "600",
            cursor: "pointer",
          }}
        >
          Log In
        </button>
      </div>
    </div>
  );
}

export default Login;