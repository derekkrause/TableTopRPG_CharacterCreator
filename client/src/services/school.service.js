import axios from "axios";

const nodeBaseUrl = "/node-api/server.js";

export function getSchoolTrend() {
  return axios.get("api/schooltrend");
}

export function getSchoolBySearch(searchString, pageIndex, pageSize, lat, lon, radius) {
  return axios.get(
    `api/schoolsearch/${pageIndex}/${pageSize}?q=${encodeURIComponent(searchString) || ""}&lat=${lat || ""}&lon=${lon ||
      ""}&radius=${radius || ""}`
  );
}

export function updateSchools(payload, schoolId) {
  return axios.put(nodeBaseUrl + "/schools/" + schoolId, payload);
}
