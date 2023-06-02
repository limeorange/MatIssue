import { axiosBase } from "../api/axios";
import Cookies from "js-cookie";

export default async function getCurrentUser() {
  // const id = Cookies.get("auth");
  // if (id) {
  //   try {
  //     const response = await axiosBase.post("users/me", id);
  //     console.log(response);
  //     return response.data;
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  return null;
}
