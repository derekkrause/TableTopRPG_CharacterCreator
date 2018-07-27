import axios from "axios";

const nodeBaseUrl = "/node-api/server.js/api";

const BaseUrl;;


axios.defaults.withCredentials = true;

//------------GET------------------------

export function getGradYears() {
    return axios.get("");
}

export function getSportPositions() {
  return axios.get("");
}

export function getSportLevels() {
  return axios.get("");
}

export function getSchools() {
    return axios.get(nodeBaseUrl + "/schools");
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