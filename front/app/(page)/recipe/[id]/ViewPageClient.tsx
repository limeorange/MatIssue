"use client";

import IngredientList from "@/app/components/recipe/IngredientList";
import RecipeInfo from "@/app/components/recipe/RecipeInfo";
import RecipeSteps from "@/app/components/recipe/RecipeSteps";
import Image from "next/image";
import styled from "styled-components";

// 요리 대표 이미지
const recipeCover = "/요리 대표 사진.png";

// 요리 제목
const recipeTitle = "보들보들 순두부 달걀탕";

// 작성자
const author = "냠냠순두부러버";

// 간단 소개글
const description = `보들보들 부드러운 순두부 달걀탕.
순두부와 달걀만 있으면 간단하게 만들 수 있는 순두부 달걀탕 레시피를 소개해 드릴게요. 
달걀탕 더욱 더 맛있게 먹는 법! 더욱 더 시원하고 깔끔한 맛을 내려면 새우젓을 넣어보세요.
부드럽고 소화가 잘되기 때문에 아침 식사로도 제격이랍니다. 
쌀쌀한 아침은 따끈한 순두부 달걀탕으로 어떠세요?`;

// 요리팁
const recipeTip = "멸치액젓이 싫으시면 국간장 2T만으로 간 하셔도 좋습니다.";

// 요리 동영상 이미지
const recipeVideoImage = "/요리 동영상.png";

// 요리 동영상 링크
const recipeVideoUrl = "https://youtu.be/jk29M4knFBw";

// 댓글 개수
const commentCount = 3;

// 레시피 조회 페이지 컴포넌트
const RecipeDetail = () => {
  const imageClickHandler = () => {
    window.open(recipeVideoUrl);
  };
  return (
    <ContainerDiv>
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
        {recipeTip}
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
        <div className="pt-[5px] text-[#6F6F6F]">
          썸네일 클릭 시 동영상 링크로 연결됩니다.
        </div>
      </div>

      {/* 댓글 */}
      <div>
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
      </div>
    </ContainerDiv>
  );
};

const CommentIconDiv = styled.div`
  margin-left: 7px;
  margin-top: 4px;
  margin-right: 4px;
`;

const ContainerDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 700px;
  margin: 0 auto;
  gap: 25px;
`;

const ImageWrapperDiv = styled.div`
  width: 650px;
  height: 350px;
  position: relative;
  margin-top: 35px;
`;

const TitleContainerDiv = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
`;

const TitleH3 = styled.h3`
  font-weight: 600;
  font-size: 22px;
  margin-right: 10px;
`;

const AuthorSpan = styled.span`
  color: #6f6f6f;
`;

const DescriptionDiv = styled.div`
  margin-top: 10px;
  width: 600px;
`;

const SubtitleH2 = styled.h2`
  font-size: 20px;
  color: #b08038;
  font-weight: 500;
  margin-bottom: 10px;
`;

export default RecipeDetail;
