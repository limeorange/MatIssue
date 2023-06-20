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
};

/** 레시피 조회 페이지 컴포넌트 */
const RecipeDetail = (props: RecipeDataProps) => {
  // 캐시에 저장된 현재 레시피 정보를 가져옴
  const {
    data: recipe,
    isLoading,
    isError,
  } = useQuery<Recipe>(
    ["currentRecipe", props.recipe_id],
    () => getRecipeById(props.recipe_id),
    {
      refetchOnWindowFocus: false,
      retry: 0,
      initialData: props.recipe,
    }
  );

  // 캐시에 저장된 현재 유저정보를 가져옴
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
    // user_img,

    // 요리 재료
    recipe_ingredients,

    // 요리 과정
    recipe_sequence,

    // 요리 레시피 게시글 ID, 조회수, 좋아요수
    recipe_id,
    recipe_view,
    recipe_like,

    // 팔로우, 팔로잉 관련
    // user_fan,
    // user_subscription,

    // 댓글 관련 data
    comments,
  } = recipe;

  // currentChef 정보
  const { data: currentChef, isLoading: isLoadingChef } = useQuery(
    ["currentChef", user_id],
    () => getChefByUserId(user_id)
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
        setCount(count - 1);
        toast.error("좋아요가 취소되었습니다ㅠ.ㅠ");
      }
      // 좋아요를 처음 누른 경우
      else if (loggedInUserId !== undefined) {
        recipe_like.push(loggedInUserId);
        await axiosBase.patch(`/recipes/${recipe_id}/like`, recipe_like);
        setIsLiked(true);
        setCount(count + 1);
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

  // currentChef를 받아오기 전 로딩 상태를 표시하는 컴포넌트
  if (isLoadingChef) {
    return <div>Loading...</div>; //
  }

  return (
    <>
      <ContainerDiv>
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
        <StickySideDiv>
          <StickyProgressBar />
          <StickySideBar />
        </StickySideDiv>

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
          <ProfileImageDiv onClick={mobileProfileClickHandler}>
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
          </ProfileImageDiv>
        </div>

        {/* 요리 대표 이미지 */}
        <RecipeImg>
          <Img src={recipe_thumbnail} alt="요리 대표 사진" />
        </RecipeImg>

        {/* 요리 제목, 작성자, 작성 시간, 간단 소개글 */}
        <div>
          <TitleContainerDiv>
            <TitleH3>{recipe_title}</TitleH3>
            <div className="flex justify-between items-center">
              <div>
                <AuthorSpan>by {user_nickname}</AuthorSpan>
                <AuthorSpan>&nbsp;• {created_at.slice(0, 10)}</AuthorSpan>
              </div>
              {user_id === loggedInUserId && (
                <WriterButtonDiv isHeaderVisible={isHeaderVisible}>
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
                </WriterButtonDiv>
              )}
            </div>
          </TitleContainerDiv>
          <DescriptionDiv>{recipe_description}</DescriptionDiv>
        </div>

        {/* 요리 정보 (인원, 시간, 난이도, 종류) */}
        <div id="heading1">
          <SubtitleH2>요리 정보</SubtitleH2>
          <RecipeInfo
            recipe_category={recipe_category}
            recipe_info={recipe_info}
          ></RecipeInfo>
        </div>

        {/* 재료 준비 목록 */}
        <div id="heading2">
          <SubtitleH2>재료 준비</SubtitleH2>
          <IngredientList recipe_ingredients={recipe_ingredients} />
        </div>

        {/* 요리 과정 */}
        <div id="heading3">
          <SubtitleH2>요리 과정</SubtitleH2>
          <RecipeSteps recipe_sequence={recipe_sequence}></RecipeSteps>
        </div>

        {/* 요리팁 */}
        <div id="heading4">
          <SubtitleH2>요리팁</SubtitleH2>
          <RecipeTipDiv>{recipe_tip}</RecipeTipDiv>
        </div>

        {/* 요리 동영상 */}
        <div id="heading5">
          <SubtitleH2>요리 동영상</SubtitleH2>
          <RecipeVideo recipe_video={recipe_video}></RecipeVideo>
        </div>

        <LikeScrapShareDiv>
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
          <ShareWrapperButton onClick={shareButtonClickHandler}>
            <ShareIconDiv>
              <Image
                src="/images/recipe-view/share_goldbrown.png"
                alt="공유하기 아이콘"
                width={26}
                height={22}
                style={{ objectFit: "cover", cursor: "pointer" }}
              />
            </ShareIconDiv>
            {/* 공유 모달 */}
            {isShareModal && <ShareModal recipe_thumbnail={recipe_thumbnail} />}
          </ShareWrapperButton>
        </LikeScrapShareDiv>

        {/* 댓글 */}
        <div>
          <SubtitleH2>
            댓글
            <CommentIconDiv>
              <Image
                src="/images/recipe-view/comment.svg"
                alt="댓글 아이콘"
                width={22}
                height={22}
              ></Image>
            </CommentIconDiv>
            {commentCount}
          </SubtitleH2>
          <RecipeComments comments={comments} />
          <div onClick={loginConfirmModalHandler}>
            <RecipeCommentInput recipe_id={recipe_id} />
          </div>
        </div>
      </ContainerDiv>
    </>
  );
};

/** 전체 감싸는 Div */
const ContainerDiv = styled.div`
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

/** 사이드 목차바 묶는 Div */
const StickySideDiv = styled.div`
  display: none;

  @media (min-width: 1024px) {
    display: flex;
  }
`;

/** 프로필 이미지 감싸는 Div */
const ProfileImageDiv = styled.div`
  position: fixed;
  bottom: 2%;
  right: 8%;
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
const WriterButtonDiv = styled.div<{ isHeaderVisible: boolean }>`
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
const RecipeImg = styled.div`
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
const TitleContainerDiv = styled.div`
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
const TitleH3 = styled.h3`
  font-size: 20px;
  font-weight: 600;

  @media (min-width: 1024px) {
    margin-right: 1rem;
    font-size: 22px;
  }
`;

/** 작성자 Span */
const AuthorSpan = styled.span`
  color: #6f6f6f;
  font-size: 1.4rem;

  @media (min-width: 1024px) {
  }
`;

/** 요리 간단 소개 Div */
const DescriptionDiv = styled.div`
  margin-top: 1.5rem;
  max-width: 65rem;
  width: 100%;
  font-size: 16px;
`;

/** 레시피 소제목 H2 */
const SubtitleH2 = styled.h2`
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
const RecipeTipDiv = styled.div`
  font-size: 1.6rem;
`;

/** 댓글 아이콘 Div */
const CommentIconDiv = styled.div`
  margin-left: 0.5rem;
  margin-right: 0.2rem;
  margin-top: 0.1rem;

  @media (min-width: 1024px) {
    margin-top: 0.3rem;
  }
`;

/** 공유하기 아이콘 Button */
const ShareWrapperButton = styled.button`
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
const ShareIconDiv = styled.div`
  width: 2.2rem;

  @media (min-width: 1024px) {
    width: 3.2rem;
    height: 2.8rem;
    margin-left: 0.2rem;
    margin-bottom: 0.2rem;
  }
`;

/** 좋아요, 스크랩, 공유하기 감싸는 Div */
const LikeScrapShareDiv = styled.div`
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  align-items: center;
  margin-top: 3rem;
`;

export default React.memo(RecipeDetail);
