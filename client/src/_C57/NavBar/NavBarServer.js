import axios from "axios";

const nodeBaseUrl = "/node-api/server.js/api";

axios.defaults.withCredentials = true;

//------------GET------------------------

export function getGradYears() {
  return axios.get("");
}

export function getSportPositions() {
  return axios.get("/sportpositions");
}

export function getSportLevels() {
  return axios.get("");
}

export function getSchools() {
  return axios.get(nodeBaseUrl + "/school");
}

export function getEventTypes() {
  return axios.get("");
}

export function getVenueTypes() {
  return axios.get("");
}

export function getArticleTypes() {
  return axios.get("");
}

export function getArticleTags() {
  return axios.get("");
}
