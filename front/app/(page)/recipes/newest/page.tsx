import { getAllRecipes } from "@/app/api/recipe";
import ListingRecipe from "@/app/components/listings/ListingRecipe";

const NewestRecipeListPage = async () => {
  return <ListingRecipe recipes={await getAllRecipes()} />;
};

export default NewestRecipeListPage;
