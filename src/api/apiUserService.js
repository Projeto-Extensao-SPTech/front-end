import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:7000",
});

export function setHeaderParam(param, value) {
  api.defaults.headers.common[param] = value;
}
