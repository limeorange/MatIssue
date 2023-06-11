"use client";

import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";

import Logo from "./Logo";
import SearchBar from "./SearchBar";
import UserMenu from "./UserMenu";
import CategoryBar from "./CategoryBar";

import { User } from "@/app/types";
import Cookies from "js-cookie";
import getCurrentUser from "@/app/api/user";
import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { loginState } from "@/app/store/authAtom";
import useMovingContentByScrolling from "@/app/hooks/useMovingContentByScrolling";
import HamburgerBtn from "./mobile/HamburgerBtn";
import SearchBtn from "./mobile/SearchBtn";

const Header = ({ initialCurrentUser }: { initialCurrentUser: User }) => {
  const setIsLoggedIn = useSetRecoilState(loginState);
  const isHeaderVisible = useMovingContentByScrolling();

  const {
    data: currentUser,
    isLoading,
    isError,
  } = useQuery<User>(["currentUser"], () => getCurrentUser(), {
    refetchOnWindowFocus: false,
    retry: 0,
    initialData: initialCurrentUser,
  });

  useEffect(() => {
    if (currentUser) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [currentUser]);

  if (isError) {
    Cookies.remove("session-id");
  }

  return (
    <HeaderDiv isHeaderVisible={isHeaderVisible}>
      <NavArea>
        <TopNav>
          <HamburgerBtn />
          <LogoWrapper>
            <Logo />
          </LogoWrapper>
          <SearchBar />
          {isLoading ? null : <UserMenu />}
          <SearchBtn />
        </TopNav>
        <CategoryBar />
      </NavArea>
      <UnderLine />
    </HeaderDiv>
  );
};

const HeaderDiv = styled.div<{ isHeaderVisible: boolean }>`
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

const NavArea = styled.div`
  padding: 0 2rem;
  width: 100%;
  max-width: 120rem;
  margin: 0 auto;
`;

const TopNav = styled.div`
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
  display: none;
  @media (min-width: 1024px) {
    display: block;
    border-bottom: 0.1rem solid rgb(200, 200, 200);
  }
`;

const LogoWrapper = styled.div`
  @media (max-width: 768px) {
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
`;

export default Header;
