import axios from "axios";

//REGISTER USER
export function registerUser(userData) {
  return axios.post("/api/users", userData);
}

//CONFIRM REGISTRATION
export function confirmUser(tokenId) {
  return axios.put("/api/users/confirm", tokenId);
}

//REQUEST NEW CONFIRMATION
export function newEmailConfirm(email) {
  return axios.post("/api/users/new_email_request", email);
}

//COACH TABLE INSERT USER
export function registerCoach(userId) {
  const data = { userId: userId };
  return axios.post("/api/coaches", data);
}

//ATHLETE TABLE INSERT USER
export function registerAthlete(userId) {
  const data = { userId: userId };
  return axios.post("/api/athletes", data);
}

//ADVOCATE TABLE INSERT USER
export function registerAdvocate(userId) {
  const data = { userId: userId };
  return axios.post("/api/advocates", data);
}

//USER LOGIN
export function userLogin(email, password) {
  const data = { email, password };
  return axios.post("/api/users/login", data);
}

//USER LOGOUT
export function userLogout() {
  return axios.get("/api/users/logout");
}

//LOGIN STATUS
export function getCurrentUser() {
  return axios.get("/api/users/current");
}

//GET USER BY ID
export function getUserById(id) {
  return axios.get("/api/users/" + id);
}

//USER GET ALL
export function getAll(pageIndex, pageSize) {
  return axios.get("api/users/" + pageIndex + "/" + pageSize);
}
