import axios from "axios";

export function putAthleteTargetSport(payload) {
  return axios.put("/node-api/server.js/athleteTargetSport/", payload);
}

export function getAthleteTargetSportById(id) {
  return axios.get("/node-api/server.js/athleteTargetSport/" + id);
}

export function postAthleteTargetSport(payload) {
  return axios.post("/node-api/server.js/athleteTargetSport/", payload);
}

export function deleteAthleteTargetSport(id) {
  return axios.post("/node-api/server.js/athleteTargetSport/" + id);
}
