import axios from "axios";

// const baseUrl = "http://localhost:54810/api/event";

export function getEventById(id) {
  // return axios.get(`${baseUrl}/${id}`);
  return axios.get(`/api/events/${id}`);
}

export function getEventListPaged(pageIndex, pageSize) {
  return axios.get(`/api/events/${pageIndex}/${pageSize}`);
}

export function getEventsListGet() {
  return axios.get(`/api/events`);
}

export function getEventByIdWithUser(id) {
  return axios.get(`/api/events/withuser/${id}`);
}

export function createEventPost(dataObj) {
  return axios.post(`/api/events`, dataObj);
}

export function editEventPut(id, dataObj) {
  return axios.put(`/api/events/${id}`, dataObj);
}
