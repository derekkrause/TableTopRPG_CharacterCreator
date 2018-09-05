import axios from "axios";

export function getCoach() {
  return axios.get("node-api/server.js/api/coaches");
}

export function getCoachTrend() {
  return axios.get("node-api/server.js/coaches/trend");
}

export function getCoachById(userId) {
  return axios.get("api/coaches/" + userId);
}

export function updateCoachProfile(userData) {
  return axios.put("api/coaches/" + userData.userId, userData);
}

export function schoolSearch(searchString, city, state) {
  return axios.get("api/schools/search/?q=" + searchString + "&city=" + city + "&state=" + state);
}

export function getCoachBySearch(searchString, pageIndex, pageSize) {
  return axios.get(`api/coachsearch/${pageIndex}/${pageSize}?q=${encodeURIComponent(searchString) || ""}`);
}
