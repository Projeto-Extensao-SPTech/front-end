import axios from "axios";

export const api = axios.create({
  // baseURL: "http://abrigodogfeliz.qzz.io:80/api/"
  baseURL: "http://localhost:5173"
});

export function setHeaderParam(param, value) {
  api.defaults.headers.common[param] = value;
}