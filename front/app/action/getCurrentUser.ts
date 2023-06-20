import { axiosBase } from "../api/axios";
import { cookies } from "next/headers";

/**  서버 사이드에서 유저정보 가져오는 fetch 함수 (cookies - next/headers는 서버 컴포넌트에서만 동작)*/
export async function getCurrentUserSS() {
  const cookieStore = cookies();
  const session_id = cookieStore.get("session-id")?.value;

  if (session_id) {
    try {
      const response = await axiosBase.get(`users/me`, {
        headers: {
          Cookie: `session-id=${session_id}`,
        },
      });
      if (response.data === undefined) {
        return null;
      }
      return response.data;
    } catch (err: any) {
      return null;
    }
  }

  return null;
}
