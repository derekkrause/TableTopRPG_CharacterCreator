import axios from "axios";

export function getAdvocateByUserId() {
  return axios.get("api/advocates");
}

export function updateAdvocate(payload) {
  return axios.put("api/advocates/" + payload.id, payload);
}

export function getAdvoAthletesById() {
  return axios.get("api/advocate/advoathlete");
}

export function insertAdvoAthletes() {
  return axios.get("api/advocate/advoathlete");
}

export function updateAdvoAthlete(payload) {
  return axios.put("api/advocate/advoathlete/" + payload.id, payload);
}

export function insertTeam(payload) {
  return axios.post("api/teams", payload);
}

export function getAllTeams() {
  return axios.get("api/teams");
}

export function updateTeam(payload) {
  return axios.put("api/teams/" + payload.id, payload);
}

export function insertadvoTeam(payload) {
  return axios.post("api/advoteam", payload);
}
