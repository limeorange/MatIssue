import { useState } from "react";
import { axiosBase } from "../api/axios";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

export type SignupValues = {
  user_id: string;
  username: string;
  email: string;
  password: string;
  password_confirm?: string;
  img: string;
  year: string;
  month: string;
  day: string;
};

const useSignup = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const signup = async (data: SignupValues) => {
    setIsLoading(true);
    const birthDate = data.year + "-" + data.month + "-" + data.day;
    const userData = {
      user_id: data.user_id,
      username: data.username,
      email: data.email,
      password: data.password,
      img: "https://eliceproject.s3.ap-northeast-2.amazonaws.com/dongs.png",
      birth_date: birthDate,
    };

    axiosBase
      .post("users/", userData)
      .then((res) => {
        router.replace("/auth/signup/complete");
      })
      .catch((err) => toast.error(err.response.data.detail))
      .finally(() => setIsLoading(false));
  };

  return { isLoading, signup };
};

export default useSignup;
