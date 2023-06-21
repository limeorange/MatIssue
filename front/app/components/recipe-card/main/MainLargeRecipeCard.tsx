"use client";

import { getRecipeById } from "@/app/api/recipe";
import darkModeAtom from "@/app/store/darkModeAtom";
import { Recipe } from "@/app/types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import styled, { keyframes } from "styled-components";

const LargeRecipeCard = ({ recipe }: { recipe: Recipe }) => {
  const [showImage, setShowImage] = useState(false);
  const isDarkMode = useRecoilValue(darkModeAtom);

  useEffect(() => {
    setShowImage(true);
  }, [recipe]);

  const router = useRouter();

  return (
    <SlideContainer>
      <CardContainer
        isDarkMode={isDarkMode}
        className={showImage ? "show" : ""}
        onClick={() => router.push(`/recipe/${recipe.recipe_id}`)}
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
            <h2>{recipe.recipe_title}</h2>
          </RecipeTitleBox>
          <RecipeInfoBox>
            <AuthorBox>
              <h3>{recipe.user_nickname}</h3>
            </AuthorBox>
            <IconWrapper>
              <Image
                src="/images/recipe-view/heart_full.svg"
                alt="게시물 좋아요 이미지"
                height={12}
                width={16}
              />
              <span>{recipe.recipe_like.length}&nbsp;&nbsp;</span>
              <Image
                src="/images/recipe-view/comment.svg"
                alt="게시물 댓글 이미지"
                width={16}
                height={24}
              />
              <span>{recipe.comments.length.toLocaleString()}</span>
            </IconWrapper>
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
    transform: translateX(-100%);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const SlideContainer = styled.div`
  overflow: hidden;
  &:hover {
    transform: scale(1.03);
  }

  transition: all 0.5s;
`;

const CardContainer = styled.div<{ isDarkMode: boolean }>`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background: ${(props) =>
    props.isDarkMode ? props.theme.deepNavy : props.theme.white};
  border-radius: 1.6rem;
  cursor: pointer;

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

  & h2 {
    text-align: start;
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const RecipeInfoBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  font-size: 16px;
  font-weight: 400;
  color: #6f6f6f;
`;

const AuthorBox = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4rem;
`;

const IconWrapper = styled.div`
  position: relative;
  display: flex;
  gap: 0.4rem;
`;
