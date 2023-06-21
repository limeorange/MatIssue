"use client";

import styled from "styled-components";
import { Recipe } from "@/app/types";
import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";

import shuffleRecipes from "@/app/utils/shuffleRecipes";
import LoadingRecipe from "../UI/LoadingRecipe";
import NonDataCrying from "../UI/NonDataCrying";
import LargeRecipeCard from "../recipe-card/main/MainLargeRecipeCard";
import MainMobileListingRecipe from "../listings/MainMobileListingRecipe";
import { getRecipesByVegetarian } from "@/app/api/recipe";

import {
  RecipeContainer,
  StyledSubTitle,
  StyledTitle,
  StyledTitleBox,
} from "@/app/styles/main/main.style";
import { useRecoilValue } from "recoil";
import darkModeAtom from "@/app/store/darkModeAtom";

const MainVegan = () => {
  const {
    data: vegetarianRecipes,
    isLoading,
    isError,
  } = useQuery<Recipe[]>(
    ["vegetarianRecipes"],
    () => getRecipesByVegetarian(),
    { refetchOnWindowFocus: false, retry: 0, initialData: [] }
  );

  const [slide, setSlide] = useState<number>(1);
  const totalRecipesNumber = vegetarianRecipes?.length;
  const totalSlide = totalRecipesNumber < 15 ? totalRecipesNumber / 3 : 5;
  const [isDesktop, setIsDesktop] = useState<boolean>(false);
  const isDarkMode = useRecoilValue(darkModeAtom);

  /** 레시피들을 무작위로 섞어주는 함수 */
  const shuffledRecipes = useMemo(
    () => shuffleRecipes(vegetarianRecipes),
    [vegetarianRecipes]
  );

  /**  이전 페이지 버튼 핸들러 */
  const leftBtnHandler = () => {
    if (slide < 2) {
      return;
    }
    setSlide(slide - 1);
  };

  /** 다음 페이지 버튼 핸들러 */
  const rightBtnHandler = () => {
    if (slide >= totalSlide) {
      return;
    }
    setSlide(slide + 1);
  };

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)");
    setIsDesktop(mediaQuery.matches); // 초기 렌더링 시 미디어 쿼리 결과에 따라 상태를 설정

    const handleResize = () => {
      setIsDesktop(mediaQuery.matches); // 화면 크기 변경 시 미디어 쿼리 결과에 따라 상태를 업데이트
    };

    mediaQuery.addListener(handleResize); // 화면 크기 변경 이벤트 리스너 등록

    return () => {
      mediaQuery.removeListener(handleResize); // 컴포넌트 언마운트 시 이벤트 리스너 제거
    };
  }, []);

  if (isLoading) {
    return <LoadingRecipe />;
  }

  return (
    <MainVegetarianWrapper isDarkMode={isDarkMode}>
      <MainVegetarianContainer>
        <StyledTitleBox>
          <StyledTitle>채식러들을 위한 초록레시피</StyledTitle>
          <StyledSubTitle>
            건강과 환경을 생각하는 채식 레시피로 맛있는 변화를 경험하세요
          </StyledSubTitle>
        </StyledTitleBox>
        {isError ? (
          <NonDataCrying />
        ) : (
          <RecipeSliderWindow>
            {isDesktop ? (
              <VegunRecipeContainer slide={slide}>
                {shuffledRecipes
                  .slice(0, totalSlide * 3)
                  .map((item: Recipe) => (
                    <LargeRecipeCard key={item.recipe_id} recipe={item} />
                  ))}
              </VegunRecipeContainer>
            ) : (
              <RecipeContainer>
                <MainMobileListingRecipe
                  recipes={shuffledRecipes}
                  url="/recipes/category/vegetarian?category=vegetarian"
                />
              </RecipeContainer>
            )}
          </RecipeSliderWindow>
        )}

        <LeftSlideBtn onClick={leftBtnHandler} slide={slide}>
          <Image
            src="/images/main/GreenLeftSlideBtn.png"
            alt="left_button"
            fill
          />
        </LeftSlideBtn>
        <RightSlideBtn
          onClick={rightBtnHandler}
          slide={slide}
          totalSlide={totalSlide}
        >
          <Image
            src="/images/main/GreenRightSlideBtn.png"
            alt="left_button"
            fill
          />
        </RightSlideBtn>
      </MainVegetarianContainer>
    </MainVegetarianWrapper>
  );
};

export default MainVegan;

const MainVegetarianWrapper = styled.div<{ isDarkMode: boolean }>`
  padding: 2rem;

  @media (min-width: 1024px) {
    padding: 6rem 0;
    text-align: center;
    width: 100%;
    background-color: ${(props) =>
      props.isDarkMode ? props.theme.navy : "#e8ffe8"};
  }
`;

const MainVegetarianContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  max-width: 110rem;
  margin: 0 auto;
  gap: 1rem;
`;

const RecipeSliderWindow = styled.div`
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

const LeftSlideBtn = styled.div<{ slide: number }>`
  display: none;

  @media (min-width: 1024px) {
    display: block;
    position: absolute;
    top: 24rem;
    cursor: pointer;
    height: 9.2rem;
    width: 2.8rem;

    transition: transform 0.3s;
    &:hover {
      transform: scale(120%);
    }

    ${(props) => props.slide < 2 && "display : none;"};
  }
`;

const RightSlideBtn = styled.div<{ slide: number; totalSlide: number }>`
  display: none;

  @media (min-width: 1024px) {
    display: block;
    position: absolute;
    top: 24rem;
    right: 0;
    cursor: pointer;
    height: 9.2rem;
    width: 3.128rem;

    transition: transform 0.3s;
    &:hover {
      transform: scale(120%);
    }

    ${(props) => props.slide >= props.totalSlide && "display : none;"};
  }
`;
