import axios from "axios";

export function getCoach() {
  return axios.get("node-api/server.js/api/coaches");
}

export function getCoachTrend() {
  return axios.get("node-api/server.js/coaches/trend");
}