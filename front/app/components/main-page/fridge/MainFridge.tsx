import {
  StyledSubTitle,
  StyledTitle,
  StyledTitleBox,
} from "@/app/styles/main/main.style";
import styled from "styled-components";
import LargeRecipeCard from "../../recipe-card/LargeRecipeCard";

const DUMMY_DATA: Recipe[] = [
  {
    image: "/images/sushi1.png",
    title: "기가 막히는 초밥 만들기",
    author: "목동최고미남정훈",
    likes: 1234,
    view: "15,324",

    id: 1,
  },
  {
    image: "/images/sushi1.png",
    title: "기가 막히는 초밥 만들기",
    author: "목동최고미남정훈",
    likes: 1234,
    view: "15,324",
    id: 2,
  },
  {
    image: "/images/sushi1.png",
    title: "기가 막히는 초밥 만들기",
    author: "목동최고미남정훈",
    likes: 1234,
    view: "15,324",
    id: 3,
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
  padding-top: 0;
  padding-bottom: 4rem;
`;

const RecipeContainer = styled.div`
  width: 100%;
  max-width: 105rem;
  margin: 0 auto;
  padding: 0 2rem;
  display: grid;
  grid-template-columns: repeat(3, auto);
  gap: 5rem;
`;
