import styled from "styled-components";

export const StyledContainer = styled.div`
  display: flex;
  width: 100%;
  padding: 1.5rem;

  @media (min-width: 1024px) {
    display: flex;
    align-items: center;
    position: relative;
    width: 90%;
    max-width: 120rem;
    padding: 2rem 2rem 4rem 2rem;
  }
`;

export const StyledContentsArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-content: center;
  width: 100%;
  max-width: 110rem;
  margin: 0 auto;

  @media (min-width: 1024px) {
    gap: 2rem;
  }
`;

export const StyledTitleBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 0.8rem 0 0 0;
  align-items: left;

  @media (min-width: 1024px) {
    padding: 1.6rem 0 0 0;
    align-items: center;
  }
`;

export const StyledTitle = styled.h2`
  font-size: 18px;
  font-weight: 500;

  @media (min-width: 1024px) {
    font-size: 22px;
  }
`;

export const StyledSubTitle = styled.h3`
  display: none;

  @media (min-width: 1024px) {
    display: block;
    font-size: 16px;
  }
`;

export const StyledList = styled.ul`
  display: flex;
  gap: 0.5rem;
  font-size: 14px;

  @media (min-width: 1024px) {
    font-size: 16px;
  }
`;

export const ListingRecipeContainer = styled.div`
  display: none;

  @media (min-width: 1024px) {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    row-gap: 3rem;
    column-gap: 2rem;
  }
`;

export const RecipeContainer = styled.div`
  width: 100%;
  max-width: 96rem;
  margin: 0 auto;
 
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  overflow-hidden;
  grid-column-gap: 4rem;
  

  @media (min-width : 1024px){
    grid-template-columns: repeat(3, 1fr);
     padding: 4rem 2rem;

  }
`;
