import axios from "axios";
// const userAPI = "/api/users";

//REGISTER USER
export function registerUser(userData) {
  return axios.post("/api/users", userData);
}

//REGISTER USER FOR COACH TABLE
export function registerCoach(userId) {
  const data = {
    userId: userId,
    title: "",
    schoolId: "",
    shortBio: ""
  };
  return axios.post("/node-api/server.js/api/coaches", data);
}
