import React from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const username = localStorage.getItem("username");
  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav className="bg-gray-800 text-white p-3 flex justify-between items-center">
      <h1 className="text-xl font-semibold">RAMS Automater</h1>
      <div className="flex items-center gap-4">
        <span>{username}</span>
        <button
          onClick={logout}
          className="bg-red-600 px-3 py-1 rounded hover:bg-red-500"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
