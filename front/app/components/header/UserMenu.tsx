"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import styled from "styled-components";
import UserModal from "./UserModal";

type UserMenuProps = {
  currentUser?: any | null;
};

const UserMenu = ({ currentUser }: UserMenuProps) => {
  const [isUserModal, setIsUserModal] = useState<boolean>(false);

  const router = useRouter();

  return (
    <UserMenuDiv>
      {currentUser ? (
        <>
          <WriteButton
            onClick={() => {
              router.push("/add-recipe");
            }}
          >
            <Image
              src="/images/writeIcon.png"
              width={20}
              height={20}
              alt="write_icon"
            />
            글쓰기
          </WriteButton>
          <ProfileButton
            onMouseOver={() => {
              setIsUserModal(true);
            }}
            onMouseOut={() => {
              setIsUserModal(false);
            }}
            onClick={() => {
              setIsUserModal(true);
            }}
          >
            {isUserModal && <UserModal />}
            <Image
              src="/images/profileIcon.png"
              width={32}
              height={32}
              alt="profile_icon"
              className="rounded-[100px]"
            />
          </ProfileButton>
        </>
      ) : (
        <>
          <LoginButton
            onClick={() => {
              router.push("/auth/login");
            }}
          >
            로그인
          </LoginButton>
          <LogoutButton
            onClick={() => {
              router.push("/auth/signup");
            }}
          >
            회원가입
          </LogoutButton>
        </>
      )}
    </UserMenuDiv>
  );
};

const UserMenuDiv = styled.div`
  display: flex;
  position: relative;
  gap: 1.6rem;
  font-size: 16px;
  font-weight: 500;
  color: #4f3d21;
  align-items: center;
`;

const ProfileButton = styled.div`
  padding: 0.6rem 0.2rem;
  cursor: pointer;

  &:hover {
    img {
      box-shadow: 0px 0px 1px 5px #fbd26a;
    }
  }
`;

const LoginButton = styled.button`
  padding: 0.8rem 1.6rem;
  border-radius: 10rem;
  &:hover {
    background-color: rgb(230, 230, 230);
  }
`;

const LogoutButton = styled.button`
  padding: 0.8rem 1.6rem;
  border-radius: 10rem;
  background-color: #fbd26a;
  &:hover {
    background-color: #f8b551;
  }
`;

const WriteButton = styled(LoginButton)`
  font-size: 18px;
  display: flex;
  align-items: center;
  gap: 0.8rem;
`;

export default UserMenu;
