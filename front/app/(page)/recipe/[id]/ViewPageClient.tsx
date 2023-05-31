"use client";

import IngredientList from "@/app/components/recipe/IngredientList";
import RecipeInfo from "@/app/components/recipe/RecipeInfo";
import RecipeSteps from "@/app/components/recipe/RecipeSteps";
import { useState, useEffect } from "react";
import Image from "next/image";
import styled from "styled-components";

// 대표 이미지, 제목, 작성자, 소개글,
const recipeCover = "/요리 대표 사진.png";
const recipeTitle = "보들보들 순두부 달걀탕";
const author = "냠냠순두부러버";
const description = `보들보들 부드러운 순두부 달걀탕.
순두부와 달걀만 있으면 간단하게 만들 수 있는 순두부 달걀탕 레시피를 소개해 드릴게요. 
달걀탕 더욱 더 맛있게 먹는 법! 더욱 더 시원하고 깔끔한 맛을 내려면 새우젓을 넣어보세요.
부드럽고 소화가 잘되기 때문에 아침 식사로도 제격이랍니다. 
쌀쌀한 아침은 따끈한 순두부 달걀탕으로 어떠세요?`;

// 요리팁, 동영상 이미지, 동영상 링크, 댓글 개수
const recipeTip = "멸치액젓이 싫으시면 국간장 2T만으로 간 하셔도 좋습니다.";
const recipeVideoImage = "/요리 동영상.png";
const recipeVideoUrl = "https://youtu.be/jk29M4knFBw";
const commentCount = 3;

// 레시피 조회 페이지 컴포넌트
const RecipeDetail = () => {
  // 동영상 썸네일 클릭 핸들러
  const imageClickHandler = () => {
    window.open(recipeVideoUrl);
  };

  // 스크롤 진행 퍼센트 상태 관리
  const [scrollPercentage, setScrollPercentage] = useState(0);

  useEffect(() => {
    // 스크롤 진행 퍼센트를 현재 스크롤 위치를 기반으로 계산해주는 핸들러
    const scrollHandler = () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      const windowHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const percentage = (scrollTop / windowHeight) * 100;
      setScrollPercentage(percentage);
    };

    // 스크롤이 발생할 때마다 스크롤 진행 퍼센트 계산
    window.addEventListener("scroll", scrollHandler);

    // 컴포넌트가 언마운트될 때 이전에 등록한 스크롤 이벤트 리스너 제거 => 메모리 누수 방지
    return () => window.removeEventListener("scroll", scrollHandler);
  }, []);

  return (
    <>
      <ContainerDiv>
        {/* 스크롤 상태 진행바 */}
        <ProgressBarContainer>
          <ProgressBar progress={scrollPercentage} />
        </ProgressBarContainer>

        {/* 요리 대표 이미지 */}
        <ImageWrapperDiv>
          <Image
            src={recipeCover}
            alt="요리 대표 사진"
            fill
            style={{ objectFit: "cover", borderRadius: 20 }}
          />
        </ImageWrapperDiv>

        {/* 요리 제목, 작성자, 간단 소개글 */}
        <div>
          <TitleContainerDiv>
            <TitleH3>{recipeTitle}</TitleH3>
            <AuthorSpan>by {author}</AuthorSpan>
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
          <IngredientList></IngredientList>
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

        {/* 댓글 */}
        <div className="flex">
          <SubtitleH2>댓글</SubtitleH2>
          <CommentIconDiv>
            <Image
              src="/comment.svg"
              alt="댓글 아이콘"
              width={22}
              height={22}
            ></Image>
          </CommentIconDiv>
          <SubtitleH2>{commentCount}</SubtitleH2>
        </div>
      </ContainerDiv>
    </>
  );
};

const CommentIconDiv = styled.div`
  margin-left: 0.7rem;
  margin-top: 0.4rem;
  margin-right: 0.4rem;
`;

const ContainerDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 70rem;
  margin: 0 auto;
  gap: 2.5rem;
`;

const ImageWrapperDiv = styled.div`
  width: 65rem;
  height: 35rem;
  position: relative;
  margin-top: 3.5rem;
`;

const TitleContainerDiv = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 1rem;
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
  margin-top: 1rem;
  width: 60rem;
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

// 스크롤 진행바 전체 박스
const ProgressBarContainer = styled.div`
  position: fixed;
  left: 0;
  width: 100%;
  height: 10px;
  background-color: #f2f2f2;
  z-index: 40;
`;

// 스크롤 진행바
const ProgressBar = styled.div<{ progress: number }>`
  height: 100%;
  width: ${({ progress }) => `${progress}%`};
  background-color: #fbd26a;
`;

export default RecipeDetail;
