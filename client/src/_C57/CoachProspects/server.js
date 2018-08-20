import axios from "axios";
axios.defaults.withCredentials = true;

export function getCoachAthleteById(Id) {
  return axios.get("/node-api/server.js/coachAthlete/" + Id);
}
export function getCoachAthlete() {
  return axios.get("/node-api/server.js/coachAthlete");
}

export function postCoachAthlete(payload) {
  return axios.post("/node-api/server.js/coachAthlete", payload);
}

export function updateCoachAthlete(payload, Id) {
  return axios.put("/node-api/server.js/coachAthlete/" + Id, payload);
}

export function deleteCoachAthlete(Id) {
  return axios.delete("/node-api/server.js/coachAthlete/" + Id);
}

export function postCoachAthleteTag(payload) {
  return axios.post("/node-api/server.js/coachAthleteTag", payload);
}

export function deleteCoachAthleteTag(id, tag) {
  return axios.delete("/node-api/server.js/coachAthleteTag/" + id + "/" + tag);
}

export function getCoachTagsById(userId) {
  return axios.get("/node-api/server.js/coachTags/" + userId);
}

export function postCoachTags(payload) {
  return axios.post("/node-api/server.js/coachTags", payload);
}

export function deleteCoachTags(Id) {
  return axios.delete("/node-api/server.js/coachTags/" + Id);
}

export function getCoachLogById(Id, AthleteId) {
  return axios.get("/node-api/server.js/coachAthleteLog/" + Id + "/" + AthleteId);
}

export function updateCoachLog(payload, Id) {
  return axios.put("/node-api/server.js/coachAthleteLog/" + Id, payload);
}

export function postCoachLog(payload) {
  return axios.post("/node-api/server.js/coachAthleteLog", payload);
}

export function deleteCoachLog(Id) {
  return axios.delete("/node-api/server.js/coachAthleteLog/" + Id);
}
