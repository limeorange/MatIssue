"use client";

import Image from "next/image";
import { useState } from "react";
import styled from "styled-components";
import MobileUserModal from "./MobileUserModal";
import { User } from "@/app/types";
import { useRecoilValue } from "recoil";
import darkModeAtom from "@/app/store/darkModeAtom";

/** 모바일 전용 햄버거 버튼과 유저 모달 묶어놓은 컴포넌트 */
const HamburgerBtn = ({ currentUser }: { currentUser: User }) => {
  const [isModal, setIsModal] = useState<boolean>(false);
  const isDarkMode = useRecoilValue(darkModeAtom);

  return (
    <>
      <MobileUserModal
        currentUser={currentUser}
        isModal={isModal}
        setIsModal={setIsModal}
      />
      <HamburgerButton
        isDarkMode={isDarkMode}
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

const HamburgerButton = styled.div<{ isDarkMode: boolean }>`
  display: flex;
  padding: 0.6rem 0.2rem;
  filter: ${(props) =>
    props.isDarkMode
      ? "invert(89%) sepia(27%) saturate(436%) hue-rotate(334deg) brightness(105%) contrast(104%)"
      : "invert(18%) sepia(10%) saturate(2848%) hue-rotate(357deg) brightness(103%) contrast(82%)"};
  cursor: pointer;
  z-index: 70;
  @media (min-width: 1024px) {
    display: none;
  }
`;

const Modal = styled.div``;
