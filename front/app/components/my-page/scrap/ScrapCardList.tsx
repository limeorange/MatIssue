import styled from "styled-components";

/** 스크랩 리스트 컴포넌트 */
const ScrapCardList = () => {
  return (
    <ScrapListContainer>
      <ScrapTitleH2>나의 레시피</ScrapTitleH2>
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
`;

export default ScrapCardList;
