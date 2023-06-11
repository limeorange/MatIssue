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
  const bestRecipes = await getRecipesByPopularity();

  return <MainPageClient bestRecipes={bestRecipes} />;
};

export default Home;
