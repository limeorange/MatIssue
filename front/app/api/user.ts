import Cookies from "js-cookie";
import { axiosBase } from "../api/axios";

export default async function getCurrentUser() {
  const sessionId = Cookies.get("session-id");

  if (sessionId) {
    try {
      const response = await axiosBase.get(`users/me`);
      return response.data;
    } catch (err: any) {
      Cookies.remove("session-id");
      alert("세션이 만료되었습니다. 다시 로그인해주세요.");
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

export async function getUserFans(user_id: string) {
  try {
    const response = await axiosBase.get(`/users/${user_id}/fans`);
    const fansList = response.data["people"];
    return fansList;
  } catch (error) {
    console.log("error", error);
  }
}

export async function getUserSubscriptions(user_id: string) {
  try {
    const response = await axiosBase.get(`/users/${user_id}/subscriptions`);
    const subscriptionsList = response.data["people"];
    return subscriptionsList;
  } catch (error) {
    console.log("error", error);
  }
}

export async function getChefByUserId(user_id: string) {
  try {
    const response = await axiosBase.get(`/users/${user_id}`);
    if (response.data === undefined) {
      return [];
    }
    return response.data;
  } catch (error) {
    console.log(error);
    return [];
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
