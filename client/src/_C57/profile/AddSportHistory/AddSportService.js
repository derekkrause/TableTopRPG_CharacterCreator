import axios from "axios";

export function postAthleteSport(payload) {
  return axios.post("api/athleteTeam", payload);
}

export function getAllSports() {
  return axios.get("api/sports");
}

export function getClassYear() {
  return axios.get("api/classyear");
}

export function getSportLevels() {
  return axios.get("api/sportLevels/");
}

export function getAthleteInfoById(id) {
  return axios.get("api/athleteTeam/" + id);
}

export function deleteSportHistory(teamId) {
  return axios.delete("api/athleteTeam/" + teamId);
}

export function updateSportHistory(payload) {
  return axios.put("api/athleteTeam/" + payload.id, payload);
}
