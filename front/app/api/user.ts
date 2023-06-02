import { axiosBase } from "../api/axios";
import Cookies from "js-cookie";

export default async function getCurrentUser() {
  try {
    const id = Cookies.get("auth");

    if (!id) {
      return null;
    }

    const response = await axiosBase.post(`users/me`, null, {
      params: {
        id,
      },
    });

    return response.data;
  } catch (err: any) {
    return null;
  }
  // if (id) {
  //   console.log(id);
  //   try {
  //     const response = await axiosBase.post(`users/me`, null, {
  //       params: {
  //         id,
  //       },
  //     });
  //     console.log(response);
  //     return response.data;
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
}
