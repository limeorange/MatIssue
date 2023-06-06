"use client";

import ListingRecipe from "@/app/components/listings/ListingRecipe";
import { useQuery } from "@tanstack/react-query";
import LoadingModal from "@/app/components/UI/LoadingModal";
import { getAllRecipes } from "@/app/api/recipe";

const CategoryRecipePage = () => {
  const { data: recipes, isLoading } = useQuery(["searchedRecipes"], () =>
    getAllRecipes()
  );

  return (
    <>{isLoading ? <LoadingModal /> : <ListingRecipe recipes={recipes} />}</>
  );
};

export default CategoryRecipePage;
