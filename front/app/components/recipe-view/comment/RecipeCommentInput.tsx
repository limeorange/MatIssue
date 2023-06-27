"use client";

import { ChangeEvent, useState } from "react";
import styled, { css } from "styled-components";
import Image from "next/image";
import { axiosBase } from "@/app/api/axios";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useRecoilState } from "recoil";
import darkModeAtom from "@/app/store/darkModeAtom";

/** 댓글 props type 지정 => id, text */
type CommentProps = {
  recipe_id: string;
};

/** 댓글 입력 컴포넌트 */
const RecipeCommentInput = ({ recipe_id }: CommentProps) => {
  const [isCommenting, setIsCommenting] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [activatedButton, setActivatedButton] = useState(false);

  const client = useQueryClient();

  // 다크 모드 상태 관리
  const [isDarkMode, setIsDarkMode] = useRecoilState(darkModeAtom);

  /** 댓글창 클릭시 상태 업데이트 핸들러 */
  const boxClickHandler = () => {
    setIsCommenting(true);
  };

  /** 작성하는 댓글 내용 업데이트 핸들러 */
  const commentInputHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setCommentText(e.target.value);
    if (e.target.value === "") {
      setActivatedButton(false);
    } else {
      setActivatedButton(true);
    }
  };

  /** 작성 완료된 댓글 서버로 보내고 화면에 출력해주는 핸들러 */
  const commentSubmitHandler = async () => {
    try {
      const response = await axiosBase.post(`/recipes/comment/${recipe_id}`, {
        comment_text: commentText,
      });
      client.invalidateQueries(["currentRecipe"]);
      toast.success("댓글 작성이 완료되었습니다");
    } catch (error) {
      console.log("댓글 작성 실패", error);
      toast.error("댓글 작성에 실패했습니다 ㅠ.ㅠ");
    }

    // 댓글 작성 완료 후 초기화
    setCommentText("");
  };

  return (
    <CommentContainer
      isDarkMode={isDarkMode}
      isCommenting={isCommenting}
      onClick={boxClickHandler}
    >
      <InputTextArea
        value={commentText}
        onChange={commentInputHandler}
        placeholder="댓글을 입력해주세요"
        isDarkMode={isDarkMode}
      />
      {/* 제출 버튼 아이콘 */}
      <SubmitButton disabled={!activatedButton} onClick={commentSubmitHandler}>
        <Image
          src={"/images/recipe-view/commentsubmitblack.svg"}
          alt="댓글 제출 아이콘"
          width={25}
          height={25}
        />
      </SubmitButton>
    </CommentContainer>
  );
};

/** 댓글 입력칸 전체 감싸는 Div */
const CommentContainer = styled.div<{
  isCommenting: boolean;
  isDarkMode: boolean;
}>`
  display: flex;
  width: 100%;
  border-radius: 1rem;
  padding-top: 1.2rem;
  padding-bottom: 1.2rem;
  margin-bottom: 2rem;

  align-items: center;

  color: #9ca3af;
  font-size: 15.5px;
  padding-left: 1.2rem;
  cursor: pointer;
  border: 0.2rem solid;

  border-color: ${(props) =>
    props.isDarkMode ? props.theme.lightNavy : "#dbd8d0"};

  ${({ isCommenting }) =>
    isCommenting &&
    css<{ isDarkMode: boolean }>`
      border-color: ${(props) =>
        props.isDarkMode ? props.theme.lightGrey : "#fbd26a"};

      // border-color: #fbd26a;
      color: #fbd26a;
    `}

  @media (min-width: 1024px) {
    margin-bottom: 16rem;
  }
`;

/** 댓글 입력 텍스트 */
const InputTextArea = styled.textarea<{ isDarkMode: boolean }>`
  outline: none;
  width: 100%;
  color: #9ca3af;
  font-size: 15.5px;
  resize: none;
  padding-right: 0.5rem;
  border: none;

  &:focus {
    outline: none;
    border: none;
  }

  background-color: ${(props) =>
    props.isDarkMode ? props.theme.deepNavy : "#ffffff"};

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

/** 제출 버튼 */
const SubmitButton = styled.button`
  padding-right: 1rem;
  padding-left: 1.5rem;

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
