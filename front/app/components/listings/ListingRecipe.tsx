"use client";

import React, { useState, useEffect } from "react";
import RecipeCard from "@/app/components/recipe-card/RecipeCard";
import FilterBar from "../filter/FilterBar";
import styled from "styled-components";
import { useSearchParams } from "next/navigation";

type Recipe = {
  image: string;
  title: string;
  author: string;
  likes: number;
  view: string;
  id: string;
  timestamp: number;
  servings: number;
  duration: number;
  difficulty: 1 | 2 | 3;
};

type Filter = {
  servings: number;
  duration: number;
  difficulty: number;
};

export type SetFilter = React.Dispatch<React.SetStateAction<Filter>>;

const DUMMY_DATA: Recipe[] = [
  {
    image: "/images/sushi1.png",
    title: "기가 막히는 초밥 만들기",
    author: "목동최고미남정훈",
    likes: 1234,
    view: "15,324",
    id: "ex1",
    timestamp: 1,
    servings: 1,
    duration: 10,
    difficulty: 1,
  },
  {
    image: "/images/sushi2.png",
    title: "혼자 알기 아까운 후토마끼 레시피",
    author: "킹갓제너럴팀장윤수",
    likes: 1112,
    view: "15,324",
    id: "ex2",
    timestamp: 2,
    servings: 2,
    duration: 20,
    difficulty: 2,
  },
  {
    image: "/images/sushi3.png",
    title: "전여자친구가 해주던 그 맛의 유부초밥",
    author: "영앤리치톨엔인텔리",
    likes: 1134,
    view: "15,324",
    id: "ex3",
    timestamp: 3,
    servings: 3,
    duration: 30,
    difficulty: 3,
  },
  {
    image: "/images/sushi4.png",
    title: "자취생을 위한 초간단 계란 초밥",
    author: "브라우니물어",
    likes: 1435,
    view: "15,324",
    id: "ex4",
    timestamp: 4,
    servings: 4,
    duration: 60,
    difficulty: 1,
  },
  {
    image: "/images/sushi1.png",
    title: "기가 막히는 초밥 만들기",
    author: "목동최고미남정훈",
    likes: 1144,
    view: "15,324",
    id: "ex1",
    timestamp: 5,
    servings: 5,
    duration: 60,
    difficulty: 2,
  },
  {
    image: "/images/sushi2.png",
    title: "혼자 알기 아까운 후토마끼 레시피",
    author: "킹갓제너럴팀장윤수",
    likes: 1518,
    view: "15,324",
    id: "ex2",
    timestamp: 6,
    servings: 4,
    duration: 20,
    difficulty: 1,
  },
  {
    image: "/images/sushi3.png",
    title: "전여자친구가 해주던 그 맛의 유부초밥",
    author: "영앤리치톨엔인텔리",
    likes: 2324,
    view: "15,324",
    id: "ex3",
    timestamp: 8,
    servings: 3,
    duration: 30,
    difficulty: 2,
  },
  {
    image: "/images/sushi4.png",
    title: "자취생을 위한 초간단 계란 초밥",
    author: "브라우니물어",
    likes: 3324,
    view: "15,324",
    id: "ex4",
    timestamp: 11,
    servings: 2,
    duration: 10,
    difficulty: 3,
  },
  {
    image: "/images/sushi1.png",
    title: "기가 막히는 초밥 만들기",
    author: "목동최고미남정훈",
    likes: 1888,
    view: "15,324",
    id: "ex1",
    timestamp: 9,
    servings: 1,
    duration: 60,
    difficulty: 2,
  },
  {
    image: "/images/sushi2.png",
    title: "혼자 알기 아까운 후토마끼 레시피",
    author: "킹갓제너럴팀장윤수",
    likes: 1999,
    view: "15,324",
    id: "ex2",
    timestamp: 10,
    servings: 3,
    duration: 30,
    difficulty: 1,
  },
  {
    image: "/images/sushi3.png",
    title: "전여자친구가 해주던 그 맛의 유부초밥",
    author: "영앤리치톨엔인텔리",
    likes: 4324,
    view: "15,324",
    id: "ex3",
    timestamp: 14,
    servings: 2,
    duration: 20,
    difficulty: 2,
  },
  {
    image: "/images/sushi4.png",
    title: "자취생을 위한 초간단 계란 초밥",
    author: "브라우니물어",
    likes: 1098,
    view: "15,324",
    id: "ex4",
    timestamp: 12,
    servings: 5,
    duration: 60,
    difficulty: 3,
  },
  {
    image: "/images/sushi1.png",
    title: "기가 막히는 초밥 만들기",
    author: "목동최고미남정훈",
    likes: 1987,
    view: "15,324",
    id: "ex1",
    timestamp: 13,
    servings: 4,
    duration: 10,
    difficulty: 1,
  },
  {
    image: "/images/sushi2.png",
    title: "혼자 알기 아까운 후토마끼 레시피",
    author: "킹갓제너럴팀장윤수",
    likes: 1324,
    view: "15,324",
    id: "ex2",
    timestamp: 16,
    servings: 1,
    duration: 30,
    difficulty: 2,
  },
  {
    image: "/images/sushi3.png",
    title: "전여자친구가 해주던 그 맛의 유부초밥",
    author: "영앤리치톨엔인텔리",
    likes: 2343,
    view: "15,324",
    id: "ex3",
    timestamp: 15,
    servings: 2,
    duration: 20,
    difficulty: 3,
  },
  {
    image: "/images/sushi4.png",
    title: "자취생을 위한 초간단 계란 초밥",
    author: "브라우니물어",
    likes: 500,
    view: "15,324",
    id: "ex4",
    timestamp: 17,
    servings: 3,
    duration: 60,
    difficulty: 1,
  },
];

const ListingRecipe = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>(DUMMY_DATA);
  const [sortMethod, setSortMethod] = useState<"date" | "likes" | null>(null);
  const [filter, setFilter] = useState<Filter>({
    servings: 0,
    duration: 0,
    difficulty: 0,
  });
  const searchParams = useSearchParams();
  const search = searchParams.get("query"); // url의 query값 추출

  useEffect(() => {
    let result = [...DUMMY_DATA];

    // 검색바로 레시피 필터링
    const term = search || "";
    if (term !== "") {
      result = result.filter((recipe) =>
        recipe.title.toLowerCase().includes(term.toLowerCase())
      );
    }

    // 필터바로 레시피 필터링
    if (filter.servings > 0) {
      result = result.filter((recipe) => recipe.servings === filter.servings);
    }

    if (filter.duration > 0) {
      result = result.filter((recipe) => recipe.duration === filter.duration);
    }

    if (filter.difficulty > -1) {
      result = result.filter(
        (recipe) => recipe.difficulty === filter.difficulty
      );
    }

    // 버튼으로 레시피 정렬
    if (sortMethod === "date") {
      result.sort((a, b) => a.timestamp - b.timestamp);
    } else if (sortMethod === "likes") {
      result.sort((a, b) => b.likes - a.likes);
    }

    setFilteredRecipes(result);
  }, [search, filter, sortMethod]);

  return (
    <>
      <MainWrapper>
        <FilterBarBox>
          <FilterBar setFilter={setFilter} />
        </FilterBarBox>
        <PageHeaderContainer>
          <p>총 {filteredRecipes.length}개의 레시피가 있습니다.</p>
          <SortButtonContainer>
            <SortButton
              selected={sortMethod === "date"}
              onClick={() =>
                setSortMethod((prev) => (prev === "date" ? null : "date"))
              }
            >
              최신순
            </SortButton>
            <SortButton
              selected={sortMethod === "likes"}
              onClick={() =>
                setSortMethod((prev) => (prev === "likes" ? null : "likes"))
              }
            >
              인기순
            </SortButton>
          </SortButtonContainer>
        </PageHeaderContainer>
        <RecipeListWrapper>
          {filteredRecipes.map((data, index) => (
            <RecipeCard key={index} data={data} />
          ))}
        </RecipeListWrapper>
      </MainWrapper>
    </>
  );
};

export default ListingRecipe;

// styled-components
const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  max-width: 120rem;
  margin: 0 auto;
  padding: 2%;
`;

const RecipeListWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 27rem);
  row-gap: 3rem;
  column-gap: 2rem;
  justify-content: center;
`;

const PageHeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;

  & p {
    font-size: 1.55rem;
    margin-left: 1rem;
  }
`;

const SortButtonContainer = styled.div``;

const SortButton = styled.button<{ selected: boolean }>`
  padding: 0.5rem 2.5rem;
  font-size: 1.55rem;
  border-radius: 10rem;
  background-color: ${(props) => (props.selected ? "#fbd26a" : "transparent")};

  &:hover {
    background-color: #fbd26a;
  }
`;

const FilterBarBox = styled.div`
  margin: 0 auto;
`;
