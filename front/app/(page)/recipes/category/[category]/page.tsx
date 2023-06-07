import { getAllRecipes, getRecipesByCategory } from "@/app/api/recipe";
import ListingRecipe from "@/app/components/listings/ListingRecipe";

const CategoryRecipeListPage = async ({ searchParams }: any) => {
  if (searchParams.category) {
    return (
      <ListingRecipe
        recipes={await getRecipesByCategory(searchParams.category)}
      />
    );
  } else {
    return <ListingRecipe recipes={await getAllRecipes()} />;
  }
};

export default CategoryRecipeListPage;
