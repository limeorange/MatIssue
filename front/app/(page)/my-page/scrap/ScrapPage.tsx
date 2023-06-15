"use client";

import ProfileCard from "@/app/components/my-page/ProfileCard";
import styled from "styled-components";
import ScrapCardList from "@/app/components/my-page/scrap/ScrapCardList";

/** 레시피 스크랩 조회 페이지 컴포넌트 */
const Scrap = () => {
  return (
    <>
      <Container>
        <Wrapper>
          <ProfileCard />
          <ScrapCardList />
        </Wrapper>
      </Container>
    </>
  );
};

const Container = styled.div`
  width: 100%;
  margin: 0 auto;
  @media (min-width: 1024px) {
    max-width: 120rem;
    
  }
`;

const Wrapper = styled.div`
width: 100%;
max-width: 34.5rem;
  display: flex;
  flex-direction: column;
 margin: 0 1.5rem;

  @media (min-width: 1024px) {
    flex-direction: row;
    justify-content: flex-start;
    padding: 5rem 0 0 1.5rem;
    margin: 0;
    max-width: 100vw;
  }
`;

export default Scrap;
