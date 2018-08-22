import axios from "axios";

export function postLike(payload) {
  return axios.post("node-api/server.js/likes", payload);
}

export function getLikeByPostId(postId) {
  return axios.get("node-api/server.js/likes/posts/" + postId);
}

export function deleteLike(id) {
  return axios.delete("node-api/server.js/likes/" + id);
}
