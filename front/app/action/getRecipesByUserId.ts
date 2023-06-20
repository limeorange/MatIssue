import { axiosBase } from "../api/axios";
import { cookies } from "next/headers";

/**  서버 사이드에서 유저레시피 가져오는 fetch 함수 (cookies - next/headers는 서버 컴포넌트에서만 동작)*/
export async function getRecipesByUserIdSS() {
  const cookieStore = cookies();
  const session_id = cookieStore.get("session-id")?.value;

  if (session_id) {
    try {
      const response = await axiosBase.get(`/recipes/user`, {
        headers: {
          Cookie: `session-id=${session_id}`,
        },
      });
      if (!response.data) {
        return [];
      }
      return response.data.recipes;
    } catch (err: any) {
      return [];
    }
  }
}
