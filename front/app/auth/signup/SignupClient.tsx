"use client";

import { useCallback, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import Image from "next/image";
import styled from "styled-components";

import Logo from "@/app/components/header/Logo";
import Button from "@/app/components/UI/Button";

import {
  AuthContainer,
  AuthFormWrapper,
  AuthNavBox,
  BirthdayInput,
  BirthdayWrapper,
  ErrorMessageText,
  StyledInput,
  StyledLabel,
  UnderLineLinkDiv,
} from "@/app/styles/auth/auth.style";
import LoadingModal from "@/app/components/UI/LoadingModal";
import { useRecoilValue } from "recoil";
import darkModeAtom from "@/app/store/darkModeAtom";
import useBirthForm from "@/app/hooks/useBirthForm";
import useSignup, { SignupValues } from "@/app/hooks/useSignup";

const SignupClient = () => {
  const {
    register,
    watch,
    resetField,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupValues>({
    defaultValues: {
      user_id: "",
      username: "",
      email: "",
      password: "",
      password_confirm: "",
      year: "",
      month: "",
      day: "",
    },
  });
  const { isLoading, signup } = useSignup();
  const BirthForm = useBirthForm({
    watch,
    resetField,
    setValue,
    register,
    isLoading,
    formState: { errors },
  });

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showPasswordConfirm, setShowPasswordConfirm] =
    useState<boolean>(false);

  const isDarkMode = useRecoilValue(darkModeAtom);
  const router = useRouter();

  /** auth 폼 제출 핸들러 */
  const onSubmit: SubmitHandler<SignupValues> = (data) => {
    signup(data);
  };

  return (
    <AuthContainer isDarkMode={isDarkMode}>
      {isLoading && <LoadingModal />}
      <AuthFormWrapper>
        <Logo />
        <form onSubmit={handleSubmit(onSubmit)}>
          <div id="user_id_input">
            <StyledLabel htmlFor="user_id">아이디</StyledLabel>
            <StyledInput
              id="user_id"
              disabled={isLoading}
              {...register("user_id", {
                required: "아이디를 입력하세요.",
                pattern: {
                  value: /^[A-Za-z0-9]+$/,
                  message: "아이디는 영어와 숫자만 가능합니다.",
                },
                minLength: {
                  value: 4,
                  message: "아이디는 최소 4글자 이상이여야 합니다.",
                },
                maxLength: {
                  value: 12,
                  message: "아이디는 최대 12글자까지 허용됩니다.",
                },
              })}
              placeholder="아이디를 입력하세요."
            />
            {errors.user_id && (
              <ErrorMessageText>
                {errors.user_id.message?.toString()}
              </ErrorMessageText>
            )}
          </div>
          <div id="email_input">
            <StyledLabel htmlFor="email">이메일</StyledLabel>
            <StyledInput
              id="email"
              type="email"
              disabled={isLoading}
              {...register("email", {
                required: "이메일을 입력하세요.",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "이메일 형식에 맞지 않습니다.",
                },
              })}
              placeholder="이메일을 입력하세요."
            />
            {errors.email && (
              <ErrorMessageText>
                {errors.email.message?.toString()}
              </ErrorMessageText>
            )}
          </div>
          <div id="username_input">
            <StyledLabel htmlFor="username">닉네임</StyledLabel>
            <StyledInput
              id="username"
              type="text"
              disabled={isLoading}
              {...register("username", {
                required: "닉네임을 입력하세요.",
                minLength: {
                  value: 2,
                  message: "닉네임은 최소 2글자 이상이여야 합니다.",
                },
                maxLength: {
                  value: 8,
                  message: "닉네임은 최대 8글자까지 허용됩니다.",
                },
              })}
              placeholder="닉네임을 입력하세요."
            />
            {errors.username && (
              <ErrorMessageText>
                {errors.username.message?.toString()}
              </ErrorMessageText>
            )}
          </div>
          <div id="password_input">
            <StyledLabel htmlFor="password">비밀번호</StyledLabel>
            <div className="relative">
              <ShowIconBox
                isDarkMode={isDarkMode}
                onClick={() => {
                  setShowPassword(!showPassword);
                }}
              >
                <Image
                  src="/images/auth/showIcon.svg"
                  height={16}
                  width={18}
                  alt="showIcon"
                />
              </ShowIconBox>
              <StyledInput
                id="password"
                type={showPassword ? "text" : "password"}
                disabled={isLoading}
                {...register("password", {
                  required: "비밀번호를 입력해주세요.",
                  pattern: {
                    value:
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()-_=+])[A-Za-z\!@#$%^&*()-_=+]{8,}/,
                    message:
                      "비밀번호는 영문 대소문자, 숫자, 특수문자 조합으로 8자 이상 입력해야합니다.",
                  },
                })}
                placeholder="비밀번호를 입력하세요."
              />
            </div>
            {errors.password && (
              <ErrorMessageText>
                {errors.password.message?.toString()}
              </ErrorMessageText>
            )}
            <SpaceDiv />
            <div className="relative">
              <ShowIconBox
                isDarkMode={isDarkMode}
                onClick={() => {
                  setShowPasswordConfirm(!showPasswordConfirm);
                }}
              >
                <Image
                  src="/images/auth/showIcon.svg"
                  height={16}
                  width={18}
                  alt="showIcon"
                />
              </ShowIconBox>
              <StyledInput
                id="password_confirm"
                type={showPasswordConfirm ? "text" : "password"}
                disabled={isLoading}
                {...register("password_confirm", {
                  required: "비밀번호를 한번더 입력해주세요.",
                  validate: (val: string | undefined) => {
                    if (watch("password") != val) {
                      return "비밀번호가 일치하지 않습니다.";
                    }
                  },
                })}
                placeholder="비밀번호를 한번더 입력하세요."
              />
              {errors.password_confirm && (
                <ErrorMessageText>
                  {errors.password_confirm.message?.toString()}
                </ErrorMessageText>
              )}
            </div>
          </div>
          <div id="birthdate_input">
            <StyledLabel>생년월일</StyledLabel>
            <BirthdayWrapper>
              <BirthdayInput
                id="year"
                isYear={true}
                type="number"
                autoComplete="year"
                disabled={isLoading}
                {...register("year", {
                  required: "년, ",
                  pattern: {
                    value: /^(19[0-9][0-9]|20[0-2][0-3])$/,
                    message: "년, ",
                  },
                  minLength: 2,
                  min: 1900,
                  max: 2023,
                })}
                maxLength={4}
                ref={BirthForm.yearInputRef}
                onChange={BirthForm.yearChangeHandler}
                value={BirthForm.yearValue || ""}
                placeholder="YYYY"
              />
              <BirthdayInput
                id="month"
                type="number"
                autoComplete="month"
                disabled={isLoading}
                {...register("month", {
                  required: "월, ",
                  pattern: {
                    value: /^(0[1-9]|1[0-2])$/,
                    message: "월, ",
                  },
                  minLength: 2,
                })}
                maxLength={2}
                ref={BirthForm.monthInputRef}
                onChange={BirthForm.monthChangeHandler}
                value={BirthForm.monthValue || ""}
                placeholder="MM"
              />
              <BirthdayInput
                id="day"
                type="number"
                autoComplete="day"
                disabled={isLoading}
                {...register("day", {
                  required: "일",
                  pattern: {
                    value: /^(0[1-9]|[1-2][0-9]|3[0-1])$/,
                    message: "일",
                  },
                })}
                maxLength={2}
                ref={BirthForm.dayInputRef}
                onChange={BirthForm.dayChangeHandler}
                value={BirthForm.dayValue || ""}
                placeholder="DD"
              />
            </BirthdayWrapper>
            {errors.year || errors.month || errors.day ? (
              <ErrorMessageText>
                생년월일 형식을 올바르게 입력해주세요.(ex 2000.01.01)
              </ErrorMessageText>
            ) : (
              ""
            )}
          </div>
          <div id="form_submit_button">
            <Button disabled={isLoading} fullWidth isBgColor type="submit">
              회원가입
            </Button>
          </div>
        </form>
        <AuthNavBox>
          <div>이미 아이디가 있으신가요?</div>
          <UnderLineLinkDiv
            onClick={() => {
              router.push("/auth/login");
            }}
          >
            로그인하기
          </UnderLineLinkDiv>
        </AuthNavBox>
        <br />
        <br />
      </AuthFormWrapper>
    </AuthContainer>
  );
};

export default SignupClient;

const SpaceDiv = styled.div`
  display: block;
  height: 1rem;
`;

const ShowIconBox = styled.div<{ isDarkMode: boolean }>`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  top: 1.1rem;
  right: 1.1rem;
  cursor: pointer;
  filter: ${(props) =>
    props.isDarkMode
      ? "invert(89%) sepia(27%) saturate(436%) hue-rotate(334deg) brightness(105%) contrast(104%)"
      : "invert(18%) sepia(10%) saturate(2848%) hue-rotate(357deg) brightness(103%) contrast(82%)"};
`;
