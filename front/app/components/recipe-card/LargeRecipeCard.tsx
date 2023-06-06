"use client";

import { Recipe } from "@/app/types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import styled from "styled-components";

const LargeRecipeCard = ({ recipe }: { recipe: Recipe }) => {
  const router = useRouter();

  return (
    <CardContainer onClick={() => router.push(`/recipes/${recipe.recipe_id}`)}>
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
  );
};

export default LargeRecipeCard;

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background: white;
  border-radius: 1.6rem;
  filter: drop-shadow(0 0.1rem 1rem rgba(0, 0, 0, 0.1));
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
