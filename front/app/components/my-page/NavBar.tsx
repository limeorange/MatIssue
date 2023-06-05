"use client";

import styled from "styled-components";
import Link from "next/link";

const NavBar = () => {
  return (
    <>
      <NavUl>
        <NavItem>
          <Link href="/my-page">프로필</Link>
        </NavItem>
        <NavItem>
          <Link href="/my-page/modify-user-info">회원정보수정</Link>
        </NavItem>
        <NavItem>
          <Link href="/my-page/notification">알림</Link>
        </NavItem>
      </NavUl>
    </>
  );
};

export default NavBar;

const NavUl = styled.ul`
  display: flex;
  height: 6rem;
  justify-content: center;
  border-bottom: 0.1rem solid rgb(200, 200, 200);
  gap: 4.8rem;
`;

const NavItem = styled.li`
  display: flex;
  position: relative;
  box-sizing: content-box;
  align-items: center;
  border-bottom: 0.25rem solid #ffffff;
  padding: 1.3rem 1.3rem 0.9rem 1.3rem;
  font-size: 18px;
  font-weight: 600;
  color: #4f3d21;
  &:hover {
    cursor: pointer;
    color: #f8b551;
    border-bottom: 0.35rem solid #f8b551;
    transition: all 0.2s ease-in-out;
  }
`;
