"use client";

import darkModeAtom from "@/app/store/darkModeAtom";
import Image from "next/image";
import { useRecoilState } from "recoil";
import styled from "styled-components";

const DarkmodeBtn = ({ isMobile }: { isMobile: boolean }) => {
  const [isDarkMode, setIsDarkMode] = useRecoilState(darkModeAtom);

  const toggleDarkModeHandler = () => {
    setIsDarkMode(!isDarkMode);
    localStorage.setItem("darkMode", JSON.stringify(!isDarkMode));
  };

  return (
    <ToggleContainer
      onClick={toggleDarkModeHandler}
      isMobile={isMobile}
      isDarkMode={isDarkMode}
    >
      <Icon src="/images/darkMode/moon.svg" alt="Moon" width={15} height={15} />
      <ToggleBtn isDarkMode={isDarkMode} />
      <Icon src="/images/darkMode/sun.svg" alt="Sun" width={15} height={15} />
    </ToggleContainer>
  );
};

export default DarkmodeBtn;

const ToggleContainer = styled.div<{ isMobile: boolean; isDarkMode: boolean }>`
  display: ${(props) => (props.isMobile ? "flex" : "none")};
  align-items: center;
  width: 5.5rem;
  height: 3rem;
  border-radius: 10rem;
  background-color: ${(props) =>
    props.isDarkMode ? props.theme.lightNavy : "#aaa"};
  padding: 0.25rem;
  cursor: pointer;
  position: relative;
  @media (min-width: 1024px) {
    display: flex;
  }
`;

const ToggleBtn = styled.div<{ isDarkMode: boolean }>`
  z-index: 1;
  width: 2.5rem;
  height: 2.5rem;
  background-color: white;
  border-radius: 5rem;
  transition: transform 0.2s ease-in-out;
  transform: translateX(${(props) => (props.isDarkMode ? "2.5rem" : "0")});
`;

const Icon = styled(Image)`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 1.5rem;
  height: 1.5rem;
  &:first-child {
    left: 0.75rem;
  }
  &:last-child {
    right: 0.75rem;
  }
`;
