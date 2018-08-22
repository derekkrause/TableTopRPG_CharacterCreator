import axios from "axios";

export function getAllIcons() {
  return axios.get("/node-api/server.js/icon");
}
