import { getChefByUserId } from "@/app/api/user";
import Followers from "./FollowersPage";

const FollowersPage = async ({ params }: { params: { id: string } }) => {
  const userProfileId = params.id;
  const initialCurrentChef = await getChefByUserId(userProfileId);

  return (
    <Followers
      userProfileId={userProfileId}
      initialCurrentChef={initialCurrentChef}
    />
  );
};

export default FollowersPage;
