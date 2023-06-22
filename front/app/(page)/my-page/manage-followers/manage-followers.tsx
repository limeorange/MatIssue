"use client";

import styled from "styled-components";
import Button from "../../../components/UI/Button";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ProfileCard from "@/app/components/my-page/ProfileCard";
import UserFollowersList from "@/app/components/user-page/UserFollowerList";
import UserFollowingList from "@/app/components/user-page/UserFollowingList";
import { User } from "@/app/types";
import { useQuery } from "@tanstack/react-query";
import getCurrentUser, {
  getUserFans,
  getUserSubscriptions,
} from "@/app/api/user";

type FollowersProps = {
  userProfileId: string;
  initialCurrentChef: User;
  initialCurrentChefFans: {
    user_id: string;
    username: string;
    img: string;
  }[];
  initialCurrentUser: User;
  initialCurrentChefSubscriptions: {
    user_id: string;
    username: string;
    img: string;
  }[];
};

/** 팔로워 페이지 컴포넌트 */
const ManageFollowers = ({
  initialCurrentChef,
  userProfileId,
  initialCurrentChefFans,
  initialCurrentChefSubscriptions,
  initialCurrentUser,
}: FollowersProps) => {
  // currentUser : 현재 로그인한 유저 정보
  const { data: currentUser } = useQuery<User>(
    ["currentUser"],
    () => getCurrentUser(),
    { initialData: initialCurrentUser }
  );
  const { data: currentChefFans } = useQuery(
    ["currentChefFans", userProfileId],
    () => getUserFans(userProfileId),
    { initialData: initialCurrentChefFans }
  );
  const { data: currentChefSubscriptions } = useQuery(
    ["currentChefSubscriptions", userProfileId],
    () => getUserSubscriptions(userProfileId),
    { initialData: initialCurrentChefSubscriptions }
  );

  const loggedInUserId: string = currentUser.user_id;

  // 로그인된 유저가 팔로잉하는 유저 목록
  const loggedInUserSubscriptions: string[] = currentUser.subscriptions;
  return (
    <Container>
      <Wrapper>
        <ProfileCard />
        <UserFollowersList
          currentChefFans={currentChefFans}
          loggedInUserSubscriptions={loggedInUserSubscriptions}
          loggedInUserId={loggedInUserId}
          initialCurrentChef={initialCurrentChef}
        />
        <UserFollowingList
          currentChefSubscriptions={currentChefSubscriptions}
          loggedInUserSubscriptions={loggedInUserSubscriptions}
          loggedInUserId={loggedInUserId}
          initialCurrentChef={initialCurrentChef}
        />
      </Wrapper>
    </Container>
  );
};

export default ManageFollowers;

const Container = styled.div`
  width: 100%;
  margin: 0 auto;
  @media (min-width: 1024px) {
    max-width: 120rem;
  }
`;

const Wrapper = styled.div`
  width: 100%;
  max-width: 34.5rem;
  display: flex;
  flex-direction: column;
  margin: 0 1.5rem 2rem;

  @media (min-width: 1024px) {
    flex-direction: row;
    justify-content: flex-start;
    padding: 5rem 0 0 1.5rem;
    margin: 0 0 16rem;
    max-width: 100vw;
  }
`;
