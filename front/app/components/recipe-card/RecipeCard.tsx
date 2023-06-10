"use client";

import { useRouter } from "next/navigation";
import styled from "styled-components";
import Image from "next/legacy/image";
import { Recipe } from "@/app/types";

const RecipeCard = ({ recipe }: { recipe: Recipe }) => {
  const router = useRouter();

  const handleRecipeClick = () => {
    router.push(`/recipes/${recipe.recipe_id}`);
  };

  return (
    <>
      <RecipeCardWrapper onClick={handleRecipeClick}>
        <RecipeImg>
          <Image
            src={recipe.recipe_thumbnail}
            alt="게시물 썸네일 이미지"
            width={270}
            height={200}
            objectFit="cover"
          />
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
                  src="/images/like.png"
                  alt="게시물 좋아요 이미지"
                  width={13}
                  height={11}
                />
              </RecipeRankImg>
              <p>{recipe.recipe_like.toLocaleString()}</p>
            </RecipeRankItem>
            {/* <RecipeRankItem>
              <RecipeRankImg>
                <Image
                  src="/images/view.png"
                  alt="게시물 조회수 이미지"
                  width={13}
                  height={11}
                />
              </RecipeRankImg>
              <p>{data.view}</p>
            </RecipeRankItem> */}
          </RecipeRank>
        </RecipeInfo>
      </RecipeCardWrapper>
    </>
  );
};

export default RecipeCard;

// styled-components
const RecipeCardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin: auto;
  width: 100%;
  max-width: 27rem;

  &: hover {
    cursor: pointer;
  }
`;

const RecipeImg = styled.div`
  width: 100%;
  height: 20rem;
  border-radius: 0.8rem;
  flex-shrink: 0;
  overflow: hidden;
  img {
    transition: transform 0.3s ease-in-out;
    object-fit: cover;
    &:hover {
      transform: scale(1.1);
    }
  }
`;

const RecipeInfo = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 0.5rem;
`;

const RecipeTitle = styled.div`
  width: 100%;
  font-size: 1.6rem;
  font-weight: 400;
  line-height: 2rem;
  margin-top: 1rem;

  & p {
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const RecipeAuthor = styled.div`
  font-size: 1.4rem;
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
  font-size: 1.2rem;
  font-weight: 400;
  margin-left: 1rem;
`;

const RecipeRankImg = styled.div`
  width: 1.3rem;
  height: 1.1rem;
  margin-bottom: 0.3rem;
`;
