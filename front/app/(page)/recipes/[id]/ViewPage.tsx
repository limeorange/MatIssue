"use client";

import IngredientList from "@/app/components/recipe/IngredientList";
import ProgressBar from "@/app/components/recipe/ProgressBar";
import RecipeComment from "@/app/components/recipe/RecipeComment";
import RecipeCommentInput from "@/app/components/recipe/RecipeCommentInput";
import RecipeComments from "@/app/components/recipe/RecipeComments";
import RecipeInfo from "@/app/components/recipe/RecipeInfo";
import RecipeScrap from "@/app/components/recipe/RecipeScrap";
import RecipeSteps from "@/app/components/recipe/RecipeSteps";
import RecipeUserLikes from "@/app/components/recipe/RecipeUserLikes";
import RecipeVideo from "@/app/components/recipe/RecipeVideo";
import ScrapModal from "@/app/components/recipe/ScrapModal";
import StickyProgressBar from "@/app/components/recipe/StickyProgressBar";
import StickySideBar from "@/app/components/recipe/StickySideBar";
import Image from "next/image";
import { useState } from "react";
import styled from "styled-components";

/** 레시피 데이터 Props */
type RecipeDataProps = {
  recipe: {
    recipe_title: string;
    recipe_thumbnail: string;
    recipe_video: string;
    recipe_description: string;
    recipe_category: string;
    recipe_info: {
      serving: number;
      time: number;
      level: number;
    };
    recipe_ingredients: {
      name: string;
      amount: string;
    }[];
    recipe_sequence: {
      step: number;
      picture: string;
      description: string;
    }[];
    recipe_tip: string;
    recipe_id: string;
    recipe_view?: number;
    recipe_like?: number;
    user_id: string;
    user_nickname: string;
    created_at: string;
  };
  // 댓글 관련 Data Type 정의 (임시 dummy data)
  recipeComment: {
    comments: {
      comment_author: string;
      comment_text: string;
    }[];
  };
};

/** 레시피 조회 페이지 컴포넌트 */
const RecipeDetail = (props: RecipeDataProps) => {
  const { recipe, recipeComment } = props;
  const {
    // 대표 이미지, 제목, 작성자, 소개글 (props로 안 내려줌)
    recipe_title: recipeTitle,
    recipe_thumbnail: recipeCover,
    user_nickname: author,
    recipe_description: description,

    // 요리 정보 (인원, 시간, 난이도, 종류)
    recipe_category: category,
    recipe_info,

    // 요리팁, 동영상 링크
    recipe_tip: recipeTip,
    recipe_video: recipeVideoUrl,

    // 레시피 작성자 아이디, 작성된 시각
    user_id: recipeUserId,
    created_at: createdAt,

    // 요리 재료
    recipe_ingredients: recipeIngredients,

    // 요리 과정
    recipe_sequence: recipeSequence,

    // 요리 레시피 게시글 ID, 조회수, 좋아요수
    recipe_id,
    recipe_view,
    recipe_like,
  } = recipe;

  const { comments } = recipeComment;
  const loggedInUserId = "happyuser";

  // 좋아요 버튼, 카운트 상태 관리
  const [isLiked, setIsLiked] = useState(false);
  const [count, setCount] = useState(1230);
  const countText = count.toLocaleString();

  // 스크랩 버튼 상태 관리
  const [isBooked, setIsBooked] = useState(false);

  // 모달창 상태 관리
  const [isModal, setIsModal] = useState<boolean>(false);

  // 좋아요 버튼 클릭 핸들러
  const heartClickHandler = () => {
    setIsLiked(!isLiked);
    if (isLiked) {
      setCount(count - 1);
    } else {
      setCount(count + 1);
    }
  };

  // 스크랩 버튼 클릭 핸들러
  const scrapClickHandler = () => {
    setIsBooked(!isBooked);
  };

  // 모달창 닫기 핸들러
  const modalCloseHandler = () => {
    setIsBooked(false);
  };

  return (
    <>
      <ContainerDiv>
        {/* 스크롤 상태 진행바 */}
        <ProgressBar />

        {/* 목차 사이드바 */}
        <div className="flex">
          <StickyProgressBar />
          <StickySideBar />
        </div>

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
              <AuthorSpan>&nbsp;• {createdAt.slice(0, 10)}</AuthorSpan>
            </div>

            {recipeUserId === loggedInUserId && (
              <div className="flex gap-[0.8rem]">
                <EditButton>수정</EditButton>
                <DeleteButton>삭제</DeleteButton>
              </div>
            )}
          </TitleContainerDiv>
          <DescriptionDiv>{description}</DescriptionDiv>
        </div>

        {/* 요리 정보 (인원, 시간, 난이도, 종류) */}
        <div id="content1">
          <SubtitleH2 id="heading1">요리 정보</SubtitleH2>
          <RecipeInfo
            category={category}
            recipe_info={recipe_info}
          ></RecipeInfo>
        </div>

        {/* 재료 준비 목록 */}
        <div>
          <SubtitleH2 id="heading2">재료 준비</SubtitleH2>
          <IngredientList recipeIngredients={recipeIngredients} />
        </div>

        {/* 요리 과정 */}
        <div>
          <SubtitleH2 id="heading3">요리 과정</SubtitleH2>
          <RecipeSteps recipeSequence={recipeSequence}></RecipeSteps>
        </div>

        {/* 요리팁 */}
        <div>
          <SubtitleH2 id="heading4">요리팁</SubtitleH2>
          <RecipeTipDiv>{recipeTip}</RecipeTipDiv>
        </div>

        {/* 요리 동영상 */}
        <div>
          <SubtitleH2 id="heading5">요리 동영상</SubtitleH2>
          <RecipeVideo recipeVideoUrl={recipeVideoUrl}></RecipeVideo>
        </div>

        <div className="flex gap-[1rem] justify-center">
          {/* 좋아요 */}
          <RecipeUserLikes
            isLiked={isLiked}
            countText={countText}
            heartClickHandler={heartClickHandler}
          />

          {/* 스크랩 */}
          <RecipeScrap
            isBooked={isBooked}
            scrapClickHandler={scrapClickHandler}
          />
          {isBooked && <ScrapModal modalCloseHandler={modalCloseHandler} />}
        </div>

        {/* 댓글 */}
        <div>
          <div className="flex">
            <SubtitleH2 id="heading6">댓글</SubtitleH2>
            <CommentIconDiv>
              <Image
                src="/images/recipe-view/comment.svg"
                alt="댓글 아이콘"
                width={22}
                height={22}
              ></Image>
            </CommentIconDiv>
            <SubtitleH2>{comments.length}</SubtitleH2>
          </div>
          <div className="mb-[30px]">
            <RecipeComments comments={comments} />
          </div>
          <RecipeCommentInput />
        </div>
      </ContainerDiv>
    </>
  );
};

/** 전체 감싸는 Div */
const ContainerDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 70rem;
  margin: 0 auto;
  gap: 2.5rem;
`;

/** 수정 Button */
const EditButton = styled.button`
  width: 6.7rem;
  height: 3.7rem;
  border-radius: 1rem;
  background: #fbe2a1;
  font-weight: 500;
  font-size: 16.5px;
  color: #4f3d21;
`;

/** 삭제 Button */
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

const CommentIconDiv = styled.div`
  margin-left: 0.7rem;
  margin-top: 0.4rem;
  margin-right: 0.4rem;
`;

export default RecipeDetail;
