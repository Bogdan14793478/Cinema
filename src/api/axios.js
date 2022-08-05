import axios from "axios";

const baseURL = `${process.env.REACT_APP_URL_SERVER_ADRESS}`;

export const axiosInstance = axios.create({
  baseURL,
  responseType: "json",
});

const myToken = "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";

axiosInstance.interceptors.request.use((request) => {
  if (myToken != null && request.headers) {
    request.headers.Authorization = `token ${myToken}`;
    return request;
  }
  return request;
});
