"use client";

import axios from "axios";
import { ChangeEvent, FormEvent, useState, useRef, useEffect } from "react";
import styled from "styled-components";
import Image from "next/image";

/** 댓글 props type 지정 => id, text */
type Comment = {
  id: string;
  text: string;
};

const RecipeCommentInput = (props: Comment[]) => {
  //  props로 넘어온 댓글 내용이 있으면 그 내용을 넣어주고, 없으면 빈 배열로! (for 수정 구현)
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState<Comment[]>([]);
  const [activatedButton, setActivatedButton] = useState(false);

  /** 댓글 입력시 상태 업데이트 핸들러 */
  const commentInputHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setCommentText(e.target.value);
    if (e.target.value === "") {
      setActivatedButton(false);
    } else {
      setActivatedButton(true);
    }
  };

  /** 작성 완료된 댓글 서버로 보내고 화면에 출력해주는 핸들러 */
  const commentSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post<Comment>("/api/comments", {
        text: commentText,
      });
      const newComment = response.data;

      // 서버 저장된 새로운 댓글을 화면에 추가
      setComments((prevComments: Comment[]) => [...prevComments, newComment]);
    } catch (error) {
      console.log("댓글 작성 실패", error);
      alert("댓글 작성에 실패했습니다 ㅠ.ㅠ");
    }

    // 댓글 작성 완료 후 초기화
    setCommentText("");
  };

  return (
    <CommentContainerDiv>
      <InputTextArea
        value={commentText}
        onChange={commentInputHandler}
        placeholder="댓글을 입력해주세요"
      />
      {/* 제출 버튼 아이콘 */}
      {/* 제출하는 함수에 props로 넘어온 댓글 정보가 있으면 API에 수정 요청,
      없으면 등록 요청 예정 */}
      <SubmitButton>
        <Image
          src={"/images/recipe-view/commentsubmitblack.svg"}
          alt="댓글 제출 아이콘"
          width={25}
          height={25}
        />
      </SubmitButton>
    </CommentContainerDiv>
  );
};

/** 댓글 입력칸 전체 감싸는 Div */
const CommentContainerDiv = styled.div`
  display: flex;
  width: 100%;
  border-radius: 1rem;
  padding-top: 1.2rem;
  padding-bottom: 1.2rem;
  items-center: center;
  color: #9ca3af;
  font-size: 15.5px;
  padding-left: 1.2rem;
  cursor: pointer;
  border: 0.2rem solid #dbd8d0;

  &.active {
    border-color: #fbd26a;
    color: #fbd26a;
  }
`;

/** 댓글 입력 텍스트 */
const InputTextArea = styled.textarea`
  outline: none;
  width: 100%;
  color: #9ca3af;
  font-size: 15.5px;
  resize: none;
`;

/** 제출 버튼 */
const SubmitButton = styled.button`
  padding-right: 1rem;

  &:disabled {
    filter: invert(95%) sepia(16%) saturate(99%) hue-rotate(356deg)
      brightness(91%) contrast(87%);
  }

  &:not(:disabled) {
    filter: invert(79%) sepia(39%) saturate(552%) hue-rotate(353deg)
      brightness(103%) contrast(97%);
  }
`;

export default RecipeCommentInput;
