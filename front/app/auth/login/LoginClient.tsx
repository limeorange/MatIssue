"use client";

import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";

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
import styled from "styled-components";
import { useRecoilValue } from "recoil";
import darkModeAtom from "@/app/store/darkModeAtom";
import useLogin from "@/app/hooks/useLogin";

const LoginClient = () => {
  const isDarkMode = useRecoilValue(darkModeAtom);

  const { isLoading, login } = useLogin();

  const { register, handleSubmit } = useForm<{
    user_id: string;
    password: string;
  }>({
    defaultValues: {
      user_id: "",
      password: "",
    },
  });

  const router = useRouter();

  /** auth 폼 제출 핸들러 */
  const onSubmit: SubmitHandler<{ user_id: string; password: string }> = async (
    data
  ) => {
    login(data);
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
