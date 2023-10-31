// src/api.js
import axios from "axios";

const API_URL = "http://localhost:8001/api/v1/projects/mapv2";

export const fetchProjects = async (bounds) => {
  const params = bounds ? { ...bounds } : {};
  const response = await axios.get(API_URL, { params });
  return response.data;
};
