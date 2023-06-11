"use client";

import Banner from "../components/main-page/Banner/Banner";
import MainBest from "../components/main-page/MainBest";
import MainFridge from "../components/main-page/MainFridge";
import MainAlone from "../components/main-page/MainAlone";
import MainVegan from "../components/main-page/MainVegan";
import MainNewest from "../components/main-page/MainNewest";
import MainWrapper from "../components/main-page/MainWrapper";
import { Recipe } from "../types";

const MainPageClient = ({ bestRecipes }: { bestRecipes: Recipe[] }) => {
  return (
    <>
      <Banner />
      <MainWrapper>
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
