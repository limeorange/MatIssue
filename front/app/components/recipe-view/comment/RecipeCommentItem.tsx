"use client";

import Image from "next/image";
import { useState } from "react";
import styled, { css } from "styled-components";
import CommentModal from "./CommentModal";
import { axiosBase } from "@/app/api/axios";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

/** 요리 댓글 단일 Props */
type RecipeCommentProps = {
  comment_author: string;
  comment_text: string;
  comment_id: string;
  comment_like: number;
  created_at: string;
  updated_at: string;
  comment_nickname: string;
  comment_profile_img: string;
};

/** 요리 댓글 단일 컴포넌트 */
const RecipeComment: React.FC<RecipeCommentProps> = ({
  comment_author,
  comment_text,
  comment_id,
  comment_like,
  created_at,
  updated_at,
  comment_nickname,
  comment_profile_img,
}) => {
  // 수정 버튼 눌렀을 때 textarea로 변경하기 위한 상태 관리
  const [isEditing, setIsEditing] = useState(false);
  // 수정 완료 후 댓글 내용 상태 관리
  const [editedCommentText, setEditedCommentText] = useState(comment_text);
  // 모달창 상태 관리
  const [isModal, setIsModal] = useState<boolean>(false);
  // 작성 중일 경우 테두리 효과 주기 위한 상태 관리
  const [isCommenting, setIsCommenting] = useState(false);

  // 현재의 QueryClient 인스턴스인 client를 사용하여 React Query 기능을 활용
  const client = useQueryClient();

  // 댓글 작성 시간 한국 기준으로 조정
  const userTimezoneOffset = new Date().getTimezoneOffset() * 60000;
  const userCreatedAt = new Date(created_at).getTime() - userTimezoneOffset;
  const koreanCreatedAt = new Date(userCreatedAt).toLocaleString("ko-KR");

  // 좋아요 버튼, 카운트 상태 관리
  const [isCommentLiked, setIsCommentLiked] = useState(false);
  const [commentLikesCount, setcommentLikesCount] = useState(comment_like);
  const countText = commentLikesCount.toLocaleString();

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
      const response = await axiosBase.patch(`/recipes/comment/${comment_id}`, {
        comment_text: editedCommentText,
      });
      toast.success("댓글 수정이 완료되었습니다");
      client.invalidateQueries(["currentRecipe"]);
    } catch (error) {
      console.log("댓글 수정 실패와 관련한 오류는...🧐", error);
      toast.error("댓글 수정에 실패했습니다 ㅠ.ㅠ");
    }
    // 수정 완료 후 상태 업데이트
    setIsEditing(false);
  };

  /** 취소 버튼 핸들러 */
  const commentCancelHandler = () => {
    setIsEditing(false);
    setEditedCommentText(comment_text);
  };

  /** 삭제 버튼 핸들러 */
  const commentDeleteHandler = async () => {
    try {
      const response = await axiosBase.delete(`/recipes/comment/${comment_id}`);
      toast.success("댓글 삭제가 완료되었습니다");
      client.invalidateQueries(["currentRecipe"]);
    } catch (error) {
      console.log("댓글 삭제 실패", error);
      toast.error("댓글 삭제에 실패했습니다 ㅠ.ㅠ");
    }
  };

  /** 좋아요 버튼 클릭 핸들러 */
  const heartClickHandler = () => {
    setIsCommentLiked(!isCommentLiked);
    if (isCommentLiked) {
      setcommentLikesCount(commentLikesCount - 1);
    } else {
      setcommentLikesCount(commentLikesCount + 1);
    }
  };

  return (
    <>
      <CommentContainer>
        <ProfileImageDiv>
          <Image
            src={comment_profile_img}
            alt="유저 프로필 사진"
            fill
            style={{
              objectFit: "cover",
              borderRadius: 20,
            }}
          />
        </ProfileImageDiv>

        {/* 작성자, 댓글 수정/삭제바, 댓글 내용 */}
        <CommentContentsDiv>
          <AuthorDotsDiv>
            {/* 작성자, 작성 시간 */}
            <AuthorTimeDiv>
              <AuthorNameSpan>{comment_nickname}</AuthorNameSpan>
              <CreatedTimeSpan>
                {koreanCreatedAt.split(":").slice(0, -1).join(":")}
              </CreatedTimeSpan>
            </AuthorTimeDiv>
            {/* 댓글 좋아요, 댓글 수정/삭제바 */}
            <div className="flex items-center">
              <LikesWrapperButton onClick={heartClickHandler}>
                <IconDiv>
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
                </IconDiv>
                <LikesCount>{countText}</LikesCount>
              </LikesWrapperButton>
              <ThreeDotsImageDiv onClick={() => setIsModal(true)}>
                {isModal && (
                  <CommentModal
                    isModal={isModal}
                    modalCloseHandler={modalCloseHandler}
                    editClickHandler={editClickHandler}
                    commentDeleteHandler={commentDeleteHandler}
                  />
                )}
                <Image
                  src={"/images/recipe-view/threedots.svg"}
                  alt="댓글 수정, 삭제바"
                  width={15}
                  height={15}
                  onClick={() => setIsModal(true)}
                />
              </ThreeDotsImageDiv>
            </div>
          </AuthorDotsDiv>
          {/* 댓글 내용 */}
          {/* 수정 버튼 눌렀을 때 textarea로 변경 */}
          {isEditing ? (
            <>
              <CommentContainerDiv
                isCommenting={isCommenting}
                onClick={boxClickHandler}
              >
                <InputTextArea
                  value={editedCommentText}
                  onChange={commentChangeHandler}
                />
              </CommentContainerDiv>
              <ButtonDiv>
                <DeleteButton onClick={commentCancelHandler}>취소</DeleteButton>
                <EditButton onClick={commentSaveHandler}>수정</EditButton>
              </ButtonDiv>
            </>
          ) : (
            <CommentText>{editedCommentText}</CommentText>
          )}
        </CommentContentsDiv>
      </CommentContainer>
    </>
  );
};

const AuthorTimeDiv = styled.div`
  display: flex;
  align-items: center;
`;

/** 수정, 삭제 버튼 감싸는 Div */
const ButtonDiv = styled.div`
  display: flex;
  gap: 0.8rem;
  justify-content: flex-end;
`;

/** 수정 Button */
const EditButton = styled.button`
  width: 6rem;
  height: 3.5rem;
  border-radius: 1rem;
  background: #fbe2a1;
  font-weight: 500;
  font-size: 15.5px;
  color: #4f3d21;
`;

/** 삭제 Button */
const DeleteButton = styled.button`
  width: 6rem;
  height: 3.5rem;
  border-radius: 1rem;
  border: 2px solid #fbe2a1;
  font-weight: 500;
  font-size: 15.5px;
  color: #4f3d21;
`;

/** 댓글 입력칸 전체 감싸는 Div */
const CommentContainerDiv = styled.div<{ isCommenting: boolean }>`
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

  ${({ isCommenting }) =>
    isCommenting &&
    css`
      border-color: #fbd26a;
      color: #fbd26a;
    `}
`;

/** 댓글 입력 텍스트 */
const InputTextArea = styled.textarea`
  outline: none;
  width: 99%;
  color: #9ca3af;
  font-size: 15.5px;
  resize: none;
  padding-right: 0.5rem;

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

/** 댓글 전체 감싸는 Div */
const CommentContainer = styled.div`
  display: flex;
  width: 100%;
  padding-bottom: 1.2rem;
  margin-bottom: 1.2rem;
  border-bottom: 0.1rem solid #dbd8d0;
`;

/** 작성자, 댓글 수정/삭제바, 댓글 내용 감싸는 Div */
const CommentContentsDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 1.2rem;
  width: 100%;
`;

/** 작성자 닉네임 Span */
const AuthorNameSpan = styled.span`
  font-size: 16px;
  color: #6f6f6f;
  font-weight: 500;
  margin-right: 0.8rem;
`;

const CreatedTimeSpan = styled.span`
  font-size: 14px;
  color: #afafaf;
`;

/** 프로필 이미지 감싸는 Div */
const ProfileImageDiv = styled.div`
  min-width: 4.9rem;
  min-height: 4.9rem;
  width: 4.9rem;
  height: 4.9rem;
  position: relative;
  border-radius: 50%;
  overflow: hidden;
`;

/** 작성자와 아이콘 감싸는 Div */
const AuthorDotsDiv = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
`;

/** 댓글 수정, 삭제 아이콘 감싸는 Div */
const ThreeDotsImageDiv = styled.div`
  cursor: pointer;
`;

/** 댓글 내용 Div */
const CommentText = styled.div`
  font-size: 15.5px;
  color: #6f6f6f;
  width: 100%;
`;

/** 좋아요 아이콘과 카운트 묶는 Button */
const LikesWrapperButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 1.5rem;
`;

/** 좋아요 아이콘 Div */
const IconDiv = styled.div`
  width: 1.8rem;
  height: 1.4rem;
  margin-right: 0.6rem;
`;

/** 좋아요 개수 Span */
const LikesCount = styled.span`
  font-size: 14px;
  color: #6f6f6f;
`;

export default RecipeComment;
