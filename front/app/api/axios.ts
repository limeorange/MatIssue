import axios from "axios";

axios.defaults.withCredentials = true;

// Axios 인스턴스 생성
export const axiosBase = axios.create({
  baseURL: "https://matissue.onrender.com/api/",
  headers: {
    "Content-Type": "application/json",
  },
});
