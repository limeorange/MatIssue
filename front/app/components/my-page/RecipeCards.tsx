"use client";
import Link from "next/link";
import styled from "styled-components";
import Button from "../../components/UI/Button";
import { useState } from "react";
import React from "react";
import RecipeCard from "../recipe-card/RecipeCard";
import Image from "next/image";

interface Recipe {
  image: string;
  title: string;
  author: string;
  likes: number;
  view: string;
  id: string;
  timestamp: number;
}

const DUMMY_DATA: Recipe[] = [
  {
    image: "/images/sushi1.png",
    title: "기가 막히는 초밥 만들기",
    author: "목동최고미남정훈",
    likes: 1234,
    view: "15,324",
    id: "ex1",
    timestamp: 1,
  },
  {
    image: "/images/sushi2.png",
    title: "혼자 알기 아까운 후토마끼 레시피",
    author: "킹갓제너럴팀장윤수",
    likes: 1112,
    view: "15,324",
    id: "ex2",
    timestamp: 2,
  },
  {
    image: "/images/sushi3.png",
    title: "전여자친구가 해주던 그 맛의 유부초밥",
    author: "영앤리치톨엔인텔리",
    likes: 1134,
    view: "15,324",
    id: "ex3",
    timestamp: 3,
  },
  {
    image: "/images/sushi4.png",
    title: "자취생을 위한 초간단 계란 초밥",
    author: "브라우니물어",
    likes: 1435,
    view: "15,324",
    id: "ex4",
    timestamp: 4,
  },
  {
    image: "/images/sushi1.png",
    title: "기가 막히는 초밥 만들기",
    author: "목동최고미남정훈",
    likes: 1144,
    view: "15,324",
    id: "ex1",
    timestamp: 5,
  },
  {
    image: "/images/sushi2.png",
    title: "혼자 알기 아까운 후토마끼 레시피",
    author: "킹갓제너럴팀장윤수",
    likes: 1518,
    view: "15,324",
    id: "ex2",
    timestamp: 6,
  },
  {
    image: "/images/sushi3.png",
    title: "전여자친구가 해주던 그 맛의 유부초밥",
    author: "영앤리치톨엔인텔리",
    likes: 2324,
    view: "15,324",
    id: "ex3",
    timestamp: 8,
  },
  {
    image: "/images/sushi4.png",
    title: "자취생을 위한 초간단 계란 초밥",
    author: "브라우니물어",
    likes: 3324,
    view: "15,324",
    id: "ex4",
    timestamp: 11,
  },
  {
    image: "/images/sushi1.png",
    title: "기가 막히는 초밥 만들기",
    author: "목동최고미남정훈",
    likes: 1888,
    view: "15,324",
    id: "ex1",
    timestamp: 9,
  },
  {
    image: "/images/sushi2.png",
    title: "혼자 알기 아까운 후토마끼 레시피",
    author: "킹갓제너럴팀장윤수",
    likes: 1999,
    view: "15,324",
    id: "ex2",
    timestamp: 10,
  },
  {
    image: "/images/sushi3.png",
    title: "전여자친구가 해주던 그 맛의 유부초밥",
    author: "영앤리치톨엔인텔리",
    likes: 4324,
    view: "15,324",
    id: "ex3",
    timestamp: 14,
  },
  {
    image: "/images/sushi4.png",
    title: "자취생을 위한 초간단 계란 초밥",
    author: "브라우니물어",
    likes: 1098,
    view: "15,324",
    id: "ex4",
    timestamp: 12,
  },
  {
    image: "/images/sushi1.png",
    title: "기가 막히는 초밥 만들기",
    author: "목동최고미남정훈",
    likes: 1987,
    view: "15,324",
    id: "ex1",
    timestamp: 13,
  },
  {
    image: "/images/sushi2.png",
    title: "혼자 알기 아까운 후토마끼 레시피",
    author: "킹갓제너럴팀장윤수",
    likes: 1324,
    view: "15,324",
    id: "ex2",
    timestamp: 16,
  },
  {
    image: "/images/sushi3.png",
    title: "전여자친구가 해주던 그 맛의 유부초밥",
    author: "영앤리치톨엔인텔리",
    likes: 1324,
    view: "15,324",
    id: "ex3",
    timestamp: 15,
  },
  {
    image: "/images/sushi4.png",
    title: "자취생을 위한 초간단 계란 초밥",
    author: "브라우니물어",
    likes: 1551,
    view: "15,324",
    id: "ex4",
    timestamp: 20,
  },
];

const RecipeCards = () => {
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>(DUMMY_DATA);

  return (
    <RecipeListContainer>
      <RecipeHeading>나의 레시피</RecipeHeading>
      <RecipeHeadingCount>{filteredRecipes.length}</RecipeHeadingCount>
      <RecipeList>
        {filteredRecipes.length === 0 && (
          <div>레시피가 없습니다. 레시피를 추가해주세요!</div>
        )}
        {filteredRecipes.map((data, index) => (
          <RecipeCardWrapper key={index}>
            <StyledRecipeCard data={data} />
            <button onClick={() => console.log("Image button clicked!")}>
              <DeleteButtonImage src="/images/delete-button.png" alt="X-box" />
            </button>
          </RecipeCardWrapper>
        ))}
      </RecipeList>
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
  margin: 0 0.5rem 0 0.7rem;
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
`;

const StyledRecipeCard = styled(RecipeCard)`
  font-size: 13px !important;
`;

const DeleteButtonImage = styled.img`
  position: absolute;
  top: 21rem;
  right: 1.4rem;
  width: 1.8rem;
  height: 1.8rem;
`;
