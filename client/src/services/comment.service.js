import axios from "axios";
//import { node } from "../../node_modules/@types/prop-types";

const nodeBaseUrl = "/node-api/server.js";

axios.defaults.withCredentials = true;

export function getCommentById(id) {
  return axios.get(nodeBaseUrl + "/comments/" + id);
}

export function getCommentsByPostId(postId) {
  return axios.get(nodeBaseUrl + "/comments/posts/" + postId);
}

export function getCommentsByEventId(eventId) {
  return axios.get(nodeBaseUrl + "/comments/events/" + eventId);
}

export function getCommentsByMediaId(mediaId) {
  return axios.get(nodeBaseUrl + "/comments/media/" + mediaId);
}

export function postComment(payload) {
  return axios.post(nodeBaseUrl + "/comments/", payload);
}

export function editComment(payload) {
  return axios.put(nodeBaseUrl + "/comments/" + payload.id, payload);
}

export function deleteComment(commentId) {
  return axios.delete(nodeBaseUrl + "/comments/" + commentId);
}
