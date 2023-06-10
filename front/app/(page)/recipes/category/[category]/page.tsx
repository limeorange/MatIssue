import {
  getAllRecipes,
  getRecipesByCategory,
  getRecipesByLastest,
  getRecipesByPopularity,
  getRecipesBySingle,
  getRecipesByVegetarian,
} from "@/app/api/recipe";
import ListingRecipe from "@/app/components/listings/ListingRecipe";

const CategoryRecipeListPage = async ({ searchParams }: any) => {
  if (searchParams.category === "best") {
    return <ListingRecipe recipes={await getRecipesByPopularity()} />;
  }
  if (searchParams.category === "newest") {
    return <ListingRecipe recipes={await getRecipesByLastest()} />;
  }
  if (searchParams.category === "honmuk") {
    return <ListingRecipe recipes={await getRecipesBySingle()} />;
  }
  if (searchParams.category === "vegetarian") {
    return <ListingRecipe recipes={await getRecipesByVegetarian()} />;
  } else if (searchParams.category) {
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
