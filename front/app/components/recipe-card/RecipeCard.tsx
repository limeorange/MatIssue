"use client";

import { useRouter } from "next/navigation";
import styled from "styled-components";
import Image from "next/image";
import { Recipe } from "@/app/types";
import { useRecoilState } from "recoil";
import darkModeAtom from "@/app/store/darkModeAtom";

const RecipeCard = ({ recipe }: { recipe: Recipe }) => {
  const router = useRouter();
  const [isDarkMode, setIsDarkMode] = useRecoilState(darkModeAtom);

  // 레시피 클릭 시 상세페이지 이동 함수
  const handleRecipeClick = () => {
    router.push(`/recipe/${recipe.recipe_id}`);
  };

  return (
    <>
      <RecipeCardLayout onClick={handleRecipeClick}>
        <RecipeImgContainer>
          <RecipeImgWrapper>
            <Image
              fill
              src={recipe.recipe_thumbnail}
              style={{ objectFit: "cover" }}
              alt="게시물 썸네일 이미지"
            />
          </RecipeImgWrapper>
        </RecipeImgContainer>
        <RecipeTitleWrapper>
          <p>{recipe.recipe_title}</p>
        </RecipeTitleWrapper>
        <RecipeInfoContainer>
          <RecipeAuthorWrapper isDarkMode={isDarkMode}>
            <p>{recipe.user_nickname}</p>
          </RecipeAuthorWrapper>
          <RecipeRankContainer>
            <RecipeRankItemContainer>
              <RecipeRankImgWrapper>
                <Image
                  src="/images/recipe-view/heart_full.svg"
                  alt="게시물 좋아요 이미지"
                  width={30}
                  height={26}
                />
              </RecipeRankImgWrapper>
              <Count>{recipe.recipe_like.length.toLocaleString()}</Count>
            </RecipeRankItemContainer>
            <RecipeRankItemContainer>
              <RecipeRankImgWrapper style={{ marginBottom: "0.25rem" }}>
                <Image
                  src="/images/recipe-view/comment.svg"
                  alt="게시물 댓글 이미지"
                  width={30}
                  height={26}
                />
              </RecipeRankImgWrapper>
              <Count>{recipe.comments.length.toLocaleString()}</Count>
            </RecipeRankItemContainer>
          </RecipeRankContainer>
        </RecipeInfoContainer>
      </RecipeCardLayout>
    </>
  );
};

export default RecipeCard;

const RecipeCardLayout = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 27rem;
  overflow: hidden;
  gap: 0.2rem;

  @media (min-width: 768px) {
    max-width: none;
  }

  &: hover {
    cursor: pointer;
  }
`;

const RecipeImgContainer = styled.div`
  position: relative;
  padding-top: 90%;
  border-radius: 0.8rem;
  overflow: hidden;
`;

const RecipeImgWrapper = styled.div`
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

const RecipeInfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;

  @media (max-width: 480px) {
    margin: 0;
  }
`;

const RecipeTitleWrapper = styled.div`
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

const RecipeAuthorWrapper = styled.div<{ isDarkMode: boolean }>`
  font-size: 14px;
  font-weight: 400;
  color: ${(props) => (props.isDarkMode ? props.theme.grey : "#6f6f6f")};
`;

const RecipeRankContainer = styled.div`
  display: flex;
`;

const RecipeRankItemContainer = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  margin-left: 0.5rem;

  @media (min-width: 768px) {
    margin-left: 1rem;
  }
`;

const RecipeRankImgWrapper = styled.div`
  margin-right: 0.5rem;
  max-width: 1.3rem;
  max-height: 1.1rem;

  @media (min-width: 768px) {
    min-width: 1.6rem;
    min-height: 1.4rem;
  }
`;

const Count = styled.span`
  font-size: 14px;
  margin-right: 0.2rem;
`;
