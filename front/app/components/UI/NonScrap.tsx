"use client";

import styled from "styled-components";

const NonScrapPage = () => {
  return (
    <>
      <NoRecipeIconBox>
        <NoRcipeIcon
          src={"/images/my-page/스크랩 안내 문구.svg"}
          alt="요리사 스크랩 안내 로고"
        />
      </NoRecipeIconBox>
    </>
  );
};

export default NonScrapPage;

const NoRecipeIconBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 60rem;
  margin-top: 10rem;
`;

const NoRcipeIcon = styled.img`
  width: 89%;
  height: 89%;
`;
