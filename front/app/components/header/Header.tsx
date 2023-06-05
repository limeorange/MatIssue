"use client";

import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";

import Logo from "./Logo";
import SearchBar from "./SearchBar";
import UserMenu from "./UserMenu";
import CategoryBar from "./CategoryBar";

import { User } from "@/app/types";
import getCurrentUser from "@/app/api/user";
import Cookies from "js-cookie";

const Header = () => {
  const {
    data: currentUser,
    isLoading,
    isError,
  } = useQuery<User>(["currentUser"], () => getCurrentUser(), {
    refetchOnWindowFocus: false,
    retry: 0,
  });

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
  position: fixed;
  width: 100%;
  background-color: #ffffff;
  z-index: 60;
  font-size: 16px;
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
