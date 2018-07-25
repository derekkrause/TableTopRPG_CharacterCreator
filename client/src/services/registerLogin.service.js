import axios from "axios";

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
  return axios.post("/node-api/server.js/api/coaches", data);
}

//USER LOGIN
export function userLogin(email, password) {
  const data = { email, password };
  return axios.post("/api/users/login", data);
}
