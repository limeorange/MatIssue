"use client";

import styled from "styled-components";
import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";

const NavBar = () => {
  const currentPath = usePathname();
  const router = useRouter();

  return (
    <>
      <NavUl>
        <NavItem
          onClick={() => router.push("/my-page")}
          clicked={currentPath === "/my-page"}
        >
          프로필
        </NavItem>
        <NavItem
          onClick={() => router.push("/my-page/modify-user-info")}
          clicked={currentPath === "/my-page/modify-user-info"}
        >
          회원정보수정
        </NavItem>
        {/* <NavItem>
          <Link href="/my-page/notification">알림</Link>
        </NavItem> */}
      </NavUl>
    </>
  );
};

export default NavBar;

const NavUl = styled.ul`
  display: flex;
  height: 4rem;
  justify-content: center;
  border-bottom: 0.1rem solid rgb(200, 200, 200);
  gap: 5.5rem;

  @media (min-width: 1024px) {
    height: 6rem;
    gap: 6rem;
  }
`;

const NavItem = styled.li<{ clicked: boolean }>`
  display: flex;
  position: relative;
  align-items: center;
  border-bottom: 0.4rem solid #ffffff;
  padding: 1.3rem 1.3rem 0.9rem 1.3rem;
  font-size: 14px;
  font-weight: 600;
  color: #4f3d21;
  cursor: pointer;
    ${(props) => props.clicked && "color: #f8b551;"}
    ${(props) => props.clicked && "border-bottom: 0.4rem solid #f8b551;"}
    ${(props) => props.clicked && "transition: all 0.2s ease-in-out;"}
  }

  @media (min-width: 1024px) {
    font-size: 18px;
    border-bottom: 0.35rem solid #ffffff;
    &:hover {
      border-bottom: 0.35rem solid #f8b551;
    }
  }
`;
