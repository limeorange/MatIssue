"use client";

import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import { loginState } from "@/app/store/authAtom";

import Logo from "./Logo";
import SearchBar from "./SearchBar";
import UserMenu from "./UserMenu";
import CategoryBar from "./CategoryBar";

import getCurrentUser from "@/app/api/user";

import { User } from "@/app/types";

const Header = () => {
  const setLoggedIn = useSetRecoilState<boolean>(loginState);

  // react-query로 데이터 fetch
  const { data: currentUser, isLoading } = useQuery<User>(["currentUser"], () =>
    getCurrentUser()
  );

  // 인증된 유저정보를 받으면 로그인 상태 true로 전환
  useEffect(() => {
    if (currentUser) {
      setLoggedIn(true);
    }
  }, [currentUser, setLoggedIn]);

  return (
    <HeaderDiv>
      <NavArea>
        <TopNav>
          <Logo />
          <SearchBar />
          {isLoading ? null : <UserMenu currentUser={currentUser} />}
        </TopNav>
        <CategoryBar />
      </NavArea>
      <UnderLine />
    </HeaderDiv>
  );
};

const HeaderDiv = styled.div`
  position: fixed;
  width: 100%;
  background-color: #ffffff;
  z-index: 60;
  font-size: 16px;
`;

const NavArea = styled.div`
  width: 100%;
  max-width: 120rem;
  margin: 0 auto;

  @media (max-width: 768px) {
    padding: 0 2rem;
  }

  @media (min-width: 768px) {
    padding: 0 2rem;
  }
`;

const TopNav = styled.div`
  position: relative;
  display: flex;
  height: 8rem;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  gap: 1.2rem;

  @media (max-width: 768px) {
    height: 7rem;
  }
`;

const UnderLine = styled.div`
  border-bottom: 0.1rem solid rgb(200, 200, 200);
`;

export default Header;
