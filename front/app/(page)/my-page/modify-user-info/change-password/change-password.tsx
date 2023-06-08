"use client";

import styled from "styled-components";
import Button from "../../../../components/UI/Button";
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { axiosBase } from "@/app/api/axios";
import { useRouter } from "next/navigation";
import ConfirmModal from "../../../../components/UI/ConfirmModal";

type User = {
  password: string;
};

const ChangePassword = () => {
  const { data: currentUserInfo } = useQuery<User>(["currentUser"]);
  const [password, setPassword] = useState({
    password: "",
    confirmPassword: "",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChangePassword = () => {
    setIsModalOpen(true);
  };

  const handleConfirm = () => {
    setIsModalOpen(false);
    // 비밀번호 변경 로직 처리
    console.log("비밀번호가 성공적으로 변경되었습니다.");
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const router = useRouter();

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPassword({ ...password, [name]: value });
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      password.password === password.confirmPassword && // 비밀번호와 비밀번호 확인이 같은지
      password.password.length >= 8 && // 비밀번호가 8자리 이상인지
      password.password.search(/[0-9]/g) !== -1 && // 숫자가 포함되어 있는지
      password.password.search(/[a-z]/gi) !== -1 && // 영문 대소문자가 포함되어 있는지
      password.password.search(/[~!@#$%^&*()_+|<>?:{}]/gi) !== -1 && // 특수문자가 포함되어 있는지
      password.password !== "" && // 비밀번호가 공백인지
      password.confirmPassword !== "" // 비밀번호 확인이 공백인지
    ) {
      modifyUser();
    } else {
      alert(
        "비빌번호를 확인해주세요. 8자리 이상, 대소문자, 숫자, 특수문자가 포함되어어 있어야 합니다."
      );
    }
  };

  async function modifyUser() {
    const modifyUserInfo = {
      ...currentUserInfo,
      password: password.password,
    };
    console.log("modifyUserInfo : ", modifyUserInfo);
    try {
      const response = await axiosBase.patch("users", modifyUserInfo);
      alert("비밀번호가 변경되었습니다.");
      router.push("/my-page/modify-user-info");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <Container>
        <Wrapper>
          <Header>비밀번호 변경</Header>
          <form onSubmit={handleFormSubmit}>
            <NewPassword>새 비밀번호</NewPassword>
            <PasswordInstruction>
              영문, 숫자, 특수문자를 포함한 8자 이상의 비밀번호를 입력해주세요.
            </PasswordInstruction>
            <InputBox
              type="password"
              name="password"
              id="password"
              value={password?.password}
              onChange={handleChangeInput}
              required
            />
            <PasswordConfirm>새 비밀번호 확인</PasswordConfirm>
            <InputBox
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              value={password?.confirmPassword}
              onChange={handleChangeInput}
              required
            />
            <ChangePasswordButton>
              <Button
                type="submit"
                isBgColor={true}
                fullWidth={true}
                isBorderColor={false}
                isHoverColor={false}
                onClick={handleChangePassword}
              >
                비밀번호 변경
              </Button>
            </ChangePasswordButton>
          </form>
        </Wrapper>
      </Container>
      {isModalOpen && (
        <ConfirmModal
          icon={null}
          message="비밀번호가 성공적으로 변경되었습니다."
          onConfirm={handleConfirm}
          onCancel={handleCancel}
          showCancelButton={false}
        />
      )}
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
