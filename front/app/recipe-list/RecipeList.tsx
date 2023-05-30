"use client";

import RecipeCard from "../components/recipe-card/RecipeCard";
import styled from "styled-components";

const DUMMY_DATA = [
  {
    image: "/images/sushi1.png",
    title: "기가 막히는 초밥 만들기",
    author: "목동최고미남정훈",
    like: "1,324",
    view: "15,324",
    id: "ex1",
  },
  {
    image: "/images/sushi2.png",
    title: "혼자 알기 아까운 후토마끼 레시피",
    author: "킹갓제너럴팀장윤수",
    like: "1,324",
    view: "15,324",
    id: "ex2",
  },
  {
    image: "/images/sushi3.png",
    title: "전여자친구가 해주던 그 맛의 유부초밥",
    author: "영앤리치톨엔인텔리",
    like: "1,324",
    view: "15,324",
    id: "ex3",
  },
  {
    image: "/images/sushi4.png",
    title: "자취생을 위한 초간단 계란 초밥",
    author: "브라우니물어",
    like: "1,324",
    view: "15,324",
    id: "ex4",
  },
  {
    image: "/images/sushi1.png",
    title: "기가 막히는 초밥 만들기",
    author: "목동최고미남정훈",
    like: "1,324",
    view: "15,324",
    id: "ex1",
  },
  {
    image: "/images/sushi2.png",
    title: "혼자 알기 아까운 후토마끼 레시피",
    author: "킹갓제너럴팀장윤수",
    like: "1,324",
    view: "15,324",
    id: "ex2",
  },
  {
    image: "/images/sushi3.png",
    title: "전여자친구가 해주던 그 맛의 유부초밥",
    author: "영앤리치톨엔인텔리",
    like: "1,324",
    view: "15,324",
    id: "ex3",
  },
  {
    image: "/images/sushi4.png",
    title: "자취생을 위한 초간단 계란 초밥",
    author: "브라우니물어",
    like: "1,324",
    view: "15,324",
    id: "ex4",
  },
  {
    image: "/images/sushi1.png",
    title: "기가 막히는 초밥 만들기",
    author: "목동최고미남정훈",
    like: "1,324",
    view: "15,324",
    id: "ex1",
  },
  {
    image: "/images/sushi2.png",
    title: "혼자 알기 아까운 후토마끼 레시피",
    author: "킹갓제너럴팀장윤수",
    like: "1,324",
    view: "15,324",
    id: "ex2",
  },
  {
    image: "/images/sushi3.png",
    title: "전여자친구가 해주던 그 맛의 유부초밥",
    author: "영앤리치톨엔인텔리",
    like: "1,324",
    view: "15,324",
    id: "ex3",
  },
  {
    image: "/images/sushi4.png",
    title: "자취생을 위한 초간단 계란 초밥",
    author: "브라우니물어",
    like: "1,324",
    view: "15,324",
    id: "ex4",
  },
  {
    image: "/images/sushi1.png",
    title: "기가 막히는 초밥 만들기",
    author: "목동최고미남정훈",
    like: "1,324",
    view: "15,324",
    id: "ex1",
  },
  {
    image: "/images/sushi2.png",
    title: "혼자 알기 아까운 후토마끼 레시피",
    author: "킹갓제너럴팀장윤수",
    like: "1,324",
    view: "15,324",
    id: "ex2",
  },
  {
    image: "/images/sushi3.png",
    title: "전여자친구가 해주던 그 맛의 유부초밥",
    author: "영앤리치톨엔인텔리",
    like: "1,324",
    view: "15,324",
    id: "ex3",
  },
  {
    image: "/images/sushi4.png",
    title: "자취생을 위한 초간단 계란 초밥",
    author: "브라우니물어",
    like: "1,324",
    view: "15,324",
    id: "ex4",
  },
];

const RecipeList = () => {
  return (
    <MainWrapper>
      <RecipeListWrapper>
        {DUMMY_DATA.map((data, index) => (
          <RecipeCard key={index} data={data} />
        ))}
      </RecipeListWrapper>
    </MainWrapper>
  );
};

export default RecipeList;

// styled-components
const MainWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const RecipeListWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 270px);
  row-gap: 30px;
  column-gap: 20px;
`;
