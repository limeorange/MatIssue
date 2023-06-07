import { getRecipesByPopularity } from "@/app/api/recipe";
import ListingRecipe from "@/app/components/listings/ListingRecipe";

const BestRecipeListPage = async () => {
  return <ListingRecipe recipes={await getRecipesByPopularity()} />;
};

export default BestRecipeListPage;
