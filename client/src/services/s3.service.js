import axios from "axios";

export function putPresigedUrl() {
  return axios.put("api/s3files");
}

export function putUploadFile(presignedUrl, file, options) {
  return axios.put(presignedUrl, file, options);
}
