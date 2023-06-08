"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import styled from "styled-components";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import {
  StyledContentsArea,
  ListingRecipeContainer,
  StyledContainer,
  StyledList,
  StyledTitle,
  StyledTitleBox,
} from "@/app/styles/main/main.style";
import { Recipe } from "@/app/types";
import MainRecipeCard from "../recipe-card/main/MainRecipeCard";
import { useQuery } from "@tanstack/react-query";
import { getRecipesByPopularity } from "@/app/api/recipe";
import NonRecipeCrying from "../UI/NonRecipeCrying";

const MainBest = ({ initialBestRecipes }: { initialBestRecipes: Recipe[] }) => {
  /*  베스트 레시피 데이터를 리액트쿼리를 사용해서 캐시로 관리
  초기값은 서버에서 받아온 데이터를 넣고, 클라이언트에서 데이터를 업데이트하면 리패치함 */
  const { data: bestRecipes } = useQuery<Recipe[]>(
    ["bestRecipes"],
    () => getRecipesByPopularity(),
    {
      refetchOnWindowFocus: false, // 우리 페이지 focus할때마다 리패치 여부
      retry: 0, // 데이터 패치 실패할때 재시도 횟수
      initialData: initialBestRecipes, // 데이터 초기값 지정 (page.tsx 에서 패치해온 값)
    }
  );

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [filter, setFilter] = useState<"일간" | "주간" | "월간">("일간");
  const [filteredBestRecipes, setFilteredBestRecipes] =
    useState<Recipe[]>(bestRecipes);

  const contentsPerPage = 8;
  const totalPage = bestRecipes.length / contentsPerPage;
  const currentDate = dayjs();
  dayjs.extend(isBetween);

  // 페이지네이션 버튼 핸들러
  const leftBtnHandler = () => {
    if (currentPage === 1) {
      return;
    }
    setCurrentPage(currentPage - 1);
  };

  const rightBtnHandler = () => {
    if (currentPage >= totalPage) {
      return;
    }
    setCurrentPage(currentPage + 1);
  };

  // 일간, 주간 ,월간 필터링 useEffect 훅
  useEffect(() => {
    if (filter === "일간") {
      const startOfDay = currentDate.startOf("day");
      const endOfDay = currentDate.endOf("day");

      const dailyBestPosts = bestRecipes.filter((recipe: Recipe) => {
        const postDate = dayjs(recipe.created_at);
        return postDate.isBetween(startOfDay, endOfDay);
      });

      setFilteredBestRecipes(dailyBestPosts);
    }
    if (filter === "주간") {
      const startOfWeek = currentDate.startOf("week");
      const endOfWeek = currentDate.endOf("week");

      const weeklyBestPosts = bestRecipes.filter((recipe: Recipe) => {
        const postDate = dayjs(recipe.created_at);
        return postDate.isBetween(startOfWeek, endOfWeek);
      });

      setFilteredBestRecipes(weeklyBestPosts);
    }
    if (filter === "월간") {
      const startOfMonth = currentDate.startOf("month");
      const endOfMonth = currentDate.endOf("month");

      const monthlyBestPosts = bestRecipes.filter((recipe: Recipe) => {
        const postDate = dayjs(recipe.created_at);
        return postDate.isBetween(startOfMonth, endOfMonth);
      });

      setFilteredBestRecipes(monthlyBestPosts);
    }
  }, [filter]);

  return (
    <StyledContainer>
      {bestRecipes.length > 8 && (
        <LeftSlideBtn onClick={leftBtnHandler}>
          <Image
            src="/images/main/leftSlideBtn.png"
            alt="left_slice_btn"
            width={42}
            height={122}
          />
        </LeftSlideBtn>
      )}
      <StyledContentsArea>
        <StyledBestTitleBox>
          <StyledTitle>베스트 레시피</StyledTitle>
          <StyledList>
            <StyledItem
              id="day"
              onClick={() => {
                setFilter("일간");
              }}
              clicked={filter === "일간"}
            >
              일간
            </StyledItem>
            <StyledItem clicked={false}>|</StyledItem>
            <StyledItem
              id="week"
              onClick={() => {
                setFilter("주간");
              }}
              clicked={filter === "주간"}
            >
              주간
            </StyledItem>
            <StyledItem clicked={false}>|</StyledItem>
            <StyledItem
              id="month"
              onClick={() => {
                setFilter("월간");
              }}
              clicked={filter === "월간"}
            >
              월간
            </StyledItem>
          </StyledList>
        </StyledBestTitleBox>
        {bestRecipes.length === 0 && <NonRecipeCrying />}
        <ListingRecipeContainer>
          {filteredBestRecipes
            .slice(
              contentsPerPage * (currentPage - 1),
              contentsPerPage * currentPage
            )
            .map((item: Recipe) => (
              <MainRecipeCard key={item.recipe_id} recipe={item} />
            ))}
        </ListingRecipeContainer>
      </StyledContentsArea>
      {bestRecipes.length > 8 && (
        <RightSlideBtn onClick={rightBtnHandler}>
          <Image
            src="/images/main/rightSlideBtn.png"
            alt="right_slice_btn"
            width={42}
            height={122}
          />
        </RightSlideBtn>
      )}
    </StyledContainer>
  );
};

export default MainBest;

const StyledBestTitleBox = styled(StyledTitleBox)`
  align-items: end;
  flex-direction: row;
`;

const LeftSlideBtn = styled.button`
  display: none;

  @media (min-width: 768px) {
    display: block;
    position: absolute;
    width: 3rem;
    height: 9rem;
    left: -3rem;
    transition: transform 0.3s;
    &:hover {
      transform: scale(130%, 130%);
    }
  }
`;

const RightSlideBtn = styled.button`
  display: none;

  @media (min-width: 768px) {
    display: block;
    position: absolute;
    width: 3rem;
    height: 9rem;
    right: -3rem;
    transition: transform 0.3s;
    &:hover {
      transform: scale(130%, 130%);
    }
  }
`;

const StyledItem = styled.li<{ clicked: boolean }>`
  cursor: pointer;
  font-weight: ${(props) => (props.clicked ? "600" : "400")};
  color: ${(props) => (props.clicked ? "#4F3D21" : "#ddd")};
`;
