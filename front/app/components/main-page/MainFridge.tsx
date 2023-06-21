"use client";

import styled from "styled-components";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllRecipes } from "@/app/api/recipe";

import shuffleRecipes from "@/app/utils/shuffleRecipes";
import LoadingRecipe from "../UI/LoadingRecipe";
import NonDataCrying from "../UI/NonDataCrying";
import NonRecipeCrying from "../UI/NonRecipeCrying";
import LargeRecipeCard from "../recipe-card/main/MainLargeRecipeCard";

import {
  RecipeContainer,
  StyledSubTitle,
  StyledTitle,
  StyledTitleBox,
} from "@/app/styles/main/main.style";
import { Recipe } from "@/app/types";
import { useRecoilValue } from "recoil";
import darkModeAtom from "@/app/store/darkModeAtom";

const Ingredient = [
  {
    title: "계란",
    img: "/images/main/fridge/egg.png",
    id: 1,
  },
  {
    title: "치즈",
    img: "/images/main/fridge/cheese.png",
    id: 2,
  },
  {
    title: "감자",
    img: "/images/main/fridge/potato.png",
    id: 3,
  },
  {
    title: "버섯",
    img: "/images/main/fridge/mushroom.png",
    id: 4,
  },
  {
    title: "양파",
    img: "/images/main/fridge/onion.png",
    id: 5,
  },
  {
    title: "김치",
    img: "/images/main/fridge/kimchi.png",
    id: 6,
  },
  {
    title: "밥",
    img: "/images/main/fridge/rice.png",
    id: 7,
  },
];

const MainFridge = () => {
  const {
    data: recipes,
    isLoading,
    isError,
  } = useQuery<Recipe[]>(["recipes"], () => getAllRecipes(), {
    retry: 0,
    initialData: [],
  });

  const [selectedIngredient, setSelectedIngredient] = useState<string>("계란");
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>(recipes);
  const isDarkMode = useRecoilValue(darkModeAtom);

  // 레시피 재료에 선택한 재료가 들어간 레시피들 필터링 후 랜덤정렬
  useEffect(() => {
    const filteredRecipes = recipes?.filter((recipe: Recipe) =>
      recipe.recipe_ingredients.some(
        (ingredient) => ingredient.name === selectedIngredient
      )
    );

    const shuffledRecipes = shuffleRecipes(filteredRecipes);

    setFilteredRecipes(shuffledRecipes);
  }, [selectedIngredient, recipes]);

  /**  재료 선택 핸들러 */
  const ingredientSelectHandler: React.MouseEventHandler<HTMLButtonElement> = (
    e
  ) => {
    e.preventDefault();
    setSelectedIngredient(e.currentTarget.id);
  };

  if (isLoading) {
    return <LoadingRecipe />;
  }

  return (
    <MainFridgeContainer isDarkMode={isDarkMode}>
      <StyledTitleBox>
        <StyledTitle>당신을 위한 냉장고털이 레시피</StyledTitle>
        <StyledSubTitle>
          냉장고 속 재료로 손쉽게 훌륭한 요리를 선보이세요
        </StyledSubTitle>
      </StyledTitleBox>
      <IngredientSelectBox>
        {Ingredient.map((item) => (
          <IngredientButton
            type="button"
            key={item.id}
            id={item.title}
            checked={selectedIngredient === item.title}
            onClick={ingredientSelectHandler}
          >
            <IngredientImageWrapper
              checked={selectedIngredient === item.title}
              isDarkMode={isDarkMode}
            >
              <Image src={item.img} alt="ingredient" width={35} height={35} />
            </IngredientImageWrapper>
            <h2>{item.title}</h2>
          </IngredientButton>
        ))}
      </IngredientSelectBox>
      {isError ? (
        <NonDataCrying />
      ) : filteredRecipes.length === 0 && !isError ? (
        <NonRecipeCrying />
      ) : (
        <RecipeContainer>
          {filteredRecipes?.slice(0, 3).map((item: Recipe) => (
            <LargeRecipeCard key={item.recipe_id} recipe={item} />
          ))}
        </RecipeContainer>
      )}
    </MainFridgeContainer>
  );
};

export default MainFridge;

const MainFridgeContainer = styled.div<{ isDarkMode: boolean }>`
  display: none;

  @media (min-width: 1024px) {
    display: flex;
    flex-direction: column;
    padding: 6rem 0;
    text-align: center;
    width: 100%;
    background-color: ${(props) =>
      props.isDarkMode ? props.theme.navy : "#fff9de"};
  }
`;

const IngredientSelectBox = styled.div`
  padding-top: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 3.5rem;
`;

const IngredientButton = styled.button<{ checked: boolean }>`
  font-size: 16px;
  opacity: ${(props) => (props.checked ? 1 : 0.6)};

  font-weight: ${(props) => (props.checked ? "600" : "400")};

  transition: opacity 0.3s;
`;

const IngredientImageWrapper = styled.div<{
  checked: boolean;
  isDarkMode: boolean;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 5rem;
  height: 5rem;
  margin-bottom: 1rem;
  border-radius: 50rem;
  background-color: ${(props) =>
    props.isDarkMode
      ? props.checked
        ? "#ddd"
        : "#aaa"
      : props.checked
      ? "#444"
      : "#aaa"};
`;
