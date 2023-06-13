"use client";

import { axiosBase } from "@/app/api/axios";
import Button from "../UI/Button";
import { useState } from "react";
import styled from "styled-components";
import { toast } from "react-hot-toast";
import {
  Title,
  InputBox,
  EmailDescription,
  Wrapper,
  EmailWrapper,
  EmailContainer,
  FlexBox,
  ContentSection,
  InputBoxCode,
  SendingCodeButton,
  FlexSmallBox,
} from "@/app/styles/my-page/modify-user-info.style";

const VerificationEmail = ({
  userData,
  handleChangeInput,
}: {
  userData: any;
  handleChangeInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const handleIsEdit = () => {
    setIsEdit(!isEdit);
  };

  const handleVerificationButton = async () => {
    try {
      const response = await axiosBase.post(
        `email/email-verification?email=${userData.email}`
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
      ``;
      console.error(error);
      toast.error("서버 에러가 발생했습니다. 다시 시도해 주세요.");
    }
  };

  return (
    <EmailContainer>
      <EmailWrapper>
        <Title>이메일 *</Title>
          <FlexBox>
            <FlexSmallBox>
            <InputBox
              type="email"
              name="email"
              value={userData?.email}
              required
              onChange={handleChangeInput}
              readOnly={!isEdit}
              isEdit={isEdit}
            />
            {!isEdit && (
            <SendingCodeButton>
              <Button
                type="button"
                isBgColor={true}
                fullWidth={true}
                fullHeight={true}
                isBorderColor={false}
                isHoverColor={false}
                isSmallFont={true}
                onClick={handleIsEdit}
              >
                수정하기
              </Button>
            </SendingCodeButton>
          )}
            {isEdit && (
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
                메일 인증
              </Button>
            </SendingCodeButton>
          )}
          </FlexSmallBox>
            {isEdit && (
              <EmailDescription>
                변경 할 이메일을 입력 후 메일 인증 버튼을 클릭하세요.
              </EmailDescription>
            )}
          </FlexBox>
      </EmailWrapper>
      {true && (
        <Wrapper>
          <EmailContainer>
            <EmailWrapper>
              <Title>인증코드 *</Title>
                <FlexBox>
                  <InputBoxCode
                    type="text"
                    name="email_code"
                    value={userData?.email_code}
                    onChange={handleChangeInput}
                  />
                  <EmailDescription>
                    인증코드를 입력 후 회원 정보 수정 버튼을 클릭하세요.
                  </EmailDescription>
                </FlexBox>
            </EmailWrapper>
          </EmailContainer>
        </Wrapper>
      )}
    </EmailContainer>
  );
};

export default VerificationEmail;


