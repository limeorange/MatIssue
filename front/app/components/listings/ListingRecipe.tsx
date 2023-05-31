"use client";

import React, { useState, useEffect } from "react";
import RecipeCard from "@/app/components/recipe-card/RecipeCard";
import styled from "styled-components";
import { useSearchParams } from "next/navigation";

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

const ListingRecipe = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>(DUMMY_DATA);
  const searchParams = useSearchParams();
  const search = searchParams.get("query"); // url의 query값 추출
  const [sortMethod, setSortMethod] = useState<"date" | "likes" | null>(null);

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

  // 정렬 버튼 클릭 시 최신순, 인기순으로 게시물 렌더링
  useEffect(() => {
    let sortedRecipes = [...DUMMY_DATA];

    if (sortMethod === "date") {
      sortedRecipes.sort((a, b) => a.timestamp - b.timestamp);
    } else if (sortMethod === "likes") {
      sortedRecipes.sort((a, b) => b.likes - a.likes);
    }
    setFilteredRecipes(sortedRecipes);
  }, [sortMethod]);

  return (
    <>
      <MainWrapper>
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
