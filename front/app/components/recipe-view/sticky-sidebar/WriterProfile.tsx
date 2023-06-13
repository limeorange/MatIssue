import styled from "styled-components";
import Image from "next/image";
import useMovingContentByScrolling from "@/app/hooks/useMovingContentByScrolling";
import { getFollowStatus, getUserFans } from "@/app/api/user";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { axiosBase } from "@/app/api/axios";
import ConfirmModal from "../../UI/ConfirmModal";
import { AlertImage } from "@/app/styles/my-page/modify-user-info.style";

type WriterProfileProps = {
  user_nickname: string;
  user_fan: number;
  user_subscription: number;
  user_id: string;
  loggedInUserId: string | undefined;
  user_img: string;
};

/** 작성자 프로필 컴포넌트 */
const WriterProfile: React.FC<WriterProfileProps> = ({
  user_nickname,
  user_fan,
  user_subscription,
  user_id,
  loggedInUserId,
  user_img,
}) => {
  const isHeaderVisible = useMovingContentByScrolling();
  const [isFollowing, setIsFollowing] = useState(false);
  const [fanscount, setFansCount] = useState(user_fan);

  // 로그인한 유저가 페이지 처음 로드 시 팔로우 여부 판단 의존성 설정
  useEffect(() => {
    if (loggedInUserId !== undefined) {
      const fetchFollowStatus = async () => {
        try {
          const fansList: Array<{
            img: string;
            user_id: string;
            username: string;
          }> = await getUserFans(user_id);
          const isUserIdIncluded: boolean = fansList.some((fan) =>
            fan.user_id.includes(loggedInUserId)
          );
          console.log("isUserIdIncluded", isUserIdIncluded);
          setIsFollowing(isUserIdIncluded);
        } catch (error) {
          console.log(error);
        }
      };
      fetchFollowStatus();
    }
  }, [loggedInUserId]);

  // 팔로우, 팔로잉 버튼 누를 때마다 팔로워 숫자 업데이트
  useEffect(() => {
    const getFansCount = async () => {
      try {
        const fansList = await getUserFans(user_id);
        setFansCount(fansList.length);
      } catch (error) {
        console.log(error);
      }
    };
    getFansCount();
  }, [isFollowing]);

  // 처음 렌더링 시 팔로워 숫자 업데이트
  useEffect(() => {
    const getFansCount = async () => {
      try {
        const fansList = await getUserFans(user_id);
        setFansCount(fansList.length);
      } catch (error) {
        console.log(error);
      }
    };
    getFansCount();
  }, [isFollowing]);

  const followButtonText =
    loggedInUserId === user_id
      ? "언제나 팔로잉"
      : isFollowing
      ? "팔로잉"
      : "팔로우";

  // 팔로우 취소 모달 상태 관리
  const [followDeleteConfirmModal, setFollowDeleteConfirmModal] =
    useState(false);

  /** 팔로우 버튼 클릭 핸들러 */
  const followButtonHandler = async () => {
    try {
      // 작성자가 자신의 게시글을 보는 경우
      if (loggedInUserId === user_id) {
        toast.success(`소중한 당신을 언제나 응원해요!`);
      }
      // 로그인되지 않은 유저가 팔로우 요청하는 경우
      else if (loggedInUserId === undefined) {
        toast.error("로그인을 진행해주세요!");
      }
      // 작성자와 다른 로그인 유저가 팔로우 요청하는 경우
      else {
        // 이미 팔로우를 한 경우
        if (isFollowing === true) {
          // 팔로우 취소 모달창 띄워줌
          setFollowDeleteConfirmModal(true);
        }
        // 로그인된 유저가 팔로우 요청 하는 경우
        else {
          try {
            const response = await axiosBase.post(
              `/users/subscription/${user_id}?subscribe=true`
            );
            toast.success("팔로우가 완료되었습니다!");
            console.log("팔로우 요청 성공!", response);
            // 팔로우 -> 팔로잉으로 변경
            setIsFollowing(true);
          } catch (error) {
            console.log("팔로우 요청 실패와 관련한 오류는..🧐", error);
            toast.error("팔로우 요청에 실패했습니다 ㅠ.ㅠ");
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  /** 팔로우 취소 모달 : 확인 클릭 핸들러 */
  const deleteConfirmHandler = async () => {
    try {
      const res = await axiosBase.post(
        `/users/subscription/${user_id}?subscribe=false`
      );
      console.log("삭제 요청에 대한 응답은...", res);

      // 팔로우 삭제 되었는지 확인용
      const fansList = await getUserFans(user_id);
      console.log("삭제 응답 200 후 실제 fans 데이터", fansList);

      toast.success("팔로우가 취소되었습니다!");
    } catch (error) {
      console.log("팔로우 취소 실패와 관련한 오류는..🧐", error);
      toast.error("팔로우 취소에 실패했습니다 ㅠ.ㅠ");
    } finally {
      // 팔로우 -> 팔로잉으로 변경
      setIsFollowing(false);
      // 모달창 닫기
      setFollowDeleteConfirmModal(false);
    }
  };

  /** 팔로우 취소 모달 : 취소 클릭 핸들러 */
  const confirmModalCloseHandler = () => {
    setFollowDeleteConfirmModal(false);
  };

  return (
    <>
      {/* 팔로잉 -> 팔로우 삭제 모달 */}
      {followDeleteConfirmModal && (
        <StyledConfirmModal
          icon={<AlertImage src="/images/alert.png" alt="alert" />}
          message="팔로우를 취소하시겠습니까?"
          onConfirm={deleteConfirmHandler}
          onCancel={confirmModalCloseHandler}
        />
      )}
      <ProfileContainerDiv isHeaderVisible={isHeaderVisible}>
        <ProfileHeaderDiv>오늘의 쉐프</ProfileHeaderDiv>
        <ProfileContentsDiv>
          {/* 프로필 사진 */}
          <ProfileImageDiv>
            <Image
              src={user_img ? user_img : "/images/recipe-view/기본 프로필.PNG"}
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
            <span>팔로워</span>
            <BoldSpan>{fanscount}</BoldSpan>
            <span>|</span>
            <span>팔로잉</span>
            <BoldSpan>{user_subscription}</BoldSpan>
          </FollowDiv>

          {/* 팔로우 버튼 */}
          <FollowButton onClick={followButtonHandler}>
            {followButtonText}
          </FollowButton>
        </ProfileContentsDiv>
      </ProfileContainerDiv>
    </>
  );
};

/** 프로필 박스 전체 감싸는 Div */
const ProfileContainerDiv = styled.div<{ isHeaderVisible: boolean }>`
  display: none;

  @media (min-width: 1200px) {
    display: flex;
    flex-direction: column;
    position: fixed;
    width: 18.5rem;
    height: 32rem;
    right: 12.5rem;
    top: 16.5rem;
    box-shadow: 0 0 0.3rem rgba(0, 0, 0, 0.3);
    border-radius: 2rem;
    background-color: #ffffff;
    z-index: 30;

    transform: ${(props) =>
      props.isHeaderVisible ? "translateY(0)" : "translateY(-131px)"};
    transition: transform 0.3s ease-in-out;
  }
`;

/** 프로필 헤더 박스 Div */
const ProfileHeaderDiv = styled.div`
  width: 18.5rem;
  height: 4.3rem;
  background: #fbe2a1;
  border-radius: 20px 20px 0px 0px;
  font-weight: 500;
  font-size: 17px;
  color: #4f3d21;
  padding: 1rem;
  padding-left: 1.5rem;
`;

/** 프로필 내용 담는 Div */
const ProfileContentsDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 1.9rem;
`;

/** 프로필 이미지 감싸는 Div */
const ProfileImageDiv = styled.div`
  width: 12rem;
  height: 12rem;
  margin-bottom: 1.3rem;
  box-shadow: 0 0 0.3rem rgba(0, 0, 0, 0.3);
  border-radius: 50%;
  overflow: hidden;
`;

/** 닉네임 Span */
const NicknameSpan = styled.span`
  font-size: 1.8rem;
  font-weight: 500;
  color: #4f3d21;
  margin-bottom: 0.4rem;
`;

/** 팔로잉, 팔로워 Div */
const FollowDiv = styled.div`
  display: flex;
  color: #4f3d21;
  font-size: 1.5rem;
  gap: 0.3rem;
  margin-bottom: 1.65rem;
`;

/** 팔로잉, 팔로워수 강조 Span */
const BoldSpan = styled.span`
  font-weight: 500;
`;

/** 팔로우 버튼 */
const FollowButton = styled.button`
  width: 14rem;
  height: 3.5rem;
  font-size: 16px;
  font-weight: 500;
  background-color: #fbe2a1;
  color: #4f3d21;
  border-radius: 1rem;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: #fbd26a;
  }
`;

/** 팔로우 취소 컨펌 모달창 */
const StyledConfirmModal = styled(ConfirmModal)`
  position: fixed;
  top: 0;
  left: 0;
  inset: 0;
`;

export default WriterProfile;
