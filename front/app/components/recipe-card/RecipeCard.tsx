"use client";

import styled from "styled-components";
import Image from "next/image";

type RecipeData = {
  image: string;
  title: string;
  author: string;
  likes: number;
  view: string;
  id: string;
  timestamp: number;
};

type RecipeCardProps = {
  data: RecipeData;
};

const RecipeCard: React.FC<RecipeCardProps> = ({ data }) => {
  return (
    <>
      <RecipeCardWrapper>
        <RecipeImg>
          <Image
            src={data.image}
            alt="게시물 썸네일 이미지"
            width={270}
            height={200}
          />
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
                <Image
                  src="/images/like.png"
                  alt="게시물 좋아요 이미지"
                  width={13}
                  height={11}
                />
              </RecipeRankImg>
              <p>{data.likes}</p>
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
  width: 27rem;
  height: 26rem;
  margin: auto;
`;

const RecipeImg = styled.div`
  width: 100%;
  height: 20rem;
  border-radius: 0.8rem;
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
  font-size: 1.6rem;
  font-weight: 400;
  line-height: 2rem;
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
`;
