import getCurrentUser, {
  getChefByUserId,
  getUserSubscriptions,
} from "@/app/api/user";
import Following from "./FollowingPage";

const FollowingPage = async ({ params }: { params: { id: string } }) => {
  const userProfileId = params.id;

  /** 프로필 유저정보 (user_id, username, img, fans, subscriptions) */
  const initialCurrentChef = await getChefByUserId(userProfileId);

  /** 프로필 유저의 Subscriptions 배열 */
  const currentChefSubscriptions = await getUserSubscriptions(userProfileId);

  /** 로그인된 유저정보 */
  const initialCurrentUser = await getCurrentUser();

  return (
    <Following
      userProfileId={userProfileId}
      initialCurrentChef={initialCurrentChef}
      currentChefSubscriptions={currentChefSubscriptions}
      initialCurrentUser={initialCurrentUser}
    />
  );
};

export default FollowingPage;
