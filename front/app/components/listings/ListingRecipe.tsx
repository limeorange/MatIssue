"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import RecipeCard from "@/app/components/recipe-card/RecipeCard";
import FilterBar from "../filter/FilterBar";
import FilterTag from "../filter/FilterTag";
import Pagination from "../pagination/Pagination";
import NonRecipePage from "../UI/NonRecipe";
import InfiniteScroll from "react-infinite-scroll-component";
import styled from "styled-components";
import { useSearchParams } from "next/navigation";
import { Recipe } from "@/app/types";
import darkModeAtom from "@/app/store/darkModeAtom";
import { useRecoilState } from "recoil";

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
  // 다크모드 상태
  const [isDarkMode, setIsDarkMode] = useRecoilState(darkModeAtom);

  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>(recipes); // 레시피 데이터 필터링 상태

  // 최신, 인기순 버튼 정렬 기본 상태 null로 설정
  const initialSortMethodState = null;

  // 정렬 버튼 상태
  const [sortMethod, setSortMethod] = useState<"date" | "likes" | null>(
    initialSortMethodState
  );

  // 필터바 기본 상태 -1로 설정
  const initialFilterState = {
    servings: -1,
    duration: -1,
    difficulty: -1,
  };

  // 필터바 필터링 상태
  const [filter, setFilter] = useState(initialFilterState);

  // 무한스크롤 로딩 상태
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // 모바일 상태, 화면 너비 768px 이하의 경우 모바일
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // 인원수, 조리시간, 난이도 필터링 상태
  const [newServings, setNewServings] = useState<OptionsType>(servings[0]);
  const [newDuration, setNewDuration] = useState<OptionsType>(duration[0]);
  const [newDifficulty, setNewDifficulty] = useState<OptionsType>(
    difficulty[0]
  );

  // 현재 페이지 설정 상태 (기본 1페이지)
  const [currentPage, setCurrentPage] = useState<number>(1);

  // 페이지당 출력 레시피 (16개)
  const recipesPerPage = 16;

  // url의 params 값 사용
  const searchParams = useSearchParams();

  // url의 query값 추출
  const searchQuery = searchParams?.get("query");

  // url의 category값 추출
  const category = searchParams?.get("category");

  const router = useRouter();

  // urlParams에서 값 불러와 필터링, 이전 설정 값 있을 경우 ? 그 값 사용 : 새로 필터링
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const servingsFromURL = urlParams.get("servings");
    const durationFromURL = urlParams.get("duration");
    const difficultyFromURL = urlParams.get("difficulty");

    setFilter((prevFilter) => ({
      ...prevFilter,
      servings: servingsFromURL
        ? parseInt(servingsFromURL)
        : prevFilter.servings,
      duration: durationFromURL
        ? parseInt(durationFromURL)
        : prevFilter.duration,
      difficulty: difficultyFromURL
        ? parseInt(difficultyFromURL)
        : prevFilter.difficulty,
    }));
  }, []);

  // urlParams에서 정렬 값 불러와서 레시피 정렬
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const sortMethodFromURL = urlParams.get("sortMethod");

    setSortMethod(
      sortMethodFromURL === "date" || sortMethodFromURL === "likes"
        ? sortMethodFromURL
        : initialSortMethodState
    );
  }, []);

  // 필터바 및 정렬버튼 로직
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    let result = [...recipes];

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

    // 버튼으로 레시피 정렬
    if (sortMethod === "date") {
      result.sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
      urlParams.set("sortMethod", "date");
    } else if (sortMethod === "likes") {
      result.sort((a, b) => b.recipe_like.length - a.recipe_like.length);
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
  }, [filter, sortMethod, recipes]);

  // 모바일 스크롤 이벤트
  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth <= 768);
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 필터 태그 삭제 로직
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

  // 현재 페이지 데이터 계산
  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;

  // 모바일에서는 처음부터 현재 페이지의 마지막 레시피까지의 모든 레시피들을 포함
  const currentRecipes = isMobile
    ? filteredRecipes.slice(0, indexOfLastRecipe)
    : filteredRecipes.slice(indexOfFirstRecipe, indexOfLastRecipe); // 데스크탑에서는 현재 페이지의 레시피들만 포함

  // 레시피 추가 로딩 함수
  const fetchMoreRecipes = async () => {
    // 페이지 증가
    setCurrentPage((prev) => prev + 1);
    setIsLoading(true);

    // 데이터 로딩 시간 설정
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsLoading(false);
  };

  // 무한 스크롤 사용 가능 여부
  const hasMore = currentPage * recipesPerPage < filteredRecipes.length;

  return (
    <>
      <MainLayout>
        <div>
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
        </div>
        <FilterTag
          search={searchQuery}
          filter={filter}
          category={category}
          onRemove={removeTag}
        />
        <PageHeaderContainer>
          {currentRecipes.length > 0 && (
            <p>
              총&nbsp;
              <span
                style={{
                  color: "#F8B551",
                  fontWeight: "bold",
                  fontSize: "17px",
                }}
              >
                {filteredRecipes.length}
              </span>
              개의 레시피가 있습니다.
            </p>
          )}
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
                    isDarkMode={isDarkMode}
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
                    isDarkMode={isDarkMode}
                  >
                    인기순
                  </SortButton>
                </>
              )}
          </SortButtonContainer>
        </PageHeaderContainer>
        {currentRecipes.length > 0 ? (
          isMobile ? (
            <InfiniteScroll
              dataLength={currentRecipes.length}
              next={fetchMoreRecipes}
              hasMore={hasMore}
              loader={<h4>Loading...</h4>}
              scrollThreshold={0.5}
              endMessage={
                <p
                  style={{
                    fontSize: "16px",
                    textAlign: "center",
                    margin: "2rem",
                    color: isDarkMode ? "#FFF1C0" : "#F8B551",
                  }}
                >
                  <b>{`마지막 레시피 입니다 :)`}</b>
                </p>
              }
            >
              <RecipeListWrapper>
                {currentRecipes.map((data, index) => (
                  <RecipeCard key={index} recipe={data} />
                ))}
              </RecipeListWrapper>
            </InfiniteScroll>
          ) : (
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
          )
        ) : (
          <NonRecipePage />
        )}
      </MainLayout>
    </>
  );
};

export default ListingRecipe;

const MainLayout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  max-width: 120rem;
  margin: 0 auto;
  margin-bottom: 2rem;
  padding: 0 1.5rem;
  padding-top: 1.5rem;

  @media (min-width: 768px) {
    margin-bottom: 16rem;
  }
`;

const RecipeListWrapper = styled.div`
  display: grid;
  row-gap: 1.5rem;
  column-gap: 1.5rem;
  justify-content: center;
  grid-template-columns: repeat(2, minmax(0, 1fr));

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
`;

const PageHeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 1rem 0.5rem;
  align-items: center;
  text-align: center;

  & p {
    font-size: 15.5px;

    @media (min-width: 1024px) {
      padding: 0 1.5rem;
    }
  }

  @media (min-width: 1024px) {
    align-items: left;
    margin-top: 0;
  }
`;

const SortButtonContainer = styled.div`
  display: flex;
  gap: 0.75rem;

  @media (min-width: 1024px) {
    padding: 0 1.5rem;
  }
`;

const SortButton = styled.button<{ selected: boolean; isDarkMode: boolean }>`
  padding: 0.5rem 0 0.5rem 0.5rem;
  font-size: 15.5px;
  color: ${(props) =>
    props.selected
      ? props.isDarkMode
        ? props.theme.lightYellow
        : props.theme.yellow
      : "normal"};

  font-weight: ${(props) => (props.selected ? "bold" : "normal")};

  @media (min-width: 768px) {
    margin: 0.5rem;
    padding: 0.5rem 2.5rem;
    color: ${(props) =>
      props.selected
        ? props.isDarkMode
          ? props.theme.deepNavy
          : props.theme.brown
        : "normal"};
    font-weight: normal;
    border-radius: 10rem;
    background-color: ${(props) =>
      props.selected
        ? props.isDarkMode
          ? props.theme.lightYellow
          : props.theme.yellow
        : "transparent"};

    &:hover {
      background-color: ${(props) =>
        props.isDarkMode ? props.theme.lightYellow : props.theme.yellow};
      color: ${(props) =>
        props.isDarkMode ? props.theme.deepNavy : props.theme.brown};
    }
  }
`;
