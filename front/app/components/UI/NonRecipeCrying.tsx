"use client";

import styled from "styled-components";

const NonRecipeCrying = () => {
  return (
    <>
      <NoRecipeIconBox>
        <div>
          <NoRcipeIcon src={"/images/cryingIcon.png"} alt="요리사 로고" />
        </div>
      </NoRecipeIconBox>
    </>
  );
};

export default NonRecipeCrying;

const NoRecipeIconBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;

  margin: 0 auto;
`;

const NoRcipeIcon = styled.img`
  padding: 4rem;
  max-height: 28rem;
`;
