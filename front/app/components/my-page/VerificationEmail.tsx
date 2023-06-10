"use client";

import { axiosBase } from "@/app/api/axios";
import Button from "../UI/Button";
import { useState } from "react";
import styled from "styled-components";
import { toast } from "react-hot-toast";
import {
  Title,
  InputBox,
  IputAndDescription,
  EmailDescription,
  Wrapper,
} from "@/app/styles/my-page/modify-user-info.style";

const VerificationEmail = ({
  email,
  handleChangeInput,
}: {
  email: string;
  handleChangeInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const [code, setCode] = useState("");
  // const [email, setEmail] = useState({
  //   email: userData?.email,
  // });

  const handleVerificationButton = async () => {
    try {
      const response = await axiosBase.post(
        `email/email-verification?email=${email}`
      );
      if (response.status === 200) {
        toast.success(
          "인증 코드가 이메일로 발송되었습니다. 이메일을 확인하여 인증코드를 입력해주세요."
        );
        setIsButtonClicked(true);
      } else {
        toast.error(
          "인증코드 전송을 실패하였습니다. 이메일을 다시 확인해 주세요."
        );
      }
    } catch (error) {
      console.error(error);
      toast.error("서버 에러가 발생했습니다. 다시 시도해 주세요.");
    }
  };

  const handleInputCode = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCode(e.target.value);
  };

  return (
    <>
      <Wrapper>
        <Title>이메일 *</Title>
        <IputAndDescription>
          <ReadOnlyEmail>{email}</ReadOnlyEmail>
          <InputBox
            type="email"
            name="email"
            value={email}
            required
            onChange={handleChangeInput}
          />
          <EmailDescription>
            변경 할 이메일을 입력 후 인증 코드 전송 버튼을 클릭하세요.
          </EmailDescription>
        </IputAndDescription>
      </Wrapper>
      <SendingCodeButton>
        <Button
          type="button"
          isBgColor={true}
          fullWidth={true}
          fullHeight={true}
          isBorderColor={false}
          isHoverColor={false}
          isSmallFont={true}
          onClick={handleVerificationButton}
        >
          이메일 수정
        </Button>
      </SendingCodeButton>

      {isButtonClicked && (
        <>
          <Wrapper>
            <Title>인증코드 *</Title>
            <IputAndDescription>
              <InputBox type="text" value={code} onChange={handleInputCode} />

              <EmailDescription>
                인증코드를 입력 후 인증 코드 확인 버튼을 클릭하세요.
              </EmailDescription>
            </IputAndDescription>
          </Wrapper>
          <SendingCodeButton>
            <Button
              type="button"
              isBgColor={true}
              fullWidth={true}
              fullHeight={true}
              isBorderColor={false}
              isHoverColor={false}
              isSmallFont={true}
              onClick={handleVerificationButton}
            >
              인증 코드 전송
            </Button>
          </SendingCodeButton>
        </>
      )}
    </>
  );
};

export default VerificationEmail;

const SendingCodeButton = styled.div`
  position: absolute;
  right: 23.9rem;
  top: 7.25rem;
  width: 10rem;
  height: 4rem;
`;

const VerifyCodeButton = styled.div`
  position: absolute;
  right: 23.9rem;
  top: 21.7rem;
  width: 10rem;
  height: 4rem;
`;

const ReadOnlyEmail = styled.div`
  width: 40rem;
  height: 4.8rem;
  font-size: 16px;
  padding: 0 1.6rem;
  &:focus {
    outline: 0.3rem solid #fbd26a;
    border: none;
  }
`;
