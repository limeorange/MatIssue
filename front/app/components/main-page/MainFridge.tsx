import {
  RecipeContainer,
  StyledSubTitle,
  StyledTitle,
  StyledTitleBox,
} from "@/app/styles/main/main.style";
import styled from "styled-components";
import LargeRecipeCard from "../recipe-card/LargeRecipeCard";
import { RecipeData } from "@/app/types";
import Image from "next/image";

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
          <IngredientItem key={item.id}>
            <IngredientImageWrapper>
              <Image src={item.img} alt="ingredient" fill />
            </IngredientImageWrapper>
            <h3>{item.title}</h3>
          </IngredientItem>
        ))}
      </IngredientSelectBox>
      <RecipeContainer>
        {DUMMY_DATA.map((item) => (
          <LargeRecipeCard key={item.id} recipe={item} />
        ))}
      </RecipeContainer>
    </MainFridgeContainer>
  );
};

export default MainFridge;

const MainFridgeContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 6rem 0;
  text-align: center;
  width: 100%;
  background-color: #fff9de;
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
  width: 9rem;
  height: 9rem;
  margin-bottom: 1rem;
`;
