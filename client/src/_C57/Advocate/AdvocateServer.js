import axios from "axios";

export function getAdvocateByUserId(advocateId) {
  return axios.get("api/advocates/" + advocateId);
}

export function updateAdvocate(payload) {
  return axios.put("api/advocates/" + payload.id, payload);
}

export function getAdvoAthletesById() {
  return axios.get("api/advocate/advoathlete");
}

export function insertAdvoAthletes(payload) {
  return axios.post("api/advocate/advoathlete", payload);
}

export function updateAdvoAthlete(payload) {
  return axios.put("api/advocate/advoathlete/" + payload.id, payload);
}

export function deleteAdvoAthlete(athleteId) {
  return axios.delete("api/advocate/advoathlete/" + athleteId);
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

export function deleteTeam(teamId) {
  return axios.delete("api/teams/" + teamId);
}

export function insertAdvoTeam(payload) {
  return axios.post("api/advoteam", payload);
}

export function deleteAdvoTeam(advoTeamId) {
  return axios.delete("api/advoteam/" + advoTeamId);
}
