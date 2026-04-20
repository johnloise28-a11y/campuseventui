import { Navigate } from "react-router-dom";
import { useEvents } from "../context/EventProvider";

function ProtectedRoute({ children }) {
  const { isLoggedIn } = useEvents();

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return children;
}

export default ProtectedRoute;