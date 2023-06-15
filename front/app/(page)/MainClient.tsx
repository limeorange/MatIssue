"use client";

import Banner from "../components/main-page/Banner/Banner";
import MainBest from "../components/main-page/MainBest";
import MainFridge from "../components/main-page/MainFridge";
import MainAlone from "../components/main-page/MainAlone";
import MainVegan from "../components/main-page/MainVegan";
import MainNewest from "../components/main-page/MainNewest";

import styled from "styled-components";
import { Recipe } from "../types";
import MobileCategory from "../components/main-page/mobile/MobileCategory";

// 메인화면에서 가장 위에 보이는 bestRecipes만 서버사이드 렌더링
const MainPageClient = ({ bestRecipes }: { bestRecipes: Recipe[] }) => {
  return (
    <>
      <Banner />
      <MainWrapper>
        <MobileCategory />
        <MainBest initialBestRecipes={bestRecipes} />
        <MainFridge />
        <MainAlone />
        <MainVegan />
        <MainNewest />
      </MainWrapper>
    </>
  );
};

export default MainPageClient;

const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;

  position: relative;
  align-items: center;
  width: 100%;
  margin: 0 auto;
  color: rgb(75, 75, 75);

  @media (min-width: 768px) {
    margin: 0 auto;
    padding: 2rem 0;
    gap: 1rem;
    background-color: white;
  }

  @media (min-width: 1024px) {
    gap: 4rem;
  }
`;
