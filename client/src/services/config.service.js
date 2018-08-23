import axios from "axios";

const nodeBaseUrl = "/node-api/server.js";

export function getAllConfig() {
  return axios.get(nodeBaseUrl + "/config");
}

export function getConfigById(id) {
  return axios.get(nodeBaseUrl + "/config/" + id);
}

export function getConfigByKey(key) {
  return axios.get(nodeBaseUrl + "/config/" + key);
}

export function getConfigBySearch(searchString, pageIndex, PageSize) {
  return axios.get(
    nodeBaseUrl +
      "/config/search/?q=" +
      encodeURIComponent(searchString) +
      "&pageIndex=" +
      pageIndex +
      "&pageSize=" +
      pageSize
  );
}

export function CreateConfig(data) {
  return axios.post(nodeBaseUrl + "/config", data);
}

export function updateConfig(data) {
  return axios.put(nodeBaseUrl + "/config/" + data.id, data);
}

export function deleteConfig(id) {
  return axios.delete(nodeBaseUrl + "/config/" + id);
}
