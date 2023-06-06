"use client";

import Image from "next/image";
import { useEffect } from "react";
import styled from "styled-components";

type UserScrapProps = {
  scrapClickHandler: () => void;
  isBooked: boolean;
  isSaved: boolean;
  setIsSaved: React.Dispatch<React.SetStateAction<boolean>>;
};

/** 게시글 스크랩 컴포넌트 */
const RecipeScrap: React.FC<UserScrapProps> = ({
  scrapClickHandler,
  isBooked,
  isSaved,
  setIsSaved,
}) => {
  // const hasLocalStorage = typeof window !== "undefined" && window.localStorage;
  // const savedMemo = hasLocalStorage ? localStorage.getItem("scrapMemo") : null;
  // const hasMemo = savedMemo && savedMemo.trim().length > 0;

  useEffect(() => {
    const savedMemo = localStorage.getItem("scrapMemo") || "";
    const hasMemo = savedMemo.trim().length > 0;
    setIsSaved(hasMemo);
    console.log(hasMemo);
    console.log(savedMemo);
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
