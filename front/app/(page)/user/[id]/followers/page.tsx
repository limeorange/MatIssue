import { getChefByUserId, getUserFans } from "@/app/api/user";
import Followers from "./FollowersPage";

const FollowersPage = async ({ params }: { params: { id: string } }) => {
  const userProfileId = params.id;
  const initialCurrentChef = await getChefByUserId(userProfileId);

  /** 프로필 유저의 Fans 배열 */
  const currentChefFans = await getUserFans(userProfileId);

  return (
    <Followers
      userProfileId={userProfileId}
      initialCurrentChef={initialCurrentChef}
      currentChefFans={currentChefFans}
    />
  );
};

export default FollowersPage;
