import styled, { css } from "styled-components";
import Image from "next/image";
import { ChangeEvent, useState } from "react";

/** 유저 검색창 컴포넌트 */
const UserFollowSearch = () => {
  const [isSearching, setIsSearching] = useState(false);
  const [activatedButton, setActivatedButton] = useState(false);
  const [commentText, setCommentText] = useState("");

  /** 검색창 클릭시 상태 업데이트 핸들러 */
  const boxClickHandler = () => {
    setIsSearching(true);
  };

  /** 작성하는 검색 내용 업데이트 핸들러 */
  const maxLength = 20;
  const commentInputHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    if (text.length <= maxLength) {
      setCommentText(text);
      if (text === "") {
        setActivatedButton(false);
      } else {
        setActivatedButton(true);
      }
    }
  };

  return (
    <>
      <SearchContainer isSearching={isSearching} onClick={boxClickHandler}>
        <InputTextArea
          value={commentText}
          onChange={commentInputHandler}
          placeholder="닉네임, 아이디로 검색해보세요"
        />
        {/* 검색 버튼 아이콘 */}
        <SearchButton
          disabled={!activatedButton}
          // onClick={commentSubmitHandler}
        >
          <Image
            src={"/images/user-page/search.svg"}
            alt="검색 아이콘"
            width={25}
            height={25}
          />
        </SearchButton>
      </SearchContainer>
    </>
  );
};

/** 검색 입력칸 전체 감싸는 Div */
const SearchContainer = styled.div<{ isSearching: boolean }>`
  display: flex;
  border-radius: 2rem;
  padding: 1rem 0 1rem 1.5rem;
  margin-bottom: 2rem;
  margin-top: 1.7rem;
  align-items: center;
  box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.25);
  width: 100%;
  max-width: 36rem;
  height: 4.4rem;

  color: #9ca3af;
  cursor: pointer;
  border: 0.15rem solid #ffffff;

  ${({ isSearching }) =>
    isSearching &&
    css`
      // border-color: #fbd26a;
      border: 0.15rem solid #fbd26a;
      box-shadow: none;
      color: #fbd26a;
    `}

  @media (min-width: 1024px) {
    width: 36rem;
    margin-top: 0;
  }
`;

/** 검색 내용 입력 텍스트 */
const InputTextArea = styled.textarea`
  outline: none;
  width: 100%;
  height: 100%;
  color: #9ca3af;
  font-size: 15px;
  resize: none;
  padding-right: 0.5rem;
  border: none;
  overflow-y: hidden;
`;

/** 제출 버튼 */
const SearchButton = styled.button`
  padding-right: 1.5rem;
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

export default UserFollowSearch;
