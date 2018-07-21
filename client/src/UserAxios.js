import axios from "axios";
const userAPI = "/api/users";

//REGISTER USER
export function register(userData) {
  return axios.post(userAPI, userData);
}
