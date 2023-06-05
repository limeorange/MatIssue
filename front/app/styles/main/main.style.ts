import styled from "styled-components";

export const StyledContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  width: 100%;
  max-width: 120rem;
  padding: 2rem 2rem 2rem 4rem;
`;

export const StyledContentsArea = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  margin: 0 auto;
`;

export const StyledTitleBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1.6rem 0;
  align-items: center;
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
  padding-top: 2rem;
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

export const RecipeContainer = styled.div`
  width: 100%;
  max-width: 105rem;
  margin: 0 auto;
  padding: 4rem 0;
  display: grid;
  grid-template-columns: repeat(3, 31rem);
  overflow-hidden;
  gap: 6rem;
  
`;
