import axios from "axios";

export const AthleteSearchAutoComplete = searchTerm => {
  return axios.get("/node-api/server.js/athleteSearch/search/?q=" + searchTerm);
};
