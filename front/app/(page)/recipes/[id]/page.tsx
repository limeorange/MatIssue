import RecipeDetail from "./ViewPageClient";
import { getRecipeById } from "@/app/api/recipe";
import commentsData from "@/data/commentDummy.json";

/** 레시피 조회 페이지 컴포넌트 */
const ViewPage = async ({ params }: { params: { id: string } }) => {
  console.log(params.id);
  const recipe_id = "I6fqTF0N08jgji8QI-QZa";

  /** 레시피 조회 데이터 */
  const recipe = await getRecipeById(recipe_id);

  /** 레시피 댓글 데이터 (dummy json 파일 이용) */
  const recipeComment = commentsData;

  return <RecipeDetail recipe={recipe} recipeComment={recipeComment} />;
};

export default ViewPage;
