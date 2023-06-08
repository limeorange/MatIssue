import { getRecipesByUserIdSS } from "@/app/action/getRecipesByUserId";
import MyPage from "./my-page";

const PostMyPage = async () => {
  const currentUserRecipes = await getRecipesByUserIdSS();
  return <MyPage currentUserRecipes={currentUserRecipes} />;
};

export default PostMyPage;
