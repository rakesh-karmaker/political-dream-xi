import { SERVER } from "@/config/constants";
import axios from "axios";

console.log(`API Server URL: ${SERVER}`);

const api = axios.create({
  baseURL: `${SERVER}`,
  headers: { "Content-Type": "application/json" },
});

export default api;
