"use client";

import styled from "styled-components";

const NonDataCrying = () => {
  return (
    <>
      <NoRecipeIconBox>
        <div>
          <NoRcipeIcon src={"/images/error/cryingIcon.png"} alt="에러 아이콘" />
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
  max-width: 60rem;
  margin: 0 auto;
`;

const NoRcipeIcon = styled.img``;
