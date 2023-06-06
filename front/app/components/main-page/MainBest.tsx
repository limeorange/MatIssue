"use client";

import Image from "next/image";
import { useState } from "react";
import styled from "styled-components";
import RecipeCard from "../recipe-card/RecipeCard";
import {
  StyledContentsArea,
  ListingRecipeContainer,
  StyledContainer,
  StyledList,
  StyledTitle,
  StyledTitleBox,
} from "@/app/styles/main/main.style";
import { Recipe } from "@/app/types";
import { useQuery } from "@tanstack/react-query";
import { getAllRecipes } from "@/app/api/recipe";

type RecipeProps = Recipe[];

const MainBest = () => {
  const { data: recipes, isLoading } = useQuery(["recipes1"], () =>
    getAllRecipes()
  );

  console.log(recipes);

  const [currentPage, setCurrentPage] = useState<number>(1);

  const contentsPerPage = 8;
  const totalPage = recipes?.length / contentsPerPage;

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

  return (
    <StyledContainer>
      {isLoading ? (
        <></>
      ) : (
        <>
          <LeftSlideBtn onClick={leftBtnHandler}>
            <Image
              src="/images/main/leftSlideBtn.png"
              alt="left_slice_btn"
              width={42}
              height={122}
            />
          </LeftSlideBtn>
          <StyledContentsArea>
            <StyledBestTitleBox>
              <StyledTitle>베스트 레시피</StyledTitle>
              <StyledList>
                <li onClick={() => {}}>일간</li>
                <li>|</li>
                <li onClick={() => {}}>월간</li>
                <li>|</li>
                <li onClick={() => {}}>주간</li>
              </StyledList>
            </StyledBestTitleBox>
            <ListingRecipeContainer>
              {recipes
                .slice(
                  contentsPerPage * (currentPage - 1),
                  contentsPerPage * currentPage
                )
                .map((data: Recipe, index: number) => (
                  <RecipeCard key={index} data={data} />
                ))}
            </ListingRecipeContainer>
          </StyledContentsArea>
          <RightSlideBtn onClick={rightBtnHandler}>
            <Image
              src="/images/main/rightSlideBtn.png"
              alt="right_slice_btn"
              width={42}
              height={122}
            />
          </RightSlideBtn>
        </>
      )}
    </StyledContainer>
  );
};

export default MainBest;

const StyledBestTitleBox = styled(StyledTitleBox)`
  align-items: end;
  flex-direction: row;
`;

const LeftSlideBtn = styled.button`
  display: none;

  @media (min-width: 768px) {
    display: block;
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

const RightSlideBtn = styled.button`
  display: none;

  @media (min-width: 768px) {
    display: block;
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
