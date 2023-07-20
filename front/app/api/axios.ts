import axios from "axios";
import { toast } from "react-hot-toast";

axios.defaults.withCredentials = true;

// Axios 인스턴스 생성
export const axiosBase = axios.create({
  // baseURL: "https://matissue.onrender.com/api/",
  // baseURL: "https://testserver-h4i7.onrender.com/api/",
  // baseURL: "https://matissue-1jim.onrender.com/api/",
  // baseURL: "https://matissue.p-e.kr/api",
  // baseURL: "https://mat-issue.onrender.com/api/",
  // baseURL: "https://kdt-sw-4-team10.elicecoding.com/api/",
  baseURL: "https://matissue.n-e.kr",
  headers: {
    "Content-Type": "application/json",
  },
});

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    // 에러 처리 로직
    if (error.response) {
      return Promise.reject(error);
    } else if (error.request) {
      toast.error("요청 전송 오류: 서버에 요청을 보낼 수 없습니다.");
    } else {
      // 에러가 발생한 요청 준비 과정에서 예외가 발생한 경우
      toast.error("요청 준비 오류: 요청을 처리하는 도중 오류가 발생했습니다.");
    }

    return Promise.reject(error); // Promise를 사용하여 에러를 다음 핸들러로 전달
  }
);
