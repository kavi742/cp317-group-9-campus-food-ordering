import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, allowedRoles }) {
  const stored = JSON.parse(localStorage.getItem("user") || "{}");
  const user = stored.data ? stored.data : stored;

  if (!user || !user.role) {
    return <Navigate to="/" />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    if (user.role === "EMPLOYEE") return <Navigate to="/employee" />;
    if (user.role === "MANAGER") return <Navigate to="/manager" />;
    return <Navigate to="/menu" />;
  }

  return children;
}

export default ProtectedRoute;
