import { useContext } from "react";
import { Navigate } from "react-router-dom";

import { AuthContext } from "../contexts/AuthContext";

export const PublicRoute = ({ children }) => {
  const { username, loading } = useContext(AuthContext);
  if (loading) return <div>Загрузка...</div>;
  if (username) { return <Navigate to="/resumes" replace />; }
  return children;
};
