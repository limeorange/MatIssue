import styled from "styled-components";
import Image from "next/image";
import useMovingContentByScrolling from "@/app/hooks/useMovingContentByScrolling";
import { getChefByUserId } from "@/app/api/user";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { axiosBase } from "@/app/api/axios";
import { AlertImage } from "@/app/styles/my-page/modify-user-info.style";
import { useRouter } from "next/navigation";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import ConfirmModal from "../UI/ConfirmModal";
import LoginConfirmModal from "../UI/LoginConfirmModal";
import { User } from "@/app/types";

type UserProfileProps = {
  userProfileId: string;
  loggedInUserId: string | undefined;
  initialCurrentChef: User;
};

/** 작성자 프로필 컴포넌트 */
const UserProfileCard = ({
  userProfileId,
  loggedInUserId,
  initialCurrentChef,
}: UserProfileProps) => {
  // currentChef에 프로필 유저 정보가 담김
  const { data: currentChef } = useQuery<User>(
    ["currentChef", userProfileId],
    () => getChefByUserId(userProfileId),
    {
      refetchOnWindowFocus: false,
      retry: 0,
      initialData: initialCurrentChef,
    }
  );

  const client = useQueryClient();
  const isHeaderVisible = useMovingContentByScrolling();

  // 팔로우, 팔로잉 동작 시 업데이트해서 보여주기 위한 상태 관리
  const [isFollowing, setIsFollowing] = useState(false);

  // 로그인 유도 모달 상태 관리
  const [loginConfirmModal, setLoginConfirmModal] = useState(false);

  // 로그인한 유저가 페이지 처음 로드 시 팔로우 여부 판단 의존성 설정
  useEffect(() => {
    if (loggedInUserId !== undefined) {
      const fans = new Set(currentChef?.fans);
      const isFollowing = fans?.has(loggedInUserId);
      setIsFollowing(isFollowing);
    }
  }, [loggedInUserId]);

  // 상태에 따른 팔로우, 팔로잉 버튼
  const followButtonText =
    loggedInUserId === userProfileId
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
      if (loggedInUserId === userProfileId) {
        toast.success(`소중한 당신을 언제나 응원해요!`);
      }
      // 로그인되지 않은 유저가 팔로우 요청하는 경우
      else if (loggedInUserId === undefined) {
        setLoginConfirmModal(!loginConfirmModal);
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
              `/users/subscription/${userProfileId}?subscribe=true`
            );
            toast.success("팔로우가 완료되었습니다!");
            // 요청 성공 시 query key를 무효화해서 현재 프로필 데이터 최신화
            client.invalidateQueries(["currentChef", userProfileId]);

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
        `/users/subscription/${userProfileId}?subscribe=false`
      );

      // 요청 성공 시 query key를 무효화해서 현재 프로필 데이터 최신화
      client.invalidateQueries(["currentChef", userProfileId]);

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

  /** 로그인 유도 모달 : 취소 클릭 핸들러 */
  const loginModalCloseHandler = () => {
    setLoginConfirmModal(false);
  };

  /** 로그인 유도 모달 : 로그인 클릭 핸들러 */
  const router = useRouter();
  const loginMoveHandler = () => {
    router.push("auth/login");
  };

  return (
    <>
      {/* 팔로우 취소 모달 */}
      {followDeleteConfirmModal && (
        <StyledConfirmModal
          icon={<AlertImage src="/images/orange_alert.svg" alt="alert" />}
          message="팔로우를 취소하시겠습니까?"
          onConfirm={deleteConfirmHandler}
          onCancel={confirmModalCloseHandler}
        />
      )}

      {/* 비회원 로그인 유도 모달 */}
      {loginConfirmModal && loggedInUserId === undefined && (
        <StyledLoginConfirmModal
          icon={<AlertImage src="/images/orange_alert.svg" alt="alert" />}
          message="로그인이 필요합니다. 로그인 하시겠습니까?"
          onConfirm={loginMoveHandler}
          onCancel={loginModalCloseHandler}
        />
      )}

      <ProfileContainer isHeaderVisible={isHeaderVisible}>
        <ProfileHeader>프로필 정보</ProfileHeader>
        <ProfileContentsWrapper>
          {/* 프로필 사진 */}
          <ProfileImage>
            <Image
              src={
                currentChef.img
                  ? currentChef.img
                  : "/images/recipe-view/기본 프로필.PNG"
              }
              alt="게시글 작성자 프로필 사진"
              width={130}
              height={130}
              style={{ objectFit: "cover", cursor: "pointer" }}
            />
          </ProfileImage>

          {/* 닉네임 */}
          <Nickname>{currentChef.username}</Nickname>

          {/* 팔로잉, 팔로워 */}
          <FollowBox>
            <span>팔로워</span>
            <BoldCount>{currentChef.fans.length}</BoldCount>
            <span>|</span>
            <span>팔로잉</span>
            <BoldCount>{currentChef.subscriptions.length}</BoldCount>
          </FollowBox>

          {/* 팔로우 버튼 */}
          <FollowButton onClick={followButtonHandler}>
            {followButtonText}
          </FollowButton>
        </ProfileContentsWrapper>
      </ProfileContainer>
    </>
  );
};

/** 프로필 박스 전체 감싸는 Div */
const ProfileContainer = styled.div<{ isHeaderVisible: boolean }>`
  display: none;

  @media (min-width: 1024px) {
    display: flex;
    flex-direction: column;
    width: 24rem;
    height: 37.6rem;
    margin-bottom: 10rem;
    margin-right: 4rem;
    margin-top: 4.1rem;
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
const ProfileHeader = styled.div`
  width: 24rem;
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
const ProfileContentsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

/** 프로필 이미지 감싸는 Div */
const ProfileImage = styled.div`
  display: flex;
  width: 12rem;
  height: 12rem;
  margin: 2.8rem 0 1.8rem 0;
  box-shadow: 0 0 0.3rem rgba(0, 0, 0, 0.3);
  border-radius: 50%;
  overflow: hidden;
`;

/** 닉네임 Span */
const Nickname = styled.span`
  font-size: 25px;
  font-weight: 600;
  color: #4f3d21;
`;

/** 팔로잉, 팔로워 Div */
const FollowBox = styled.div`
  display: flex;
  color: #4f3d21;
  font-size: 16.5px;
  gap: 0.3rem;
  margin: 1.5rem 0 2.5rem 0;
`;

/** 팔로잉, 팔로워수 강조 Span */
const BoldCount = styled.span`
  font-weight: 500;
`;

/** 팔로우 버튼 */
const FollowButton = styled.button`
  width: 20rem;
  height: 4rem;
  margin-bottom: 2rem;
  font-size: 17px;
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
const StyledConfirmModal = styled(ConfirmModal)``;

/** 로그인 유도 모달창 */
const StyledLoginConfirmModal = styled(LoginConfirmModal)``;

export default UserProfileCard;
