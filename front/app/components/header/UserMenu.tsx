"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import { loginState } from "@/app/store/authAtom";
import styled from "styled-components";
import Image from "next/image";

import UserModal from "./UserModal";

import { User } from "@/app/types";

const UserMenu = ({ currentUser }: User) => {
  const [isUserModal, setIsUserModal] = useState<boolean>(false);
  const isLoggedIn = useRecoilValue<boolean>(loginState);

  const router = useRouter();

  return (
    <UserMenuDiv>
      {isLoggedIn ? (
        <>
          <WriteButton
            onClick={() => {
              router.push("/add-recipe");
            }}
          >
            <Image
              src="/images/writeIcon.png"
              width={18}
              height={18}
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
            <UserModal isUserModal={isUserModal} />
            <Image
              src={"/images/profileIcon.png"}
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
      box-shadow: 0px 0px 1px 4px #fbd26a;
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
  font-size: 16px;
  display: flex;
  align-items: center;
  gap: 0.8rem;
`;

export default UserMenu;
