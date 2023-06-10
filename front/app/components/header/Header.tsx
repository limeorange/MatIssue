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

const Header = ({ initialCurrentUser }: { initialCurrentUser: User }) => {
  const setIsLoggedIn = useSetRecoilState(loginState);

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
    Cookies.remove("session_id");
  }

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
  position: relative;
  @media (min-width: 1024px) {
    position: fixed;
    width: 100%;
    background-color: #ffffff;
    z-index: 60;
    font-size: 16px;
  }
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

export default Header;
