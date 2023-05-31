"use client";

import styled from "styled-components";
import { User } from "@/app/types";

import Logo from "./Logo";
import SearchBar from "./SearchBar";
import UserMenu from "./UserMenu";
import CategoryBar from "./CategoryBar";

type HeaderProps = {
  currentUser?: User | null;
};

const Header = ({ currentUser }: HeaderProps) => {
  return (
    <HeaderDiv>
      <NavArea>
        <TopNav>
          <Logo />
          <SearchBar />
          <UserMenu currentUser={currentUser} />
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
  font-size: 1.6rem;
`;

const NavArea = styled.div`
  width: 100%;
  max-width: 120rem;
  margin: 0 auto;

  @media (min-width: 76.8rem) and (max-width: 102.4rem) {
    padding: 0 2rem;
  }
`;

const TopNav = styled.div`
  display: flex;
  height: 8rem;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  gap: 1.2rem;
`;

const UnderLine = styled.div`
  border-bottom: 0.1rem solid rgb(200, 200, 200);
`;

export default Header;
