"use client";

import { useRouter } from "next/navigation";
import styled from "styled-components";
import Image from "next/image";
import { Recipe } from "@/app/types";
import { useEffect, useState } from "react";
import { getRecipeById } from "@/app/api/recipe";

/** 메인 레시피 카드 */
const MobileRecipeCard = ({ recipe }: { recipe: Recipe }) => {
  const router = useRouter();

  const handleRecipeClick = () => {
    router.push(`/recipe/${recipe.recipe_id}`);
  };

  return (
    <>
      <RecipeCardWrapper onClick={handleRecipeClick}>
        <RecipeImg>
          <ImgWrapper>
            <Image
              fill
              style={{ objectFit: "cover" }}
              src={recipe.recipe_thumbnail}
              alt="게시물 썸네일 이미지"
            />
          </ImgWrapper>
        </RecipeImg>

        <RecipeTitle>
          <p>{recipe.recipe_title}</p>
        </RecipeTitle>
        <RecipeInfo>
          <RecipeAuthor>
            <p>{recipe.user_nickname}</p>
          </RecipeAuthor>
          <RecipeRank>
            <RecipeRankItem>
              <RecipeRankImg>
                <Image
                  src="/images/recipe-view/heart_full.svg"
                  alt="게시물 좋아요 이미지"
                  width={30}
                  height={26}
                />
              </RecipeRankImg>
              <HeartCount>
                {recipe.recipe_like.length.toLocaleString()}
              </HeartCount>
            </RecipeRankItem>
            <RecipeRankItem>
              <RecipeRankImg style={{ marginBottom: "0.25rem" }}>
                <Image
                  src="/images/recipe-view/comment.svg"
                  alt="게시물 댓글 이미지"
                  width={30}
                  height={26}
                />
              </RecipeRankImg>
              <Count>{recipe.comments.length.toLocaleString()}</Count>
            </RecipeRankItem>
          </RecipeRank>
        </RecipeInfo>
      </RecipeCardWrapper>
    </>
  );
};

export default MobileRecipeCard;

// styled-components
const RecipeCardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 20rem;
  overflow: hidden;
  gap: 0.2rem;

  &: hover {
    cursor: pointer;
  }
`;

const RecipeImg = styled.div`
  position: relative;
  padding-top: 90%;
  border-radius: 0.8rem;
  overflow: hidden;
`;

const ImgWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  inset: 0;
  object-fit: cover;
  border-radius: 0.8rem;

  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.1);
  }
`;

const RecipeInfo = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;

  @media (max-width: 480px) {
    margin: 0;
  }
`;

const RecipeTitle = styled.div`
  width: 100%;
  font-size: 16px;
  font-weight: 500;
  line-height: 2rem;
  margin-top: 0.4rem;

  & p {
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const RecipeAuthor = styled.div`
  font-size: 14px;
  font-weight: 400;
  color: #6f6f6f;
`;

const RecipeRank = styled.div`
  display: flex;
`;

const RecipeRankItem = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  font-size: 12px;
  font-weight: 400;
  margin-left: 1rem;
`;

const RecipeRankImg = styled.div`
  margin-right: 0.5rem;
  max-width: 1.3rem;
  max-height: 1.1rem;
`;

const HeartCount = styled.span`
  font-size: 14px;
  margin-right: 0.2rem;
`;

const Count = styled.span`
  font-size: 14px;
  margin-right: 0.2rem;
`;
