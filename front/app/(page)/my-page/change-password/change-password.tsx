"use client";
import Link from "next/link";
import styled from "styled-components";
import Button from "../../../components/UI/Button";

const ChangePassword = () => {
  return (
    <>
      <Container>
        <Wrapper>
          <Header>비밀번호 변경</Header>
          <NewPassword>새 비밀번호</NewPassword>
          <PasswordInstruction>
            영문, 숫자를 포함한 8자 이상의 비밀번호를 입력해주세요
          </PasswordInstruction>
          <InputBox type="password" name="password" required />
          <PasswordConfirm>새 비밀번호 확인</PasswordConfirm>
          <InputBox type="password" name="password" required />
          <ChangePasswordButton>
            <Button
              type="button"
              isBgColor={true}
              fullWidth={true}
              isBorderColor={false}
              isHoverColor={false}
            >
              비밀번호 변경
            </Button>
          </ChangePasswordButton>
        </Wrapper>
      </Container>
    </>
  );
};

export default ChangePassword;

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Wrapper = styled.div`
  width: 48rem;
  height: 43.5rem;
  padding: 4rem;
  margin-top: 5.4rem;
  border-radius: 1.8rem;
  background-color: #ffffff;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
    rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
  color: #4f3d21;
`;

const Header = styled.h1`
  font-weight: 600;
  font-size: 26px;
`;

const NewPassword = styled.h2`
  padding-top: 1.8rem;
  font-size: 15px;
  font-weight: 700;
`;

const PasswordInstruction = styled.p`
  font-size: 15px;
`;

const InputBox = styled.input`
  width: 40rem;
  height: 4.8rem;
  border: 0.1rem solid #d2d2d2;
  border-radius: 1.8rem;
  margin-top: 1.8rem;
  padding: 0 1.6rem;
  font-size: 30px;
  &:focus {
    outline: 0.3rem solid #fbd26a;
    border: none;
  }
`;

const PasswordConfirm = styled.h2`
  margin-top: 1.8rem;
  font-size: 15px;
  font-weight: 700;
`;

const ChangePasswordButton = styled.div`
  width: 40rem;
  padding-top: 3.2rem;
`;
