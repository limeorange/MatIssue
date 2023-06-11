import Cookies from "js-cookie";
import { axiosBase } from "../api/axios";

export async function getCurrentUser() {
  const session_id = Cookies.get("session_id");

  if (session_id) {
    try {
      const response = await axiosBase.get(`users/me`);
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

export async function getFollowStatus(user_id: string) {
  try {
    const response = await axiosBase.get(
      `/users/subscription/status/${user_id}`
    );
    const followStatus = response.data["is_subscribed"];
    return followStatus;
  } catch (error) {
    console.log("error", error);
  }
}
