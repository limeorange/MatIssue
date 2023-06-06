"use client";

import ListingRecipe from "@/app/components/listings/ListingRecipe";
import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import LoadingModal from "@/app/components/UI/LoadingModal";
import { getAllRecipes } from "@/app/api/recipe";

const RecipeListPage = () => {
  // const searchParams = useSearchParams();
  // const titleQuery = searchParams.get("title");
  const { data: recipes, isLoading } = useQuery(["searchedRecipes"], () =>
    getAllRecipes()
  );

  return (
    <>{isLoading ? <LoadingModal /> : <ListingRecipe recipes={recipes} />}</>
  );
};

export default RecipeListPage;
