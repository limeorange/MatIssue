import styled from "styled-components";
import ScrapCardItem from "./ScrapCardItem";
import NonRecipe from "../../UI/NonRecipe";
import { useEffect, useState } from "react";
import NonScrapPage from "../../UI/NonScrap";

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
};

/** 스크랩 리스트 컴포넌트 */
const ScrapCardList: React.FC = () => {
  const [parsedMemo, setParsedMemo] = useState<ScrapItemProps[]>([]);

  // localStorage is not defined 에러 해결
  // 페이지가 client에 마운트될 때까지 기다렸다가 localStorage에 접근
  useEffect(() => {
    if (typeof window !== "undefined") {
      const existingMemo = localStorage.getItem("scrapMemo");
      const parsedMemo = existingMemo ? JSON.parse(existingMemo) : [];
      setParsedMemo(parsedMemo);
    }
  }, []);

  return (
    <ScrapListContainer>
      <ScrapTitleSpan>나의 스크랩</ScrapTitleSpan>
      <ScrapCountSpan>{parsedMemo.length}</ScrapCountSpan>
      {parsedMemo.length === 0 ? (
        <NonScrapMsg />
      ) : (
        <ScrapListGrid>
          {parsedMemo.map((item: ScrapItemProps, index: number) => {
            const recipeData = item["scrapData"];
            const memoText = item["memo"];
            return (
              <ScrapCardItem
                key={index}
                recipeData={recipeData}
                memoText={memoText}
                setParsedMemo={setParsedMemo}
              ></ScrapCardItem>
            );
          })}
        </ScrapListGrid>
      )}
    </ScrapListContainer>
  );
};

/** 스크랩 리스트 전체 감싸는 Div */
const ScrapListContainer = styled.div`
  width: 100%;
`;

/** 스크랩 제목 Span */
const ScrapTitleSpan = styled.span`
  font-size: 18px;
  letter-spacing: 0.01em;
  margin: 0 0.5rem 0 1.9rem;
  font-weight: 600;
  color: #4f3d21;
`;

/** 스크랩 개수 Span */
const ScrapCountSpan = styled.span`
  font-size: 17px;
  font-weight: 700;
  color: #545454;
`;

/** 레시피 스크랩 grid Div */
const ScrapListGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  margin-top: 1.5rem;
  grid-column-gap: 25px;
  grid-row-gap: 25px;
`;

/** 레시피가 없을 경우 띄워주는 안내 그림 */
const NonScrapMsg = styled(NonScrapPage)``;

export default ScrapCardList;
