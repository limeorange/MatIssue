import styled from "styled-components";

export const MainContainer = styled.div`
  width: 100%;
  margin: 0 auto;
`;

export const StyledTitleBox = styled.div`
  display: flex;
  gap: 1rem;
  padding: 1.6rem 0;
  align-items: end;
`;

export const StyledTitle = styled.h2`
  font-size: 22px;
  font-weight: 500;
`;

export const StyledSubTitle = styled.h3`
  font-size: 16px;
  color: rgb(150, 150, 150);
`;

export const StyledList = styled.ul`
  display: flex;
  gap: 0.5rem;
  font-size: 16px;
`;

export const ListingRecipeContainer = styled.div<{ contentsPerPage: number }>`
  display: flex;
  overflow-x: auto;
  gap: 2rem;
  white-space: nowrap;
  &::-webkit-scrollbar {
    display: none;
  }

  @media (min-width: 768px) {
    display: grid;
    grid-template-columns: ${(props) =>
      `repeat(${props.contentsPerPage / 2}, auto)`};
    row-gap: 3rem;
    column-gap: 2rem;
  }
`;
