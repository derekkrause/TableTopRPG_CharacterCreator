import axios from "axios";

export function getBlog() {
  return axios.get("/api/blogs");
}
