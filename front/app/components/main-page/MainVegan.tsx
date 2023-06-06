"use client";

import {
  RecipeContainer,
  StyledSubTitle,
  StyledTitle,
  StyledTitleBox,
} from "@/app/styles/main/main.style";
import styled from "styled-components";
import LargeRecipeCard from "../recipe-card/LargeRecipeCard";
import { RecipeData } from "@/app/types";
import { useState } from "react";
import Image from "next/image";

const DUMMY_DATA: RecipeData[] = [
  {
    image: "/images/sushi1.png",
    title: "기가 막히는 초밥 만들기",
    author: "목동최고미남정훈",
    likes: 1234,
    view: "15,324",

    id: "1",
  },
  {
    image: "/images/sushi2.png",
    title: "기가 막히는 초밥 만들기",
    author: "목동최고미남정훈",
    likes: 1234,
    view: "15,324",
    id: "2",
  },
  {
    image: "/images/sushi3.png",
    title: "기가 막히는 초밥 만들기",
    author: "목동최고미남정훈",
    likes: 1234,
    view: "15,324",
    id: "3",
  },
  {
    image: "/images/sushi3.png",
    title: "기가 막히는 초밥 만들기",
    author: "목동최고미남정훈",
    likes: 1234,
    view: "15,324",
    id: "4",
  },
  {
    image: "/images/sushi3.png",
    title: "기가 막히는 초밥 만들기",
    author: "목동최고미남정훈",
    likes: 1234,
    view: "15,324",
    id: "5",
  },
  {
    image: "/images/sushi3.png",
    title: "기가 막히는 초밥 만들기",
    author: "목동최고미남정훈",
    likes: 1234,
    view: "15,324",
    id: "6",
  },
  {
    image: "/images/sushi3.png",
    title: "기가 막히는 초밥 만들기",
    author: "목동최고미남정훈",
    likes: 1234,
    view: "15,324",
    id: "7",
  },
  {
    image: "/images/sushi3.png",
    title: "기가 막히는 초밥 만들기",
    author: "목동최고미남정훈",
    likes: 1234,
    view: "15,324",
    id: "8",
  },
  {
    image: "/images/sushi3.png",
    title: "기가 막히는 초밥 만들기",
    author: "목동최고미남정훈",
    likes: 1234,
    view: "15,324",
    id: "9",
  },
];

const MainVegan = () => {
  const [slide, setSlide] = useState<number>(1);

  const leftBtnHandler = () => {
    if (slide < 2) {
      return;
    }
    setSlide(slide - 1);
  };

  const rightBtnHandler = () => {
    if (slide > 2) {
      return;
    }
    setSlide(slide + 1);
  };

  return (
    <MainVegunContainer>
      <MainVegunArea>
        <VegunTitleBox>
          <StyledTitle>비건들을 위한 초록레시피</StyledTitle>
          <StyledSubTitle>
            건강과 환경을 생각하는 비건 레시피로 맛있는 변화를 경험하세요
          </StyledSubTitle>
        </VegunTitleBox>
        <RecipeSliderContainer>
          <VegunRecipeContainer slide={slide}>
            {DUMMY_DATA.map((item) => (
              <LargeRecipeCard key={item.id} recipe={item} />
            ))}
          </VegunRecipeContainer>
        </RecipeSliderContainer>
        <LeftSlideBtn onClick={leftBtnHandler}>
          <Image
            src="/images/main/GreenLeftSlideBtn.png"
            alt="left_button"
            fill
          />
        </LeftSlideBtn>
        <RightSlideBtn onClick={rightBtnHandler}>
          <Image
            src="/images/main/GreenRightSlideBtn.png"
            alt="left_button"
            fill
          />
        </RightSlideBtn>
      </MainVegunArea>
    </MainVegunContainer>
  );
};

export default MainVegan;

const MainVegunContainer = styled.div`
  display: none;

  @media (min-width: 1024px) {
    display: block;
    padding: 6rem 0;
    text-align: center;
    width: 100%;
    background-color: #e8ffe8;
  }
`;

const MainVegunArea = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  max-width: 110rem;
  margin: 0 auto;
`;

const VegunTitleBox = styled(StyledTitleBox)`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0;
`;

const RecipeSliderContainer = styled.div`
  width: 100%;
  max-width: 96rem;
  margin: 0 auto;
  overflow: hidden;
`;

const VegunRecipeContainer = styled.div<{ slide: number }>`
  width: 480rem;
  margin: 0 auto;
  padding: 4rem 2rem;
  display: grid;
  overflow-hidden;
  grid-template-columns: repeat(15, 1fr);
  transition: transform 0.5s ease-in-out;
  transform: translateX(${(props) => -96 * (props.slide - 1)}rem);
  grid-column-gap: 4rem;
`;

const LeftSlideBtn = styled.div`
  position: absolute;
  top: 24rem;
  cursor: pointer;
  height: 9.2rem;
  width: 2.8rem;

  transition: transform 0.3s;
  &:hover {
    transform: scale(120%);
  }
`;

const RightSlideBtn = styled.div`
  position: absolute;
  top: 24rem;
  right: 0;
  cursor: pointer;
  height: 9.2rem;
  width: 2.8rem;

  transition: transform 0.3s;
  &:hover {
    transform: scale(120%);
  }
`;
