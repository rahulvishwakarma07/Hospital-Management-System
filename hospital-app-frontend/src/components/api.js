import { createContext, useContext } from "react";
import axios from "axios";

export const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

const API = "http://localhost:5000/api";

export const apiFetch = async (
  path,
  options = {},
  token = null
) => {
  const headers = {
    "Content-Type": "application/json", 
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const config = {
    url: `${API}${path}`,
    method: options.method || "GET",
    headers,
  };

  // only attach body if exists
  if (options.body !== undefined) {
    config.data = options.body;
  }

  try {
    const response = await axios(config);
    return response.data;
  } catch (error) {
    console.error(error.response?.data || error.message);
    throw error.response?.data || error;
  }
};