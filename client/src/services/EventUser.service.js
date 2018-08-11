import axios from "axios";

// const baseUrl = "http://localhost:54810/api/event";

export function createEventUserPost(dataObj) {
  return axios.post(`/api/eventusers`, dataObj);
}

export function getEventUsersListGet() {
  return axios.get(`/api/eventusers`);
}

export function getEventUsersListByEventIdGet(eventId) {
  return axios.get(`/api/eventusers/event/${eventId}`);
}

export function deleteEventUserByEventIdUserIdDelete(eventUserObj) {
  return axios.delete(`/api/eventusers/event/${eventUserObj.EventId}/${eventUserObj.UserId}`);
}

export function getUserInfoByIdGet(userId) {
  return axios.get(`/api/users/${userId}`);
}

export function getEventAttendeesListGet(eventId) {
  return axios.get(`/api/eventusers/attendees/${eventId}`);
}
