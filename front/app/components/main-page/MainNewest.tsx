"use client";

import { useState } from "react";
import styled from "styled-components";
import RecipeCard from "../recipe-card/RecipeCard";
import {
  StyledContentsArea,
  ListingRecipeContainer,
  StyledContainer,
  StyledTitle,
  StyledTitleBox,
} from "@/app/styles/main/main.style";
import { Recipe } from "@/app/types";
import MainRecipeCard from "../recipe-card/main/MainRecipeCard";

const MainNewest = ({ newestRecipes }: { newestRecipes: Recipe[] }) => {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const contentsPerPage = 8;

  return (
    <StyledContainer>
      <StyledContentsArea>
        <StyledNewestTitleBox>
          <StyledTitle>최신 레시피</StyledTitle>
        </StyledNewestTitleBox>
        <ListingRecipeContainer>
          {newestRecipes
            .slice(
              contentsPerPage * (currentPage - 1),
              contentsPerPage * currentPage
            )
            .map((item, index: number) => (
              <MainRecipeCard key={index} recipe={item} />
            ))}
        </ListingRecipeContainer>
      </StyledContentsArea>
    </StyledContainer>
  );
};

export default MainNewest;

const StyledNewestTitleBox = styled(StyledTitleBox)`
  align-items: end;
  flex-direction: row;
`;
