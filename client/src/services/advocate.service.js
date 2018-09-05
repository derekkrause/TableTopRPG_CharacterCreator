import axios from "axios";

export function getAdvoListByAthleteId(athleteId) {
  return axios.get("api/advocate/advoathlete/" + athleteId);
}
