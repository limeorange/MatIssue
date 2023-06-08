import { axiosBase } from "../api/axios";
import { cookies } from "next/headers";

export async function getRecipesByUserIdSS() {
  const cookieStore = cookies();
  const session_id = cookieStore.get("session_id")?.value;

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
      return response.data;
    } catch (err: any) {
      return [];
    }
  }
}
