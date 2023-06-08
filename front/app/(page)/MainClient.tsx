"use client";

import Banner from "../components/main-page/banner/Banner";
import MainBest from "../components/main-page/MainBest";
import MainFridge from "../components/main-page/MainFridge";
import MainAlone from "../components/main-page/MainAlone";
import MainVegan from "../components/main-page/MainVegan";
import MainNewest from "../components/main-page/MainNewest";
import MainWrapper from "../components/main-page/MainWrapper";
import { Recipe } from "../types";

type MainPageClientProps = {
  recipes: Recipe[];
  bestRecipes: Recipe[];
};

const MainPageClient = (props: MainPageClientProps) => {
  return (
    <>
      <Banner />
      <MainWrapper>
        <MainBest initialBestRecipes={props.bestRecipes} />
        <MainFridge recipes={props.recipes} />
        <MainAlone aloneRecipes={props.recipes} />
        <MainVegan veganRecipes={props.recipes} />
        <MainNewest newestRecipes={props.recipes} />
      </MainWrapper>
    </>
  );
};

export default MainPageClient;
