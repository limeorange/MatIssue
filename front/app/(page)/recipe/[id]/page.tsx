import NotFound from "@/app/not-found";
import RecipeDetail from "./ViewPage";
import { getRecipeById } from "@/app/api/recipe";
import { getChefByUserId } from "@/app/api/user";

/** 레시피 조회 페이지 컴포넌트 */
const ViewPage = async ({ params }: { params: { id: string } }) => {
  const recipe_id = params.id;
  const recipe = await getRecipeById(recipe_id);
  const initialCurrentChef = await getChefByUserId(recipe.user_id);

  /** 레시피 조회 데이터 */

  if (!recipe) {
    return <NotFound />;
  }

  return (
    <RecipeDetail
      recipe={recipe}
      recipe_id={recipe_id}
      initialCurrentChef={initialCurrentChef}
    />
  );
};

export default ViewPage;
