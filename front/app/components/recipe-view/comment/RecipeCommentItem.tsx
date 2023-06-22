"use client";

import Image from "next/image";
import { useState } from "react";
import styled, { css } from "styled-components";
import CommentModal from "./CommentModal";
import { axiosBase } from "@/app/api/axios";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { Comments, User } from "@/app/types";
import getCurrentUser from "@/app/api/user";
import LoginConfirmModal from "../../UI/LoginConfirmModal";
import { AlertImage } from "@/app/styles/my-page/modify-user-info.style";
import { useRouter } from "next/navigation";
import ConfirmModal from "../../UI/ConfirmModal";
import { useRecoilState } from "recoil";
import darkModeAtom from "@/app/store/darkModeAtom";

/** 요리 댓글 단일 Props */
type RecipeCommentProps = Comments;

/** 요리 댓글 단일 컴포넌트 */
const RecipeComment = ({
  comment_author,
  comment_text,
  comment_id,
  comment_like,
  comment_parent,
  created_at,
  updated_at,
  comment_nickname,
  comment_profile_img,
}: RecipeCommentProps) => {
  // 수정 버튼 눌렀을 때 textarea로 변경하기 위한 상태 관리
  const [isEditing, setIsEditing] = useState(false);

  // 수정 완료 후 댓글 내용 상태 관리
  const [editedCommentText, setEditedCommentText] = useState(comment_text);

  // 모달창 상태 관리
  const [isModal, setIsModal] = useState<boolean>(false);

  // 작성 중일 경우 테두리 효과 주기 위한 상태 관리
  const [isCommenting, setIsCommenting] = useState(false);

  // 로그인 유도 모달 상태 관리
  const [loginConfirmModal, setLoginConfirmModal] = useState(false);

  // 현재의 QueryClient 인스턴스인 client를 사용하여 React Query 기능을 활용
  const client = useQueryClient();

  // 댓글 작성 시간 한국 기준으로 조정
  const userTimezoneOffset = new Date().getTimezoneOffset() * 60000;
  const userCreatedAt = new Date(created_at).getTime() - userTimezoneOffset;
  const koreanCreatedAt = new Date(userCreatedAt).toLocaleString("ko-KR");

  /** 로그인 유도 모달창 */
  const StyledLoginConfirmModal = styled(LoginConfirmModal)``;

  // 캐시에 저장된 현재 유저정보를 가져옴
  const { data: currentUser } = useQuery<User>(["currentUser"], () =>
    getCurrentUser()
  );
  const loggedInUserId: string | undefined = currentUser?.user_id;

  // 좋아요 버튼, 카운트 상태 관리
  const [isCommentLiked, setIsCommentLiked] = useState(
    loggedInUserId !== undefined && comment_like.includes(loggedInUserId)
  );
  const [commentLikesCount, setcommentLikesCount] = useState(
    comment_like.length
  );
  const countText = commentLikesCount.toLocaleString();

  // 댓글 삭제 확인 모달 상태 관리
  const [commentDeleteConfirmModal, setCommentDeleteConfirmModal] =
    useState(false);

  // 다크 모드 상태 관리
  const [isDarkMode, setIsDarkMode] = useRecoilState(darkModeAtom);

  /** 댓글창 클릭시 상태 업데이트 핸들러 */
  const boxClickHandler = () => {
    setIsCommenting(true);
  };

  /** 모달창 닫는 핸들러 */
  const modalCloseHandler = () => {
    setIsModal(false);
  };

  /** 수정 버튼 상태 관리 핸들러 */
  const editClickHandler = () => {
    setIsEditing(true);
  };

  /** 수정 버튼 내용 업데이트 핸들러 */
  const commentChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditedCommentText(e.target.value);
  };

  /** 수정 댓글 제출 핸들러 */
  const commentSaveHandler = async () => {
    try {
      await axiosBase.patch(`/recipes/comment/${comment_id}`, {
        comment_text: editedCommentText,
      });
      toast.success("댓글 수정이 완료되었습니다");
      client.invalidateQueries(["currentRecipe"]);
    } catch (error) {
      console.log("댓글 수정 실패와 관련한 오류는...🧐", error);
      toast.error("댓글 수정에 실패했습니다 ㅠ.ㅠ");
    } finally {
      // 수정 완료 후 상태 업데이트
      setIsEditing(false);
    }
  };

  /** 취소 버튼 핸들러 */
  const commentCancelHandler = () => {
    setIsEditing(false);
    setEditedCommentText(comment_text);
  };

  /** 댓글 삭제 버튼 핸들러 */
  const deleteClickHandler = () => {
    setCommentDeleteConfirmModal(true);
  };

  /** 댓글 삭제 모달 : 확인 클릭 핸들러 */
  const deleteConfirmHandler = async () => {
    try {
      await axiosBase.delete(`/recipes/comment/${comment_id}`);
      toast.success("댓글 삭제가 완료되었습니다");
      client.invalidateQueries(["currentRecipe"]);
    } catch (error) {
      console.log("댓글 삭제 실패", error);
      toast.error("댓글 삭제에 실패했습니다 ㅠ.ㅠ");
    }
  };

  /** 댓글 삭제 모달 : 취소 클릭 핸들러 */
  const confirmModalCloseHandler = () => {
    setCommentDeleteConfirmModal(false);
  };

  /** 좋아요 버튼 클릭 핸들러 */
  const heartClickHandler = async () => {
    try {
      // 비회원의 경우 로그인 유도 모달창 띄워줌
      if (loggedInUserId === undefined) {
        setLoginConfirmModal(!loginConfirmModal);
      }
      // 이미 좋아요를 누른 경우 해당 user_id를 배열에서 삭제 (좋아요 취소)
      else if (
        loggedInUserId !== undefined &&
        comment_like.includes(loggedInUserId)
      ) {
        const commentLikesUpdated: string[] = comment_like.filter(
          (id) => id !== loggedInUserId
        );
        await axiosBase.patch(
          `/recipes/comment/${comment_id}/like`,
          commentLikesUpdated
        );
        setIsCommentLiked(false);
        setcommentLikesCount(commentLikesCount - 1);
        toast.success("좋아요가 취소되었습니다ㅠ.ㅠ");
      }
      // 좋아요를 처음 누른 경우
      else if (loggedInUserId !== undefined) {
        comment_like.push(loggedInUserId);
        await axiosBase.patch(
          `/recipes/comment/${comment_id}/like`,
          comment_like
        );
        setIsCommentLiked(true);
        setcommentLikesCount(commentLikesCount + 1);
        toast.success("맛이슈와 함께라면 언제든 좋아요!");
      }
      client.invalidateQueries(["currentRecipe"]);
    } catch (error) {
      console.log("좋아요 요청 실패와 관련한 오류는..🧐", error);
      toast.error("좋아요 요청에 실패했습니다 ㅠ.ㅠ");
    }
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
      <CommentContainer>
        {/* 비회원 로그인 유도 모달 */}
        {loginConfirmModal && loggedInUserId === undefined && (
          <StyledLoginConfirmModal
            icon={<AlertImage src="/images/orange_alert.svg" alt="alert" />}
            message="로그인이 필요합니다. 로그인 하시겠습니까?"
            onConfirm={loginMoveHandler}
            onCancel={loginModalCloseHandler}
          />
        )}

        {/* 댓글 삭제 확인 모달 */}
        {commentDeleteConfirmModal && (
          <StyledConfirmModal
            icon={<AlertImage src="/images/orange_alert.svg" alt="alert" />}
            message="댓글을 삭제하시겠습니까?"
            onConfirm={deleteConfirmHandler}
            onCancel={confirmModalCloseHandler}
          />
        )}

        <ProfileImageWrapper>
          <Image
            src={comment_profile_img}
            alt="유저 프로필 사진"
            fill
            style={{
              objectFit: "cover",
              borderRadius: 20,
            }}
          />
        </ProfileImageWrapper>

        {/* 작성자, 댓글 수정/삭제바, 댓글 내용 */}
        <CommentContentsWrapper>
          <AuthorDotsWrapper>
            {/* 작성자, 작성 시간 */}
            <AuthorTimeBox>
              <AuthorName isDarkMode={isDarkMode}>
                {comment_nickname}
              </AuthorName>
              <CreatedTime>
                {koreanCreatedAt.split(":").slice(0, -1).join(":")}
              </CreatedTime>
            </AuthorTimeBox>
            {/* 댓글 좋아요, 댓글 수정/삭제바 */}
            <div className="flex items-center">
              <LikesButtonWrapper onClick={heartClickHandler}>
                <LikesIcon>
                  <Image
                    src={
                      isCommentLiked
                        ? "/images/recipe-view/heart_full.svg"
                        : "/images/recipe-view/heart.svg"
                    }
                    alt="게시글 좋아요 하트"
                    width={30}
                    height={26}
                    style={{ objectFit: "cover", cursor: "pointer" }}
                  />
                </LikesIcon>
                <LikesCount>{countText}</LikesCount>
              </LikesButtonWrapper>
              <ThreeDotsImageWrapper onClick={() => setIsModal(true)}>
                {isModal && loggedInUserId === comment_author && (
                  <CommentModal
                    isModal={isModal}
                    modalCloseHandler={modalCloseHandler}
                    editClickHandler={editClickHandler}
                    deleteClickHandler={deleteClickHandler}
                  />
                )}
                {loggedInUserId !== undefined &&
                  loggedInUserId === comment_author && (
                    <Image
                      src={"/images/recipe-view/threedots.svg"}
                      alt="댓글 수정, 삭제바"
                      width={15}
                      height={15}
                      onClick={() => setIsModal(true)}
                    />
                  )}
              </ThreeDotsImageWrapper>
            </div>
          </AuthorDotsWrapper>
          {/* 댓글 내용 */}
          {/* 수정 버튼 눌렀을 때 textarea로 변경 */}
          {isEditing ? (
            <>
              <CommentInputWrapper
                isCommenting={isCommenting}
                onClick={boxClickHandler}
                isDarkMode={isDarkMode}
              >
                <InputTextArea
                  value={editedCommentText}
                  onChange={commentChangeHandler}
                  isDarkMode={isDarkMode}
                />
              </CommentInputWrapper>
              <ButtonWrapper>
                <CancelButton
                  isDarkMode={isDarkMode}
                  onClick={commentCancelHandler}
                >
                  취소
                </CancelButton>
                <EditButton
                  isDarkMode={isDarkMode}
                  onClick={commentSaveHandler}
                >
                  수정
                </EditButton>
              </ButtonWrapper>
            </>
          ) : (
            <CommentText isDarkMode={isDarkMode}>
              {editedCommentText}
            </CommentText>
          )}
        </CommentContentsWrapper>
      </CommentContainer>
    </>
  );
};

/** 댓글 전체 감싸는 Div */
const CommentContainer = styled.div`
  display: flex;
  width: 100%;
  padding-bottom: 1.2rem;
  margin-bottom: 1.2rem;
  border-bottom: 0.1rem solid #dbd8d0;
`;

/** 댓글 입력칸 전체 감싸는 Div */
const CommentInputWrapper = styled.div<{
  isCommenting: boolean;
  isDarkMode: boolean;
}>`
  display: flex;
  width: 100%;
  border-radius: 1rem;
  padding-top: 1.2rem;
  padding-bottom: 1.2rem;
  margin-bottom: 1rem;
  align-items: center;
  color: #9ca3af;
  font-size: 15.5px;
  padding-left: 1.2rem;
  cursor: pointer;
  border: 0.2rem solid #dbd8d0;

  ${({ isCommenting, isDarkMode, theme }) =>
    isCommenting &&
    css`
      color: #fbd26a;
      border-color: ${(props) => (isDarkMode ? theme.lightGrey : "#fbd26a")};
    `}
`;

/** 댓글 입력 텍스트 */
const InputTextArea = styled.textarea<{ isDarkMode: boolean }>`
  outline: none;
  width: 99%;
  color: #9ca3af;
  font-size: 15.5px;
  resize: none;
  padding-right: 0.5rem;
  border: none;

  &:focus {
    border: none;
    outline: none;
  }

  background: ${(props) =>
    props.isDarkMode ? props.theme.deepNavy : "#fffff"};

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

/** 작성자, 댓글 수정/삭제바, 댓글 내용 감싸는 Div */
const CommentContentsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 1.2rem;
  width: 100%;
`;

/** 작성자 닉네임 Span */
const AuthorName = styled.span<{ isDarkMode: boolean }>`
  font-size: 14.8px;
  font-weight: 500;
  margin-right: 0.8rem;
  color: ${(props) => (props.isDarkMode ? props.theme.grey : "#6f6f6f")};

  @media (min-width: 1024px) {
    font-size: 16px;
  }
`;

const CreatedTime = styled.span`
  font-size: 11px;
  color: #afafaf;

  @media (min-width: 1024px) {
    font-size: 14px;
  }
`;

/** 프로필 이미지 감싸는 Div */
const ProfileImageWrapper = styled.div`
  min-width: 4.9rem;
  min-height: 4.9rem;
  width: 4.9rem;
  height: 4.9rem;
  position: relative;
  border-radius: 50%;
  overflow: hidden;
`;

/** 작성자와 아이콘 감싸는 Div */
const AuthorDotsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
`;

/** 댓글 수정, 삭제 아이콘 감싸는 Div */
const ThreeDotsImageWrapper = styled.div`
  display: flex;
  cursor: pointer;
  width: 2.5rem;
  height: 2.5rem;
`;

/** 댓글 내용 Div */
const CommentText = styled.div<{ isDarkMode: boolean }>`
  font-size: 14.5px;
  color: #6f6f6f;
  width: 100%;
  color: ${(props) => (props.isDarkMode ? props.theme.grey : "#6f6f6f")};

  @media (min-width: 1024px) {
    font-size: 15.5px;
  }
`;

/** 좋아요 아이콘과 카운트 묶는 Button */
const LikesButtonWrapper = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 1.5rem;
`;

/** 좋아요 아이콘 Div */
const LikesIcon = styled.div`
  width: 1.8rem;
  height: 1.4rem;
  margin-right: 0.6rem;
`;

/** 좋아요 개수 Span */
const LikesCount = styled.span`
  font-size: 14px;
  color: #6f6f6f;
`;

/** 작성자, 시간 담는 Div */
const AuthorTimeBox = styled.div`
  display: flex;
  flex-direction: column;

  @media (min-width: 1024px) {
    align-items: center;
    flex-direction: row;
  }
`;

/** 수정, 취소 버튼 감싸는 Div */
const ButtonWrapper = styled.div`
  display: flex;
  gap: 0.8rem;
  justify-content: flex-end;
`;

/** 수정 Button */
const EditButton = styled.button<{ isDarkMode: boolean }>`
  width: 6rem;
  height: 3.5rem;
  border-radius: 1rem;
  font-weight: 500;
  font-size: 15.5px;

  color: ${(props) => (props.isDarkMode ? props.theme.navy : "#4F3D21")};
  background: ${(props) =>
    props.isDarkMode ? props.theme.lightGrey : "#fbe2a1"};
`;

/** 취소 Button */
const CancelButton = styled.button<{ isDarkMode: boolean }>`
  width: 6rem;
  height: 3.5rem;
  border-radius: 1rem;
  border: 2px solid;
  font-weight: 500;
  font-size: 15.5px;

  color: ${(props) => (props.isDarkMode ? props.theme.lightGrey : "#4F3D21")};
  border-color: ${(props) =>
    props.isDarkMode ? props.theme.lightGrey : "#fbe2a1"};
`;

/** 댓글 삭제 컨펌 모달창 */
const StyledConfirmModal = styled(ConfirmModal)``;

export default RecipeComment;
