"use client";

import getCurrentUser from "@/app/api/user";
import UserFollowingList from "@/app/components/user-page/UserFollowingList";
import UserProfileCard from "@/app/components/user-page/UserProfileCard";
import { User } from "@/app/types";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import styled from "styled-components";

type FollowingProps = {
  userProfileId: string;
  initialCurrentChef: User;
  currentChefSubscriptions: {
    user_id: string;
    username: string;
    img: string;
  }[];
};

/** 팔로잉 페이지 컴포넌트 */
const Following = ({
  initialCurrentChef,
  userProfileId,
  currentChefSubscriptions,
}: FollowingProps) => {
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
  return (
    <Container>
      <Wrapper>
        {/* 유저 프로필 카드 */}
        <UserProfileCard
          loggedInUserId={loggedInUserId}
          userProfileId={userProfileId}
          initialCurrentChef={initialCurrentChef}
        />
        {/* 유저 팔로잉 리스트 */}
        <UserFollowingList
          currentChefSubscriptions={currentChefSubscriptions}
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

export default Following;
