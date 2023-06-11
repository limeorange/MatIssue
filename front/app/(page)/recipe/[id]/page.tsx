import { axiosBase } from "@/app/api/axios";
import RecipeDetail from "./ViewPage";
import { getRecipeById } from "@/app/api/recipe";

/** 레시피 조회 페이지 컴포넌트 */
const ViewPage = async ({ params }: { params: { id: string } }) => {
  const recipe_id = params.id;

  /** 레시피 조회 데이터 */
  const recipe = await getRecipeById(recipe_id);
  console.log("recipe 데이터에 담긴 것은...🤓", recipe);

  return <RecipeDetail recipe={recipe} recipe_id={recipe_id} />;
};

export default ViewPage;
