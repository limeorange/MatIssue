import { getRecipesByUserIdSS } from "@/app/action/getRecipesByUserId";
import MyPage from "./my-page";

const PostMyPage = async () => {
  // 지금 로그인된 유저가 작성한 레시피룰 패치해와서 변수에 담음
  const initialCurrentUserRecipes = await getRecipesByUserIdSS();

  return <MyPage initialCurrentUserRecipes={initialCurrentUserRecipes} />;
};

export default PostMyPage;
