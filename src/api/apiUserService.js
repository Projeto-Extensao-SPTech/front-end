import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:8081",
});

export function setHeaderParam(param, value) {
  api.defaults.headers.common[param] = value;
}