"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import Image from "next/image";

import { loginState } from "@/app/store/authAtom";
import { User } from "@/app/types";

import UserModal from "./UserModal";

/** 유저 메뉴 컴포넌트  */
const UserMenu = ({ currentUser }: { currentUser: User }) => {
  const [isUserModal, setIsUserModal] = useState<boolean>(false);
  const isLoggedIn = useRecoilValue(loginState);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  const router = useRouter();

  useEffect(() => {
    if (currentUser?.user_id === "admin") {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  }, [currentUser]);

  return (
    <UserMenuContainer>
      {isLoggedIn ? (
        <>
          <IconButton
            onClick={() => {
              router.push("/my-page/scrap");
            }}
          >
            <Image
              src="/images/header/scrapIcon.png"
              width={28}
              height={28}
              alt="write_icon"
            />
            스크랩
          </IconButton>
          <IconButton
            onClick={() => {
              router.push("/add-recipe");
            }}
          >
            <Image
              src={"/images/header/writeIcon.png"}
              width={28}
              height={28}
              alt="write_icon"
            />
            글쓰기
          </IconButton>
          <ProfileButton
            onMouseOver={() => {
              setIsUserModal(true);
            }}
            onMouseOut={() => {
              setIsUserModal(false);
            }}
            onClick={() => {
              setIsUserModal(!isUserModal);
            }}
          >
            <UserModal
              isUserModal={isUserModal}
              setIsUserModal={setIsUserModal}
              isAdmin={isAdmin}
            />
            <Image
              src={currentUser ? currentUser.img : "/images/profileIcon.png"}
              width={36}
              height={36}
              style={{ objectFit: "cover", backgroundColor: "#fff9ea" }}
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
    </UserMenuContainer>
  );
};

const UserMenuContainer = styled.div`
  display: flex;
  position: relative;
  gap: 1.6rem;
  font-size: 16px;
  font-weight: 500;
  color: #4f3d21;
  align-items: center;
`;

const ProfileButton = styled.div`
  display: none;
  padding: 0.6rem 0.2rem;
  cursor: pointer;
  width: 4rem;
  height: 4.8rem;

  &:hover {
    img {
      box-shadow: 0px 0px 1px 4px rgb(230, 230, 230);
    }
    transform: scale(1.1);

    transition: all 0.3s;
  }

  @media (min-width: 1024px) {
    display: flex;
  }
`;

const LoginButton = styled.button`
  display: none;
  padding: 0.8rem 1.6rem;
  border-radius: 10rem;
  &:hover {
    background-color: rgb(230, 230, 230);
  }

  @media (min-width: 1024px) {
    display: flex;
  }
`;

const LogoutButton = styled.button`
  display: none;
  padding: 0.8rem 1.6rem;
  border-radius: 10rem;
  background-color: #fbd26a;
  &:hover {
    background-color: #f8b551;
  }

  transition: background-color 0.3s;

  @media (min-width: 1024px) {
    display: flex;
  }
`;

const IconButton = styled.div`
  font-size: 16px;
  margin-left: -1rem;
  display: none;
  align-items: center;
  gap: 0.8rem;
  padding: 0.8rem 1.6rem;
  border-radius: 10rem;
  cursor: pointer;

  &:hover {
    transform: scale(1.1);
    background-color: rgb(230, 230, 230);
  }

  transition: all 0.3s;

  @media (min-width: 1024px) {
    display: flex;
  }
`;

export default UserMenu;
