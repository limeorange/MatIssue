import styled from "styled-components";
import ScrapCardItem from "./ScrapCardItem";
import NonRecipe from "../../UI/NonRecipe";

type MemoItemProps = {
  created_at: string;
  recipe_id: string;
  recipe_like: number;
  recipe_thumbnail: string;
  recipe_title: string;
  recipe_view: number;
  user_id: string;
  user_nickname: string;
};

/** 로컬스토리지에 있는 아이템 모두 가져오는 함수 */
const getAllMemoItems = () => {
  const keys = Object.keys(localStorage);
  const memoItems = keys.filter((key) => key.startsWith("memo_"));
  const memoItemValues = memoItems.map((key) => localStorage.getItem(key));
  return memoItemValues;
};

/** 스크랩 리스트 컴포넌트 */
const ScrapCardList: React.FC = () => {
  const parsedItems = getAllMemoItems();

  return (
    <ScrapListContainer>
      <ScrapTitleH2>나의 스크랩</ScrapTitleH2>
      {parsedItems.length === 0 ? (
        <NonRecipeMsg />
      ) : (
        <ScrapListGrid>
          {parsedItems.map((item, index) => {
            // 로컬스토리지에 있는 데이터 객체 분해 할당
            const parsedItem = JSON.parse(getAllMemoItems()[index]);
            const memoContent = parsedItem[0];
            const memoItemData = parsedItem[1];

            return (
              <ScrapCardItem
                key={index}
                memoContent={memoContent}
                memoItemData={memoItemData}
              ></ScrapCardItem>
            );
          })}
        </ScrapListGrid>
      )}
      ;
    </ScrapListContainer>
  );
};

/** 스크랩 리스트 전체 감싸는 Div */
const ScrapListContainer = styled.div`
  width: 100%;
`;

/** 스크랩 제목 H2 */
const ScrapTitleH2 = styled.h2`
  font-size: 18px;
  letter-spacing: 0.01em;
  margin: 0 0.5rem 0 1.9rem;
  font-weight: 600;
  color: #4f3d21;
  margin-bottom: 1.5rem;
`;

/** 레시피 스크랩 grid Div */
const ScrapListGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  margin-top: 1.5rem;
  margin-right: -1.5rem;
  margin-bottom: 1.5rem;
`;

/** 레시피가 없을 경우 띄워주는 안내 그림 */
const NonRecipeMsg = styled(NonRecipe)``;

export default ScrapCardList;
