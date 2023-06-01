"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { axiosBase } from "@/app/api/axios";
import toast from "react-hot-toast";
import Cookies from "js-cookie";

import Logo from "@/app/components/header/Logo";
import Button from "@/app/components/UI/Button";

import {
  AuthChangeBox,
  AuthContainer,
  AuthFormWrapper,
  StyledInput,
  UnderLineLinkDiv,
} from "@/app/styles/auth/auth.style";

const LoginClient = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      user_id: "",
      password: "",
    },
  });

  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  /** auth 폼 제출 핸들러 */
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    console.log(data);
    axiosBase
      .post("users/login", data)
      .then((res) => {
        console.log(res.data);
        Cookies.set("auth", res.data.session_id, { expires: 7 });
        router.back();
      })
      .catch((err) => toast.error("잘못된 요청입니다."))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {}, []);

  return (
    <AuthContainer>
      <AuthFormWrapper>
        <Logo />
        <form onSubmit={handleSubmit(onSubmit)}>
          <StyledInput
            id="user_id"
            type="text"
            disabled={isLoading}
            errors={errors}
            {...register("user_id", {
              required: true,
            })}
            placeholder="아이디를 입력하세요."
          />
          <StyledInput
            id="password"
            type="password"
            disabled={isLoading}
            errors={errors}
            {...register("password", {
              required: true,
            })}
            placeholder="비밀번호를 입력하세요."
          />
          <div>
            <Button disabled={isLoading} fullWidth isBgColor type="submit">
              로그인
            </Button>
          </div>
        </form>
        <AuthChangeBox>
          <div>처음이신가요?</div>
          <UnderLineLinkDiv onClick={() => router.push("/auth/signup")}>
            회원가입하기
          </UnderLineLinkDiv>
        </AuthChangeBox>
      </AuthFormWrapper>
    </AuthContainer>
  );
};

export default LoginClient;
