import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/api";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await loginUser(username, password);
      localStorage.setItem("token", res.access_token);
      localStorage.setItem("roles", JSON.stringify(res.roles));
      localStorage.setItem("username", username);

      if (res.roles.includes("admin")) navigate("/admin");
      else if (res.roles.includes("creator")) navigate("/creator");
      else if (res.roles.includes("approver")) navigate("/approver");
      else navigate("/login");
    } catch {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="h-screen flex flex-col justify-center items-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-xl p-8 w-96">
        <h2 className="text-2xl font-semibold mb-4 text-center">Login</h2>
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border p-2 rounded"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border p-2 rounded"
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            className="bg-blue-600 text-white rounded py-2 hover:bg-blue-500"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

