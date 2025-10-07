import React from "react";
import Navbar from "../components/Navbar";

export default function CreatorDashboard() {
  return (
    <div>
      <Navbar />
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">Creator Dashboard</h1>
        <p>Welcome, creator! You can generate new RAMS here.</p>
      </div>
    </div>
  );
}
