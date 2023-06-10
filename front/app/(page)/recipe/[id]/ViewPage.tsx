"use client";

import IngredientList from "@/app/components/recipe-view/IngredientList";
import ProgressBar from "@/app/components/recipe-view/sticky-sidebar/ProgressBar";
import RecipeCommentInput from "@/app/components/recipe-view/comment/RecipeCommentInput";
import RecipeComments from "@/app/components/recipe-view/comment/RecipeCommentList";
import RecipeInfo from "@/app/components/recipe-view/RecipeInfo";
import RecipeScrap from "@/app/components/recipe-view/scrap/RecipeScrap";
import RecipeSteps from "@/app/components/recipe-view/RecipeStepList";
import RecipeUserLikes from "@/app/components/recipe-view/RecipeUserLikes";
import RecipeVideo from "@/app/components/recipe-view/RecipeVideo";
import ScrapModal from "@/app/components/recipe-view/scrap/ScrapModal";
import StickyProgressBar from "@/app/components/recipe-view/sticky-sidebar/StickyProgressBar";
import StickySideBar from "@/app/components/recipe-view/sticky-sidebar/StickySideBar";
import Image from "next/image";
import { useState } from "react";
import styled from "styled-components";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getRecipeById } from "@/app/api/recipe";
import { Recipe, User } from "@/app/types";
import WriterProfile from "@/app/components/recipe-view/sticky-sidebar/WriterProfile";
import { axiosBase } from "@/app/api/axios";
import toast from "react-hot-toast";
import getCurrentUser from "@/app/api/user";
import useMovingContentByScrolling from "@/app/hooks/useMovingContentByScrolling";
import { useRouter } from "next/navigation";
import { AlertImage } from "@/app/styles/my-page/modify-user-info.style";
import ConfirmModal from "@/app/components/UI/ConfirmModal";

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
    ["currentRecipe"],
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

    // 레시피 작성자 아이디, 작성된 시각
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

    // 팔로우, 팔로잉 관련
    user_fan,
    user_subscription,

    // 댓글 관련 data
    comments,
  } = recipe;

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

  // 스크롤에 의한 컨텐츠 이동 Hook
  const isHeaderVisible = useMovingContentByScrolling();

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
        toast.success("좋아요가 취소되었습니다ㅠ.ㅠ");
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

  const confirmModalCloseHandler = () => {
    setDeleteConfirmModal(false);
  };

  /** 삭제 확인 모달 핸들러 */
  const deleteConfirmHandler = async () => {
    try {
      await axiosBase.delete(`recipes/${recipe_id}`);
      toast.success("게시글이 삭제되었습니다!");
      router.back();
      client.invalidateQueries(["currentUserRecipes"]);
    } catch (error) {
      console.log("게시글 삭제 실패와 관련한 오류는..🧐", error);
      toast.error("게시글 삭제에 실패했습니다 ㅠ.ㅠ");
    } finally {
      setDeleteConfirmModal(false);
    }
  };

  return (
    <>
      <ContainerDiv>
        {deleteConfirmModal && (
          <StyledConfirmModal
            icon={<AlertImage src="/images/alert.png" alt="alert" />}
            message="레시피를 삭제하시겠습니까?"
            onConfirm={deleteConfirmHandler}
            onCancel={confirmModalCloseHandler}
          />
        )}

        {/* 스크롤 상태 진행바 */}
        <ProgressBar />

        {/* 목차 사이드바 */}
        <div className="flex">
          <StickyProgressBar />
          <StickySideBar />
        </div>

        {/* 작성자 프로필 */}
        <WriterProfile user_nickname={user_nickname} />
        {user_id === loggedInUserId && (
          <WriterButtonDiv isHeaderVisible={isHeaderVisible}>
            <EditButton
              onClick={() => {
                router.push(`/edit-recipe/${recipe_id}`);
              }}
            >
              수정
            </EditButton>
            <DeleteButton onClick={recipeDeleteHandler}>삭제</DeleteButton>
          </WriterButtonDiv>
        )}

        {/* 요리 대표 이미지 */}
        <ImageWrapperDiv>
          <Image
            src={recipe_thumbnail}
            alt="요리 대표 사진"
            fill
            style={{ objectFit: "cover", borderRadius: 20 }}
          />
        </ImageWrapperDiv>

        {/* 요리 제목, 작성자, 작성 시간, 간단 소개글 */}
        <div>
          <TitleContainerDiv>
            <div className="flex items-center">
              <TitleH3>{recipe_title}</TitleH3>
              <AuthorSpan>by {user_nickname}</AuthorSpan>
              <AuthorSpan>&nbsp;• {created_at.slice(0, 10)}</AuthorSpan>
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

        <div className="flex gap-[1rem] justify-center">
          {/* 좋아요 */}
          <RecipeUserLikes
            isLiked={isLiked}
            countText={countText}
            heartClickHandler={heartClickHandler}
          />

          {/* 스크랩 */}
          <div id="heading6">
            <RecipeScrap
              isSaved={isSaved}
              setIsSaved={setIsSaved}
              isBooked={isBooked}
              scrapClickHandler={scrapClickHandler}
            />
            {isBooked && (
              <ScrapModal
                setIsSaved={setIsSaved}
                modalCloseHandler={modalCloseHandler}
                recipe={recipe}
              />
            )}
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
            <RecipeComments comments={comments} />
          </div>
          <RecipeCommentInput recipe_id={recipe_id} />
        </div>
      </ContainerDiv>
    </>
  );
};

/** 전체 감싸는 Div */
const ContainerDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 67rem;
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

/** 삭제 컨펌 모달창 */
const StyledConfirmModal = styled(ConfirmModal)``;

/** 이미지 감싸는 Div */
const ImageWrapperDiv = styled.div`
  width: 100%;
  max-width: 65rem;
  height: 35rem;
  position: relative;
  margin-top: 3.5rem;
`;

/** 요리 주제 소개 담은 Div */
const TitleContainerDiv = styled.div`
  width: 100%;
  max-width: 65rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;
`;

/** 레시피 전체 제목 H3 */
const TitleH3 = styled.h3`
  font-weight: 600;
  font-size: 2.2rem;
  margin-right: 1rem;
`;

/** 작성자 Span */
const AuthorSpan = styled.span`
  color: #6f6f6f;
  font-size: 1.4rem;
`;

/** 요리 간단 소개 Div */
const DescriptionDiv = styled.div`
  margin-top: 1.5rem;
  max-width: 65rem;
  width: 100%;
  font-size: 1.62rem;
`;

/** 레시피 소제목 H2 */
const SubtitleH2 = styled.h2`
  font-size: 2rem;
  color: #b08038;
  font-weight: 500;
  margin-bottom: 1rem;
`;

/** 요리팁 Div */
const RecipeTipDiv = styled.div`
  font-size: 1.6rem;
`;

/** 댓글 아이콘 Div */
const CommentIconDiv = styled.div`
  margin-left: 0.7rem;
  margin-top: 0.4rem;
  margin-right: 0.4rem;
`;

/** 게시글 수정, 삭제 버튼 Div */
const WriterButtonDiv = styled.div<{ isHeaderVisible: boolean }>`
  display: flex;
  gap: 0.8rem;
  position: fixed;
  right: 14.7rem;
  top: 55.1rem;

  transform: ${(props) =>
    props.isHeaderVisible ? "translateY(0)" : "translateY(-131px)"};
  transition: transform 0.3s ease-in-out;
`;

export default RecipeDetail;
