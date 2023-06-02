"use client";

import IngredientList from "@/app/components/recipe/IngredientList";
import ProgressBar from "@/app/components/recipe/ProgressBar";
import RecipeComment from "@/app/components/recipe/RecipeComment";
import RecipeCommentInput from "@/app/components/recipe/RecipeCommentInput";
import RecipeInfo from "@/app/components/recipe/RecipeInfo";
import RecipeSteps from "@/app/components/recipe/RecipeSteps";
import Image from "next/image";
import { useState } from "react";
import styled from "styled-components";

// 대표 이미지, 제목, 작성자, 소개글,
const recipeCover = "/images/recipe-view/요리 대표 사진.png";
const recipeTitle = "보들보들 순두부 달걀탕";
const author = "냠냠순두부러버";
const description = `보들보들 부드러운 순두부 달걀탕.
순두부와 달걀만 있으면 간단하게 만들 수 있는 순두부 달걀탕 레시피를 소개해 드릴게요. 
달걀탕 더욱 더 맛있게 먹는 법! 더욱 더 시원하고 깔끔한 맛을 내려면 새우젓을 넣어보세요.
부드럽고 소화가 잘되기 때문에 아침 식사로도 제격이랍니다. 
쌀쌀한 아침은 따끈한 순두부 달걀탕으로 어떠세요?`;

// 요리팁, 동영상 이미지, 동영상 링크, 댓글 개수
const recipeTip = "멸치액젓이 싫으시면 국간장 2T만으로 간 하셔도 좋습니다.";
const recipeVideoImage = "/images/recipe-view/요리 동영상.png";
const recipeVideoUrl = "https://youtu.be/jk29M4knFBw";
const commentCount = 3;

// 레시피 조회 페이지 컴포넌트
const RecipeDetail = () => {
  // 동영상 썸네일 클릭 핸들러
  const imageClickHandler = () => {
    window.open(recipeVideoUrl);
  };

  // 좋아요 버튼 상태 관리
  const [isLiked, setIsLiked] = useState(false);

  // 좋아요 카운트 상태 관리
  const [count, setCount] = useState(510);

  // 좋아요 버튼 클릭 핸들러
  const handleHeartClick = () => {
    setIsLiked(!isLiked);
    if (isLiked) {
      setCount(count - 1);
    } else {
      setCount(count + 1);
    }
  };

  // 레시피 작성자 아이디, 로그인된 아이디
  const recipeUserId = "happyuser";
  const loggedInUserId = "happyuser";
  const createdAt = "2023-06-02";

  return (
    <>
      <ContainerDiv>
        {/* 스크롤 상태 진행바 */}
        <ProgressBar />

        {/* 요리 대표 이미지 */}
        <ImageWrapperDiv>
          <Image
            src={recipeCover}
            alt="요리 대표 사진"
            fill
            style={{ objectFit: "cover", borderRadius: 20 }}
          />
        </ImageWrapperDiv>

        {/* 요리 제목, 작성자, 작성 시간, 간단 소개글 */}
        <div>
          <TitleContainerDiv>
            <div className="flex items-center">
              <TitleH3>{recipeTitle}</TitleH3>

              <AuthorSpan>by {author}</AuthorSpan>
              <AuthorSpan>&nbsp;• {createdAt}</AuthorSpan>
            </div>

            {recipeUserId === loggedInUserId && (
              <div className="flex gap-[8px]">
                <EditButton>수정</EditButton>
                <DeleteButton>삭제</DeleteButton>
              </div>
            )}
          </TitleContainerDiv>
          <DescriptionDiv>{description}</DescriptionDiv>
        </div>

        {/* 요리 정보 (인원, 시간, 난이도, 종류) */}
        <div>
          <SubtitleH2>요리 정보</SubtitleH2>
          <RecipeInfo></RecipeInfo>
        </div>

        {/* 재료 준비 목록 */}
        <div>
          <SubtitleH2>재료 준비</SubtitleH2>
          <IngredientList />
        </div>

        {/* 요리 과정 */}
        <div>
          <SubtitleH2>요리 과정</SubtitleH2>
          <RecipeSteps></RecipeSteps>
        </div>

        {/* 요리팁 */}
        <div>
          <SubtitleH2>요리팁</SubtitleH2>
          <RecipeTipDiv>{recipeTip}</RecipeTipDiv>
        </div>

        {/* 요리 동영상 */}
        <div>
          <SubtitleH2>요리 동영상</SubtitleH2>
          <Image
            src={recipeVideoImage}
            alt="요리 동영상"
            width={380}
            height={210}
            style={{ cursor: "pointer" }}
            onClick={imageClickHandler}
          ></Image>
          <VideoDescriptionDiv>
            썸네일 클릭 시 동영상 링크로 연결됩니다.
          </VideoDescriptionDiv>
        </div>

        {/* 좋아요 */}
        <div className="flex justify-center">
          <div
            className="flex w-[120px] h-[55px] border-[1.7px] 
            border-[#C8C8C8] rounded-[15px] justify-center items-center"
          >
            <div className="w-[32px] h-[28px] mr-[6px]">
              <Image
                src={
                  isLiked
                    ? "/images/recipe-view/heart_full.svg"
                    : "/images/recipe-view/heart.svg"
                }
                alt="게시글 좋아요 하트"
                width={30}
                height={26}
                onClick={handleHeartClick}
                style={{ objectFit: "cover", cursor: "pointer" }}
              />
            </div>
            <div className="text-[18px]">{count}</div>
          </div>
        </div>

        {/* 댓글 */}
        <div>
          <div className="flex">
            <SubtitleH2>댓글</SubtitleH2>
            <CommentIconDiv>
              <Image
                src="/images/recipe-view/comment.svg"
                alt="댓글 아이콘"
                width={22}
                height={22}
              ></Image>
            </CommentIconDiv>
            <SubtitleH2>{commentCount}</SubtitleH2>
          </div>
          <div className="mb-[30px]">
            <RecipeComment />
            <RecipeComment />
            <RecipeComment />
          </div>
          <RecipeCommentInput />
        </div>
      </ContainerDiv>
    </>
  );
};

const ContainerDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 70rem;
  margin: 0 auto;
  gap: 2.5rem;
`;

// 수정 Button
const EditButton = styled.button`
  width: 6.7rem;
  height: 3.7rem;
  border-radius: 1rem;
  background: #fbe2a1;
  font-weight: 500;
  font-size: 16.5px;
  color: #4f3d21;
`;

// 삭제 Button
const DeleteButton = styled.button`
  width: 6.7rem;
  height: 3.7rem;
  border-radius: 1rem;
  border: 2px solid #fbe2a1;
  font-weight: 500;
  font-size: 16.5px;
  color: #4f3d21;
`;

const ImageWrapperDiv = styled.div`
  width: 100%;
  max-width: 65rem;
  height: 35rem;
  position: relative;
  margin-top: 3.5rem;
`;

const TitleContainerDiv = styled.div`
  width: 100%;
  max-width: 65rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;
`;

const TitleH3 = styled.h3`
  font-weight: 600;
  font-size: 2.2rem;
  margin-right: 1rem;
`;

const AuthorSpan = styled.span`
  color: #6f6f6f;
  font-size: 1.4rem;
`;

const DescriptionDiv = styled.div`
  margin-top: 1.5rem;
  max-width: 65rem;
  width: 100%;
  font-size: 1.62rem;
`;

const SubtitleH2 = styled.h2`
  font-size: 2rem;
  color: #b08038;
  font-weight: 500;
  margin-bottom: 1rem;
`;

const RecipeTipDiv = styled.div`
  font-size: 1.6rem;
`;

const VideoDescriptionDiv = styled.div`
  padding-top: 0.5rem;
  color: #6f6f6f;
  font-size: 1.5rem;
`;

const CommentIconDiv = styled.div`
  margin-left: 0.7rem;
  margin-top: 0.4rem;
  margin-right: 0.4rem;
`;

export default RecipeDetail;
