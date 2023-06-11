import Cookies from "js-cookie";
import { axiosBase } from "../api/axios";

export default async function getCurrentUser() {
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

export const getAllUsers = async (page: number, per_page: number) => {
  try {
    const response = await axiosBase.get("users", { data: { page, per_page } });
    return response.data;
  } catch (err: any) {
    return null;
  }
};
