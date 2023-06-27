"use client";

import darkModeAtom from "@/app/store/darkModeAtom";
import Image from "next/image";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";

type UserScrapProps = {
  currentUserID: string | undefined;
  scrapClickHandler: () => void;
  isBooked: boolean;
  isSaved: boolean;
  setIsSaved: React.Dispatch<React.SetStateAction<boolean>>;
  recipe_id: string;
};

type MemoItemProps = {
  created_at: string;
  recipe_id: string;
  recipe_like: string[];
  recipe_thumbnail: string;
  recipe_title: string;
  recipe_view: number;
  user_id: string;
  user_nickname: string;
};

type ScrapItemProps = {
  scrapData: MemoItemProps;
  memo: string;
  user_id: string;
};

/** 게시글 스크랩 컴포넌트 */
const RecipeScrap = ({
  currentUserID,
  scrapClickHandler,
  isBooked,
  isSaved,
  setIsSaved,
  recipe_id,
}: UserScrapProps) => {
  // 다크 모드 상태 관리
  const [isDarkMode, setIsDarkMode] = useRecoilState(darkModeAtom);

  // 처음 렌더링 시 클라이언트 사이드에서 로컬스토리지 받아오기 위한 의존성 관리
  // 스크랩 된 메모가 있으면 색칠되어있음
  useEffect(() => {
    const savedMemo = localStorage.getItem("scrapMemo");
    const savedParsedMemo = savedMemo ? JSON.parse(savedMemo) : [];
    const currentUserMemo = savedParsedMemo.filter(
      (item: ScrapItemProps) => item.user_id === currentUserID
    );
    const savedMemotext = currentUserMemo.filter(
      (item: ScrapItemProps) => item.scrapData.recipe_id === recipe_id
    );
    setIsSaved(savedMemotext.length === 0 ? false : true);
  }, []);

  return (
    <>
      <ScrapButtonWrapper isDarkMode={isDarkMode} onClick={scrapClickHandler}>
        <ScrapIcon>
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
        </ScrapIcon>
        <ScrapTitle isDarkMode={isDarkMode}>스크랩</ScrapTitle>
      </ScrapButtonWrapper>
    </>
  );
};

/** 스크랩 아이콘과 글자 묶는 Button */
const ScrapButtonWrapper = styled.button<{ isDarkMode: boolean }>`
  display: flex;
  width: 10rem;
  height: 4.2rem;
  border-radius: 1.5rem;
  justify-content: center;
  align-items: center;

  box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.3);
  background-color: ${(props) =>
    props.isDarkMode ? props.theme.lightNavy : "#ffffff"};

  @media (min-width: 1024px) {
    width: 12rem;
    height: 5.5rem;
    margin-top: 1rem;
  }
`;

/** 스크랩 아이콘 Div */
const ScrapIcon = styled.div`
  width: 2.5rem;
  height: 2rem;
  margin-right: 0.6rem;
  margin-bottom: 0.5rem;

  @media (min-width: 1024px) {
    width: 3.2rem;
    height: 3rem;
    margin-bottom: 0.3rem;
  }
`;

/** 스크랩 글자 Span */
const ScrapTitle = styled.span<{ isDarkMode: boolean }>`
  font-size: 16px;
  color: ${(props) => (props.isDarkMode ? props.theme.lightGrey : "#4F3D21")};

  @media (min-width: 1024px) {
    font-size: 18px;
  }
`;

export default RecipeScrap;
