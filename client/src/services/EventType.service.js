import axios from "axios";

export function getEventTypeById(id) {
  return axios.get(`/api/eventtype/${id}`);
}
