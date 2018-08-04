import axios from "axios";

axios.defaults.withCredentials = true;

export function getClassYear() {
  return axios.get("/api/classyear");
}

export function postClassYear(payload) {
  return axios.post("/api/classyear", payload);
}

export function updateClassYear(payload) {
  return axios.put("/api/classyear/" + payload.id, payload);
}

export function deleteClassYear(classYearId) {
  return axios.delete("/api/classyear/" + classYearId);
}
