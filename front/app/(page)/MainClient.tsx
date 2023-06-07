"use client";

import Banner from "../components/main-page/banner/Banner";
import MainBest from "../components/main-page/MainBest";
import MainFridge from "../components/main-page/MainFridge";
import MainAlone from "../components/main-page/MainAlone";
import MainVegan from "../components/main-page/MainVegan";
import MainNewest from "../components/main-page/MainNewest";
import MainWrapper from "../components/main-page/MainWrapper";
import { Recipe } from "../types";

const MainPageClient = ({ recipes }: { recipes: Recipe[] }) => {
  return (
    <>
      <Banner />
      <MainWrapper>
        <MainBest bestRecipes={recipes} />
        <MainFridge recipes={recipes} />
        <MainAlone aloneRecipes={recipes} />
        <MainVegan veganRecipes={recipes} />
        <MainNewest newestRecipes={recipes} />
      </MainWrapper>
    </>
  );
};

export default MainPageClient;
