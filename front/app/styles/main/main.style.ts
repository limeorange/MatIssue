import styled from "styled-components";

export const StyledContainer = styled.div`
  display: none;

  @media (min-width: 1024px) {
    display: flex;
    align-items: center;
    position: relative;
    width: 100%;
    max-width: 120rem;
    padding: 2rem 2rem 4rem 2rem;
  }
`;

export const StyledContentsArea = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  max-width: 110rem;
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

export const ListingRecipeContainer = styled.div`
  @media (min-width: 768px) {
    display: grid;
    grid-template-columns: repeat(3, auto);
    row-gap: 3rem;
    column-gap: 2rem;
  }

  @media (min-width: 1024px) {
    display: grid;
    grid-template-columns: repeat(4, auto);
    row-gap: 3rem;
    column-gap: 2rem;
  }
`;

export const RecipeContainer = styled.div`
  width: 100%;
  max-width: 96rem;
  margin: 0 auto;
  padding: 4rem 2rem;
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  overflow-hidden;
  grid-column-gap: 4rem;
  

  @media (min-width : 1024px){
    grid-template-columns: repeat(3, 1fr);

  }
`;
