"use client";

import Image from "next/image";
import { useEffect } from "react";
import styled from "styled-components";

type UserScrapProps = {
  scrapClickHandler: () => void;
  isBooked: boolean;
  isSaved: boolean;
  setIsSaved: React.Dispatch<React.SetStateAction<boolean>>;
  localStorageKey: string;
};

/** 게시글 스크랩 컴포넌트 */
const RecipeScrap: React.FC<UserScrapProps> = ({
  scrapClickHandler,
  isBooked,
  isSaved,
  setIsSaved,
  localStorageKey,
}) => {
  // 처음 렌더링 시 클라이언트 사이드에서 로컬스토리지 받아오기 위한 의존성 관리
  useEffect(() => {
    const savedMemo = localStorage.getItem(localStorageKey) || "";
    const hasMemo = savedMemo.trim().length > 0;
    setIsSaved(hasMemo);
  }, []);

  return (
    <>
      <ScrapWrapperButton onClick={scrapClickHandler}>
        <IconDiv>
          <Image
            src={
              isBooked || isSaved
                ? "/images/recipe-view/scrap_full.svg"
                : "/images/recipe-view/scrap_empty.svg"
            }
            alt="게시글 스크랩 아이콘"
            width={32}
            height={28}
            style={{ objectFit: "cover", cursor: "pointer" }}
          />
        </IconDiv>
        <ScrapTitle>스크랩</ScrapTitle>
      </ScrapWrapperButton>
    </>
  );
};

/** 스크랩 아이콘과 글자 묶는 Button */
const ScrapWrapperButton = styled.button`
  display: flex;
  width: 12rem;
  height: 5.5rem;
  border: 0.17rem solid #c8c8c8;
  border-radius: 1.5rem;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
`;

/** 스크랩 아이콘 Div */
const IconDiv = styled.div`
  width: 3.2rem;
  height: 3rem;
  margin-right: 0.6rem;
  margin-bottom: 0.3rem;
`;

/** 스크랩 글자 Span */
const ScrapTitle = styled.span`
  font-size: 18px;
`;

export default RecipeScrap;
