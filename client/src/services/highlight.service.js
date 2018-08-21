import axios from "axios";

export const highlightUser = payload => {
  return axios.post("/node-api/server.js/highlights", payload);
};
export const unhighlightUser = (highlighterId, userId) => {
  return axios.delete("/node-api/server.js/highlights/delete/" + highlighterId + "/" + userId);
};

export const selectHighlightById = Id => {
  return axios.get("/node-api/server.js/highlights/highlighting/" + Id);
};
