"use client";

import Image from "next/image";
import { useState } from "react";
import styled from "styled-components";
import MobileUserModal from "./MobileUserModal";
import { User } from "@/app/types";

/** 모바일 전용 햄버거 버튼과 유저 모달 묶어놓은 컴포넌트 */
const HamburgerBtn = ({ currentUser }: { currentUser: User }) => {
  const [isModal, setIsModal] = useState<boolean>(false);

  return (
    <>
      <MobileUserModal
        currentUser={currentUser}
        isModal={isModal}
        setIsModal={setIsModal}
      />
      <HamburgerButton
        onClick={() => {
          setIsModal(true);
          document.body.style.overflow = "hidden";
        }}
      >
        <Image
          src="/images/header/hamburgerIcon.svg"
          width={28}
          height={28}
          alt="hamburgerIcon_icon"
        />
      </HamburgerButton>
    </>
  );
};

export default HamburgerBtn;

const HamburgerButton = styled.div`
  display: flex;
  padding: 0.6rem 0.2rem;
  color: #4f3d21;
  cursor: pointer;
  z-index: 70;
  @media (min-width: 1024px) {
    display: none;
  }
`;

const Modal = styled.div``;
