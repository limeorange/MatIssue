import {
  getAllRecipes,
  getRecipesByLastest,
  getRecipesByPopularity,
  getRecipesBySingle,
  getRecipesByVegetarian,
} from "../api/recipe";
import { Recipe } from "../types";
import MainPageClient from "./MainClient";

const Home = async () => {
  const recipes = await getAllRecipes();
  const bestRecipes = await getRecipesByPopularity();
  const newestRecipes = await getRecipesByLastest();
  const singleRecipes = await getRecipesBySingle();
  const vegetarianRecipes = await getRecipesByVegetarian();

  function shuffleRecipes(array: Recipe[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  return (
    <MainPageClient
      recipes={recipes}
      bestRecipes={bestRecipes}
      newestRecipes={newestRecipes}
      singleRecipes={shuffleRecipes(singleRecipes)}
      vegetarianRecipes={shuffleRecipes(vegetarianRecipes)}
    />
  );
};

export default Home;
