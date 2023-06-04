import RecipeDetail from "./ViewPageClient";
import { getRecipeById } from "@/app/api/recipe";

// 레시피 조회 페이지
const ViewPage = async ({ params }: { params: { id: string } }) => {
  console.log(params.id);
  const recipe_id = "I6fqTF0N08jgji8QI-QZa";
  const recipe = await getRecipeById(recipe_id);
  return <RecipeDetail recipe={recipe} />;
};

export default ViewPage;
