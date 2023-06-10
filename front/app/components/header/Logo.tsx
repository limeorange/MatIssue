"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import styled from "styled-components";

const Logo = () => {
  const router = useRouter();

  return (
    <LogoWrapper>
      <Image
        onClick={() => router.push("/")}
        style={{ cursor: "pointer" }}
        src="/logo.svg"
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

  @media (min-width: 768px) {
    width: 12rem;
    height: 4rem;
  }
`;

export default Logo;
