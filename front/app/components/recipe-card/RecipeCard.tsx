"use client";

import styled from "styled-components";

type RecipeData = {
  image: string;
  title: string;
  author: string;
  like: string;
  view: string;
  id: string;
};

type RecipeCardProps = {
  data: RecipeData;
};

const RecipeCard: React.FC<RecipeCardProps> = ({ data }) => {
  return (
    <>
      <RecipeCardWrapper>
        <RecipeImg>
          <img src={data.image} alt="게시물 썸네일 이미지" />
        </RecipeImg>
        <RecipeTitle>
          <p>{data.title}</p>
        </RecipeTitle>
        <RecipeInfo>
          <RecipeAuthor>
            <p>{data.author}</p>
          </RecipeAuthor>
          <RecipeRank>
            <RecipeRankItem>
              <RecipeRankImg>
                <img src="/images/like.png" alt="게시물 좋아요 이미지" />
              </RecipeRankImg>
              <p>{data.like}</p>
            </RecipeRankItem>
            <RecipeRankItem>
              <RecipeRankImg>
                <img src="/images/view.png" alt="게시물 조회수 이미지" />
              </RecipeRankImg>
              <p>{data.view}</p>
            </RecipeRankItem>
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
  width: 270px;
  height: 260px;
  margin: auto;
`;

const RecipeImg = styled.div`
  width: 100%;
  height: 200px;
  border-radius: 8px;
  flex-shrink: 0;
  overflow: hidden;
  img {
    transition: transform 0.3s ease-in-out;
    &:hover {
      transform: scale(1.1);
    }
  }
`;

const RecipeInfo = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const RecipeTitle = styled.div`
  width: 100%;
  font-size: 16px;
  font-weight: 400;
  line-height: 20px;
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
  margin-left: 10px;
`;

const RecipeRankImg = styled.div`
  width: 13px;
  height: 11px;
`;
