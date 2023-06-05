"use client";

import Image from "next/image";
import styled from "styled-components";

const LargeRecipeCard = ({ recipe }: any) => {
  return (
    <CardContainer>
      <ImageWrapper>
        <Image
          src={recipe.image}
          alt={recipe.title}
          fill
          style={{ objectFit: "cover" }}
        />
      </ImageWrapper>
      <TextContainer>
        <RecipeTitleBox>
          <h3>{recipe.title}</h3>
        </RecipeTitleBox>
        <RecipeInfoBox>
          <p>{recipe.author}</p>
        </RecipeInfoBox>
      </TextContainer>
    </CardContainer>
  );
};

export default LargeRecipeCard;

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background: white;
  border-radius: 1.6rem;
  filter: drop-shadow(0px 2px 16px rgba(0, 0, 0, 0.25));
  color: #4f3d21;
  cursor: pointer;

  &:hover {
    transform: scale(1.03);
  }

  transition: all 0.5s;
`;

const ImageWrapper = styled.div`
  position: relative;
  padding-top: 100%;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1.6rem 1.6rem 2.4rem 1.6rem;
  line-height: 1.6rem;
`;

const RecipeTitleBox = styled.div`
  display: flex;
  width: 100%;
  font-size: 20px;
  font-weight: 500;
`;

const RecipeInfoBox = styled.div`
  display: flex;
  width: 100%;
  font-size: 16px;
  font-weight: 400;
`;
