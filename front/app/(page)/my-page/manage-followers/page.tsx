import {
  getChefByUserId,
  getUserSubscriptions,
  getUserFans,
} from "@/app/api/user";
import ManageFollowers from "./manage-followers";
import { getCurrentUserSS } from "@/app/action/getCurrentUser";

const PostManageFollowers = async ({ params }: { params: { id: string } }) => {
  /** 로그인된 유저정보 */
  const initialCurrentUser = await getCurrentUserSS();
  const currentChefSubscriptions = await getUserSubscriptions(
    initialCurrentUser.user_id
  );
  const currentChefFans = await getUserFans(initialCurrentUser.user_id);

  return (
    <ManageFollowers
      userProfileId={initialCurrentUser.user_id}
      initialCurrentChef={initialCurrentUser}
      initialCurrentChefSubscriptions={currentChefSubscriptions}
      initialCurrentUser={initialCurrentUser}
      initialCurrentChefFans={currentChefFans}
    />
  );
};

export default PostManageFollowers;
