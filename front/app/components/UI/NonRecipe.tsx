"use client";

import styled from "styled-components";

const NonRecipePage = () => {
  return (
    <>
      <NoRecipeIconBox>
        <NoRcipeIcon
          src={"/images/my-page/레시피 안내 문구.svg"}
          alt="요리사 로고"
        />
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
  margin-top: 10rem;
`;

const NoRcipeIcon = styled.img`
  width: 89%;
  height: 89%;
  margin-top: 8rem;
  maring: 0 auto;
`;
