"use client";

import { Recipe } from "@/app/types";
import { useQuery } from "@tanstack/react-query";

import MainListingRecipe from "../listings/MainListingRecipe";

import { getAllRecipes } from "@/app/api/recipe";

const MainNewest = () => {
  const {
    data: allRecipes,
    isLoading,
    isError,
  } = useQuery<Recipe[]>(["recipes"], () => getAllRecipes(), {
    retry: 0,
    initialData: [],
  });

  return (
    <MainListingRecipe
      title="최신 레시피"
      recipes={allRecipes}
      isLoading={isLoading}
      isError={isError}
      isFilter={false}
      categoryUrl="/recipes/category/newest?category=newest"
    />
  );
};

export default MainNewest;
