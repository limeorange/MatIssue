import styled from "styled-components";
import Image from "next/image";
import { useQueryClient } from "@tanstack/react-query";
import { User } from "@/app/types";
import { useState } from "react";
import toast from "react-hot-toast";
import { axiosBase } from "@/app/api/axios";
import { useRouter } from "next/navigation";
import ConfirmModal from "../UI/ConfirmModal";
import LoginConfirmModal from "../UI/LoginConfirmModal";
import { AlertImage } from "@/app/styles/my-page/modify-user-info.style";

type UserFollowItemProps = {
  userId: string;
  userNickname: string;
  userImg: string;
  isFollowing: boolean;
  loggedInUserId: string;
  initialCurrentChef: User;
};

/** 팔로워 or 팔로잉 컴포넌트에서 쓰이는 단일 유저 컴포넌트 */
const UserFollowItem = ({
  userId,
  userNickname,
  userImg,
  isFollowing,
  loggedInUserId,
  initialCurrentChef,
}: UserFollowItemProps) => {
  const client = useQueryClient();

  console.log(initialCurrentChef);

  // 로그인 유도 모달 상태 관리
  const [loginConfirmModal, setLoginConfirmModal] = useState(false);

  // 상태에 따른 팔로우, 팔로잉 버튼
  const followButtonText = isFollowing ? "팔로잉" : "팔로우";

  // 팔로우 취소 모달 상태 관리
  const [followDeleteConfirmModal, setFollowDeleteConfirmModal] =
    useState(false);

  /** 팔로우 버튼 클릭 핸들러 */
  const followButtonHandler = async () => {
    try {
      // 작성자가 자신의 게시글을 보는 경우
      if (loggedInUserId === userId) {
        toast.success(`소중한 당신을 언제나 응원해요!`);
      }
      // 로그인되지 않은 유저가 팔로우 요청하는 경우
      else if (loggedInUserId === undefined) {
        setLoginConfirmModal(!loginConfirmModal);
      }
      // 작성자와 다른 로그인 유저가 팔로우 요청하는 경우
      else {
        // 이미 팔로우를 한 경우 팔로우 취소 모달창 띄워줌
        if (isFollowing === true) {
          setFollowDeleteConfirmModal(true);
        }
        // 로그인된 유저가 팔로우 요청 하는 경우
        else {
          try {
            const response = await axiosBase.post(
              `/users/subscription/${userId}?subscribe=true`
            );
            toast.success("팔로우가 완료되었습니다!");
            // 요청 성공 시 현재 로그인 유저 데이터 최신화
            client.invalidateQueries(["currentUser"]);
            // 요청 성공 시 현재 프로필 쉐프 데이터 최신화
            client.invalidateQueries([
              "currentChef",
              initialCurrentChef.user_id,
            ]);
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
        `/users/subscription/${userId}?subscribe=false`
      );

      // 요청 성공 시 현재 로그인 유저 데이터 최신화
      client.invalidateQueries(["currentUser"]);
      // 요청 성공 시 현재 프로필 쉐프 데이터 최신화
      client.invalidateQueries(["currentChef", initialCurrentChef.user_id]);

      toast.success("팔로우가 취소되었습니다!");
    } catch (error) {
      console.log("팔로우 취소 실패와 관련한 오류는..🧐", error);
      toast.error("팔로우 취소에 실패했습니다 ㅠ.ㅠ");
    } finally {
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

  /** 프로필 클릭 핸들러 - 유저 페이지로 이동 */
  const profileClickHandler = () => {
    router.push(`user/${userId}`);
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

      <UserContainer>
        <UserInfoWrapper onClick={profileClickHandler}>
          {/* 프로필 이미지 */}
          <ProfileImage>
            <Image
              src={userImg ? userImg : "/images/recipe-view/기본 프로필.PNG"}
              alt={`${userNickname}님의 프로필 이미지`}
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
          {loggedInUserId !== userId && (
            <FollowButton
              isFollowing={isFollowing}
              onClick={followButtonHandler}
            >
              {followButtonText}
            </FollowButton>
          )}
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
  width: 32rem;
  height: 5.7rem;
  align-items: center;
`;

/** 유저 프로필, 아이디, 닉네임 감싸는 Div */
const UserInfoWrapper = styled.div`
  display: flex;
  cursor: pointer;
  width: 23rem;
`;

/** 프로필 이미지 감싸는 Div */
const ProfileImage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 5.5rem;
  height: 5.5rem;
  overflow: hidden;
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
const FollowButton = styled.button<{ isFollowing: boolean }>`
  width: 7.5rem;
  height: 2.8rem;
  font-size: 14.5px;
  font-weight: 500;
  background-color: #fbe2a1;
  color: #4f3d21;
  border-radius: 1rem;
  transition: background-color 0.2s ease-in-out;
  margin-right: 1rem;

  /* 팔로잉일 경우 회색 배경색 적용 */
  background-color: ${(props) => (props.isFollowing ? "#dddddd" : "#fbe2a1")};

  &:hover {
    background-color: ${(props) => (props.isFollowing ? "#dddddd" : "#fbd26a")};
  }
`;

/** 팔로우 취소 컨펌 모달창 */
const StyledConfirmModal = styled(ConfirmModal)``;

/** 로그인 유도 모달창 */
const StyledLoginConfirmModal = styled(LoginConfirmModal)``;

export default UserFollowItem;
