import getCurrentUser, { getChefByUserId, getUserFans } from "@/app/api/user";
import Followers from "./FollowersPage";

const FollowersPage = async ({ params }: { params: { id: string } }) => {
  const userProfileId = params.id;

  /** 프로필 유저정보 (user_id, username, img, fans, subscriptions) */
  const initialCurrentChef = await getChefByUserId(userProfileId);

  /** 프로필 유저의 Fans 배열 */
  const currentChefFans = await getUserFans(userProfileId);

  /** 로그인된 유저정보 */
  const initialCurrentUser = await getCurrentUser();

  return (
    <Followers
      userProfileId={userProfileId}
      initialCurrentChef={initialCurrentChef}
      currentChefFans={currentChefFans}
      initialCurrentUser={initialCurrentUser}
    />
  );
};

export default FollowersPage;
