import { getAllRecipes } from "../api/recipe";
import MainPageClient from "./MainClient";

const Home = async () => {
  const recipes = await getAllRecipes();

  return <MainPageClient recipes={recipes} />;
};

export default Home;
