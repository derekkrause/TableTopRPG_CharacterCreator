import axios from "axios";

export const followUser = payload => {
  return axios.post("/node-api/server.js/follow", payload);
};
export const unfollowUser = (followerId, userId) => {
  return axios.delete("/node-api/server.js/follow/delete/" + followerId + "/" + userId);
};

export const selectFollowingById = Id => {
  return axios.get("/node-api/server.js/follow/following/" + Id);
};
