import axios from "axios";

const nodeBaseUrl = "/node-api/server.js/api";

const BaseUrl;;


axios.defaults.withCredentials = true;

//------------GET------------------------

export function getSchools() {
  return axios.get(nodeBaseUrl + "/schools");
}

export function getCurrentSchool(userId) {
  return axios.get(BaseUrl + "/");
}

export function getSportPositions() {
  return axios.get("/sportPositions");
}

export function getCurrentSportPosition(userId) {
  return axios.get("");
}

export function getSportLevels() {
  return axios.get("");
}

export function getCurrentSportLevel(userId) {
  return axios.get("");
}

export function getEventsByUserId(userId) {
  return axios.get("");
}

export function getMediaByUserId(userId) {
  return axios.get("");
}

export function getPostsByUserId(userId) {
  return axios.get("");
}

//-----------------POST-------------------

export function postEvent(payload) {
  return axios.post("");
}

export function postMedia(payload) {
  return axios.post("");
}

export function postPost(payload) {
  return axios.post("");
}

//-----------------PUT--------------------

export function updateSchool(userId, payload) {
  return axios.put("");
}

export function updateSportPosition(userId, payload) {
  return axios.put("");
}

export function updateSportLevel(userId, payload) {
  return axios.put("");
}

export function updateEventById(eventId, payload) {
  return axios.put("");
}

export function updateMediaById(mediaId, payload) {
  return axios.put("");
}

export function updatePostById(postId, payload) {
  return axios.put("");
}
