// sabio example service

import axios from "axios";

const baseUrl = "/node-api/server.js/api/pogs";

export function getAll(pageIndex, pageSize) {
  return axios.get(`${baseUrl}?pageIndex=${pageIndex}&${pageSize}`);
}
export function search(searchString, pageIndex, pageSize) {
  return axios.get(`${baseUrl}/search/${pageIndex}/${pageSize}?searchString=${searchString}`);
}

export function getById(id) {
  return axios.get(`${baseUrl}/${id}`);
}

export function post(pog) {
  return axios.post(baseUrl, JSON.stringify(pog));
}

export function put(pog) {
  return axios.post(baseUrl + "/" + pog.id, JSON.stringify(pog));
}

export function del(id) {
  return axios.delete(baseUrl + "/" + id);
}
