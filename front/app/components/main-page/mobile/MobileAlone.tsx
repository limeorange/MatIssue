"use client";

import { useState } from "react";
import styled from "styled-components";
import {
  StyledContentsArea,
  StyledContainer,
  StyledTitle,
  StyledTitleBox,
} from "@/app/styles/main/main.style";
import { useQuery } from "@tanstack/react-query";
import { getRecipesBySingle } from "@/app/api/recipe";
import NonDataCrying from "../../UI/NonDataCrying";
import NonRecipeCrying from "../../UI/NonRecipeCrying";
import MainMobileListingRecipe from "../../listings/MainMobileListingRecipe";
import LoadingRecipe from "../../UI/LoadingRecipe";

const MobileAlone = () => {
  const {
    data: recipes,
    isLoading,
    isError,
  } = useQuery(["singleRecipes"], () => getRecipesBySingle(), {
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
      <StyledContentsArea>
        <StyledNewestTitleBox>
          <StyledTitle>최신 레시피</StyledTitle>
        </StyledNewestTitleBox>
        {isError ? (
          <NonDataCrying />
        ) : recipes.length === 0 && !isError ? (
          <NonRecipeCrying />
        ) : (
          <MainMobileListingRecipe
            recipes={recipes}
            url="/recipes/category/newest?category=newest"
          />
        )}
      </StyledContentsArea>
    </StyledContainer>
  );
};

export default MobileAlone;

const StyledNewestTitleBox = styled(StyledTitleBox)`
  align-items: end;
  flex-direction: row;
`;
