import { getChefByUserId, getUserSubscriptions } from "@/app/api/user";
import Following from "./FollowingPage";

const FollowingPage = async ({ params }: { params: { id: string } }) => {
  const userProfileId = params.id;
  const initialCurrentChef = await getChefByUserId(userProfileId);

  /** 프로필 유저의 Subscriptions 배열 */
  const currentChefSubscriptions = await getUserSubscriptions(userProfileId);

  return (
    <Following
      userProfileId={userProfileId}
      initialCurrentChef={initialCurrentChef}
      currentChefSubscriptions={currentChefSubscriptions}
    />
  );
};

export default FollowingPage;
