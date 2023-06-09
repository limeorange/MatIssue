"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import RecipeCard from "@/app/components/recipe-card/RecipeCard";
import FilterBar from "../filter/FilterBar";
import FilterTag from "../filter/FilterTag";
import Pagination from "../pagination/Pagination";
import NonRecipePage from "../UI/NonRecipe";
import styled from "styled-components";
import { useSearchParams } from "next/navigation";
import { Recipe } from "@/app/types";

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
  { value: 61, name: "1시간 이상" },
];

const difficulty = [
  { value: -1, name: "난이도" },
  { value: 0, name: "쉬움" },
  { value: 1, name: "중간" },
  { value: 2, name: "어려움" },
];

// 레시피 리스트 출력 컴포넌트
const ListingRecipe = ({ recipes }: { recipes: Recipe[] }) => {
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>(recipes); // 레시피 데이터 필터링 상태
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
  const searchQuery = searchParams?.get("query"); // url의 query값 추출
  const category = searchParams?.get("category");
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
    let result = [...recipes];
    // let honmukResult: Recipe[] = [];
    // let newestResult: Recipe[] = [];
    // let bestResult: Recipe[] = [];

    // 검색바로 레시피 필터링
    // const term = searchQuery || "";
    // if (term !== "") {
    //   result = result.filter((recipe) =>
    //     recipe.recipe_title.toLowerCase().includes(term.toLowerCase())
    //   );
    // }

    // 혼먹 카테고리 필터링
    // if (category === "honmuk") {
    //   honmukResult = result.filter(
    //     (recipe) => recipe.recipe_info.serving === 1
    //   );
    // }

    // 최신 카테고리 필터링
    // if (category === "newest") {
    //   newestResult = [...result].sort(
    //     (a, b) =>
    //       new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    //   );
    // }

    // // 베스트 카테고리 필터링
    // if (category === "best") {
    //   bestResult = result
    //     .filter((recipe) => recipe.recipe_like >= 1500)
    //     .sort((a, b) => +b.created_at - +a.created_at);
    // }

    // // 카테고리바 레시피 필터링
    // if (category) {
    //   result = result.filter((recipe) =>
    //     recipe.recipe_category.toLowerCase().includes(category.toLowerCase())
    //   );
    // }

    // 필터바로 레시피 필터링
    if (filter.servings > 0) {
      result = result.filter(
        (recipe) => recipe.recipe_info?.serving === filter.servings
      );
      urlParams.set("servings", filter.servings.toString());
    } else {
      urlParams.delete("servings");
    }

    if (filter.duration > 0) {
      result = result.filter(
        (recipe) => recipe.recipe_info?.time === filter.duration
      );
      urlParams.set("duration", filter.duration.toString());
    } else {
      urlParams.delete("duration");
    }

    if (filter.difficulty > -1) {
      result = result.filter(
        (recipe) => recipe.recipe_info?.level === filter.difficulty
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
    // if (category === "honmuk") {
    //   result = honmukResult;
    // } else if (category === "newest") {
    //   result = newestResult;
    // } else if (category === "best") {
    //   result = bestResult;
    // } else {
    //   result = result;
    // }

    // 버튼으로 레시피 정렬
    if (sortMethod === "date") {
      result.sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
      urlParams.set("sortMethod", "date");
    } else if (sortMethod === "likes") {
      result.sort((a, b) => b.recipe_like - a.recipe_like);
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
  }, [search, searchQuery, filter, category, sortMethod, recipes]);

  // 태그 삭제 로직
  const removeTag = (tagType: string) => {
    {
      const resetValue = -1;
      if (tagType === "search" || tagType === "category") {
        router.push("/recipes/search");
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

  // 현재 페이지 데이터
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
        {/* <FilterTag
          search={searchQuery}
          filter={filter}
          category={category}
          onRemove={removeTag}
        /> */}
        <PageHeaderContainer>
          <p>총 {filteredRecipes.length}개의 레시피가 있습니다.</p>
          <SortButtonContainer>
            {category !== "best" &&
              category !== "newest" &&
              currentRecipes.length > 0 && (
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
                      setSortMethod((prev) =>
                        prev === "likes" ? null : "likes"
                      )
                    }
                  >
                    인기순
                  </SortButton>
                </>
              )}
          </SortButtonContainer>
        </PageHeaderContainer>
        {currentRecipes.length > 0 ? (
          <>
            <RecipeListWrapper>
              {currentRecipes.map((data, index) => (
                <RecipeCard key={index} recipe={data} />
              ))}
            </RecipeListWrapper>
            <Pagination
              recipesPerPage={recipesPerPage}
              totalRecipes={filteredRecipes.length}
              paginate={paginate}
              currentPage={currentPage}
            />
          </>
        ) : (
          <NonRecipePage />
        )}
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
