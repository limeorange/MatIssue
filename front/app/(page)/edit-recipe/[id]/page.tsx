import UpdateRecipeForm from "./UpdateRecipe";
import { getRecipeById } from "@/app/api/recipe";

const EditRecipe = async ({ params }: { params: { id: string } }) => {
  const recipe_id = params.id;

  /** 레시피 조회 데이터 */
  const recipe = await getRecipeById(recipe_id);
  console.log("🚀 ~ file: page.tsx:9 ~ EditRecipe ~ recipe:", recipe);

  return <UpdateRecipeForm recipe={recipe} />;
};

export default EditRecipe;
