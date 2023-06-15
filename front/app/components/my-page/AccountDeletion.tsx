"use client";

import styled from "styled-components";
import React, {  useState } from "react";
import ConfirmModal from "../UI/ConfirmModal";
import { useRouter } from "next/navigation";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosBase } from "@/app/api/axios";
import Cookies from "js-cookie";
import { User } from "../../types/index";
import { Wrapper } from "@/app/styles/my-page/modify-user-info.style";


const AccountDeletion= ({id, password} : {id: any, password: any}) => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const closeModal = () => {
    setIsModalOpen(false);
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
          password: password,
          session_id: "session_id",
        },
      });
      console.log("delete 후 response : ", response);

      if (response.status === 200) {
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
