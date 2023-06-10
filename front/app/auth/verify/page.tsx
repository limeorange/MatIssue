"use client";

import { axiosBase } from "@/app/api/axios";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { toast } from "react-hot-toast";

const VerifyEmail = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const verifyCode = searchParams?.get("code");

  useEffect(() => {
    if (verifyCode) {
      axiosBase
        .get(`email/verify?code=${verifyCode}`)
        .then((res) => {
          toast.success("가입이 완료되었습니다.");
        })
        .catch((err: any) => {
          toast.error(err.reponse.data.detail);
        })
        .finally(() => router.replace("/"));
    }
  }, []);

  return <></>;
};

export default VerifyEmail;
