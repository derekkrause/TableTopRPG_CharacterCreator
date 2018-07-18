// sabio example service

import axios from "axios";

export function getDotNet() {
  return axios.get("/api/test/dotnet");
}

export function getNode() {
  return axios.get("/node-api/server.js/api/pogs?pageSize=1");
}
