import {
  RecipeContainer,
  StyledSubTitle,
  StyledTitle,
  StyledTitleBox,
} from "@/app/styles/main/main.style";
import styled from "styled-components";
import LargeRecipeCard from "../recipe-card/LargeRecipeCard";
import { Recipe, RecipeData } from "@/app/types";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { getAllRecipes } from "@/app/api/recipe";

const Ingredient = [
  {
    title: "식은밥",
    img: "/images/main/bob.png",
    id: 1,
  },
  {
    title: "식은밥",
    img: "/images/main/bob.png",
    id: 2,
  },
  {
    title: "식은밥",
    img: "/images/main/bob.png",
    id: 3,
  },
  {
    title: "식은밥",
    img: "/images/main/bob.png",
    id: 4,
  },
  {
    title: "식은밥",
    img: "/images/main/bob.png",
    id: 5,
  },
  {
    title: "식은밥",
    img: "/images/main/bob.png",
    id: 6,
  },
  {
    title: "식은밥",
    img: "/images/main/bob.png",
    id: 7,
  },
];

const MainFridge = () => {
  const { data: recipes, isLoading } = useQuery(["recipes2"], () =>
    getAllRecipes()
  );

  return (
    <MainFridgeContainer>
      {isLoading ? (
        <></>
      ) : (
        <>
          <FridgedTitleBox>
            <StyledTitle>당신을 위한 냉장고털이 레시피</StyledTitle>
            <StyledSubTitle>
              냉장고 속 재료로 손쉽게 훌륭한 요리를 선보이세요
            </StyledSubTitle>
          </FridgedTitleBox>
          <IngredientSelectBox>
            {Ingredient.map((item) => (
              <IngredientItem key={item.id}>
                <IngredientImageWrapper>
                  <Image src={item.img} alt="ingredient" fill />
                </IngredientImageWrapper>
                <h3>{item.title}</h3>
              </IngredientItem>
            ))}
          </IngredientSelectBox>
          <RecipeContainer>
            {recipes.slice(0, 3).map((item: Recipe) => (
              <LargeRecipeCard key={item._id} recipe={item} />
            ))}
          </RecipeContainer>
        </>
      )}
    </MainFridgeContainer>
  );
};

export default MainFridge;

const MainFridgeContainer = styled.div`
  display: none;

  @media (min-width: 1024px) {
    display: flex;
    flex-direction: column;
    padding: 6rem 0;
    text-align: center;
    width: 100%;
    background-color: #fff9de;
  }
`;

const FridgedTitleBox = styled(StyledTitleBox)`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 4rem;
`;

const IngredientSelectBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 3.5rem;
`;

const IngredientItem = styled.div`
  font-size: 16px;
`;

const IngredientImageWrapper = styled.div`
  position: relative;
  width: 5rem;
  height: 5rem;
  margin-bottom: 1rem;
`;
