"use client";

import styled from "styled-components";
import { useState, useEffect } from "react";
import React from "react";
import RecipeCard from "../recipe-card/RecipeCard";
import NonRecipe from "../UI/NonRecipe";
import { Recipe, User } from "@/app/types";
import Pagination from "../pagination/Pagination";
import { useQuery } from "@tanstack/react-query";
import InfiniteScroll from "react-infinite-scroll-component";
import { getChefByUserId } from "@/app/api/user";

type UserProfileCardsProps = {
  ProfileUserRecipes: Recipe[];
  userProfileId: string;
  initialCurrentChef: User;
};

const UserRecipeCardList = ({
  ProfileUserRecipes,
  userProfileId,
  initialCurrentChef,
}: UserProfileCardsProps) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const recipesPerPage = 16;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 375);

  // currentChef에 게시글 작성자 정보가 담김
  const { data: currentChef } = useQuery<User>(
    ["currentChef", userProfileId],
    () => getChefByUserId(userProfileId),
    {
      refetchOnWindowFocus: false,
      retry: 0,
      initialData: initialCurrentChef,
    }
  );

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth <= 768);
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 페이지네이션
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // 현재 페이지 데이터
  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;

  const currentRecipe = isMobile
    ? ProfileUserRecipes?.slice(0, indexOfLastRecipe)
    : ProfileUserRecipes?.slice(indexOfFirstRecipe, indexOfLastRecipe);

  const fetchMoreRecipes = async () => {
    // 페이지 증가
    setCurrentPage((prev) => prev + 1);
    setIsLoading(true);

    // 데이터 로딩 시간 설정
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsLoading(false);
  };

  const hasMore = currentPage * recipesPerPage < currentRecipe?.length;

  return (
    <RecipeListContainer>
      <RecipeHeading>{currentChef.username}님의 레시피</RecipeHeading>
      <RecipeHeadingCount>{currentRecipe?.length}</RecipeHeadingCount>
      {currentRecipe?.length === 0 ? (
        <NonRecipeMsg />
      ) : isMobile ? (
        <InfiniteScroll
          dataLength={currentRecipe?.length}
          next={fetchMoreRecipes}
          hasMore={hasMore}
          loader={<h4>Loading...</h4>}
          scrollThreshold={0.5}
          endMessage={
            <p
              style={{
                fontSize: "16px",
                textAlign: "center",
                margin: "2rem",
                color: "#F8B551",
              }}
            >
              <b>{`마지막 레시피 입니다 :)`}</b>
            </p>
          }
        >
          <RecipeList>
            {currentRecipe?.map((recipe: Recipe) => (
              <RecipeCardWrapper key={recipe.recipe_id}>
                <StyledRecipeCard recipe={recipe} />
              </RecipeCardWrapper>
            ))}
          </RecipeList>
        </InfiniteScroll>
      ) : (
        <>
          <RecipeList>
            {currentRecipe
              ?.slice(0, recipesPerPage * currentPage)
              .map((recipe: Recipe) => (
                <RecipeCardWrapper key={recipe.recipe_id}>
                  <StyledRecipeCard recipe={recipe} />
                </RecipeCardWrapper>
              ))}
          </RecipeList>
          {!isMobile && (
            <PaginationComponent
              recipesPerPage={recipesPerPage}
              totalRecipes={currentRecipe?.length}
              paginate={paginate}
              currentPage={currentPage}
            />
          )}
        </>
      )}
    </RecipeListContainer>
  );
};

const RecipeListContainer = styled.div`
  width: 100%;
  margin-top: 1.8rem;
  @media (min-width: 1024px) {
    margin-top: 0;
    margin-bottom: 16rem;
  }
`;

const RecipeHeading = styled.span`
  font-size: 15px;
  letter-spacing: 0.01em;
  margin: 0 0.3rem 0 1rem;
  font-weight: 600;
  color: #4f3d21;
  @media (min-width: 1024px) {
    font-size: 18px;
    margin: 0 0.5rem 0 1rem;
  }
`;

const RecipeHeadingCount = styled.span`
  font-size: 15px;
  font-weight: 700;
  color: #545454;
  @media (min-width: 1024px) {
    font-size: 17px;
  }
`;

const RecipeList = styled.div`
  display: grid;
  margin-top: 0.5rem;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 1.5rem;
  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
    margin-top: 1.5rem;
  }
`;

const RecipeCardWrapper = styled.div`
  position: relative;
  overflow: hidden;
`;

const StyledRecipeCard = styled(RecipeCard)``;

const NonRecipeMsg = styled(NonRecipe)``;

const PaginationComponent = styled(Pagination)`
  display: none;
  @media (min-width: 1024px) {
    display: block;
  }
`;

export default UserRecipeCardList;
