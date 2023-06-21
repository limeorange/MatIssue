import styled from "styled-components";
import Image from "next/image";

type UserFollowItemProps = {
  userId: string;
  userNickname: string;
  userImg: string;
};

/** 팔로워 or 팔로잉 컴포넌트에서 쓰이는 단일 유저 아이템 */
const UserFollowItem = ({
  userId,
  userNickname,
  userImg,
}: UserFollowItemProps) => {
  return (
    <>
      <UserContainer>
        <UserInfoWrapper>
          {/* 프로필 이미지 */}
          <ProfileImage>
            <Image
              src={userImg ? userImg : "/images/recipe-view/기본 프로필.PNG"}
              alt="게시글 작성자 프로필 사진"
              width={40}
              height={40}
              style={{
                objectFit: "cover",
                cursor: "pointer",
                borderRadius: "50%",
              }}
            />
          </ProfileImage>

          {/* 유저 아이디, 유저 닉네임 */}
          <UserInfo>
            <UserId>{userId}</UserId>
            <UserNickname>{userNickname}</UserNickname>
          </UserInfo>
        </UserInfoWrapper>

        {/* 팔로우 or 팔로잉 버튼 */}
        <ButtonWrapper>
          <FollowButton>팔로우</FollowButton>
        </ButtonWrapper>
      </UserContainer>
    </>
  );
};

/** 유저 아이템 전체 감싸는 Div */
const UserContainer = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 0.15rem solid #e6e6e6;
  color: #888888;
  width: 34rem;
  height: 5.7rem;
  align-items: center;
`;

/** 유저 프로필, 아이디, 닉네임 감싸는 Div */
const UserInfoWrapper = styled.div`
  display: flex;
`;

/** 프로필 이미지 감싸는 Div */
const ProfileImage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 5.5rem;
  height: 5.5rem;
  overflow: hidden;
  margin
`;

/** 유저 아이디, 닉네임 감싸는 Div */
const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

/** 유저 아이디 Span */
const UserId = styled.span`
  font-size: 14px;
  font-weight: 600;
`;

/** 유저 닉네임 Span */
const UserNickname = styled.span`
  font-size: 14px;
`;

/** 팔로우 or 팔로잉 버튼 우측 정렬 시키기 위한 Div */
const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

/** 팔로우 or 팔로잉 버튼 */
const FollowButton = styled.button`
  width: 7.5rem;
  height: 2.8rem;
  font-size: 14.5px;
  font-weight: 500;
  background-color: #fbe2a1;
  color: #4f3d21;
  border-radius: 1rem;
  transition: background-color 0.2s ease-in-out;
  margin-right: 1rem;

  &:hover {
    background-color: #fbd26a;
  }
`;

export default UserFollowItem;
