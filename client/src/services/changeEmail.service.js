import axios from "axios";

const nodeBaseUrl = "http://localhost:54810/api";

export function getUserById(id) {
  return axios.get(nodeBaseUrl + "/user/" + id);
}
