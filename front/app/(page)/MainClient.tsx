"use client";

import styled from "styled-components";
import Banner from "../components/main-page/Banner/Banner";
import MainBest from "../components/main-page/best/MainBest";
import MainFridge from "../components/main-page/fridge/MainFridge";

const MainPageClient = () => {
  return (
    <>
      <Banner />
      <MainWrapper>
        <MainBest />
        <MainFridge />
      </MainWrapper>
    </>
  );
};

export default MainPageClient;

const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5rem;
  position: relative;
  align-items: center;
  width: 100%;
  margin: 0 auto;
  padding: 1rem 0;

  @media (min-width: 768px) {
    margin: 0 auto;
    padding: 2rem 0;
  }
`;
