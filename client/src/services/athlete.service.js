import axios from "axios";

export function getAthleteTrend(sportType) {
  return axios.get("api/athletetrend?q=" + sportType);
}
