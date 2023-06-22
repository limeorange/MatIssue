import styled from "styled-components";
import ScrapCardItem from "./ScrapCardItem";
import { useEffect, useState } from "react";
import NonScrapPage from "../../UI/NonScrap";
import Pagination from "../../pagination/Pagination";
import { useQuery } from "@tanstack/react-query";
import getCurrentUser from "@/app/api/user";
import InfiniteScroll from "react-infinite-scroll-component";
import { useRecoilValue } from "recoil";
import darkModeAtom from "@/app/store/darkModeAtom";

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

/** 스크랩 리스트 컴포넌트 */
const ScrapCardList: React.FC = () => {
  const [parsedMemo, setParsedMemo] = useState<ScrapItemProps[]>([]);
  const { data: currentUser } = useQuery(["currentUser"], () =>
    getCurrentUser()
  );
  const [currentPage, setCurrentPage] = useState<number>(1);
  const scrapsPerPage = 16;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 375);
  const isDarkMode = useRecoilValue(darkModeAtom);

  // localStorage is not defined 에러 해결
  // 페이지가 client에 마운트될 때까지 기다렸다가 localStorage에 접근
  useEffect(() => {
    if (typeof window !== "undefined") {
      const existingMemo = localStorage.getItem("scrapMemo");
      const parsedMemo = existingMemo ? JSON.parse(existingMemo) : [];
      const currentUserMemo = parsedMemo.filter(
        (item: ScrapItemProps) => item.user_id === currentUser.user_id
      );
      setParsedMemo(currentUserMemo);
    }
  }, []);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth <= 375);
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const indexOfLastRecipe = currentPage * scrapsPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - scrapsPerPage;

  const currentScrap = isMobile
    ? parsedMemo?.slice(0, indexOfLastRecipe)
    : parsedMemo?.slice(indexOfFirstRecipe, indexOfLastRecipe); // 데스크탑에서는 현재 페이지의 레시피들만 포함

  // 레시피 추가 로딩 함수
  const fetchMoreRecipes = async () => {
    // 페이지 증가
    setCurrentPage((prev) => prev + 1);
    setIsLoading(true);

    // 데이터 로딩 시간 설정
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsLoading(false);
  };

  // 무한 스크롤 사용 가능 여부
  const hasMore = currentPage * scrapsPerPage < currentScrap?.length;

  return (
    <ScrapListContainer>
      <TitleAndNickname>
        <ScrapTitle isDarkMode={isDarkMode}>나의 스크랩</ScrapTitle>
        <ScrapCount isDarkMode={isDarkMode}>{currentScrap?.length}</ScrapCount>
      </TitleAndNickname>
      {currentScrap?.length === 0 ? (
        <NonScrapMsg />
      ) : isMobile ? (
        <InfiniteScroll
          dataLength={currentScrap.length}
          next={fetchMoreRecipes}
          hasMore={hasMore}
          loader={<h4>Loading...</h4>}
          scrollThreshold={0.5}
          endMessage={
            <p
              style={{
                fontSize: "16px",
                textAlign: "center",
                margin: "2rem",
                color: "#F8B551",
              }}
            >
              <b>{`마지막 스크랩입니다 :)`}</b>
            </p>
          }
        >
          <ScrapListGrid>
            {currentScrap.map((item: ScrapItemProps, index: number) => {
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
        </InfiniteScroll>
      ) : (
        <>
          <ScrapListGrid>
            {currentScrap
              .slice(0, scrapsPerPage * currentPage)
              .map((item: ScrapItemProps, index: number) => {
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
          <PaginationComponent
            recipesPerPage={scrapsPerPage}
            totalRecipes={currentScrap.length}
            paginate={paginate}
            currentPage={currentPage}
          />
        </>
      )}
    </ScrapListContainer>
  );
};

export default ScrapCardList;

/** 스크랩 리스트 전체 감싸는 Div */
const ScrapListContainer = styled.div`
  width: 100%;
  margin-top: 1.8rem;
  @media (min-width: 1024px) {
    margin-top: 0;
    margin-bottom: 16rem;
  }
`;

/** '나의 스크랩'과 스크랩 개수 표시하는 Div */
const TitleAndNickname = styled.div`
  padding: 0 1rem 0.6rem 3.7rem;
  @media (min-width: 1024px) {
    padding: 0;
  }
`;

/** 스크랩 제목 Span */
const ScrapTitle = styled.span<{ isDarkMode: boolean }>`
  font-size: 15px;
  font-weight: 600;
  letter-spacing: 0.01em;
  margin: 0 0.3rem 0 1rem;
  color: ${(props) => (props.isDarkMode ? "#fff" : "#4F3D21")};
  @media (min-width: 1024px) {
    font-size: 18px;
    margin: 0 0.5rem 0 1.9rem;
  }
`;

/** 스크랩 개수 Span */
const ScrapCount = styled.span<{ isDarkMode: boolean }>`
  font-size: 15px;
  font-weight: 700;
  color: ${(props) => (props.isDarkMode ? "#ccc" : "#fff")};
  @media (min-width: 1024px) {
    font-size: 17px;
  }
`;

/** 레시피 스크랩 grid Div */
const ScrapListGrid = styled.div`
  @media (max-width: 767px) {
    width: 100%;
    flex-direction: column;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1.5rem;
    padding-bottom: 2rem;
    margin-top: 0.5rem;
  }

  @media (min-width: 1024px) {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    margin: 1.5rem 0 3rem;
    grid-column-gap: 2.5rem;
    grid-row-gap: 2.5rem;
    padding-bottom: 0;
  }
`;

/** 레시피가 없을 경우 띄워주는 안내 그림 */
const NonScrapMsg = styled(NonScrapPage)``;

const PaginationComponent = styled(Pagination)`
  display: none;
  @media (min-width: 1024px) {
    margin: 0 auto;
  }
`;
