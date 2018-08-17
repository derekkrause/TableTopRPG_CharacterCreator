import axios from "axios";

export function getAthleteById(id) {
  return axios.get("/node-api/server.js/athlete/" + id);
}

export function putAthleteById(payload) {
  return axios.put("/node-api/server.js/athlete/" + payload.userId, payload);
}

export function getAthleteTrend(sportType) {
  return axios.get("api/athletetrend?q=" + sportType);
}
