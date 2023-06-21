import styled from "styled-components";
import Image from "next/image";

type UserFollowItemProps = {
  userId: string;
  userNickname: string;
  userImg: string;
};

const UserFollowItem = ({
  userId,
  userNickname,
  userImg,
}: UserFollowItemProps) => {
  return (
    <>
      <UserContainer>
        <div className="flex">
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
          <div className="flex flex-col justify-center">
            <span className="text-[14px] font-[600]">{userId}</span>
            <span className="text-[14px]">{userNickname}</span>
          </div>
        </div>
        {/* 팔로우 or 프로필 버튼 */}
        <div className="flex justify-end">
          <FollowButton>팔로우</FollowButton>
        </div>
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

/** 팔로우 버튼 */
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
