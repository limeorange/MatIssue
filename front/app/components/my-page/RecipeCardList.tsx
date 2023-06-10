import styled from "styled-components";
import { useState } from "react";
import React from "react";
import RecipeCard from "../recipe-card/RecipeCard";
import { axiosBase } from "@/app/api/axios";
import NonRecipe from "../UI/NonRecipe";
import { Recipe } from "@/app/types";
import ConfirmModal from "../UI/ConfirmModal";
import Pagination from "../pagination/Pagination";
import { useQueryClient } from "@tanstack/react-query";

const RecipeCards = ({
  currentUserRecipes,
}: {
  currentUserRecipes: Recipe[];
}) => {
  const client = useQueryClient();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [recipeToDelete, setRecipeToDelete] = useState<Recipe | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const recipesPerPage = 12;

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
      client.invalidateQueries(["currentUserRecipes"]);
      // setIsModalOpen(false);
    } catch (error) {
      console.error(
        "레시피 삭제 요청을 보내는 중에 오류가 발생했습니다:",
        error
      );
    }
    setIsModalOpen(false);
  };

  // 페이지네이션
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // 현재 페이지 데이터
  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = currentUserRecipes?.slice(
    indexOfFirstRecipe,
    indexOfLastRecipe
  );

  return (
    <RecipeListContainer>
      <RecipeHeading>나의 레시피</RecipeHeading>
      <RecipeHeadingCount>{currentUserRecipes?.length}</RecipeHeadingCount>
      {currentUserRecipes?.length === 0 ? (
        <NonRecipeMsg />
      ) : (
        <RecipeList>
          {currentUserRecipes?.map((recipe: Recipe) => (
            <RecipeCardWrapper key={recipe.recipe_id}>
              <StyledRecipeCard recipe={recipe} />
              <button onClick={() => handleOpenModal(recipe)}>
                <DeleteButtonImage src="/images/x-box.png" alt="X-box" />
              </button>
            </RecipeCardWrapper>
          ))}
        </RecipeList>
      )}
      {isModalOpen && (
        <StyledConfirmModal
          icon={<AlertImage src="/images/alert.png" alt="alert" />}
          message="레시피를 삭제하시겠습니까?"
          onConfirm={handleDeleteRecipe}
          onCancel={handleCloseModal}
        />
      )}
      {currentUserRecipes?.length > 0 && (
        <PaginationComponent
          recipesPerPage={recipesPerPage}
          totalRecipes={currentUserRecipes?.length}
          paginate={paginate}
          currentPage={currentPage}
        />
      )}
    </RecipeListContainer>
  );
};
export default RecipeCards;

// 레시피 리스트

const RecipeListContainer = styled.div`
  width: 100%;
`;

const RecipeHeading = styled.span`
  font-size: 18px;
  letter-spacing: 0.01em;
  margin: 0 0.5rem 0 1.9rem;
  font-weight: 600;
  color: #4f3d21;
`;

const RecipeHeadingCount = styled.span`
  font-size: 17px;
  font-weight: 700;
  color: #545454;
`;

const RecipeList = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  margin-top: 1.5rem;
`;

const RecipeCardWrapper = styled.div`
  position: relative;
  overflow: hidden;
`;

const StyledRecipeCard = styled(RecipeCard)``;

const DeleteButtonImage = styled.img`
  position: absolute;
  top: 21rem;
  right: 1.5rem;
  width: 1.8rem;
  height: 1.8rem;
  transition: transform 0.1s ease-in-out;
  &:hover {
    transform: scale(1.2);
  }
`;

const NonRecipeMsg = styled(NonRecipe)``;

const StyledConfirmModal = styled(ConfirmModal)``;

const AlertImage = styled.img`
  width: 3rem;
  height: 3rem;
`;

const PaginationComponent = styled(Pagination)``;
