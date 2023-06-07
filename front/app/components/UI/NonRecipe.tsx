"use client";

import styled from "styled-components";
import Image from "next/image";

const NonRecipePage = () => {
  return (
    <>
      <NoRecipeMessageWrapper>
        <Image
          src={"/images/NoRecipeMessage.png"}
          width={1000}
          height={500}
          alt="레시피가 없습니다 이미지"
        />
      </NoRecipeMessageWrapper>
    </>
  );
};

export default NonRecipePage;

const NoRecipeMessageWrapper = styled.div`
  max-width: 100rem;
  width: 100%;
  margin-top: 8rem;
  maring: 0 auto;
`;
