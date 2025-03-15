import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, token }) => {
  if (!token) {
    return <Navigate to="/login" />;
  }
  return children;
};

export default ProtectedRoute;