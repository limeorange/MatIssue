"use client";

import { Recipe } from "@/app/types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styled, { css, keyframes } from "styled-components";

const LargeRecipeCard = ({ recipe }: { recipe: Recipe }) => {
  const [showImage, setShowImage] = useState(false);

  useEffect(() => {
    setShowImage(true);
  }, [recipe]);

  const router = useRouter();

  return (
    <SlideContainer>
      <CardContainer
        className={showImage ? "show" : ""}
        onClick={() => router.push(`/recipes/${recipe.recipe_id}`)}
      >
        <ImageWrapper>
          <Image
            src={recipe.recipe_thumbnail}
            alt={recipe.recipe_title}
            fill
            style={{ objectFit: "cover" }}
          />
        </ImageWrapper>
        <TextContainer>
          <RecipeTitleBox>
            <h3>{recipe.recipe_title}</h3>
          </RecipeTitleBox>
          <RecipeInfoBox>
            <AuthorBox>
              <Image
                src="/images/profileIcon.png"
                height={20}
                width={20}
                alt="profile_image"
              />
              <p>{recipe.user_nickname}</p>
            </AuthorBox>
            <LikeIconWrapper>
              <Image
                src="/images/like.png"
                alt="게시물 좋아요 이미지"
                height={16}
                width={20}
              />
              <div>{recipe.recipe_like}</div>
            </LikeIconWrapper>
          </RecipeInfoBox>
        </TextContainer>
      </CardContainer>
    </SlideContainer>
  );
};

export default LargeRecipeCard;

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-100%);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const SlideContainer = styled.div`
  overflow: hidden;
`;

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background: white;
  border-radius: 1.6rem;
  color: #4f3d21;
  cursor: pointer;

  &:hover {
    transform: scale(1.03);
  }

  transition: all 0.5s;

  opacity: 0;
  transform: translateX(100%);
  animation: ${fadeIn} 0.5s ease-in-out forwards;
`;

const ImageWrapper = styled.div`
  position: relative;
  padding-top: 100%;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  padding: 1.6rem 1.6rem 2rem 1.6rem;
  line-height: 1.6rem;
`;

const RecipeTitleBox = styled.div`
  display: flex;
  width: 100%;
  font-size: 18px;
  font-weight: 500;
`;

const RecipeInfoBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  font-size: 14px;
  font-weight: 400;
`;

const AuthorBox = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4rem;
`;

const LikeIconWrapper = styled.div`
  position: relative;
  display: flex;
  gap: 0.4rem;
`;
