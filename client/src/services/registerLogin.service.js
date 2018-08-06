import axios from "axios";

//REGISTER USER
export function registerUser(userData) {
  return axios.post("/api/users", userData);
}

//COACH TABLE INSERT USER
export function registerCoach(userId) {
  const data = {
    userId: userId,
    title: null,
    schoolId: null,
    shortBio: null
  };
  return axios.post("/node-api/server.js/api/coaches", data);
}

//ATHLETE TABLE INSERT USER
export function registerAthlete(userId) {
  const data = {
    userId: userId,
    dob: null,
    birthPlace: "",
    schoolId: null,
    classYearId: null,
    highSChoolGraduationYear: null,
    shortBio: "",
    residencyState: ""
  };
  return axios.post("/api/athletes", data);
}

//USER LOGIN
export function userLogin(email, password) {
  const data = { email, password };
  return axios.post("/api/users/login", data);
}
<<<<<<< HEAD
=======

//LOGIN STATUS
export function getCurrentUser() {
  return axios.get("/api/users/current");
}
>>>>>>> origin/master
