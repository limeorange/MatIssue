"use client";

import { useCallback, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  FieldError,
  FieldValues,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import Image from "next/image";
import { axiosBase } from "@/app/api/axios";
import styled from "styled-components";
import { toast } from "react-hot-toast";

import Logo from "@/app/components/header/Logo";
import Button from "@/app/components/UI/Button";

import {
  AuthContainer,
  AuthFormWrapper,
  AuthNavBox,
  BirthdayInput,
  ErrorMessageText,
  StyledInput,
  StyledLabel,
  UnderLineLinkDiv,
} from "@/app/styles/auth/auth.style";
import LoadingModal from "@/app/components/UI/LoadingModal";

const SignupClient = () => {
  const {
    register,
    watch,
    resetField,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      user_id: "",
      username: "",
      email: "",
      password: "",
      year: "",
      month: "",
      day: "",
    },
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showPasswordConfirm, setShowPasswordConfirm] =
    useState<boolean>(false);

  const router = useRouter();
  const yearInputRef = useRef<HTMLInputElement>(null);
  const monthInputRef = useRef<HTMLInputElement>(null);
  const dayInputRef = useRef<HTMLInputElement>(null);

  const yearValue = watch("year");
  const monthValue = watch("month");
  const dayValue = watch("day");

  const birthError = useCallback(() => {
    return toast.error("올바른 생년월일을 입력하세요.");
  }, []);

  /** 4자리 입력시 month인풋으로 포커스이동, 다시 입력해서 5자리이상이되면 year 인풋 리셋 */
  const yearChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const year = e.target.value;
    if (year.length > 4) {
      resetField("year");
      birthError();
      return;
    }
    if (+year < 0 || +year > 2023) {
      resetField("year");
      birthError();
      yearInputRef.current?.focus();
      return;
    }
    if (year.length === 4) {
      monthInputRef.current?.focus();
    }

    setValue("year", year);
  };

  /** 2자리 입력시 day인풋으로 포커스이동, 다시 입력해서 3자리이상이되면 month 인풋 리셋 */
  const monthChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const month = e.target.value;
    if (month.length > 2) {
      resetField("month");
      birthError();
      return;
    }
    if (0 > +month || +month > 12) {
      resetField("month");
      birthError();
      monthInputRef.current?.focus();
      return;
    }

    if (month.length === 2) {
      dayInputRef.current?.focus();
    }

    setValue("month", month);
  };

  /** 2자리 입력시 day인풋에서 포커스 제거, 다시 입력해서 3자리이상이되면 day 인풋 리셋 */
  const dayChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const day = e.target.value;
    if (day.length > 2) {
      resetField("day");
      birthError();
      return;
    }
    if (
      (+monthValue === 1 || 3 || 5 || 7 || 8 || 10 || 12) &&
      (0 > +day || +day > 31)
    ) {
      resetField("day");
      birthError();
      dayInputRef.current?.focus();
      return;
    } else if ((+monthValue === 4 || 6 || 9 || 11) && (0 > +day || +day > 30)) {
      resetField("day");
      birthError();
      dayInputRef.current?.focus();
      return;
    } else if (+monthValue === 2 && (0 > +day || +day > 29)) {
      resetField("day");
      birthError();
      dayInputRef.current?.focus();
      return;
    }
    if (day.length === 2) {
      dayInputRef.current?.blur();
    }

    setValue("day", day);
  };

  /** auth 폼 제출 핸들러 */
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
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

  return (
    <AuthContainer>
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
                onClick={() => {
                  setShowPassword(!showPassword);
                }}
              >
                <Image
                  src="/images/showPasswordIcon.png"
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
                onClick={() => {
                  setShowPasswordConfirm(!showPasswordConfirm);
                }}
              >
                <Image
                  src="/images/showPasswordIcon.png"
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
                  validate: (val: string) => {
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
                ref={yearInputRef}
                onChange={yearChangeHandler}
                value={yearValue || ""}
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
                ref={monthInputRef}
                onChange={monthChangeHandler}
                value={monthValue || ""}
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
                ref={dayInputRef}
                onChange={dayChangeHandler}
                value={dayValue || ""}
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

const ShowIconBox = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  top: 1.1rem;
  right: 1.1rem;
  cursor: pointer;
`;

const BirthdayWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;
