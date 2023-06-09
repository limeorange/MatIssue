import styled from "styled-components";
import Image from "next/image";

type WriterProfileProps = {
  user_nickname: string;
};

const WriterProfile: React.FC<WriterProfileProps> = ({ user_nickname }) => {
  return (
    <>
      <ProfileContainerDiv>
        <ProfileHeaderDiv>오늘의 요리사</ProfileHeaderDiv>
        <ProfileContentsDiv>
          {/* 프로필 사진 */}
          <ProfileImageDiv>
            <Image
              src="/images/recipe-view/limeorange.PNG"
              alt="게시글 작성자 프로필 사진"
              width={130}
              height={130}
              style={{ objectFit: "cover", cursor: "pointer" }}
            />
          </ProfileImageDiv>

          {/* 닉네임 */}
          <NicknameSpan>{user_nickname}</NicknameSpan>

          {/* 팔로잉, 팔로워 */}
          <FollowDiv>
            <span>팔로잉</span>
            <BoldSpan>99</BoldSpan>
            <span>|</span>
            <span>팔로잉</span>
            <BoldSpan>50</BoldSpan>
          </FollowDiv>
          <FollowButton>팔로우</FollowButton>
        </ProfileContentsDiv>
      </ProfileContainerDiv>
    </>
  );
};

/** 프로필 박스 전체 감싸는 Div */
const ProfileContainerDiv = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  width: 18.5rem;
  height: 31.5rem;
  left: 113rem;
  top: 21rem;
  box-shadow: 0 0 0.3rem rgba(0, 0, 0, 0.3);
  border-radius: 2rem;
`;

/** 프로필 헤더 박스 Div */
const ProfileHeaderDiv = styled.div`
  width: 18.5rem;
  height: 4.2rem;
  background: #fbe2a1;
  border-radius: 20px 20px 0px 0px;
  font-weight: 500;
  font-size: 16px;
  color: #4f3d21;
  padding: 1rem;
  padding-left: 1.5rem;
`;

/** 프로필 내용 담는 Div */
const ProfileContentsDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2.1rem;
`;

/** 프로필 이미지 감싸는 Div */
const ProfileImageDiv = styled.div`
  width: 13rem;
  height: 13rem;
  margin-right: 0.6rem;
  margin-bottom: 1.3rem;
  box-shadow: 0 0 0.3rem rgba(0, 0, 0, 0.3);
  border-radius: 50%;
  overflow: hidden;
`;

/** 닉네임 Span */
const NicknameSpan = styled.span`
  font-size: 1.7rem;
  font-weight: 500;
  color: #4f3d21;
  margin-bottom: 0.2rem;
`;

/** 팔로잉, 팔로워 Div */
const FollowDiv = styled.div`
  display: flex;
  color: #4f3d21;
  font-size: 1.2rem;
  gap: 0.3rem;
  margin-bottom: 1.5rem;
`;

/** 팔로잉, 팔로워수 강조 Span */
const BoldSpan = styled.span`
  font-weight: 500;
`;

/** 팔로우 버튼 */
const FollowButton = styled.button`
  width: 8rem;
  height: 3rem;
  font-size: 1.5rem;
  font-weight: 500;
  background-color: #fbe2a1;
  color: #4f3d21;
  border-radius: 1rem;
`;

export default WriterProfile;
