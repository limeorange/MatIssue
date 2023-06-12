"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import styled from "styled-components";
import Button from "@/app/components/UI/Button";
import Logo from "../components/header/Logo";
import { useSetRecoilState } from "recoil";
import { EIState, JPState, SNState, TFState } from "@/app/store/mbtiAtom";

type StyledComponentProps = {
  isAnimateOut?: boolean;
};

const StartPage = () => {
  const router = useRouter();
  const setEI = useSetRecoilState(EIState);
  const setSN = useSetRecoilState(SNState);
  const setTF = useSetRecoilState(TFState);
  const setJP = useSetRecoilState(JPState);
  const [isAnimateOut, setIsAnimateOut] = useState(false);

  return (
    <>
      <StratPageWrapper>
        <Logo />
        <StartPageTitle isAnimateOut={isAnimateOut}>
          M<span>uk</span>BTI 테스트
        </StartPageTitle>
        <StartPageMessage isAnimateOut={isAnimateOut}>
          나에게 어울리는 음식은?
        </StartPageMessage>
        <ImageBox isAnimateOut={isAnimateOut}>
          <Image
            src={"/images/mbti/foodIcon.png"}
            alt="음식 아이콘 이미지"
            width={400}
            height={200}
            style={{ marginRight: "2rem", marginTop: "15rem" }}
          />
        </ImageBox>
        <ButtonBox isAnimateOut={isAnimateOut}>
          <Button
            isBgColor={true}
            isBorderColor={false}
            isHoverColor={false}
            onClick={() => {
              setIsAnimateOut(true);
              setTimeout(() => {
                router.push("/mbti/test-page");
                setEI(0);
                setSN(0);
                setTF(0);
                setJP(0);
              }, 0);
            }}
          >
            테스트 시작하기
          </Button>
        </ButtonBox>
      </StratPageWrapper>
    </>
  );
};

export default StartPage;

const StratPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: auto;
  width: 100%;
  max-width: 50rem;
  height: 100vh;

  @keyframes slideUp {
    0% {
      transform: translateY(10%);
      opacity: 0;
    }

    100% {
      transform: translateY(0);
      opacity: 1;
    }
  }

  @media (max-width: 768px) {
    padding: 0 2rem 0 2rem;
  }
`;

const StartPageTitle = styled.p<StyledComponentProps>`
  font-size: 80px;
  color: #fbd26a;
  font-family: "Dongle-Bold";
  margin-bottom: -3rem;

  & span {
    font-size: 40px;
  }

  animation: ${(props) =>
    props.isAnimateOut
      ? "slideOut 1.3s ease-in-out"
      : "slideUp 1s ease-in-out"};
  animation-delay: ${(props) => (props.isAnimateOut ? "0s" : "0.3s")};
`;

const StartPageMessage = styled.p<StyledComponentProps>`
  font-size: 17px;
  color: #4f3d21;

  animation: ${(props) =>
    props.isAnimateOut
      ? "slideOut 1.3s ease-in-out"
      : "slideUp 1s ease-in-out"};
  animation-delay: ${(props) => (props.isAnimateOut ? "0s" : "0.3s")};
`;

const ImageBox = styled.div<StyledComponentProps>`
  animation: ${(props) =>
    props.isAnimateOut
      ? "slideOut 1.5s ease-in-out"
      : "slideUp 0.8s ease-in-out"};
  animation-delay: ${(props) => (props.isAnimateOut ? "0s" : "0.4s")};
`;

const ButtonBox = styled.div<StyledComponentProps>`
  margin-top: 6rem;

  & Button {
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    transition: transform 0.3s ease;

    &:hover {
      transform: translateY(-3px);
    }

    &:active {
      transform: translateY(0px);
    }
  }

  animation: ${(props) =>
    props.isAnimateOut
      ? "slideOut 1.3s ease-in-out"
      : "slideUp 1.5s ease-in-out"};
  animation-delay: ${(props) => (props.isAnimateOut ? "0s" : "0.4s")};
`;
