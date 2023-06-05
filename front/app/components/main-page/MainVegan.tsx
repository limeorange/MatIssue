import {
  IngredientSelectBox,
  RecipeContainer,
  StyledSubTitle,
  StyledTitle,
  StyledTitleBox,
} from "@/app/styles/main/main.style";
import styled from "styled-components";
import LargeRecipeCard from "../recipe-card/LargeRecipeCard";
import { RecipeData } from "@/app/types";

const DUMMY_DATA: RecipeData[] = [
  {
    image: "/images/sushi1.png",
    title: "기가 막히는 초밥 만들기",
    author: "목동최고미남정훈",
    likes: 1234,
    view: "15,324",

    id: "1",
  },
  {
    image: "/images/sushi2.png",
    title: "기가 막히는 초밥 만들기",
    author: "목동최고미남정훈",
    likes: 1234,
    view: "15,324",
    id: "2",
  },
  {
    image: "/images/sushi3.png",
    title: "기가 막히는 초밥 만들기",
    author: "목동최고미남정훈",
    likes: 1234,
    view: "15,324",
    id: "3",
  },
];

const MainVegan = () => {
  return (
    <MainVegunContainer>
      <VegunTitleBox>
        <StyledTitle>당신을 위한 냉장고털이 레시피</StyledTitle>
        <StyledSubTitle>
          냉장고 속 재료로 손쉽게 훌륭한 요리를 선보이세요
        </StyledSubTitle>
      </VegunTitleBox>
      <RecipeContainer>
        {DUMMY_DATA.map((item) => (
          <LargeRecipeCard key={item.id} recipe={item} />
        ))}
      </RecipeContainer>
    </MainVegunContainer>
  );
};

export default MainVegan;

const MainVegunContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 6rem 0;
  text-align: center;
  width: 100%;
  background-color: #e8ffe8;
`;

const VegunTitleBox = styled(StyledTitleBox)`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0;
`;
