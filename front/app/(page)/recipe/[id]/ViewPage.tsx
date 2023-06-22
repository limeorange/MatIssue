"use client";

import IngredientList from "@/app/components/recipe-view/IngredientList";
import ProgressBar from "@/app/components/recipe-view/sticky-sidebar/ProgressBar";
import RecipeCommentInput from "@/app/components/recipe-view/comment/RecipeCommentInput";
import RecipeComments from "@/app/components/recipe-view/comment/RecipeCommentList";
import RecipeInfo from "@/app/components/recipe-view/RecipeInfo";
import RecipeScrap from "@/app/components/recipe-view/scrap/RecipeScrap";
import RecipeSteps from "@/app/components/recipe-view/RecipeStepList";
import RecipeUserLikes from "@/app/components/recipe-view/likes-share/RecipeUserLikes";
import RecipeVideo from "@/app/components/recipe-view/RecipeVideo";
import ScrapModal from "@/app/components/recipe-view/scrap/ScrapModal";
import StickyProgressBar from "@/app/components/recipe-view/sticky-sidebar/StickyProgressBar";
import StickySideBar from "@/app/components/recipe-view/sticky-sidebar/StickySideBar";
import Image from "next/image";
import React, { useState } from "react";
import styled from "styled-components";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getRecipeById } from "@/app/api/recipe";
import { Recipe, User } from "@/app/types";
import WriterProfile from "@/app/components/recipe-view/sticky-sidebar/WriterProfile";
import { axiosBase } from "@/app/api/axios";
import toast from "react-hot-toast";
import getCurrentUser, { getChefByUserId } from "@/app/api/user";
import useMovingContentByScrolling from "@/app/hooks/useMovingContentByScrolling";
import { useRouter } from "next/navigation";
import { AlertImage } from "@/app/styles/my-page/modify-user-info.style";
import ConfirmModal from "@/app/components/UI/ConfirmModal";
import ShareModal from "@/app/components/recipe-view/likes-share/ShareModal";
import MiniWriterProfile from "@/app/components/recipe-view/sticky-sidebar/MiniWriterProfile";
import LoginConfirmModal from "@/app/components/UI/LoginConfirmModal";

/** 레시피 데이터 Props */
type RecipeDataProps = {
  recipe: Recipe;
  recipe_id: string;
  initialCurrentChef: User;
};

/** 레시피 조회 페이지 컴포넌트 */
const RecipeDetail = (props: RecipeDataProps) => {
  // currentRecipe : 현재 레시피 정보
  const { data: recipe } = useQuery<Recipe>(
    ["currentRecipe", props.recipe_id],
    () => getRecipeById(props.recipe_id),
    {
      refetchOnWindowFocus: false,
      retry: 0,
      initialData: props.recipe,
    }
  );

  // currentUser : 현재 로그인 된 유저정보
  const { data: currentUser } = useQuery<User>(["currentUser"], () =>
    getCurrentUser()
  );
  const loggedInUserId: string | undefined = currentUser?.user_id;

  // 현재의 QueryClient 인스턴스인 client를 사용하여 React Query 기능 활용
  const client = useQueryClient();

  // recipe 데이터 객체 분해 할당
  const {
    // 대표 이미지, 제목, 작성자, 소개글 (props로 안 내려줌)
    recipe_title,
    recipe_thumbnail,
    user_nickname,
    recipe_description,

    // 요리 정보 (인원, 시간, 난이도, 종류)
    recipe_category,
    recipe_info,

    // 요리팁, 동영상 링크
    recipe_tip,
    recipe_video,

    // 레시피 작성자 아이디, 이미지, 작성된 시각
    user_id,
    created_at,

    // 요리 재료
    recipe_ingredients,

    // 요리 과정
    recipe_sequence,

    // 요리 레시피 게시글 ID, 조회수, 좋아요수
    recipe_id,
    recipe_view,
    recipe_like,

    // 댓글 관련 data
    comments,
  } = recipe;

  // currentChef : 현재 게시글의 작성자 정보
  const { data: currentChef } = useQuery(
    ["currentChef", user_id],
    () => getChefByUserId(user_id),
    {
      refetchOnWindowFocus: false,
      retry: 0,
      initialData: props.initialCurrentChef,
    }
  );

  // 댓글 개수
  const commentCount =
    Array.isArray(comments) && comments.length > 0 ? comments.length : 0;

  const router = useRouter();

  // 좋아요 버튼, 카운트 상태 관리
  const [isLiked, setIsLiked] = useState(
    loggedInUserId !== undefined && recipe_like.includes(loggedInUserId)
  );
  const [count, setCount] = useState(recipe_like.length);
  const countText = count.toLocaleString();

  // 스크랩 버튼 상태 관리
  const [isBooked, setIsBooked] = useState(false);

  // 스크랩 저장 상태 관리
  const [isSaved, setIsSaved] = useState(false);

  // 삭제 확인 모달 상태 관리
  const [deleteConfirmModal, setDeleteConfirmModal] = useState(false);

  // 공유 모달 상태 관리
  const [isShareModal, setIsShareModal] = useState(false);

  // 프로필 모달 상태 관리
  const [isProfileModal, setIsProfileModal] = useState(false);

  // 스크롤에 의한 컨텐츠 이동 Hook
  const isHeaderVisible = useMovingContentByScrolling();

  // 로그인 유도 모달 상태 관리
  const [loginConfirmModal, setLoginConfirmModal] = useState(false);

  /** 좋아요 버튼 클릭 핸들러 */
  const heartClickHandler = async () => {
    try {
      // 이미 좋아요를 누른 경우 해당 user_id를 배열에서 삭제 (좋아요 취소)
      if (
        loggedInUserId !== undefined &&
        recipe_like.includes(loggedInUserId)
      ) {
        const recipeUpdated: string[] = recipe_like.filter(
          (id) => id !== loggedInUserId
        );
        await axiosBase.patch(`/recipes/${recipe_id}/like`, recipeUpdated);
        setIsLiked(false);
        setCount((prevCount) => Math.max(prevCount - 1, 0));
        toast.error("좋아요가 취소되었습니다ㅠ.ㅠ");
      }
      // 좋아요를 처음 누른 경우
      else if (loggedInUserId !== undefined) {
        recipe_like.push(loggedInUserId);
        await axiosBase.patch(`/recipes/${recipe_id}/like`, recipe_like);
        setIsLiked(true);
        setCount((prevCount) => prevCount + 1);
        toast.success("맛이슈와 함께라면 언제든 좋아요!");
      }
      client.invalidateQueries(["currentRecipe"]);
    } catch (error) {
      console.log("좋아요 요청 실패와 관련한 오류는..🧐", error);
      toast.error("좋아요 요청에 실패했습니다 ㅠ.ㅠ");
    }
  };

  /** 스크랩 버튼 클릭 핸들러 */
  const scrapClickHandler = () => {
    setIsBooked(!isBooked);
  };

  /** 모달창 닫기 핸들러 */
  const modalCloseHandler = () => {
    setIsBooked(false);
  };

  /** 게시글 삭제 버튼 클릭 핸들러 */
  const recipeDeleteHandler = () => {
    setDeleteConfirmModal(true);
  };

  /** 삭제 확인 모달 : 취소 클릭 핸들러 */
  const confirmModalCloseHandler = () => {
    setDeleteConfirmModal(false);
  };

  /** 삭제 확인 모달 : 삭제 클릭 핸들러 */
  const deleteConfirmHandler = async () => {
    try {
      await axiosBase.delete(`recipes/${recipe_id}`);
      toast.success("게시글이 삭제되었습니다!");
      router.push("/recipes/category/newest?category=newest");
      client.invalidateQueries(["currentUserRecipes"]);
    } catch (error) {
      console.log("게시글 삭제 실패와 관련한 오류는..🧐", error);
      toast.error("게시글 삭제에 실패했습니다 ㅠ.ㅠ");
    } finally {
      setDeleteConfirmModal(false);
    }
  };

  /** 공유하기 버튼 클릭 핸들러 */
  const shareButtonClickHandler = () => {
    setIsShareModal(!isShareModal);
  };

  /** 모바일 프로필 이미지 클릭 핸들러 */
  const mobileProfileClickHandler = () => {
    setIsProfileModal(!isProfileModal);
  };

  /** 로그인 유도 모달 핸들러 */
  const loginConfirmModalHandler = () => {
    setLoginConfirmModal(!loginConfirmModal);
  };

  /** 로그인 유도 모달 : 취소 클릭 핸들러 */
  const loginModalCloseHandler = () => {
    setLoginConfirmModal(false);
  };

  /** 로그인 유도 모달 : 로그인 클릭 핸들러 */
  const loginMoveHandler = () => {
    router.push("auth/login");
  };

  /** 프로필 클릭 핸들러 - 유저 페이지로 이동 */
  const profileClickHandler = () => {
    router.push(`user/${currentChef.user_id}`);
  };

  return (
    <>
      <ViewPageContainer>
        {/* 게시글 삭제 확인 모달 */}
        {deleteConfirmModal && (
          <StyledConfirmModal
            icon={<AlertImage src="/images/orange_alert.svg" alt="alert" />}
            message="레시피를 삭제하시겠습니까?"
            onConfirm={deleteConfirmHandler}
            onCancel={confirmModalCloseHandler}
          />
        )}

        {/* 비회원 로그인 유도 모달 */}
        {loginConfirmModal && loggedInUserId === undefined && (
          <StyledLoginConfirmModal
            icon={<AlertImage src="/images/orange_alert.svg" alt="alert" />}
            message="로그인이 필요합니다. 로그인 하시겠습니까?"
            onConfirm={loginMoveHandler}
            onCancel={loginModalCloseHandler}
          />
        )}

        {/* 스크롤 상태 진행바 */}
        <ProgressBar />

        {/* 목차 사이드바 */}
        <StickySideWrapper>
          <StickyProgressBar />
          <StickySideBar />
        </StickySideWrapper>

        {/* 작성자 프로필 */}
        <WriterProfile user_id={user_id} loggedInUserId={loggedInUserId} />

        {/* 모바일용 작성자 프로필 동그라미 */}
        <div>
          {isProfileModal && (
            <MiniWriterProfile
              user_id={user_id}
              loggedInUserId={loggedInUserId}
            />
          )}
          <ProfileImage onClick={mobileProfileClickHandler}>
            <Image
              src={
                currentChef.img
                  ? currentChef.img
                  : "/images/recipe-view/기본 프로필.PNG"
              }
              alt="게시글 작성자 프로필 사진"
              width={150}
              height={150}
              style={{ objectFit: "cover", cursor: "pointer" }}
            />
          </ProfileImage>
        </div>

        {/* 요리 대표 이미지 */}
        <RecipeImage>
          <Img src={recipe_thumbnail} alt="요리 대표 사진" />
        </RecipeImage>

        {/* 요리 제목, 작성자, 작성 시간, 간단 소개글 */}
        <div>
          <TitleContentsWrapper>
            <RecipeTitle>{recipe_title}</RecipeTitle>
            <InfoButtonWrapper>
              <div>
                <Time>by </Time>
                <Author onClick={profileClickHandler}>{user_nickname}</Author>
                <Time>&nbsp;• {created_at.slice(0, 10)}</Time>
              </div>
              {user_id === loggedInUserId && (
                <WriterButtonBox isHeaderVisible={isHeaderVisible}>
                  <EditButton
                    onClick={() => {
                      router.push(`/edit-recipe/${recipe_id}`);
                    }}
                  >
                    수정
                  </EditButton>
                  <DeleteButton onClick={recipeDeleteHandler}>
                    삭제
                  </DeleteButton>
                </WriterButtonBox>
              )}
            </InfoButtonWrapper>
          </TitleContentsWrapper>
          <Description>{recipe_description}</Description>
        </div>

        {/* 요리 정보 (인원, 시간, 난이도, 종류) */}
        <div id="heading1">
          <Subtitle>요리 정보</Subtitle>
          <RecipeInfo
            recipe_category={recipe_category}
            recipe_info={recipe_info}
          ></RecipeInfo>
        </div>

        {/* 재료 준비 목록 */}
        <div id="heading2">
          <Subtitle>재료 준비</Subtitle>
          <IngredientList recipe_ingredients={recipe_ingredients} />
        </div>

        {/* 요리 과정 */}
        <div id="heading3">
          <Subtitle>요리 과정</Subtitle>
          <RecipeSteps recipe_sequence={recipe_sequence}></RecipeSteps>
        </div>

        {/* 요리팁 */}
        <div id="heading4">
          <Subtitle>요리팁</Subtitle>
          <RecipeTip>{recipe_tip}</RecipeTip>
        </div>

        {/* 요리 동영상 */}
        <div id="heading5">
          <Subtitle>요리 동영상</Subtitle>
          <RecipeVideo recipe_video={recipe_video}></RecipeVideo>
        </div>

        <LikeScrapShareWrapper>
          {/* 좋아요 */}
          <div onClick={loginConfirmModalHandler}>
            <RecipeUserLikes
              isLiked={isLiked}
              countText={countText}
              heartClickHandler={heartClickHandler}
            />
          </div>

          {/* 스크랩 */}
          <div id="heading6" onClick={loginConfirmModalHandler}>
            <RecipeScrap
              currentUserID={currentUser?.user_id}
              isSaved={isSaved}
              setIsSaved={setIsSaved}
              isBooked={isBooked}
              scrapClickHandler={scrapClickHandler}
              recipe_id={recipe_id}
            />
            {isBooked && loggedInUserId !== undefined && (
              <ScrapModal
                setIsSaved={setIsSaved}
                modalCloseHandler={modalCloseHandler}
                recipe={recipe}
              />
            )}
          </div>

          {/* 링크, 카카오 공유하기 */}
          <ShareButtonBox onClick={shareButtonClickHandler}>
            <ShareIcon>
              <Image
                src="/images/recipe-view/share_goldbrown.png"
                alt="공유하기 아이콘"
                width={26}
                height={22}
                style={{ objectFit: "cover", cursor: "pointer" }}
              />
            </ShareIcon>
            {/* 공유 모달 */}
            {isShareModal && <ShareModal recipe_thumbnail={recipe_thumbnail} />}
          </ShareButtonBox>
        </LikeScrapShareWrapper>

        {/* 댓글 */}
        <div>
          <Subtitle>
            댓글
            <CommentIcon>
              <Image
                src="/images/recipe-view/comment.svg"
                alt="댓글 아이콘"
                width={22}
                height={22}
              ></Image>
            </CommentIcon>
            {commentCount}
          </Subtitle>
          <RecipeComments comments={comments} />
          <div onClick={loginConfirmModalHandler}>
            <RecipeCommentInput recipe_id={recipe_id} />
          </div>
        </div>
      </ViewPageContainer>
    </>
  );
};

/** 전체 감싸는 Div */
const ViewPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 1.5rem;
  max-width: 67rem;
  width: 100%;
  margin: 0 auto;
  justify-content: flex-start;

  @media (min-width: 1024px) {
    margin-top: 1.5rem;
    padding: 0;
  }
`;

/** 반응형에서 작성자 정보와 수정, 삭제 버튼 묶는 Div */
const InfoButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

/** 사이드 목차바 묶는 Div */
const StickySideWrapper = styled.div`
  display: none;

  @media (min-width: 1024px) {
    display: flex;
  }
`;

/** 프로필 이미지 감싸는 Div */
const ProfileImage = styled.div`
  position: fixed;
  bottom: 1.5rem;
  right: 3rem;
  width: 6rem;
  height: 6rem;
  margin-bottom: 1.3rem;
  box-shadow: 0 0 0.3rem rgba(0, 0, 0, 0.3);
  border-radius: 50%;
  overflow: hidden;
  background-color: #ffffff;
  z-index: 1000;

  @media (min-width: 1024px) {
    display: none;
  }
`;

/** 게시글 수정, 삭제 버튼 Div */
const WriterButtonBox = styled.div<{ isHeaderVisible: boolean }>`
  display: flex;

  @media (min-width: 1024px) {
    position: fixed;
    right: 14.7rem;
    top: 50.4rem;
    gap: 1rem;

    transform: ${(props) =>
      props.isHeaderVisible ? "translateY(0)" : "translateY(-131px)"};
    transition: transform 0.3s ease-in-out;
  }
`;

/** 수정 Button */
const EditButton = styled.button`
  padding: 0.5rem 1.3rem;
  font-weight: 500;
  font-size: 15px;
  color: #4f3d21;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    font-size: 16.5px;
    background-color: #fbd26a;
  }

  @media (min-width: 1024px) {
    font-size: 16.5px;
    width: 6.7rem;
    height: 3.7rem;
    border-radius: 1rem;
    background: #fbe2a1;
  }
`;

/** 삭제 Button */
const DeleteButton = styled.button`
  padding: 0.5rem 1.3rem;
  font-weight: 500;
  font-size: 15px;
  color: #4f3d21;
  transition: background-color;

  &:hover {
    background-color: #a17c43;
    border: 2px solid #a17c43;
    color: #ffffff;
  }

  @media (min-width: 1024px) {
    font-size: 16.5px;
    width: 6.7rem;
    height: 3.7rem;
    border-radius: 1rem;
    background-color: #ffffff;
    border-radius: 1rem;
    border: 2px solid #fbe2a1;
  }
`;

/** 삭제 컨펌 모달창 */
const StyledConfirmModal = styled(ConfirmModal)``;

/** 로그인 유도 모달창 */
const StyledLoginConfirmModal = styled(LoginConfirmModal)``;

/** 요리 대표 이미지 */
const RecipeImage = styled.div`
  position: relative;
  padding-top: 55%;
  border-radius: 0.8rem;
  overflow: hidden;
  margin: 1.3rem 0;
`;
const Img = styled.img`
  position: absolute;
  width: 100%;
  height: 100%;
  inset: 0;
  object-fit: cover;
  border-radius: 0.8rem;
`;

/** 요리 주제 소개 담은 Div */
const TitleContentsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  @media (min-width: 1024px) {
    flex-direction: row;
    width: 100%;
    max-width: 65rem;
    justify-content: space-between;
    align-items: center;
    gap: 0.5rem;
  }
`;

/** 레시피 전체 제목 H3 */
const RecipeTitle = styled.h3`
  font-size: 20px;
  font-weight: 600;

  @media (min-width: 1024px) {
    margin-right: 1rem;
    font-size: 22px;
  }
`;

/** 작성자 Span */
const Author = styled.span`
  color: #6f6f6f;
  font-size: 1.4rem;

  &:hover {
    text-decoration: underline;
    cursor: pointer;
  }
`;

/** 작성시간 Span */
const Time = styled.span`
  color: #6f6f6f;
  font-size: 1.4rem;
`;

/** 요리 간단 소개 Div */
const Description = styled.div`
  margin-top: 1.5rem;
  max-width: 65rem;
  width: 100%;
  font-size: 16px;
`;

/** 레시피 소제목 H2 */
const Subtitle = styled.h2`
  display: flex;
  font-size: 18px;
  color: #b08038;
  font-weight: 500;
  margin-top: 2.5rem;
  margin-bottom: 1rem;

  @media (min-width: 1024px) {
    font-size: 2rem;
    color: #b08038;
    font-weight: 500;
    \
  }
`;

/** 요리팁 Div */
const RecipeTip = styled.div`
  font-size: 1.6rem;
`;

/** 댓글 아이콘 Div */
const CommentIcon = styled.div`
  margin-left: 0.5rem;
  margin-right: 0.2rem;
  margin-top: 0.1rem;

  @media (min-width: 1024px) {
    margin-top: 0.3rem;
  }
`;

/** 공유하기 아이콘 Button */
const ShareButtonBox = styled.button`
  position: relative;
  display: flex;
  width: 4.2rem;
  height: 4.2rem;
  border-radius: 1.5rem;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
  box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.3);

  @media (min-width: 1024px) {
    width: 5.5rem;
    height: 5.5rem;
    margin-top: 1rem;
  }
`;

/** 공유하기 아이콘 Div */
const ShareIcon = styled.div`
  width: 2.2rem;

  @media (min-width: 1024px) {
    width: 3.2rem;
    height: 2.8rem;
    margin-left: 0.2rem;
    margin-bottom: 0.2rem;
  }
`;

/** 좋아요, 스크랩, 공유하기 감싸는 Div */
const LikeScrapShareWrapper = styled.div`
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  align-items: center;
  margin-top: 3rem;
`;

export default React.memo(RecipeDetail);
