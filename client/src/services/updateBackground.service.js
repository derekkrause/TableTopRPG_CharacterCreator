import axios from "axios";

export function updateBackground(payload) {
  return axios.put("/api/users/update_background", payload);
}
