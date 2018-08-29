import axios from "axios";

export function getAllAthleteLinks() {
  return axios.get("/node-api/server.js/athleteLinks");
}

export function getAthleteLinksById(id) {
  return axios.get("/node-api/server.js/athleteLinks/" + id);
}

export function postAthleteLink(payload) {
  return axios.post("/node-api/server.js/athleteLinks/" + payload.userId, payload);
}
