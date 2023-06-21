import { getChefByUserId } from "@/app/api/user";
import Followers from "../followers/FollowersPage";

const FollowingPage = async ({ params }: { params: { id: string } }) => {
  const userProfileId = params.id;
  const initialCurrentChef = await getChefByUserId(userProfileId);

  return (
    <Followers
      userProfileId={userProfileId}
      initialCurrentChef={initialCurrentChef}
    />
  );
};

export default FollowingPage;
