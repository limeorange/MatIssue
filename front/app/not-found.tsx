"use client";

import Image from "next/image";
import styled from "styled-components";

const NotFound = () => {
  return (
    <ErrorPageContainer>
      <ErrorTitle>404 ERROR!</ErrorTitle>
      <ErrorImageWrapper>
        <Image
          src="/images/error/404error.png"
          height={200}
          width={240}
          alt="404_icon"
        />
      </ErrorImageWrapper>
    </ErrorPageContainer>
  );
};

export default NotFound;

const ErrorPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100wh;
  height: 100vh;
  justify-content: center;
  align-items: center;
`;

const ErrorTitle = styled.div`
  font-size: 36px;
  color: #444;
`;

const ErrorImageWrapper = styled.div`
  position: relative;
`;
