import UserFollowSearch from "./UserFollowSearch";
import UserFollowItem from "./UserFollowItem";
import { useRef } from "react";
import styled from "styled-components";

type CurrentChefFansProps = {
  user_id: string;
  username: string;
  img: string;
};

/** 유저 팔로워 목록 컴포넌트 */
const UserFollowersList = ({
  currentChefFans,
}: {
  currentChefFans: CurrentChefFansProps[];
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  console.log("검색한 유저의 팬 정보..", currentChefFans);
  return (
    <>
      <Container>
        {/* 검색 입력창 */}
        <UserFollowSearch />
        <FollowerList
          ref={containerRef}
          style={{ maxHeight: "400px", overflowY: "auto" }}
        >
          {/* 팬이 빈 배열인 경우에 대한 예외 처리 */}
          {Array.isArray(currentChefFans) &&
            currentChefFans.length > 0 &&
            currentChefFans.map((fan, index) => (
              <UserFollowItem
                key={index}
                userId={fan.user_id}
                userNickname={fan.username}
                userImg={fan.img}
              ></UserFollowItem>
            ))}
        </FollowerList>
      </Container>
    </>
  );
};

const Container = styled.div`
  @media (min-width: 1024px) {
    margin-left: 13rem;
  }
`;

const FollowerList = styled.div`
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
