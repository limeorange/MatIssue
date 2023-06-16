"use client";

import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import styled from "styled-components";
import Cookies from "js-cookie";

import Logo from "./Logo";
import SearchBar from "./SearchBar";
import UserMenu from "./UserMenu";
import CategoryBar from "./CategoryBar";
import HamburgerBtn from "./mobile/HamburgerBtn";
import SearchBtn from "./mobile/SearchBtn";

import getCurrentUser from "@/app/api/user";
import { loginState } from "@/app/store/authAtom";
import useMovingContentByScrolling from "@/app/hooks/useMovingContentByScrolling";
import { User } from "@/app/types";

const Header = ({ initialCurrentUser }: { initialCurrentUser: User }) => {
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(loginState);
  const isHeaderVisible = useMovingContentByScrolling();

  // 로그인된 유저정보를 받아옴
  const {
    data: currentUser,
    isLoading,
    isError,
  } = useQuery<User>(["currentUser"], () => getCurrentUser(), {
    refetchOnWindowFocus: false,
    retry: 0,
    initialData: initialCurrentUser,
  });

  // 유저정보가 있으면 login state을 true로 변경
  useEffect(() => {
    if (currentUser) {
      setIsLoggedIn(true);
    }
  }, [currentUser]);

  // 유저정보 패치에 에러가 있으면 쿠키의 세션아이디 삭제 및 로그아웃
  useEffect(() => {
    if (isError) {
      Cookies.remove("session-id");
      setIsLoggedIn(false);
    }
  }, [isError]);

  useEffect(() => {
    const sessionId = Cookies.get("session-id");
    if (!sessionId && isLoggedIn) {
      setIsLoggedIn(false);
      alert("세션이 만료되었습니다. 다시 로그인해주세요.");
    }
  }, []);

  return (
    <HeaderWrapper isHeaderVisible={isHeaderVisible}>
      <HeaderContainer>
        <TopNavBar>
          <HamburgerBtn initialCurrentUser={currentUser} />
          <LogoWrapper>
            <Logo />
          </LogoWrapper>
          <SearchBar />
          {isLoading ? null : <UserMenu currentUser={currentUser} />}
          <SearchBtn />
        </TopNavBar>
        <CategoryBar />
      </HeaderContainer>
      <UnderLine />
    </HeaderWrapper>
  );
};

const HeaderWrapper = styled.div<{ isHeaderVisible: boolean }>`
  position: fixed;
  width: 100%;
  background-color: #ffffff;
  z-index: 999;
  font-size: 16px;
  }

  transform: ${(props) =>
    props.isHeaderVisible ? "translateY(0)" : "translateY(-100%)"};
  transition: transform 0.3s ease-in-out;
`;

const HeaderContainer = styled.div`
  padding: 0 2rem;
  width: 100%;
  max-width: 120rem;
  margin: 0 auto;
`;

const TopNavBar = styled.div`
  position: relative;
  display: flex;
  height: 7rem;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  gap: 1.2rem;

  @media (min-width: 1024px) {
    height: 8rem;
  }
`;

const UnderLine = styled.div`
  display: block;
  border-bottom: 0.1rem solid rgb(200, 200, 200);
`;

const LogoWrapper = styled.div`
  @media (max-width: 1023.9px) {
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
`;

export default Header;
