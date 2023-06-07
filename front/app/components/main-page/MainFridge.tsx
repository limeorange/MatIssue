import {
  RecipeContainer,
  StyledSubTitle,
  StyledTitle,
  StyledTitleBox,
} from "@/app/styles/main/main.style";
import styled from "styled-components";
import LargeRecipeCard from "../recipe-card/main/MainLargeRecipeCard";
import { Recipe } from "@/app/types";
import Image from "next/image";
import { useEffect, useState } from "react";

const Ingredient = [
  {
    title: "소금",
    img: "/images/main/bob.png",
    id: 1,
  },
  {
    title: "참치",
    img: "/images/main/bob.png",
    id: 2,
  },
  {
    title: "스팸",
    img: "/images/main/bob.png",
    id: 3,
  },
  {
    title: "양파",
    img: "/images/main/bob.png",
    id: 4,
  },
  {
    title: "파",
    img: "/images/main/bob.png",
    id: 5,
  },
  {
    title: "김치",
    img: "/images/main/bob.png",
    id: 6,
  },
  {
    title: "삼겹살",
    img: "/images/main/bob.png",
    id: 7,
  },
];

const MainFridge = ({ recipes }: { recipes: Recipe[] }) => {
  const [selectedIngredient, setSelectedIngredient] = useState<string>("소금");
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>(recipes);

  // 레시피 재료에 선택한 재료가 들어간 레시피들 필터링 후 랜덤정렬
  useEffect(() => {
    const filteredRecipes = recipes?.filter((recipe: Recipe) =>
      recipe.recipe_ingredients.some(
        (ingredient) => ingredient.name === selectedIngredient
      )
    );
    const randomSelection = filteredRecipes.sort(() => 0.5 - Math.random());

    setFilteredRecipes(randomSelection);
  }, [selectedIngredient, recipes]);

  /**  재료 선택 핸들러 */
  const ingredientSelectHandler: React.MouseEventHandler<HTMLButtonElement> = (
    e
  ) => {
    e.preventDefault();
    setSelectedIngredient(e.currentTarget.id);
  };

  return (
    <MainFridgeContainer>
      <FridgedTitleBox>
        <StyledTitle>당신을 위한 냉장고털이 레시피</StyledTitle>
        <StyledSubTitle>
          냉장고 속 재료로 손쉽게 훌륭한 요리를 선보이세요
        </StyledSubTitle>
      </FridgedTitleBox>
      <IngredientSelectBox>
        {Ingredient.map((item) => (
          <IngredientButton
            type="button"
            key={item.id}
            id={item.title}
            checked={selectedIngredient === item.title}
            onClick={ingredientSelectHandler}
          >
            <IngredientImageWrapper>
              <Image src={item.img} alt="ingredient" fill />
            </IngredientImageWrapper>
            <h3>{item.title}</h3>
          </IngredientButton>
        ))}
      </IngredientSelectBox>
      {filteredRecipes?.length === 0 ? (
        <div>레시피가 없어요 ㅠㅠ</div>
      ) : (
        <RecipeContainer>
          {filteredRecipes.slice(0, 3).map((item: Recipe) => (
            <LargeRecipeCard key={item._id} recipe={item} />
          ))}
        </RecipeContainer>
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
  padding-top: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 3.5rem;
`;

const IngredientButton = styled.button<{ checked: boolean }>`
  font-size: 16px;
  opacity: ${(props) => (props.checked ? 1 : 0.4)};

  transition: opacity 0.3s;
`;

const IngredientImageWrapper = styled.div`
  position: relative;
  width: 5rem;
  height: 5rem;
  margin-bottom: 1rem;
`;
