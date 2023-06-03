"use client";

import Image from "next/image";
import { useState } from "react";
import styled from "styled-components";
import CommentModal from "./CommentModal";

const RecipeComment = () => {
  const recipe_nickname = "허니자몽";
  const comment = `볶음밥이랑 같이 먹으면 더 맛있을 것 같아요 레시피 공유 감사합니다~!
     볶음밥이랑 같이 먹으면 더 맛있을 것 같아요 레시피 공유 감사합니다~!
     볶음밥이랑 같이 먹으면 더 맛있을 것 같아요 레시피 공유 감사합니다~!
     볶음밥이랑 같이 먹으면 더 맛있을 것 같아요 레시피 공유 감사합니다~!`;
  // const [isEditing, setIsEditing] = useState(false);

  const [isModal, setIsModal] = useState<boolean>(false);
  const onCloseModal = () => {
    // isModal 상태 값을 false로 업데이트하여 모달을 닫기
    setIsModal(false);
  };

  return (
    <>
      <CommentContainer>
        <ProfileImageDiv>
          <Image
            src={"/images/recipe-view/기본 프로필.png"}
            alt="기본 프로필 사진"
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
            {/* 작성자 */}
            <AuthorName>{recipe_nickname}</AuthorName>
            {/* 댓글 수정/삭제바 */}
            <ThreeDotsImageDiv onClick={() => setIsModal(true)}>
              {isModal && (
                <CommentModal isModal={isModal} onCloseModal={onCloseModal} />
              )}
              <Image
                src={"/images/recipe-view/threedots.svg"}
                alt="댓글 수정, 삭제바"
                width={15}
                height={15}
                onClick={() => setIsModal(true)}
              />
            </ThreeDotsImageDiv>
          </AuthorDotsDiv>
          {/* 댓글 내용 */}
          {/* 조건에 따라 textarea로 변경 (삼항연산자) */}
          <CommentText>{comment}</CommentText>
        </CommentContentsDiv>
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

/** 작성자, 댓글 수정/삭제바, 댓글 내용 감싸는 Div */
const CommentContentsDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 1.2rem;
  width: 100%;
`;

/** 작성자 닉네임 Div */
const AuthorName = styled.div`
  font-size: 16px;
  color: #6f6f6f;
  font-weight: 500;
  margin-bottom: 0.3rem;
`;

/** 프로필 이미지 감싸는 Div */
const ProfileImageDiv = styled.div`
  min-width: 5rem;
  min-height: 5rem;
  width: 5rem;
  height: 5rem;
  position: relative;
  border-width: 0.2rem;
  border-color: #fbd26a;
  border-radius: 50%;
  overflow: hidden;
`;

/** 작성자와 아이콘 감싸는 Div */
const AuthorDotsDiv = styled.div`
  display: flex;
  justify-content: space-between;
`;

/** 댓글 수정, 삭제 아이콘 감싸는 Div */
const ThreeDotsImageDiv = styled.div`
  cursor: pointer;
  margin-bottom: 0.5rem;
`;

/** 댓글 내용 Div */
const CommentText = styled.div`
  font-size: 15.5px;
  color: #6f6f6f;
  width: 100%;
`;

export default RecipeComment;
