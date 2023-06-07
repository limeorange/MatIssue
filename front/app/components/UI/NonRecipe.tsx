"use client";

import styled from "styled-components";

const NonRecipePage = () => {
  return (
    <>
      <NoRecipeIconBox>
        <NoRcipeIcon src={"/images/norecipe.png"} alt="요리사 로고" />
      </NoRecipeIconBox>
    </>
  );
};

export default NonRecipePage;

const NoRecipeIconBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 60rem;
`;

const NoRcipeIcon = styled.img`
  width: 89%;
  height: 89%;
  margin-top: 8rem;
  maring: 0 auto;
`;
