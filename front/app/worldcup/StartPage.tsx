"use client";
import React, { useState } from "react";
import styled from "styled-components";

type StyledComponentProps = {
  isAnimateOut?: boolean;
};

const StartPage = () => {
  const [isAnimateOut, setIsAnimateOut] = useState(false);

  return (
    <WorldcupLayout>
      <GameHeader isAnimateOut={isAnimateOut}>레시피 이상형 월드컵!</GameHeader>
    </WorldcupLayout>
  );
};

export default StartPage;

const WorldcupLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 3em;

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
