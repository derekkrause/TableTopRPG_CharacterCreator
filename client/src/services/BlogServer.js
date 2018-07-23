import axios from "axios";

export function getBlog() {
  return axios.get("/api/blogs");
}

export function postBlog(payload) {
  return axios.post("/api/blogs", payload);
}

export function putUpdateBlog(payload, blogId) {
  return axios.put("/blogId", payload, blogId);
}

export function deleteBlog(blogId) {
  return axios.delete("/blogId", blogId);
}
