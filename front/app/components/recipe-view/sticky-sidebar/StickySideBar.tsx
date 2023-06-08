"use client";

import useIntersectionObservation from "@/app/hooks/useIntersectionObservation";
import { useEffect, useState } from "react";
import styled from "styled-components";

/** 목차 사이드바 컴포넌트 */
const StickySideBar = () => {
  // 활성화된 ID 상태 관리
  const [activeId, setActiveId] = useState("content1");
  // useIntersectionObservation(setActiveId);

  // 768px 이하일 때 사이드바 숨김 반응형 처리
  const [isSidebarVisible, setSidebarVisible] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      if (screenWidth <= 900) {
        setSidebarVisible(false);
      } else {
        setSidebarVisible(true);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      {isSidebarVisible && (
        <ContainerDiv>
          <TitleH3>목차</TitleH3>
          <Nav>
            <NavItemA href="#heading1" active={activeId === "content1"}>
              요리 정보
            </NavItemA>
            <NavItemA href="#heading2" active={activeId === "content2"}>
              재료 준비
            </NavItemA>
            <NavItemA href="#heading3" active={activeId === "content3"}>
              요리 과정
            </NavItemA>
            <NavItemA href="#heading4" active={activeId === "content4"}>
              요리팁
            </NavItemA>
            <NavItemA href="#heading5" active={activeId === "content5"}>
              요리 동영상
            </NavItemA>
            <NavItemA href="#heading6" active={activeId === "content6"}>
              댓글
            </NavItemA>
          </Nav>
        </ContainerDiv>
      )}
    </>
  );
};

/** 목차 사이드바 감싸는 Div */
const ContainerDiv = styled.div`
  position: fixed;
  top: 20rem;
  right: 16rem;
  z-index: 50;
`;

/** 목차 H3 */
const TitleH3 = styled.h3`
  font-size: 22px;
  color: #b08038;
  font-weight: 500;
  margin-bottom: 2.5rem;
`;

/** 목차 아이템 감싸는 Nav */
const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

/** 목차 아이템 */
const NavItemA = styled.a<{ active: boolean }>`
  font-size: 16.5px;

  color: ${({ active }) => (active ? "#DFB443" : "inherit")};
`;

export default StickySideBar;
