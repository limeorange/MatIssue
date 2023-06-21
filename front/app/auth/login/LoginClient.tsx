"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
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
import styled from "styled-components";
import { useQueryClient } from "@tanstack/react-query";
import getCurrentUser from "@/app/api/user";
import { useRecoilValue } from "recoil";
import darkModeAtom from "@/app/store/darkModeAtom";

const LoginClient = () => {
  const [isLoading, setIsLoading] = useState(false);
  const isDarkMode = useRecoilValue(darkModeAtom);

  const client = useQueryClient();

  const { register, handleSubmit } = useForm<FieldValues>({
    defaultValues: {
      user_id: "",
      password: "",
    },
  });

  const router = useRouter();

  /** auth 폼 제출 핸들러 */
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    try {
      const response = await axiosBase.post("users/login", data);
      const sessionId = response.data.session_id;
      Cookies.set("session-id", sessionId);

      const currentUser = await getCurrentUser();
      client.setQueryData(["currentUser"], currentUser);

      router.back();
      toast.success("로그인 되었습니다.");
    } catch (err: any) {
      const errorMessage = err?.response.data.detail;
      toast.error(
        errorMessage
          ? errorMessage
          : "등록되지 않은 아이디거나 아이디 또는 비밀번호를 잘못 입력했습니다."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContainer isDarkMode={isDarkMode}>
      {isLoading && <LoadingModal />}
      <LoginAuthContainer>
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
            <button
              type="button"
              onClick={() => {
                router.replace("/auth/find-id-password");
              }}
            >
              아이디•비밀번호 찾기
            </button>
            <AuthChangeBox>
              <UnderLineLinkDiv onClick={() => router.push("/auth/signup")}>
                회원가입하기
              </UnderLineLinkDiv>
            </AuthChangeBox>
          </AuthNavBox>
        </form>
      </LoginAuthContainer>
    </AuthContainer>
  );
};

export default LoginClient;

const LoginAuthContainer = styled(AuthFormWrapper)`
  padding-top: 5rem;
  @media (min-width: 1024px) {
    padding-top: 13rem;
  }
`;
