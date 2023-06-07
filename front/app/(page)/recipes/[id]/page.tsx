import RecipeDetail from "./ViewPage";
import { getRecipeById } from "@/app/api/recipe";
import commentsData from "@/data/commentDummy.json";

/** 레시피 조회 페이지 컴포넌트 */
const ViewPage = async ({ params }: { params: { id: string } }) => {
  const recipe_id = params.id;

  /** 레시피 조회 데이터 */
  const recipe = await getRecipeById(recipe_id);

  return <RecipeDetail recipe={recipe} />;
};

export default ViewPage;
