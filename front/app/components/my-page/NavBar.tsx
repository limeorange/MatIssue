"use client";

import styled from "styled-components";
import { useRouter, usePathname } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import InfiniteScroll from "react-infinite-scroll-component";
import { useRecoilValue } from "recoil";
import darkModeAtom from "@/app/store/darkModeAtom";

const NavBar = () => {
  const currentPath = usePathname();
  const router = useRouter();
  const isDarkMode = useRecoilValue(darkModeAtom);

  return (
    <>
      <NavContainer>
        <NavItem
          isDarkMode={isDarkMode}
          onClick={() => router.push("/my-page")}
          clicked={currentPath === "/my-page"}
        >
          레시피
        </NavItem>
        <NavItem
          isDarkMode={isDarkMode}
          onClick={() => router.push("/my-page/modify-user-info")}
          clicked={currentPath === "/my-page/modify-user-info"}
        >
          회원정보수정
        </NavItem>
        <NavItem
          isDarkMode={isDarkMode}
          onClick={() => router.push("/my-page/scrap")}
          clicked={currentPath === "/my-page/scrap"}
        >
          스크랩
        </NavItem>
        <NavItem
          isDarkMode={isDarkMode}
          onClick={() => router.push("/my-page/manage-followers")}
          clicked={currentPath === "/my-page/manage-followers"}
        >
          팔로우 관리
        </NavItem>
      </NavContainer>
    </>
  );
};

export default NavBar;

const NavContainer = styled.ul`
  display: flex;
  height: 4rem;
  justify-content: center;
  border-bottom: 0.1rem solid rgb(200, 200, 200);
  gap: 3rem;
  @media (min-width: 1024px) {
    height: 6rem;
    gap: 6rem;
  }
`;

const NavItem = styled.li<{ clicked: boolean; isDarkMode: boolean }>`
  display: flex;
  position: relative;
  align-items: center;
  border-bottom: 0.4rem solid
    ${(props) => (props.isDarkMode ? "#212739" : "#ffffff")};
  padding: 1.3rem 1.3rem 0.9rem 1.3rem;
  font-size: 14px;
  font-weight: 600;

  cursor: pointer;
  ${(props) => props.clicked && "color: #f8b551;"}
  ${(props) => props.clicked && "border-bottom: 0.4rem solid #f8b551;"}
  ${(props) => props.clicked && "transition: all 0.2s ease-in-out;"}

  ${(props) => props.isDarkMode && props.clicked && "color: #FFF1C0;"}
  ${(props) =>
    props.isDarkMode && props.clicked && "border-bottom: 0.4rem solid #FFF1C0;"}
  

  @media (min-width: 1024px) {
    font-size: 18px;
    border-bottom: 0.35rem solid
      ${(props) => (props.isDarkMode ? "#212739" : "#ffffff")};
    &:hover {
      border-bottom: 0.35rem solid
        ${(props) => (props.isDarkMode ? "#FFF1C0" : "#ffffff")};
    }
  }
`;
