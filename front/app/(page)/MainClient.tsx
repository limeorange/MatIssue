"use client";

import styled from "styled-components";
import Banner from "../components/main-page/banner/Banner";
import MainBest from "../components/main-page/MainBest";
import MainFridge from "../components/main-page/MainFridge";
import MainAlone from "../components/main-page/MainAlone";
import MainVegan from "../components/main-page/MainVegan";
import MainNewest from "../components/main-page/MainNewest";

const MainPageClient = () => {
  return (
    <>
      <Banner />
      <MainWrapper>
        <MainBest />
        <MainFridge />
        <MainAlone />
        <MainVegan />
        <MainNewest />
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
  color: rgb(75, 75, 75);

  @media (min-width: 768px) {
    margin: 0 auto;
    padding: 2rem 0;
  }
`;
