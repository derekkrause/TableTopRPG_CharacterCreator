import axios from "axios";

const nodeBaseUrl = "/node-api/server.js";
const baseUrl = "/api";
const AWSUrl = "https://sabio-training.s3.us-west-2.amazonaws.com/C57/";

axios.defaults.withCredentials = true;

//------------GET------------------------

export function getAthleteById() {
  return axios.get("/api/athelete");
}

export function getCoaches() {
  return axios.get(nodeBaseUrl + "/coaches");
}

export function getSchools() {
  return axios.get(nodeBaseUrl + "/school");
}

export function getCurrentSchool(userId) {
  return axios.get(BaseUrl + "/");
}

export function getSportPositions() {
  return axios.get("/sportPositions");
}

export function getCurrentSportPosition(userId) {
  return axios.get("");
}

export function getSportLevels() {
  return axios.get("");
}

export function getCurrentSportLevel(userId) {
  return axios.get("");
}

export function getEventsByUserId(userId) {
  return axios.get(nodeBaseUrl + "/profile/events/" + userId);
}
export function getEventById(id) {
  return axios.get(baseUrl + "/events/" + id);
}

export function getBlogsByUserId() {
  return axios.get(baseUrl + "/blogs");
}

export function getMediaByUserId(userId) {
  return axios.get(nodeBaseUrl + "/media/user/" + userId);
}

// export function getPostsByUserId(userId) {
//   return axios.get("");
// }

//------------GET AWS Image--------------

export function getAWSImage(fileUrl) {
  return axios.get(nodeBaseUrl + "/s3image/?url=" + encodeURIComponent(fileUrl));
}

//-------------POST Cropped Image--------

export function postCroppedImage(payload) {
  return axios.post(nodeBaseUrl + "/media", payload);
}

//---------------Update Media---------------

export function updateMedia(userId, payload) {
  return axios.put(nodeBaseUrl + "/media/" + userId, payload);
}

//----------------Delete Media--------------

export function deleteMedia(mediaId) {
  return axios.delete(nodeBaseUrl + "/media/" + mediaId);
}

//-----------------POST-------------------

// export function postEvent(payload) {
//   return axios.post("");
// }

export function postMedia(payload) {
  return axios.post(nodeBaseUrl + "/media/", payload);
}

// export function postPost(payload) {
//   return axios.post("");
// }

//-----------------PUT--------------------

export function updateAvatarById(userId, payload) {
  return axios.put(nodeBaseUrl + "/profile/" + userId, payload);
}

// export function updateSchool(userId, payload) {
//   return axios.put("");
// }

// export function updateSportPosition(userId, payload) {
//   return axios.put("");
// }

// export function updateSportLevel(userId, payload) {
//   return axios.put("");
// }

// export function updateEventById(eventId, payload) {
//   return axios.put("");
// }

// export function updateMediaById(mediaId, payload) {
//   return axios.put("");
// }

// export function updatePostById(postId, payload) {
//   return axios.put("");
// }
