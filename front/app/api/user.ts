import Cookies from "js-cookie";
import { axiosBase } from "../api/axios";

export default async function getCurrentUser() {
  const session_id = Cookies.get("session-id");

  if (session_id) {
    try {
      const response = await axiosBase.get(`users/me`);
      if (response.data === undefined) {
        return null;
      }
      return response.data;
    } catch (err: any) {
      Cookies.remove("session-id");
      return null;
    }
  } else {
    Cookies.remove("session-id");
    return null;
  }
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

export async function getUserFans(user_id: string) {
  try {
    const response = await axiosBase.get(`/users/${user_id}/fans`);
    const fansList = response.data["people"];
    return fansList;
  } catch (error) {
    console.log("error", error);
  }
}

export const getAllUsers = async (page: number, per_page: number) => {
  try {
    const response = await axiosBase.get(
      `users/?page=${page}&per_page=${per_page}`
    );
    return response.data.users;
  } catch (err: any) {
    return null;
  }
};
