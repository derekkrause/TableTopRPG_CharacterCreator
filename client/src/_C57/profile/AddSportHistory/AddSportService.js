import axios from "axios";

export function postAthleteSport(payload) {
  return axios.post("api/athletesport", payload);
}

export function getAllSports() {
  return axios.get("/api/sports");
}

export function getClassYear() {
  return axios.get("api/classyear");
}

export function getSportLevels() {
  return axios.get("api/sportLevels/");
}

export function getAthleteInfoById(pageIndex, pageSize, id) {
  return axios.get("api/athletesport/" + pageIndex + "/" + pageSize + "/" + id);
}
