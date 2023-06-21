"use client";

import darkModeAtom from "@/app/store/darkModeAtom";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useRecoilValue } from "recoil";
import styled from "styled-components";

const Logo = () => {
  const router = useRouter();
  const isDarkMode = useRecoilValue(darkModeAtom);

  return (
    <LogoWrapper>
      <Image
        onClick={() => router.push("/")}
        style={{ cursor: "pointer" }}
        src={isDarkMode ? "/logoDarkMode.svg" : "/logo.svg"}
        fill
        alt="Logo"
      />
    </LogoWrapper>
  );
};

const LogoWrapper = styled.div`
  display: block;
  position: relative;
  width: 10.5rem;
  height: 3.5rem;
  min-width: 10.5rem;
  height: 3.5rem;

  @media (min-width: 1024px) {
    width: 12rem;
    height: 4rem;
  }
`;

export default Logo;
