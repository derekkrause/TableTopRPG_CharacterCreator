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

export function deleteEventDelete(id) {
  return axios.get(`/api/events/${id}`);
}

export function searchEventsGet(searchTerms) {
  const url = `/api/events/search?q=${searchTerms}`;
  const encodedUri = encodeURI(url);

  return axios.get(encodedUri);
}

export function searchEventsWithFiltersGet(
  searchTerms,
  searchState,
  searchEventType,
  searchStartDate,
  searchEndDate,
  searchDistance
) {
  const url = `/api/events/searchfilters?q=${searchTerms}&s=${searchState}&t=${searchEventType}&u=${searchStartDate}&v=${searchEndDate}&w=${searchDistance}`;
  const encodedUri = encodeURI(url);

  return axios.get(encodedUri);
}

export function searchEventsPagedWithFiltersGet(
  pageIndex,
  pageSize,
  searchTerms,
  searchState,
  searchEventType,
  searchStartDate,
  searchEndDate,
  searchDistance
) {
  const url = `/api/events/searchfilters/${pageIndex}/${pageSize}?q=${searchTerms}&st=${searchState}&t=${searchEventType}&sd=${searchStartDate}&ed=${searchEndDate}&sdist=${searchDistance}`;
  const encodedUri = encodeURI(url);

  return axios.get(encodedUri);
}

export function getUpcoming() {
  return axios.get("/api/events/upcoming");
}
