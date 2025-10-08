import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "";

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const loginUser = async (username, password) => {
  return axios.post(`${API_URL}/api/login`, { username, password });
};

export const getHealth = async () => {
  const res = await api.get("/api/health");
  return res.data;
};

export const getProjects = async (token) => {
  const res = await api.get("/api/projects/active", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
