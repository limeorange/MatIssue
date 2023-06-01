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
  const [isCommenting, setIsCommenting] = useState(false);

  //  props로 넘어온 댓글 내용이 있으면 그 내용을 넣어주고, 없으면 빈 배열로!
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState<Comment[]>([]);
  const [activatedButton, setActivatedButton] = useState(false);

  //   useEffect(() => {
  //     // 글자가 박스의 가로 크기를 초과할 경우 박스의 높이 조절
  //     const commentBox = commentBoxRef.current;
  //     if (commentBox.scrollHeight > commentBox.clientHeight) {
  //       commentBox.style.height = `${commentBox.scrollHeight}px`;
  //     }
  //   }, [commentText]);

  /** 댓글창 클릭시 상태 업데이트 핸들러 */
  const boxClickHandler = () => {
    setIsCommenting(true);
  };

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
  const commentSubmitHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    //   const commentSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
    //     e.preventDefault();

    // try {
    //   const response = await axios.post<Comment>("/api/comments", {
    //     text: commentText,
    //   });
    //   const newComment = response.data;

    //   // 서버 저장된 새로운 댓글을 화면에 추가
    //   setComments((prevComments: Comment[]) => [...prevComments, newComment]);
    // } catch (error) {
    //   console.log("댓글 작성 실패", error);
    //   alert("댓글 작성에 실패했습니다 ㅠ.ㅠ");
    // }

    // 댓글 작성 완료 후 초기화
    setCommentText("");
    setIsCommenting(false);
  };

  console.log(activatedButton);

  return (
    <div
      className={`flex w-full rounded-[10px] pt-[1.2rem] pb-[1.2rem]
      items-center text-[#9ca3af] text-[15.5px] pl-[1.2rem]
      cursor-pointer ${
        isCommenting
          ? "border-[#FBD26A] border-[2px]"
          : "border-[#DBD8D0] border-[2px] text-[#DBD8D0]"
      } `}
      onClick={boxClickHandler}
    >
      <form className="w-full">
        <textarea
          value={commentText}
          onChange={commentInputHandler}
          placeholder="댓글을 입력해주세요"
          className="outline-none w-full text-[#9ca3af] text-[15.5px]
              resize-none"
        />
      </form>
      {/* 제출 버튼 아이콘 */}
      {/* 제출하는 함수에 props로 넘어온 댓글 정보가 있으면 API에 수정 요청
      없으면 등록 요청 */}
      <button className="pr-[10px]" disabled={!activatedButton}>
        <Image
          src={"/images/recipe-view/commentsubmitblack.svg"}
          alt="댓글 제출 아이콘"
          width={25}
          height={25}
          style={{
            filter: activatedButton
              ? "invert(79%) sepia(39%) saturate(552%) hue-rotate(353deg) brightness(103%) contrast(97%)"
              : "invert(95%) sepia(16%) saturate(99%) hue-rotate(356deg) brightness(91%) contrast(87%)",
          }}
        />
      </button>
    </div>
  );
};

/** 이미지 감싸는 Div */
const ImageWrapperDiv = styled.div`
  width: 5rem;
  height: 5rem;
  position: relative;
  border-width: 0.2rem;
  border-color: #fbd26a;
  border-radius: 50%;
  overflow: hidden;
`;

export default RecipeCommentInput;
