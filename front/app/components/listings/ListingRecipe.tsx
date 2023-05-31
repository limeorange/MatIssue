"use client";

import React, { useState, useEffect } from "react";
import RecipeCard from "@/app/components/recipe-card/RecipeCard";
import styled from "styled-components";
import { useSearchParams } from "next/navigation";

interface Recipe {
  image: string;
  title: string;
  author: string;
  like: string;
  view: string;
  id: string;
}

const DUMMY_DATA: Recipe[] = [
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

const ListingRecipe = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>(DUMMY_DATA);
  const searchParams = useSearchParams();
  const search = searchParams.get("query"); // url의 query값 추출

  // search 값 변경시 마다 searchTerm 업데이트해서 필터된 데이터 렌더링
  useEffect(() => {
    setSearchTerm(search || "");
  }, [search]);

  // searchTerm 상태가 바뀔 때마다, 레시피를 필터링
  useEffect(() => {
    if (searchTerm !== "") {
      const filtered = DUMMY_DATA.filter((recipe) =>
        recipe.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredRecipes(filtered);
    } else {
      setFilteredRecipes(DUMMY_DATA);
    }
  }, [searchTerm]);

  return (
    <MainWrapper>
      <RecipeListWrapper>
        {filteredRecipes.map((data, index) => (
          <RecipeCard key={index} data={data} />
        ))}
      </RecipeListWrapper>
    </MainWrapper>
  );
};

export default ListingRecipe;

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
