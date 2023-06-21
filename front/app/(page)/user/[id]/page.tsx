import { getRecipesByUserId } from "@/app/api/recipe";
import UserProfile from "./UserPage";
import { getChefByUserId } from "@/app/api/user";

/** 유저 페이지 컴포넌트 */
const UserPage = async ({ params }: { params: { id: string } }) => {
  const userProfileId = params.id;
  const initialProfileUserRecipes = await getRecipesByUserId(userProfileId);
  const initialCurrentChef = await getChefByUserId(userProfileId);

  return (
    <UserProfile
      userProfileId={userProfileId}
      initialProfileUserRecipes={initialProfileUserRecipes}
      initialCurrentChef={initialCurrentChef}
    />
  );
};

export default UserPage;
