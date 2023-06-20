import { getRecipesByUserId } from "@/app/api/recipe";
import UserProfile from "./UserPage";
import { useEffect, useState } from "react";

/** 유저 페이지 컴포넌트 */
const UserPage = async ({ params }: { params: { id: string } }) => {
  const userProfileId = params.id;
  console.log(userProfileId);
  const ProfileUserRecipes = await getRecipesByUserId(userProfileId);

  return (
    <UserProfile
      userProfileId={userProfileId}
      ProfileUserRecipes={ProfileUserRecipes}
    />
  );
};

export default UserPage;
