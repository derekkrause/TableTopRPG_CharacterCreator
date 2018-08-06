import axios from "axios";

export function getFeed() {
  return axios.get("/api/blogs");
}

export function postFeed(payload) {
  return axios.post("/api/blogs", payload);
}

export function putUpdateFeed(payload, blogId) {
  return axios.put("/api/blogs/" + blogId, payload);
}

export function deleteFeed(blogId) {
  return axios.delete("/api/blogs/" + blogId);
}
