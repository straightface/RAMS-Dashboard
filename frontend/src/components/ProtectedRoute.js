import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, roles }) => {
  const token = localStorage.getItem("token");
  const userRoles = JSON.parse(localStorage.getItem("roles") || "[]");

  if (!token) return <Navigate to="/login" />;
  if (!roles.some(r => userRoles.includes(r))) return <Navigate to="/login" />;

  return children;
};

export default ProtectedRoute;