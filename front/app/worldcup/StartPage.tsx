"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styled from "styled-components";
import Image from "next/image";
import Button from "@/app/components/UI/Button";
import Logo from "@/app/components/header/Logo";
import { useRecoilState } from "recoil";
import darkModeAtom from "../store/darkModeAtom";

type StyledComponentProps = {
  isAnimateOut?: boolean;
};

const StartPage = () => {
  const [isAnimateOut, setIsAnimateOut] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0); // window width state
  const [isDarkMode, setIsDarkMode] = useRecoilState(darkModeAtom);
  const router = useRouter();

  useEffect(() => {
    setWindowWidth(window.innerWidth); // initially set window width

    const handleResize = () => {
      // update the window width when the window is resized
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      // cleanup the event listener
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const startGame = (stage: number) => {
    router.push(`/worldcup/game-page?stage=${stage}`);
  };

  return (
    <WorldcupLayout>
      <Logo />
      <GameHeader isAnimateOut={isAnimateOut}>레시피 이상형 월드컵!</GameHeader>
      <StartPageMessage isDarkMode={isDarkMode} isAnimateOut={isAnimateOut}>
        뭐 먹을지 고민이 될 때!!
      </StartPageMessage>
      <ImageBox isAnimateOut={isAnimateOut}>
        <Image
          src={"/images/worldcup/worldcupIcon4.svg"}
          alt="월드컵 캐릭터 이미지"
          width={400}
          height={200}
          style={{ padding: "2rem" }}
        />
      </ImageBox>
      <ButtonWrapper isAnimateOut={isAnimateOut}>
        <OptionOneButton>
          <Button
            isBgColor={true}
            isBorderColor={false}
            isHoverColor={false}
            onClick={() => {
              setIsAnimateOut(true);
              startGame(64);
            }}
          >
            64강 시작
          </Button>
          <Button
            isBgColor={false}
            isBorderColor={true}
            isHoverColor={true}
            onClick={() => {
              setIsAnimateOut(true);
              startGame(32);
            }}
          >
            32강 시작
          </Button>
        </OptionOneButton>
        <OptionTwoButton>
          <Button
            isBgColor={windowWidth <= 1024 ? false : true}
            isBorderColor={windowWidth <= 1024 ? true : false}
            isHoverColor={windowWidth <= 1024 ? true : false}
            onClick={() => {
              setIsAnimateOut(true);
              startGame(16);
            }}
          >
            16강 시작
          </Button>
          <Button
            isBgColor={windowWidth <= 1024 ? true : false}
            isBorderColor={windowWidth <= 1024 ? false : true}
            isHoverColor={windowWidth <= 1024 ? false : true}
            onClick={() => {
              setIsAnimateOut(true);
              startGame(8);
            }}
          >
            8강 시작
          </Button>
        </OptionTwoButton>
      </ButtonWrapper>
    </WorldcupLayout>
  );
};

export default StartPage;

const WorldcupLayout = styled.div`
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
`;

const GameHeader = styled.p<StyledComponentProps>`
  font-size: 60px;
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

  @media (min-width: 1024px) {
    font-size: 80px;
  }
`;

const StartPageMessage = styled.p<
  { isDarkMode: boolean } & StyledComponentProps
>`
  font-size: 17px;
  color: ${(props) => (props.isDarkMode ? props.theme.lightGrey : "#4f3d21")};
  margin-top: 2rem;

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

const ButtonWrapper = styled.div<StyledComponentProps>`
  margin-top: 1rem;
  display: flex;
  justify-content: center;

  & Button {
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1), 0 6px 20px 0 rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;
    margin-right: 0.2rem;

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

  @media (min-width: 1024px) {
    & Button {
      margin-right: 1rem;
    }
  }
`;

const OptionOneButton = styled.div`
  margin-right: 0;

  @media (max-width: 1024px) {
    display: flex;
    flex-direction: column;
    margin-right: 1rem;

    & Button {
      margin-bottom: 1rem;
    }
  }
`;

const OptionTwoButton = styled.div`
  @media (max-width: 1024px) {
    display: flex;
    flex-direction: column;

    & Button {
      margin-bottom: 1rem;
    }
  }
`;
