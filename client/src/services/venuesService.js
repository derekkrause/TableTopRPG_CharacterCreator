import axios from "axios";

const nodeBaseUrl = "/node-api/server.js";

// ------------ :: GET :: ALL VENUES --------------- //

export function getAllVenues() {
  return axios.get(nodeBaseUrl + "/venues");
}

// ------------- :: POST :: VENUE ---------------- //

export function createVenue(data) {
  return axios.post(nodeBaseUrl + "/venues", data);
}

// ------------- :: GET :: SEARCH VENUE BY ADMIN ------------- //

export function getVenueBySearch(pageIndex, filterText) {
  return axios.get(nodeBaseUrl + "/venues/search/" + pageIndex + "/5/?q=" + filterText);
}

// ------------- :: GET :: SEARCH VENUE BY USER -------------- //

export function getVenueBySearchByUser(searchString, radius, pageIndex, pageSize, lat, lon) {
  return axios.get(
    nodeBaseUrl +
      "/venues/search/?q=" +
      encodeURIComponent(searchString) +
      "&pageIndex=" +
      pageIndex +
      "&pageSize=" +
      pageSize +
      "&radius=" +
      (radius || "") +
      "&lat=" +
      (lat || "") +
      "&lon=" +
      (lon || "")
  );
}

// ------------- :: PUT :: EDIT VENUE --------------- //

export function updateVenue(data) {
  return axios.put(nodeBaseUrl + "/venues/" + data.id, data);
}

// ------------------------- :: GET :: EDIT VENUE BY ID -------------------------- //

export function getById(id) {
  return axios.get("/node-api/server.js/venues/" + id);
}
