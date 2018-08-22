import axios from "axios";

export function getSchoolTrend() {
  return axios.get("api/schooltrend");
}
