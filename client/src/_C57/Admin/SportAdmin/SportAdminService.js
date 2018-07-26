import axios from "axios";

export function getById(id) {
  return axios.get("/api/sports/" + id);
}

export function addSport(sportInfo) {
  return axios.post("/api/sports", sportInfo);
}

export function updateSport(sportInfo) {
  return axios.put("/api/sports/" + sportInfo.id, sportInfo);
}

export function getAllSports() {
  return axios.get("/api/sports");
}

export function deleteSport(id) {
  return axios.delete("/api/sports/" + id);
}
