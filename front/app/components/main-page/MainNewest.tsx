"use client";

import { useState } from "react";
import styled from "styled-components";
import {
  StyledContentsArea,
  ListingRecipeContainer,
  StyledContainer,
  StyledTitle,
  StyledTitleBox,
} from "@/app/styles/main/main.style";
import { Recipe } from "@/app/types";
import { useQuery } from "@tanstack/react-query";
import { getAllRecipes } from "@/app/api/recipe";
import LoadingRecipe from "../UI/LoadingRecipe";
import NonDataCrying from "../UI/NonDataCrying";
import MainMobileListingRecipe from "./mobile/MainMobileListingRecipe";
import NonRecipeCrying from "../UI/NonRecipeCrying";
import Image from "next/image";
import RecipeCard from "../recipe-card/RecipeCard";

const MainNewest = () => {
  const {
    data: recipes,
    isLoading,
    isError,
  } = useQuery(["recipes"], () => getAllRecipes(), {
    retry: 0,
    initialData: [],
  });

  const [currentPage, setCurrentPage] = useState<number>(1);
  const contentsPerPage = 8;
  const totalRecipes = recipes ? recipes?.length : 0;
  const totalPage = Math.ceil(totalRecipes / contentsPerPage);

  // 페이지네이션 버튼 핸들러
  const leftBtnHandler = () => {
    if (currentPage === 1) {
      return;
    }
    setCurrentPage(currentPage - 1);
  };

  const rightBtnHandler = () => {
    if (currentPage >= totalPage) {
      return;
    }
    setCurrentPage(currentPage + 1);
  };

  if (isLoading) {
    return <LoadingRecipe />;
  }

  return (
    <StyledContainer>
      <LeftSlideBtn onClick={leftBtnHandler} currentPage={currentPage}>
        <Image
          src="/images/main/leftSlideBtn.png"
          alt="left_slice_btn"
          width={42}
          height={122}
        />
      </LeftSlideBtn>
      <StyledContentsArea>
        <StyledNewestTitleBox>
          <StyledTitle>최신 레시피</StyledTitle>
        </StyledNewestTitleBox>
        {isError ? (
          <NonDataCrying />
        ) : recipes.length === 0 && !isError ? (
          <NonRecipeCrying />
        ) : (
          <>
            <ListingRecipeContainer>
              {recipes
                .slice(
                  contentsPerPage * (currentPage - 1),
                  contentsPerPage * currentPage
                )
                .map((item: Recipe, index: number) => (
                  <RecipeCard key={index} recipe={item} />
                ))}
            </ListingRecipeContainer>
            <MainMobileListingRecipe
              recipes={recipes}
              url="/recipes/category/newest?category=newest"
            />
          </>
        )}
      </StyledContentsArea>
      <RightSlideBtn
        onClick={rightBtnHandler}
        currentPage={currentPage}
        totalPage={totalPage}
      >
        <Image
          src="/images/main/rightSlideBtn.png"
          alt="right_slice_btn"
          width={42}
          height={122}
        />
      </RightSlideBtn>
    </StyledContainer>
  );
};

export default MainNewest;

const StyledNewestTitleBox = styled(StyledTitleBox)`
  align-items: end;
  flex-direction: row;
`;

const LeftSlideBtn = styled.button<{ currentPage: number }>`
  display: none;

  @media (min-width: 1024px) {
    ${(props) => (props.currentPage === 1 ? "display:none;" : "display:block;")}
    position: absolute;
    width: 3rem;
    height: 9rem;
    left: -3rem;
    transition: transform 0.3s;
    &:hover {
      transform: scale(130%, 130%);
    }
  }
`;

const RightSlideBtn = styled.button<{ currentPage: number; totalPage: number }>`
  display: none;

  @media (min-width: 1024px) {
    ${(props) =>
      props.currentPage > props.totalPage ? "display:none;" : "display:block;"}
    position: absolute;
    width: 3rem;
    height: 9rem;
    right: -3rem;
    transition: transform 0.3s;
    &:hover {
      transform: scale(130%, 130%);
    }
  }
`;
