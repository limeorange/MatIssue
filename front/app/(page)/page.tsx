import { getAllRecipes, getRecipesByPopularity } from "../api/recipe";
import MainPageClient from "./MainClient";

const Home = async () => {
  const recipes = await getAllRecipes();
  const bestRecipes = await getRecipesByPopularity();

  return <MainPageClient recipes={recipes} bestRecipes={bestRecipes} />;
};

export default Home;
