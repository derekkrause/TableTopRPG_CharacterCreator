import axios from "axios";

const nodeBaseUrl = "/node-api/server.js";

axios.defaults.withCredentials = true;

export function dismissAllNotifications(userId) {
  return axios.put(nodeBaseUrl + "/notifications/" + userId);
}

export function dismissFollowNotification(userId, followerId) {
  return axios.put(nodeBaseUrl + "/follow/" + userId + "/" + followerId);
}

export function dismissLikeNotification(id) {
  return axios.put(nodeBaseUrl + "/likes/" + id);
}

export function getUnreadMessages(userId) {
  return axios.get(nodeBaseUrl + "/notifications/messages/" + userId);
}

export function dismissMessageNotifications(userId) {
  return axios.put(nodeBaseUrl + "/notifications/messages/" + userId);
}
