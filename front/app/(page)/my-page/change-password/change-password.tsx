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
          <ChangePasswordButton>비밀번호 변경</ChangePasswordButton>
        </Wrapper>
      </Container>
    </>
  );
};

export default ChangePassword;

const Container = styled.div``;

const Wrapper = styled.div``;

const Header = styled.h1``;

const NewPassword = styled.h2``;

const PasswordInstruction = styled.p``;

const InputBox = styled.input`
  width: 40rem;
  height: 4.8rem;
  border: 0.1rem solid #d2d2d2;
  border-radius: 0.8rem;
  font-size: 15px;
  padding: 0 1.6rem;
  &:focus {
    outline: 0.3rem solid #fbd26a;
    border: none;
  }
`;

const PasswordConfirm = styled.h2``;

const ChangePasswordButton = styled(Button)``;
