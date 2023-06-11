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
import MainRecipeCard from "../recipe-card/main/MainRecipeCard";
import { useQuery } from "@tanstack/react-query";
import { getAllRecipes } from "@/app/api/recipe";
import LoadingRecipe from "../UI/LoadingRecipe";
import NonDataCrying from "../UI/NonDataCrying";

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

  if (isLoading) {
    return <LoadingRecipe />;
  }

  if (isError) {
    return <NonDataCrying />;
  }

  return (
    <StyledContainer>
      <StyledContentsArea>
        <StyledNewestTitleBox>
          <StyledTitle>최신 레시피</StyledTitle>
        </StyledNewestTitleBox>
        <ListingRecipeContainer>
          {recipes
            .slice(
              contentsPerPage * (currentPage - 1),
              contentsPerPage * currentPage
            )
            .map((item: Recipe, index: number) => (
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
