"use client";

import styled from "styled-components";

const MainWrapper = ({ children }: { children: React.ReactNode }) => {
  return <MainWrapperDiv>{children}</MainWrapperDiv>;
};

export default MainWrapper;
const MainWrapperDiv = styled.div`
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
