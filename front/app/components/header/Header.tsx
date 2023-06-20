"use client";

import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";

import Logo from "./Logo";
import SearchBar from "./SearchBar";
import UserMenu from "./UserMenu";
import CategoryBar from "./CategoryBar";
import HamburgerBtn from "./mobile/HamburgerBtn";
import SearchBtn from "./mobile/SearchBtn";

import getCurrentUser from "@/app/api/user";
import useMovingContentByScrolling from "@/app/hooks/useMovingContentByScrolling";
import { User } from "@/app/types";

const Header = ({ initialCurrentUser }: { initialCurrentUser: User }) => {
  // 레시피 조회페이지일 경우, 스크롤 감지하여 헤더를 숨기는 커스텀훅
  const isHeaderVisible = useMovingContentByScrolling();

  // 로그인된 유저정보를 받아옴
  const {
    data: currentUser,
    isLoading,
    isError,
  } = useQuery<User>(["currentUser"], () => getCurrentUser(), {
    refetchOnWindowFocus: false,
    retry: 0,
    // 서버사이드에서 받아온 미리 유저정보를 기본값으로 넣어서 새로고침시 유저메뉴 바로띄움
    initialData: initialCurrentUser,
    // 5초마다 유저정보를 요청해서 세션만료시 로그아웃
    refetchInterval: 5000,
  });

  return (
    <HeaderWrapper isHeaderVisible={isHeaderVisible}>
      <HeaderContainer>
        <TopNavBar>
          <HamburgerBtn currentUser={currentUser} />
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

export default Header;

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
