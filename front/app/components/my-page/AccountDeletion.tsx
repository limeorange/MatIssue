"use client";

import styled from "styled-components";
import React, { useState } from "react";
import PasswordModalComponent from "../UI/PasswordModal";
import { useRouter } from "next/navigation";
import { axiosBase } from "@/app/api/axios";
import Cookies from "js-cookie";
import { toast } from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import {
  ArrowImage,
  AlertImage,
} from "@/app/styles/my-page/modify-user-info.style";
import darkModeAtom from "@/app/store/darkModeAtom";
import { useRecoilValue } from "recoil";

const AccountDeletion = ({ id }: { id: string }) => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [enteredPassword, setEnteredPassword] = useState<string>("");
  const queryClient = useQueryClient();
  const isDarkMode = useRecoilValue(darkModeAtom);

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
      queryClient.removeQueries(["currentUser"]);
      queryClient.removeQueries(["currentUserRecipes"]);

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
      <DeletionAndArrowBox>
        <Title onClick={openModal} isDarkMode={isDarkMode}>
          회원 탈퇴
        </Title>
        <ArrowImage src="/images/right-arrow.svg" alt="arrow-right" />
        {isModalOpen && (
          <PasswordModalComponent
            icon={<AlertImage src="/images/alert.png" alt="alert" />}
            message="탈퇴하시려면 비밀번호를 입력해 주세요."
            onCancel={closeModal}
            onConfirm={handleDeleteAccount}
            onPasswordChange={handlePasswordChange}
            enteredPassword={enteredPassword}
          />
        )}
      </DeletionAndArrowBox>
    </>
  );
};

export default AccountDeletion;

const DeletionAndArrowBox = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
`;

const Title = styled.div<{ isDarkMode: boolean }>`
  font-size: 14px;
  cursor: pointer;
  margin-left: 0.3rem;
  @media (min-width: 1024px) {
    position: absolute;
    right: 16.1rem;
    top: 13.5rem;
    text-decoration: underline;
    color: ${(props) =>
      props.isDarkMode ? props.theme.lightYellow : props.theme.red};
    margin-left: 0;
  }
`;
