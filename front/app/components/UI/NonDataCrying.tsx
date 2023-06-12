"use client";

import styled from "styled-components";

const NonDataCrying = () => {
  return (
    <>
      <NoRecipeIconBox>
        <div>
          <NoRecipeIcon src={"/images/error/dataError.svg"} alt="에러 아이콘" />
        </div>
      </NoRecipeIconBox>
    </>
  );
};

export default NonDataCrying;

const NoRecipeIconBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;

  margin: 0 auto;
`;

const NoRecipeIcon = styled.img`
  padding: 6rem;
  height: 100%;
  max-height: 28rem;
`;
