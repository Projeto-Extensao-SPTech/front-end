import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:7000",
  headers: {
    "Content-Type": "application/json",
    "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJwaG9uZSI6IigxMSkgOTEyMzQtNTY3OCIsImRvY3VtZW50IjoiMTIzNDU2Nzg5MDEiLCJuYW1lIjoiTHVjYXMgQWllbGxvIiwicmVjZWl2ZV9ub3RpZmljYXRpb25zIjp0cnVlLCJpZCI6MSwibWFpbF9hZGRyZXNzIjoibHVjYXNAZW1haWwuY29tIiwic3ViIjoibHVjYXNAZW1haWwuY29tIiwiaWF0IjoxNzYzNjc3Mzg5LCJleHAiOjE3NjM2ODA5ODl9.Ka8SoqaN4kjjm1IUVm2WrQ4oYNBzBW89zdRogANmjoA"
  },
});

export function setAuthToken(token) {
  api.interceptors.request.use((config) => {
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });
}

export default api;
