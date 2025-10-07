import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import CreatorDashboard from "./pages/CreatorDashboard";
import ApproverDashboard from "./pages/ApproverDashboard";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute roles={["admin"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/creator"
          element={
            <ProtectedRoute roles={["creator", "admin"]}>
              <CreatorDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/approver"
          element={
            <ProtectedRoute roles={["approver", "admin"]}>
              <ApproverDashboard />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

