"use client";

import styled from "styled-components";
import React, {  useState } from "react";
import PasswordModalComponent from "../UI/PasswordModal";
import { useRouter } from "next/navigation";
import { axiosBase } from "@/app/api/axios";
import Cookies from "js-cookie";
import { User } from "../../types/index";


const AccountDeletion= ({id, password} : {id: any, password: any}) => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [enteredPassword, setEnteredPassword] = useState("");


  const closeModal = () => {
    setIsModalOpen(false);
    setEnteredPassword("");
  };
  
  const openModal = () => {
    setIsModalOpen(true);
  };

  // 회원 탈퇴 컴포넌트
  const handleDeleteAccount = async () => {
   
    

    console.log("id : ", id);
    console.log("password : ", enteredPassword);

    // try {
    //   const response = await axiosBase.delete("users", {
    //     data: {
    //       user_id: id,
    //       password: password,
    //     },
    //   });
    //   console.log("delete 후 response : ", response);

    //   if (response.status === 200) {
    //     Cookies.remove("session_id");
    //     console.log("계정이 삭제되었습니다.");
    //     await axiosBase.post("users/logout");
    //     router.push("/");
    //   } else {
    //     console.error("계정 삭제에 실패하였습니다.");
    //   }
    // } catch (error) {
    //   console.error("Error occurred while deleting account:", error);
    // }
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
            <StyledPasswordModal
              icon={<AlertImage src="/images/alert.png" alt="alert" />}
              message="정말 탈퇴 하시겠습니까?"
              onCancel={closeModal}
              onConfirm={handleDeleteAccount}
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
display:flex;
align-items: center;
margin-bottom: 2rem;
`;

const AlertImage = styled.img`
  width: 3rem;
  height: 3rem;
`;

const StyledPasswordModal = styled.div`
`;

