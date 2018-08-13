import axios from "axios";

export function getEventTypeById(id) {
  return axios.get(`/api/eventtype/${id}`);
}

export function getEventTypes() {
  return axios.get(`/api/eventtype`);
}

export function createEventTypePost(dataObj) {
  return axios.post(`/api/eventtype`, dataObj);
}

export function updateEventTypePut(dataObj) {
  return axios.put(`/api/eventtype/${dataObj.id}`, dataObj);
}

export function deleteEventTypeByEventIdDelete(id) {
  return axios.delete(`/api/eventtype/event/${id}`);
}
