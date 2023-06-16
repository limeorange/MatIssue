"use client";

import styled from "styled-components";
import React, { useState } from "react";
import PasswordModalComponent from "../UI/PasswordModal";
import { useRouter } from "next/navigation";
import PasswordModal from "../UI/PasswordModal";
import { axiosBase } from "@/app/api/axios";
import Cookies from "js-cookie";
import { toast } from "react-hot-toast";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { loginState } from "@/app/store/authAtom";

const AccountDeletion = ({ id }: { id: string }) => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [enteredPassword, setEnteredPassword] = useState<string>("");
  const setIsLoggedIn = useSetRecoilState<boolean>(loginState);

  const closeModal = () => {
    setIsModalOpen(false);
    setEnteredPassword("");
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  // 회원 탈퇴 컴포넌트
  const handleDeleteAccount = async () => {
    try {
      const response = await axiosBase.delete("users", {
        data: {
          user_id: id,
          password: enteredPassword,
        },
      });

      toast.success("더 맛있는 이슈로 찾아뵙겠습니다.");
      Cookies.remove("session-id");
      setIsLoggedIn(false);

      router.push("/");
    } catch (error: any) {
      toast.error(
        error.reponse ? error.reponse.data.detail : "회원 탈퇴에 실패했습니다."
      );
    }
    closeModal();
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEnteredPassword(event.target.value);
  };

  return (
    <>
      <DeletionAndArrow>
        <AccountDelete onClick={openModal}>회원 탈퇴</AccountDelete>
        <ArrowImage src="/images/right-arrow.svg" alt="arrow-right" />
        {isModalOpen && (
          <PasswordModal
            icon={<AlertImage src="/images/alert.png" alt="alert" />}
            message="탈퇴하시려면 비밀번호를 입력해주세요."
            onCancel={closeModal}
            onConfirm={handleDeleteAccount}
            onPasswordChange={handlePasswordChange}
            enteredPassword={enteredPassword}
          />
        )}
      </DeletionAndArrow>
    </>
  );
};

export default AccountDeletion;

const AccountDelete = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 0.3rem;
  @media (min-width: 1024px) {
    position: absolute;
    right: 16.1rem;
    top: 13.5rem;
    text-decoration: underline;
    color: #e11717;
    margin-left: 0;
  }
`;

const ArrowImage = styled.img`
width:2.5rem;
height:3rem;
}
@media (min-width: 1024px) {
display: none;
}
`;

const DeletionAndArrow = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
`;

const AlertImage = styled.img`
  width: 3rem;
  height: 3rem;
`;
