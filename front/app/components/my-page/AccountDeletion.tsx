"use client";

import styled from "styled-components";
import Link from "next/link";
import Button from "../UI/Button";
import React, { useEffect, useState } from "react";
import ConfirmModal from "../UI/ConfirmModal";
import { useRouter } from "next/navigation";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import uploadImage from "@/app/api/aws";
import { axiosBase } from "@/app/api/axios";
import Cookies from "js-cookie";
import { User } from "../../types/index";
import {
  Container,
  Header,
  WrapperInfo,
  Wrapper,
  Title,
  InputBox,
  SpaceDiv,
  ShowIconBox,
} from "@/app/styles/my-page/modify-user-info.style";

const AccountDeletion: React.FC = () => {
  const { data: currentUser } = useQuery<User>(["currentUser"]); //비동기적으로 실행, 서버에서 온 값
  const [userData, setUserData] = useState<any>();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const router = useRouter();
  const queryClient = useQueryClient();

  // 회원 탈퇴 컴포넌트
  const handleDeleteAccount = async () => {
    try {
      const response = await axiosBase.delete("users", {
        data: {
          user_id: userData?.user_id,
          password: userData?.password,
          session_id: "session_id",
        },
      });
      console.log("delete 후 response : ", response);

      if (response.status === 200) {
        queryClient.invalidateQueries(["currentUser"]);
        console.log("회원탈퇴 성공");
        Cookies.remove("session_id");
        console.log("계정이 삭제되었습니다.");
        await axiosBase.post("users/logout");
        router.push("/");
      } else {
        console.error("계정 삭제에 실패하였습니다.");
      }
    } catch (error) {
      console.error("Error occurred while deleting account:", error);
    }
    closeModal();
  };

  // 모달 컨트롤
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <Wrapper>
        <StyledAccountDeletion onClick={openModal}>
          회원 탈퇴
        </StyledAccountDeletion>
        {isModalOpen && (
          <ConfirmModal
            icon={<AlertImage src="/images/alert.png" alt="alert" />}
            message="정말 탈퇴 하시겠습니까?"
            onCancel={closeModal}
            onConfirm={handleDeleteAccount}
          />
        )}
      </Wrapper>
    </>
  );
};

export default AccountDeletion;

const StyledAccountDeletion = styled.div`
  position: absolute;
  right: 16.1rem;
  top: 13.5rem;
  font-size: 14px;
  text-decoration: underline;
  color: #e11717;
  cursor: pointer;
`;

const AlertImage = styled.img`
  width: 3rem;
  height: 3rem;
`;
