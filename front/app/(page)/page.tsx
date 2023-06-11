import { getRecipesByPopularity } from "../api/recipe";
import MainPageClient from "./MainClient";

const Home = async () => {
  const bestRecipes = await getRecipesByPopularity();

  return <MainPageClient bestRecipes={bestRecipes} />;
};

export default Home;
