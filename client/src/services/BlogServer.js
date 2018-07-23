import axios from "axios";

export function getBlog() {
  return axios.get("/api/blogs");
}

export function postBlog(payload) {
  return axios.post("/api/blogs", payload);
}

export function putUpdateBlog(payload, blogId) {
  return axios.put("/api/blogs/" + blogId, payload);
}

export function deleteBlog(blogId) {
  return axios.delete("/api/blogs/" + blogId);
}
