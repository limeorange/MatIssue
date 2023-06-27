"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import styled from "styled-components";
import Button from "@/app/components/UI/Button";
import Logo from "../components/header/Logo";
import { useRecoilState, useSetRecoilState } from "recoil";
import { EIState, JPState, SNState, TFState } from "@/app/store/mbtiAtom";
import darkModeAtom from "../store/darkModeAtom";

type StyledComponentProps = {
  isAnimateOut?: boolean;
};

type isDarkModeProps = {
  isDarkMode: boolean;
};

type CombinedProps = StyledComponentProps & isDarkModeProps;

const StartPage = () => {
  const router = useRouter();

  // MBTI 성향 상태
  const setEI = useSetRecoilState(EIState);
  const setSN = useSetRecoilState(SNState);
  const setTF = useSetRecoilState(TFState);
  const setJP = useSetRecoilState(JPState);

  // 첫 렌더링 애니메이션 상태
  const [isAnimateOut, setIsAnimateOut] = useState(false);

  // 다크모드 상태
  const [isDarkMode, setIsDarkMode] = useRecoilState(darkModeAtom);

  return (
    <>
      <StratPageLayout>
        <Logo />
        <StartPageTitle isAnimateOut={isAnimateOut}>
          M<span style={{ color: "#fbd26a" }}>uk</span>BTI 테스트
        </StartPageTitle>
        <StartPageMessage isAnimateOut={isAnimateOut} isDarkMode={isDarkMode}>
          나에게 어울리는 음식은?
        </StartPageMessage>
        <StartPageImgWrapper isAnimateOut={isAnimateOut}>
          <Image
            src={"/images/mbti/foodIcon.png"}
            alt="음식 아이콘 이미지"
            width={400}
            height={200}
            style={{ marginRight: "2rem", marginTop: "15rem" }}
          />
        </StartPageImgWrapper>
        <StartButtonWrapper isAnimateOut={isAnimateOut}>
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
        </StartButtonWrapper>
      </StratPageLayout>
    </>
  );
};

export default StartPage;

const StratPageLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: auto;
  width: 100%;
  max-width: 50rem;
  height: 100vh;
  padding: 0 1.5rem;

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

  @media (min-width: 1024px) {
    padding: 0;
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

const StartPageMessage = styled.p<CombinedProps>`
  font-size: 17px;
  color: ${(props) =>
    props.isDarkMode ? props.theme.lightYellow : props.theme.brown};

  animation: ${(props) =>
    props.isAnimateOut
      ? "slideOut 1.3s ease-in-out"
      : "slideUp 1s ease-in-out"};
  animation-delay: ${(props) => (props.isAnimateOut ? "0s" : "0.3s")};
`;

const StartPageImgWrapper = styled.div<StyledComponentProps>`
  animation: ${(props) =>
    props.isAnimateOut
      ? "slideOut 1.5s ease-in-out"
      : "slideUp 0.8s ease-in-out"};
  animation-delay: ${(props) => (props.isAnimateOut ? "0s" : "0.4s")};
`;

const StartButtonWrapper = styled.div<StyledComponentProps>`
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
