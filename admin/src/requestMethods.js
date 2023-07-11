import axios from "axios";

const BASE_URL = "http://localhost:8000/backend/";
//const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzODQ5YzNkZTEzM2FhZDA4Mzg5ZWVhOCIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE2Njk2MzU0MzQsImV4cCI6MTY2OTg5NDYzNH0.cwLwnlEfyumdfTCOGQlyEKPVco4b1v-MSnOr4nKojP8"

const TOKEN = JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user)
  .currentUser.accessToken;
console.log(TOKEN);
console.log(localStorage.getItem("persist:root"));

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: { token: `Bearer ${TOKEN}` },
});
