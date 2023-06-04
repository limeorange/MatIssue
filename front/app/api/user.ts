import { axiosBase } from "../api/axios";

export default async function getCurrentUser() {
  try {
    const response = await axiosBase.get(`users/me`);
    console.log(response.data);
    return response.data;
  } catch (err: any) {
    console.log(err);
    return null;
  }
}
