"use client";

import styled from "styled-components";
import { useState, useEffect } from "react";
import React from "react";
import RecipeCard from "../recipe-card/RecipeCard";
import { axiosBase } from "@/app/api/axios";
import NonRecipe from "../UI/NonRecipe";
import { Recipe } from "@/app/types";
import ConfirmModal from "../UI/ConfirmModal";
import Pagination from "../pagination/Pagination";
import { useQueryClient } from "@tanstack/react-query";
import InfiniteScroll from "react-infinite-scroll-component";
import { useRecoilValue } from "recoil";
import darkModeAtom from "@/app/store/darkModeAtom";

const RecipeCards = ({
  currentUserRecipes,
}: {
  currentUserRecipes: Recipe[];
}) => {
  const client = useQueryClient();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [recipeToDelete, setRecipeToDelete] = useState<Recipe | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const recipesPerPage = 16;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 375);
  const isDarkMode = useRecoilValue(darkModeAtom);

  const handleOpenModal = (recipe: Recipe) => {
    setRecipeToDelete(recipe);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setRecipeToDelete(null);
  };

  const handleDeleteRecipe = async () => {
    if (!recipeToDelete) return;

    const id = recipeToDelete.recipe_id;

    try {
      await axiosBase.delete(`recipes/${id}`);
      console.log("레시피 삭제 요청이 성공적으로 전송되었습니다.");
      client.invalidateQueries(["currentRecipe"]);
      // setIsModalOpen(false);
    } catch (error) {
      console.error(
        "레시피 삭제 요청을 보내는 중에 오류가 발생했습니다:",
        error
      );
    }
    setIsModalOpen(false);
  };

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
    ? currentUserRecipes?.slice(0, indexOfLastRecipe)
    : currentUserRecipes?.slice(indexOfFirstRecipe, indexOfLastRecipe);

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
      <RecipeHeading isDarkMode={isDarkMode}>나의 레시피</RecipeHeading>
      <RecipeHeadingCount isDarkMode={isDarkMode}>
        {currentRecipe?.length}
      </RecipeHeadingCount>
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
                <DeleteButtonWrapper onClick={() => handleOpenModal(recipe)}>
                  <DeleteButtonImage src="/images/egg-x.svg" alt="X-box" />
                </DeleteButtonWrapper>
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
                  <DeleteButtonWrapper onClick={() => handleOpenModal(recipe)}>
                    <DeleteButtonImage src="/images/egg-x.svg" alt="X-box" />
                  </DeleteButtonWrapper>
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
      {isModalOpen && (
        <StyledConfirmModal
          icon={<AlertImage src="/images/alert.png" alt="alert" />}
          message="레시피를 삭제하시겠습니까?"
          onConfirm={handleDeleteRecipe}
          onCancel={handleCloseModal}
        />
      )}
    </RecipeListContainer>
  );
};
export default RecipeCards;

// 레시피 리스트

const RecipeListContainer = styled.div`
  width: 100%;
  margin-top: 1.8rem;
  @media (min-width: 768px) {
    margin-bottom: 7rem;
  }
  @media (min-width: 1024px) {
    margin-top: 0;
    margin-bottom: 16rem;
  }
`;

const RecipeHeading = styled.span<{ isDarkMode: boolean }>`
  font-size: 15px;
  letter-spacing: 0.01em;
  margin: 0 0.3rem 0 1rem;
  font-weight: 600;
  color: ${(props) => (props.isDarkMode ? "#fff" : "#4F3D21")};
  @media (min-width: 1024px) {
    font-size: 18px;
    margin: 0 0.5rem 0 1.9rem;
  }
`;

const RecipeHeadingCount = styled.span<{ isDarkMode: boolean }>`
  font-size: 15px;
  font-weight: 700;
  color: ${(props) => (props.isDarkMode ? "#ccc" : "#fff")};
  @media (min-width: 1024px) {
    font-size: 17px;
  }
`;

const NonRecipeMsg = styled(NonRecipe)``;

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

const DeleteButtonWrapper = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
`;

const DeleteButtonImage = styled.img`
    transition: transform 0.1s ease-in-out;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    &:hover {
      transform: scale(1.2);
    }
  }
`;

const StyledConfirmModal = styled(ConfirmModal)``;

const PaginationComponent = styled(Pagination)`
  display: none;

  @media (min-width: 1024px) {
    display: block;
  }
`;

const AlertImage = styled.img`
  width: 3rem;
  height: 3rem;
`;
