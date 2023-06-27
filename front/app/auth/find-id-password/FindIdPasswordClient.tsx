"use client";

import { axiosBase } from "@/app/api/axios";
import Button from "@/app/components/UI/Button";
import LoadingModal from "@/app/components/UI/LoadingModal";
import ConfirmModal from "@/app/components/auth/ConfirmModal";
import Logo from "@/app/components/header/Logo";
import darkModeAtom from "@/app/store/darkModeAtom";
import {
  AuthContainer,
  AuthFormWrapper,
  BirthdayInput,
  ErrorMessageText,
  StyledInput,
  StyledLabel,
} from "@/app/styles/auth/auth.style";
import { useRouter } from "next/navigation";
import { useCallback, useRef, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useRecoilValue } from "recoil";
import styled, { css } from "styled-components";

type Variant = "아이디" | "비밀번호";

const FindIdPasswordClient = () => {
  const router = useRouter();
  const {
    register,
    watch,
    resetField,
    reset,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [variant, setVariant] = useState<Variant>("아이디");
  const [message, setMessage] = useState<string>("");
  const isDarkMode = useRecoilValue(darkModeAtom);

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

  /** 아이디, 비밀번호 찾기 제출 핸들러 */
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    const birthDate = data.year + "-" + data.month + "-" + data.day;

    if (variant === "아이디") {
      const userData = {
        email: data.email,
        birth_date: birthDate,
      };
      axiosBase
        .post("email/forgot-id/", userData)
        .then((res) => {
          setMessage("아이디가 입력하신 메일로 발송되었습니다.");
          reset();
        })
        .catch((error) => toast.error(error.response.data.detail))
        .finally(() => setIsLoading(false));
    }

    if (variant === "비밀번호") {
      const userData = {
        user_id: data.user_id,
        birth_date: birthDate,
      };
      axiosBase
        .post("email/forgot-password/", userData)
        .then((res) => {
          setMessage("임시비밀번호가 입력하신 메일로 발송되었습니다.");
          reset();
        })
        .catch((error) => toast.error(error.response.data.detail))
        .finally(() => setIsLoading(false));
    }
  };

  return (
    <AuthContainer isDarkMode={isDarkMode}>
      {isLoading && <LoadingModal />}
      {message && (
        <ConfirmModal
          onConfirm={() => {
            router.replace("/auth/login");
          }}
          onClose={() => {
            setMessage("");
          }}
          btnValue="로그인 하기"
          message={message}
        />
      )}
      <AuthFormWrapper>
        <Logo />
        <VariantWrapper>
          <VariantBox>
            <VariantBoxItem
              active={variant === "아이디"}
              onClick={() => {
                setVariant("아이디");
              }}
            >
              아이디 찾기
            </VariantBoxItem>
            <VariantBoxItem
              active={variant === "비밀번호"}
              onClick={() => {
                setVariant("비밀번호");
              }}
            >
              비밀번호 찾기
            </VariantBoxItem>
          </VariantBox>
          <VariantNoticeBar variant={variant} isDarkMode={isDarkMode} />
        </VariantWrapper>
        <form onSubmit={handleSubmit(onSubmit)}>
          {variant === "비밀번호" && (
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
          )}
          {variant === "아이디" && (
            <div id="email">
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
          )}

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
          <Button isBgColor={true}>{variant} 찾기</Button>
        </form>
      </AuthFormWrapper>
    </AuthContainer>
  );
};
const VariantWrapper = styled.div`
  width: 100%;
`;

const VariantBox = styled.div`
  font-size: 16px;
  width: 100%;
  display: flex;
`;

const VariantBoxItem = styled.div<{ active: boolean }>`
  width: 50%;
  padding: 1rem;
  text-align: center;
  cursor: pointer;
  font-weight: 400;

  ${(props) =>
    props.active &&
    css`
      font-weight: 600;
    `};
`;

const VariantNoticeBar = styled.div<{ variant: Variant; isDarkMode: boolean }>`
  width: 50%;
  border-bottom: 0.3rem solid
    ${(props) =>
      props.isDarkMode ? props.theme.lightYellow : props.theme.yellow};
  transform: translateX(
    ${(props) => (props.variant === "아이디" ? "0" : "100%")}
  );
  transition: transform 0.3s;
`;

const BirthdayWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

export default FindIdPasswordClient;
