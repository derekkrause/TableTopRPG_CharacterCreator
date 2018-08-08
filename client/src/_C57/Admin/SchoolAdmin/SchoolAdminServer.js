import axios from "axios";

export const getSchools = PageIndex => {
  return axios.get("/node-api/server.js/schools/" + PageIndex + "/20");
};

export const getSchoolsById = Id => {
  return axios.get("/node-api/server.js/schools/" + Id);
};

export const deleteSchool = Id => {
  return axios.delete("/node-api/server.js/schools/" + Id);
};

export const updateSchool = (Id, data) => {
  return axios.put("/node-api/server.js/schools/" + Id, data);
};

export const addSchool = data => {
  return axios.post("/node-api/server.js/schools", data);
};
export const schoolSearch = (PageIndex, SearchTerm) => {
  return axios.get("/node-api/server.js/schools/search/" + PageIndex + "/10/?q=" + SearchTerm);
};
