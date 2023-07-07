import Cookies from "js-cookie";
import { axiosBase } from "./axios";
import getCurrentUser from "./user";
import { QueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

const queryClient = new QueryClient();

export const login = async (
  data: { user_id: string; password: string },
  callback: () => void
) => {
  try {
    const response = await axiosBase.post("users/login", data);
    const sessionId = response.data.session_id;
    Cookies.set("session-id", sessionId);

    const currentUser = await getCurrentUser();
    queryClient.setQueryData(["currentUser"], currentUser);

    callback();
    toast.success("로그인 되었습니다.");
  } catch (err: any) {
    const errorMessage = err?.response.data.detail;
    toast.error(
      errorMessage
        ? errorMessage
        : "등록되지 않은 아이디거나 아이디 또는 비밀번호를 잘못 입력했습니다."
    );
  }
};
