"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import RecipeCard from "@/app/components/recipe-card/RecipeCard";
import FilterBar from "../filter/FilterBar";
import FilterTag from "../filter/FilterTag";
import Pagination from "../pagination/Pagination";
import styled from "styled-components";
import { useSearchParams } from "next/navigation";

// 레시피 데이터 타입
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
  difficulty: 0 | 1 | 2;
  category: string;
};

// 필터링 요소 타입
export type Filter = {
  servings: number;
  duration: number;
  difficulty: number;
};

// setFilter 함수 타입
export type SetFilter = React.Dispatch<React.SetStateAction<Filter>>;

// 필터링 옵션 타입
export type OptionsType = {
  value: number;
  name: string;
};

// 레시피 더미 데이터
const DUMMY_DATA: Recipe[] = [
  {
    image: "/images/sushi1.png",
    title: "기가 막히는 초밥 만들기",
    author: "목동최고미남정훈",
    likes: 1234,
    view: "15,324",
    id: "1",
    timestamp: 1,
    servings: 1,
    duration: 10,
    difficulty: 0,
    category: "vegetarian",
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
    difficulty: 1,
    category: "japan",
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
    difficulty: 2,
    category: "chinese",
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
    difficulty: 0,
    category: "korean",
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
    difficulty: 1,
    category: "japan",
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
    difficulty: 0,
    category: "japan",
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
    difficulty: 1,
    category: "japan",
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
    difficulty: 2,
    category: "korean",
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
    difficulty: 1,
    category: "korean",
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
    difficulty: 0,
    category: "chinese",
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
    difficulty: 1,
    category: "western",
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
    difficulty: 2,
    category: "western",
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
    difficulty: 0,
    category: "japan",
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
    difficulty: 1,
    category: "western",
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
    difficulty: 2,
    category: "chinese",
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
    difficulty: 0,
    category: "korean",
  },
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
    difficulty: 0,
    category: "japan",
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
    difficulty: 1,
    category: "chinese",
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
    difficulty: 2,
    category: "korean",
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
    difficulty: 0,
    category: "western",
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
    difficulty: 1,
    category: "chinese",
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
    difficulty: 0,
    category: "chinese",
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
    difficulty: 1,
    category: "japan",
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
    difficulty: 2,
    category: "korean",
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
    difficulty: 1,
    category: "western",
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
    difficulty: 0,
    category: "western",
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
    difficulty: 1,
    category: "chinese",
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
    difficulty: 2,
    category: "japan",
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
    difficulty: 0,
    category: "korean",
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
    difficulty: 1,
    category: "chinese",
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
    difficulty: 2,
    category: "western",
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
    difficulty: 0,
    category: "japan",
  },
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
    difficulty: 0,
    category: "korean",
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
    difficulty: 1,
    category: "chinese",
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
    difficulty: 2,
    category: "western",
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
    difficulty: 0,
    category: "japan",
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
    difficulty: 1,
    category: "western",
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
    difficulty: 0,
    category: "korean",
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
    difficulty: 1,
    category: "chinese",
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
    difficulty: 2,
    category: "japan",
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
    difficulty: 1,
    category: "western",
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
    difficulty: 0,
    category: "western",
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
    difficulty: 1,
    category: "korean",
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
    difficulty: 2,
    category: "chinese",
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
    difficulty: 0,
    category: "japan",
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
    difficulty: 1,
    category: "western",
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
    difficulty: 2,
    category: "chinese",
  },
];

// 필터링 요소 옵션
const servings = [
  { value: -1, name: "인원" },
  { value: 1, name: "1인" },
  { value: 2, name: "2인" },
  { value: 3, name: "3인" },
  { value: 4, name: "4인" },
  { value: 5, name: "5인" },
];

const duration = [
  { value: -1, name: "시간" },
  { value: 10, name: "10분" },
  { value: 20, name: "20분" },
  { value: 30, name: "30분" },
  { value: 60, name: "1시간" },
  { value: 100, name: "1시간 이상" },
];

const difficulty = [
  { value: -1, name: "난이도" },
  { value: 0, name: "쉬움" },
  { value: 1, name: "중간" },
  { value: 2, name: "어려움" },
];

// 레시피 리스트 출력 컴포넌트
const ListingRecipe = () => {
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>(DUMMY_DATA); // 레시피 데이터 필터링 상태
  const initialSortMethodState = null;
  const [sortMethod, setSortMethod] = useState<"date" | "likes" | null>(
    initialSortMethodState
  ); // 정렬 버튼에 따른 정렬 상태
  const initialFilterState = {
    servings: -1,
    duration: -1,
    difficulty: -1,
  };
  const [filter, setFilter] = useState(initialFilterState);
  const [search, setSearch] = useState<string>("");
  const [newServings, setNewServings] = useState<OptionsType>(servings[0]);
  const [newDuration, setNewDuration] = useState<OptionsType>(duration[0]);
  const [newDifficulty, setNewDifficulty] = useState<OptionsType>(
    difficulty[0]
  );
  const [currentPage, setCurrentPage] = useState<number>(1);
  const recipesPerPage = 16;
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("query"); // url의 query값 추출
  const category = searchParams.get("category");
  const router = useRouter();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const servingsFromURL = urlParams.get("servings");
    const durationFromURL = urlParams.get("duration");
    const difficultyFromURL = urlParams.get("difficulty");

    setFilter({
      servings: servingsFromURL ? parseInt(servingsFromURL) : -1,
      duration: durationFromURL ? parseInt(durationFromURL) : -1,
      difficulty: difficultyFromURL ? parseInt(difficultyFromURL) : -1,
    });
  }, []);

  // 새로고침 했을 경우 버튼 정렬상태 유지
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const sortMethodFromURL = urlParams.get("sortMethod");

    setSortMethod(
      sortMethodFromURL === "date" || sortMethodFromURL === "likes"
        ? sortMethodFromURL
        : initialSortMethodState
    );
  }, []);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    let result = [...DUMMY_DATA];
    let honmukResult: Recipe[] = [];
    let newestResult: Recipe[] = [];
    let bestResult: Recipe[] = [];

    // 검색바로 레시피 필터링
    const term = searchQuery || "";
    if (term !== "") {
      result = result.filter((recipe) =>
        recipe.title.toLowerCase().includes(term.toLowerCase())
      );
    }

    // 혼먹 카테고리 필터링
    if (category === "honmuk") {
      honmukResult = result.filter((recipe) => recipe.servings === 1);
    }

    // 최신 카테고리 필터링
    if (category === "newest") {
      newestResult = [...result].sort((a, b) => b.timestamp - a.timestamp);
    }

    // 베스트 카테고리 필터링
    if (category === "best") {
      bestResult = result
        .filter((recipe) => recipe.likes >= 1500)
        .sort((a, b) => b.timestamp - a.timestamp);
    }

    // 카테고리바 레시피 필터링
    if (category) {
      result = result.filter((recipe) =>
        recipe.category.toLowerCase().includes(category.toLowerCase())
      );
    }

    // 필터바로 레시피 필터링
    if (filter.servings > 0) {
      result = result.filter((recipe) => recipe.servings === filter.servings);
      urlParams.set("servings", filter.servings.toString());
    } else {
      urlParams.delete("servings");
    }

    if (filter.duration > 0) {
      result = result.filter((recipe) => recipe.duration === filter.duration);
      urlParams.set("duration", filter.duration.toString());
    } else {
      urlParams.delete("duration");
    }

    if (filter.difficulty > -1) {
      result = result.filter(
        (recipe) => recipe.difficulty === filter.difficulty
      );
      urlParams.set("difficulty", filter.difficulty.toString());
    } else {
      urlParams.delete("difficulty");
    }

    // URL을 변경하되 페이지는 새로고침하지 않음
    window.history.pushState(
      {},
      "",
      window.location.pathname + "?" + urlParams.toString()
    );

    // 각 카테고리 별 result 할당
    if (category === "honmuk") {
      result = honmukResult;
    } else if (category === "newest") {
      result = newestResult;
    } else if (category === "best") {
      result = bestResult;
    } else {
      result = result;
    }

    // 버튼으로 레시피 정렬
    if (sortMethod === "date") {
      result.sort((a, b) => a.timestamp - b.timestamp);
      urlParams.set("sortMethod", "date");
    } else if (sortMethod === "likes") {
      result.sort((a, b) => b.likes - a.likes);
      urlParams.set("sortMethod", "likes");
    } else {
      urlParams.delete("sortMethod");
    }

    window.history.pushState(
      {},
      "",
      window.location.pathname + "?" + urlParams.toString()
    );

    setFilteredRecipes(result);
  }, [search, searchQuery, filter, category, sortMethod]);

  // 태그 삭제 로직
  const removeTag = (tagType: string) => {
    {
      const resetValue = -1;
      if (tagType === "search" || tagType === "category") {
        router.push("/search");
      }
      if (tagType === "difficulty") {
        setNewDifficulty(difficulty[0]);
      }
      if (tagType === "servings") {
        setNewServings(servings[0]);
      }
      if (tagType === "duration") {
        setNewDuration(duration[0]);
      }

      setFilter((prevFilter: any) => ({
        ...prevFilter,
        [tagType]: resetValue,
      }));
    }
  };

  // 페이지네이션
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // 현재 페이시 데이터
  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = filteredRecipes.slice(
    indexOfFirstRecipe,
    indexOfLastRecipe
  );

  return (
    <>
      <MainWrapper>
        <FilterBarBox>
          <FilterBar
            setFilter={setFilter}
            removeTag={removeTag}
            newServings={newServings}
            setNewServings={setNewServings}
            newDuration={newDuration}
            setNewDuration={setNewDuration}
            newDifficulty={newDifficulty}
            setNewDifficulty={setNewDifficulty}
            servings={servings}
            duration={duration}
            difficulty={difficulty}
          />
        </FilterBarBox>
        <FilterTag
          search={searchQuery}
          filter={filter}
          category={category}
          onRemove={removeTag}
        />
        <PageHeaderContainer>
          <p>총 {filteredRecipes.length}개의 레시피가 있습니다.</p>
          <SortButtonContainer>
            {category !== "best" && category !== "newest" && (
              <>
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
              </>
            )}
          </SortButtonContainer>
        </PageHeaderContainer>
        <RecipeListWrapper>
          {currentRecipes.length > 0 ? (
            currentRecipes.map((data, index) => (
              <RecipeCard key={index} data={data} />
            ))
          ) : (
            <NoRecipeMessageBox>
              <NoRecipeMessage>아직 작성된 레시피가 없습니다.</NoRecipeMessage>
            </NoRecipeMessageBox>
          )}
        </RecipeListWrapper>
        <Pagination
          recipesPerPage={recipesPerPage}
          totalRecipes={filteredRecipes.length}
          paginate={paginate}
          currentPage={currentPage}
        />
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

const NoRecipeMessageBox = styled.div`
  display: grid;
  place-items: center;
  background-color: pink;
`;

const NoRecipeMessage = styled.h2`
  text-align: center;
  font-size: 16px;
  color: #9f783a;
  width: 100%;
`;
