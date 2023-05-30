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
`;

const NavArea = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
`;

const TopNav = styled.div`
  display: flex;
  height: 80px;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
`;

const UnderLine = styled.div`
  border-bottom: 1px solid rgb(200, 200, 200);
`;

export default Header;
