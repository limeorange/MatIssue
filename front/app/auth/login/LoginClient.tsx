"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { axiosBase } from "@/app/api/axios";
import toast from "react-hot-toast";

import Logo from "@/app/components/header/Logo";
import Button from "@/app/components/UI/Button";
import LoadingModal from "@/app/components/UI/LoadingModal";

import {
  AuthChangeBox,
  AuthContainer,
  AuthFormWrapper,
  AuthNavBox,
  StyledInput,
  UnderLineLinkDiv,
} from "@/app/styles/auth/auth.style";
import Cookies from "js-cookie";
import { useSetRecoilState } from "recoil";
import { loginState } from "@/app/store/authAtom";

const LoginClient = () => {
  const [isLoading, setIsLoading] = useState(false);
  const setIsLoggedIn = useSetRecoilState(loginState);

  const { register, handleSubmit } = useForm<FieldValues>({
    defaultValues: {
      user_id: "",
      password: "",
    },
  });

  const router = useRouter();

  /** auth 폼 제출 핸들러 */
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    axiosBase
      .post("users/login", data)
      .then((res) => {
        setIsLoggedIn(true);
        const sessionId = res.data.session_id;
        Cookies.set("session-id", sessionId);
        router.back();
        toast.success("로그인 되었습니다.");
      })
      .catch((err) => {
        toast.error(
          "등록되지 않은 아이디거나 아이디 또는 비밀번호를 잘못 입력했습니다."
        );
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {}, []);

  return (
    <AuthContainer>
      {isLoading && <LoadingModal />}
      <AuthFormWrapper>
        <Logo />
        <form onSubmit={handleSubmit(onSubmit)}>
          <StyledInput
            id="user_id"
            type="text"
            disabled={isLoading}
            {...register("user_id", {
              required: true,
            })}
            placeholder="아이디를 입력하세요."
          />
          <StyledInput
            id="password"
            type="password"
            disabled={isLoading}
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
          <AuthNavBox>
            <div>로그인 유지</div>
            <button
              type="button"
              onClick={() => {
                router.push("/auth/find-id-password");
              }}
            >
              아이디•비밀번호 찾기
            </button>
          </AuthNavBox>
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
