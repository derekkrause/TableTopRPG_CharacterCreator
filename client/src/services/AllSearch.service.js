// import Axios from "axios";
import axios from "axios";

export function allSearchGet(searchQuery) {
  const url = `/api/allsearch?q=${searchQuery}`;
  const encodedUri = encodeURI(url);

  return axios.get(encodedUri);
}

export function allSearchPagedGet(pageIndex, pageSize, searchQuery) {
  const url = `/api/allsearch/paged/${pageIndex}/${pageSize}?q=${searchQuery}`;
  const encodedUri = encodeURI(url);

  return axios.get(encodedUri);
}
