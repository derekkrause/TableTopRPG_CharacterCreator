import axios from "axios";

// axios.defaults.withCredentials = true;

export function postSportPosition(payload) {
  return axios.post("/node-api/server.js/sportposition", payload);
}

export function getAllSportPosition() {
  return axios.get("/node-api/server.js/sportposition");
}

export function putSportPostion(payload) {
  return axios.put("/node-api/server.js/sportposition", payload);
}

export function deleteSportPosition(id) {
  return axios.delete("/node-api/server.js/sportposition/" + id);
}
