import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const isLoggedIn = false; // change later

  return isLoggedIn ? children : <Navigate to="/login" />;
}