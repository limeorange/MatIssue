import UserFollowSearch from "./UserFollowSearch";
import UserFollowItem from "./UserFollowItem";
import { useRef, useState } from "react";
import styled from "styled-components";
import { User } from "@/app/types";

type UserFollowersProps = {
  currentChefFans: {
    user_id: string;
    username: string;
    img: string;
  }[];
  loggedInUserSubscriptions: string[];
  loggedInUserId: string;
  initialCurrentChef: User;
};

/** 유저 팔로워 목록 컴포넌트 */
const UserFollowersList = (props: UserFollowersProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [searchValue, setSearchValue] = useState("");

  // 검색 값에 따라 팬 목록 필터링
  const filteredFans = props.currentChefFans.filter(
    (fan) =>
      fan.user_id.includes(searchValue) || fan.username.includes(searchValue)
  );

  // 로그인된 유저의 팔로잉 목록 정보
  const loggedInUserSubscriptions = props.loggedInUserSubscriptions;
  return (
    <>
      <Container>
        {/* 팔로워, 팔로워 수 Title */}
        <TitleCountWrapper>
          <h2>팔로워</h2>
          <BoldCount>{props.currentChefFans.length}</BoldCount>
        </TitleCountWrapper>

        <SearchListWrapper>
          {/* 검색 입력창 */}
          <UserFollowSearch onChange={(value) => setSearchValue(value)} />

          {/* 팔로워 목록 */}
          <FollowerList
            ref={containerRef}
            style={{ maxHeight: "400px", overflowY: "auto" }}
          >
            {Array.isArray(filteredFans) &&
              filteredFans.length > 0 &&
              filteredFans.map((fan, index) => {
                // 목록 속 유저를 팔로우 하는지 여부
                const isFollowing = loggedInUserSubscriptions.includes(
                  fan.user_id
                );
                return (
                  <UserFollowItem
                    key={index}
                    userId={fan.user_id}
                    userNickname={fan.username}
                    userImg={fan.img}
                    isFollowing={isFollowing}
                    loggedInUserId={props.loggedInUserId}
                    initialCurrentChef={props.initialCurrentChef}
                  />
                );
              })}
          </FollowerList>
        </SearchListWrapper>
      </Container>
    </>
  );
};

/** 팔로워 전체 정보 감싸는 Div */
const Container = styled.div`
  margin-bottom: 5rem;

  @media (min-width: 1024px) {
    margin-left: 13rem;
  }
`;

/** 팔로워, 팔로워 수 Div */
const TitleCountWrapper = styled.div`
  display: flex;
  font-size: 16px;
  gap: 0.3rem;
  margin-top: 1.5rem;
  font-weight: 500;
  margin-left: 0.7rem;

  @media (min-width: 1024px) {
    font-size: 17px;
    margin-top: 0;
    margin-bottom: 1rem;
    margin-left: 0.5rem;
  }
`;

/** 검색창, 팔로워 목록 Div */
const SearchListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (min-width: 1024px) {
    align-items: stretch;
  }
`;

/** 팔로워 수 굵은 글씨 Div */
const BoldCount = styled.div`
  font-weight: 600;
`;

/** 팔로우 목록 Div */
const FollowerList = styled.div`
  padding-right: 1rem;

  ::-webkit-scrollbar {
    width: 1rem;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #fbd26a;
    border-radius: 1rem;
  }

  ::-webkit-scrollbar-track {
    background-color: #ededed;
    border-radius: 1rem;
  }
`;

export default UserFollowersList;
