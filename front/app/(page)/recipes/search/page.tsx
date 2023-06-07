import { getAllRecipes, getRecipesByParams } from "@/app/api/recipe";
import ListingRecipe from "@/app/components/listings/ListingRecipe";

const SearchRecipeListPage = async ({ searchParams }: any) => {
  if (searchParams.query) {
    return (
      <ListingRecipe recipes={await getRecipesByParams(searchParams.query)} />
    );
  } else {
    return <ListingRecipe recipes={await getAllRecipes()} />;
  }
};

export default SearchRecipeListPage;
