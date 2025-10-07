import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";

export default function Navbar() {
  const navigate = useNavigate();
  const username = localStorage.getItem("username");
  const [theme, setTheme] = useState("light");

  // Load theme preference from localStorage
  useEffect(() => {
  const saved = localStorage.getItem("theme");
  if (saved) {
    setTheme(saved);
    if (saved === "dark") document.documentElement.classList.add("dark");
  } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    setTheme("dark");
    document.documentElement.classList.add("dark");
  }
}, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);

    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav className="bg-gray-800 dark:bg-gray-900 text-white p-3 flex justify-between items-center">
      <h1 className="text-xl font-semibold">RAMS Automater</h1>
      <div className="flex items-center gap-4">
        <button
          onClick={toggleTheme}
          className="p-2 rounded hover:bg-gray-700 dark:hover:bg-gray-700 transition"
          title={`Switch to ${theme === "light" ? "Dark" : "Light"} mode`}
        >
          {theme === "light" ? (
            <MoonIcon className="w-5 h-5 text-yellow-400" />
          ) : (
            <SunIcon className="w-5 h-5 text-yellow-300" />
          )}
        </button>
        <span className="text-sm">{username}</span>
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
