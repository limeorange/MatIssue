import { getChefByUserId } from "@/app/api/user";
import Following from "./FollowingPage";

const FollowingPage = async ({ params }: { params: { id: string } }) => {
  const userProfileId = params.id;
  const initialCurrentChef = await getChefByUserId(userProfileId);

  return (
    <Following
      userProfileId={userProfileId}
      initialCurrentChef={initialCurrentChef}
    />
  );
};

export default FollowingPage;
