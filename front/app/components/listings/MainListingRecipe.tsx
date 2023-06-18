import { useEffect, useState } from "react";
import dayjs from "dayjs";
import Image from "next/image";
import styled from "styled-components";
import isBetween from "dayjs/plugin/isBetween";

import RecipeCard from "../recipe-card/RecipeCard";
import LoadingRecipe from "../UI/LoadingRecipe";
import NonDataCrying from "../UI/NonDataCrying";
import NonRecipeCrying from "../UI/NonRecipeCrying";
import MainMobileListingRecipe from "./MainMobileListingRecipe";

import {
  ListingRecipeContainer,
  StyledContainer,
  StyledContentsArea,
  StyledList,
  StyledTitle,
  StyledTitleBox,
} from "@/app/styles/main/main.style";
import { Recipe } from "@/app/types";

type MainListingRecipeProps = {
  title: string;
  recipes: Recipe[];
  isError: boolean;
  isFilter: boolean;
  categoryUrl: string;
};

const MainListingRecipe = ({
  title,
  recipes,
  isLoading,
  isError,
  isFilter,
  categoryUrl,
}: MainListingRecipeProps) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [filter, setFilter] = useState<"일간" | "주간" | "월간">("월간");
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>(recipes);

  const contentsPerPage = 8;
  const totalRecipesLength = recipes.length;
  const totalPage = Math.ceil(totalRecipesLength / contentsPerPage);
  const currentDate = dayjs();
  dayjs.extend(isBetween);

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

  // 일간, 주간 ,월간 필터링 useEffect 훅
  useEffect(() => {
    if (filter === "일간") {
      const startOfDay = currentDate.startOf("day");
      const endOfDay = currentDate.endOf("day");

      const dailyRecipes = recipes.filter((recipe: Recipe) => {
        const postDate = dayjs(recipe.created_at);
        return postDate.isBetween(startOfDay, endOfDay);
      });

      setFilteredRecipes(dailyRecipes);
    }
    if (filter === "주간") {
      const startOfWeek = currentDate.startOf("week");
      const endOfWeek = currentDate.endOf("week");

      const weeklyRecipes = recipes.filter((recipe: Recipe) => {
        const postDate = dayjs(recipe.created_at);
        return postDate.isBetween(startOfWeek, endOfWeek);
      });

      setFilteredRecipes(weeklyRecipes);
    }
    if (filter === "월간") {
      const startOfMonth = currentDate.startOf("month");
      const endOfMonth = currentDate.endOf("month");

      const monthlyRecipes = recipes.filter((recipe: Recipe) => {
        const postDate = dayjs(recipe.created_at);
        return postDate.isBetween(startOfMonth, endOfMonth);
      });

      setFilteredRecipes(monthlyRecipes);
    }
  }, [filter]);

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
        <StyledBestTitleBox>
          <StyledTitle>{title}</StyledTitle>
          {isFilter && (
            <StyledList>
              <StyledItem
                id="month"
                onClick={() => {
                  setFilter("월간");
                }}
                clicked={filter === "월간"}
              >
                월간
              </StyledItem>
              <StyledItem clicked={false}>|</StyledItem>
              <StyledItem
                id="week"
                onClick={() => {
                  setFilter("주간");
                }}
                clicked={filter === "주간"}
              >
                주간
              </StyledItem>
              <StyledItem clicked={false}>|</StyledItem>
              <StyledItem
                id="day"
                onClick={() => {
                  setFilter("일간");
                }}
                clicked={filter === "일간"}
              >
                일간
              </StyledItem>
            </StyledList>
          )}
        </StyledBestTitleBox>
        {isLoading && <LoadingRecipe />}
        {isError ? (
          <NonDataCrying />
        ) : totalRecipesLength === 0 && !isError ? (
          <NonRecipeCrying />
        ) : (
          <>
            <ListingRecipeContainer>
              {isFilter
                ? filteredRecipes
                    .slice(
                      contentsPerPage * (currentPage - 1),
                      contentsPerPage * currentPage
                    )
                    .map((item: Recipe) => (
                      <RecipeCard key={item.recipe_id} recipe={item} />
                    ))
                : recipes
                    .slice(
                      contentsPerPage * (currentPage - 1),
                      contentsPerPage * currentPage
                    )
                    .map((item: Recipe) => (
                      <RecipeCard key={item.recipe_id} recipe={item} />
                    ))}
            </ListingRecipeContainer>
            <MainMobileListingRecipe
              recipes={isFilter ? filteredRecipes : recipes}
              url={categoryUrl}
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
export default MainListingRecipe;

const StyledBestTitleBox = styled(StyledTitleBox)`
  align-items: center;
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

const StyledItem = styled.li<{ clicked: boolean }>`
  cursor: pointer;
  font-weight: ${(props) => (props.clicked ? "600" : "400")};
  color: ${(props) => (props.clicked ? "#4F3D21" : "#aaa")};
`;
