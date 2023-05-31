"use client";

import { User } from "@prisma/client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import styled from "styled-components";
import Button from "../UI/Button";

type UserMenuProps = {
  currentUser?: User | null;
};

const UserMenu = ({ currentUser }: UserMenuProps) => {
  const router = useRouter();

  return (
    <UserMenuDiv>
      {currentUser ? (
        <>
          <IconDiv
            onClick={() => {
              router.push("/");
            }}
          >
            <Image
              src="/images/writeIcon.png"
              width={36}
              height={36}
              alt="write_icon"
              className=""
            />
          </IconDiv>
          <IconDiv onClick={() => {}}>
            <Image
              src="/images/profileIcon.png"
              width={36}
              height={36}
              alt="profile_icon"
            />
          </IconDiv>
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
  gap: 1.6rem;
  font-weight: 500;
  color: #4f3d21;
`;

const IconDiv = styled.div`
  &:hover {
    cursor: pointer;
    opacity: 0.5;
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

export default UserMenu;
