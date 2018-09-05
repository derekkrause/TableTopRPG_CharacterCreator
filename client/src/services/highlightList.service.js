import axios from "axios";

export const getAllHighlightListById = id => {
  return axios.get("/node-api/server.js/highlightList/" + id);
};
