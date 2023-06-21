"use client";

import { Recipe, User } from "@/app/types";
import getCurrentUser from "@/app/api/user";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import UserProfileCard from "@/app/components/user-page/UserProfileCard";
import UserRecipeCardList from "@/app/components/user-page/UserRecipeCardList";
import { getRecipesByUserId } from "@/app/api/recipe";

type UserProfileProps = {
  userProfileId: string;
  initialProfileUserRecipes: Recipe[];
  initialCurrentChef: User;
};

/** 유저 프로필 컴포넌트 */
const UserProfile = ({
  userProfileId,
  initialProfileUserRecipes,
  initialCurrentChef,
}: UserProfileProps) => {
  // 캐시에 저장된 현재 로그인한 유저 정보 가져옴
  const { data: currentUser } = useQuery<User>(["currentUser"], () =>
    getCurrentUser()
  );
  const loggedInUserId: string | undefined = currentUser?.user_id;

  // 로그인된 유저가 자신의 유저페이지에 접근하는 경우 마이페이지로 이동
  const router = useRouter();
  if (userProfileId === loggedInUserId) {
    router.push("/my-page");
  }

  // 검색된 유저가 작성한 레시피 데이터를 리액트쿼리 캐시로 관리
  const { data: ProfileUserRecipes } = useQuery(
    ["ProfileUserRecipes"],
    () => getRecipesByUserId(userProfileId),
    {
      refetchOnWindowFocus: false,
      retry: 0,
      initialData: initialProfileUserRecipes,
    }
  );

  return (
    <Container>
      <Wrapper>
        {/* 유저 프로필 카드 */}
        <UserProfileCard
          loggedInUserId={loggedInUserId}
          userProfileId={userProfileId}
          initialCurrentChef={initialCurrentChef}
        />
        {/* 유저 레시피 리스트 */}
        <UserRecipeCardList
          userProfileId={userProfileId}
          ProfileUserRecipes={ProfileUserRecipes}
          initialCurrentChef={initialCurrentChef}
        />
      </Wrapper>
    </Container>
  );
};

const Container = styled.div`
  flex-direction: column;
  width:100%;
  padding: 0 1.5rem;
  @media (min-width: 1024px) {
    max-width: 120rem;
    margin: 0 auto;
`;

const Wrapper = styled.div`
  margin: 0 auto;
  @media (min-width: 1024px) {
    display: flex;
    justify-content: flex-start;
    padding-top: 5rem;
  }
`;

export default UserProfile;
