import axios from "axios";

export const getAllFollowsById = id => {
  return axios.get("/node-api/server.js/follower/follows/" + id);
};
