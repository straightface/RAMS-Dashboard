import React from "react";
import Navbar from "../components/Navbar";

export default function AdminDashboard() {
  return (
    <div>
      <Navbar />
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
        <p>Welcome, admin! You can manage users, projects, and templates here.</p>
      </div>
    </div>
  );
}
