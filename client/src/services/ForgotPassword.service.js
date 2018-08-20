import axios from "axios";

export function checkEmailPost(eMailObj) {
  const url = `/api/forgot-password`;
  const encodedUri = encodeURI(url);

  return axios.post(url, eMailObj);
}

export function verifyTokenGet(tokenId) {
  const url = `/api/forgot-password/${tokenId}`;
  const encodedUri = encodeURI(url);

  return axios.get(encodedUri);
}

export function updateUserPut(userData) {
  const url = `/api/forgot-password/${userData.TokenId}`;
  const encodedUri = encodeURI(url);

  return axios.put(encodedUri, userData);
}
