"use client";

import darkModeAtom from "@/app/store/darkModeAtom";
import Image from "next/image";
import { useRecoilState } from "recoil";
import styled from "styled-components";

const DarkmodeBtn = () => {
  const [darkMode, setDarkMode] = useRecoilState(darkModeAtom);

  console.log(darkMode);

  return (
    <ToggleContainer onClick={() => setDarkMode(!darkMode)} darkMode={darkMode}>
      <Icon src="/images/darkMode/moon.svg" alt="Moon" width={15} height={15} />
      <ToggleBtn darkMode={darkMode} />
      <Icon src="/images/darkMode/sun.svg" alt="Sun" width={15} height={15} />
    </ToggleContainer>
  );
};

export default DarkmodeBtn;

const ToggleContainer = styled.div<{ darkMode: boolean }>`
  display: none;
  @media (min-width: 1024px) {
    display: flex;
    align-items: center;
    width: 5rem;
    height: 3rem;
    border-radius: 10rem;
    background-color: ${(props) =>
      props.darkMode ? props.theme.lightNavy : "#aaa"};
    padding: 0.25rem;
    cursor: pointer;
    position: relative;
  }
`;

const ToggleBtn = styled.div<{ darkMode: boolean }>`
  z-index: 1;
  width: 2.5rem;
  height: 2.5rem;
  background-color: white;
  border-radius: 5rem;
  transition: transform 0.2s ease-in-out;
  transform: translateX(${(props) => (props.darkMode ? "2rem" : "0")});
`;

const Icon = styled(Image)`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 1.5rem;
  height: 1.5rem;
  &:first-child {
    left: 0.5rem;
  }
  &:last-child {
    right: 0.5rem;
    fill: white;
  }
`;
