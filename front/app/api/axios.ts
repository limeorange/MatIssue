import axios from "axios";

axios.defaults.withCredentials = true;

// Axios 인스턴스 생성
export const axiosBase = axios.create({
  // baseURL: "https://matissue.onrender.com/api/",
  // baseURL: "https://testserver-h4i7.onrender.com/api/",
  baseURL: "https://matissue-1jim.onrender.com/api/",
  // baseURL: "https://matissue.p-e.kr/api",
  headers: {
    "Content-Type": "application/json",
  },
});
