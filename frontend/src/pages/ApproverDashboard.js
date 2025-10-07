import React from "react";
import Navbar from "../components/Navbar";

export default function ApproverDashboard() {
  return (
    <div>
      <Navbar />
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">Approver Dashboard</h1>
        <p>Welcome, approver! You can review and approve RAMS documents here.</p>
      </div>
    </div>
  );
}
