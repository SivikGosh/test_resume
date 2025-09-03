import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

export const PrivateRoute = ({ children }) => {
  const { username, loading } = useContext(AuthContext);
  if (loading) return <div>Загрузка...</div>;
  if (!username) { return <Navigate to="/auth" replace />; }
  return children;
};
