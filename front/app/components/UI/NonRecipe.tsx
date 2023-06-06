"use client";

import styled from "styled-components";
import Image from "next/image";

const NonRecipePage = () => {
  return (
    <>
      <NoRecipeMessageBox>
        <Image
          src={"/images/dongs-logo.png"}
          width={200}
          height={200}
          alt="요리사 로고"
        />
        <NoRecipeMessage>작성된 레시피가 없습니다.</NoRecipeMessage>
      </NoRecipeMessageBox>
    </>
  );
};

export default NonRecipePage;

const NoRecipeMessageBox = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 60rem;
`;

const NoRecipeMessage = styled.p`
  text-align: center;
  font-size: 30px;
  color: #9f783a;
  width: 100%;
`;
