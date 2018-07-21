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
    title: null,
    schoolId: null,
    shortBio: null
  };
  return axios.post("http://localhost:8080/node-api/server.js/api/coaches", data);
}
