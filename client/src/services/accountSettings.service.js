import axios from "axios";

const nodeBaseUrl = "/node-api/server.js";

export function updateCurrentSportId(data) {
  return axios.put(nodeBaseUrl + "/users/" + data.id, data);
}

export function getCurrentNotificationById(id) {
  return axios.get(nodeBaseUrl + "/notificationsetting/" + id);
}

export function updateNotificationSetting(data) {
  return axios.put(nodeBaseUrl + "/notificationsetting/" + data.id, data);
}

export function changePassword(data) {
  return axios.put(nodeBaseUrl + "/changepassword/" + data.id, data);
}
