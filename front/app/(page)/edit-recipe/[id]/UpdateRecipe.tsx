"use client";

import React, { useState, ChangeEvent, useEffect } from "react";
import { useRouter } from "next/navigation";
import styled from "styled-components";
import VideoSection from "@/app/components/add-recipe/VideoSection";
import IngredientSection from "@/app/components/add-recipe/IngredientSection";
import CategoryAndInfo from "@/app/components/add-recipe/CategoryAndInfo";
import ThumbnailUpload from "@/app/components/add-recipe/ThumbnailUpload";
import CookingStepsSection from "@/app/components/add-recipe/CookingStepsSection";
import Button from "@/app/components/UI/Button";
import { updateRecipe } from "@/app/api/recipe";
import { toast } from "react-hot-toast";
import LoadingModal from "@/app/components/UI/LoadingModal";
import ConfirmModal from "@/app/components/UI/ConfirmModal";
import { useRecoilState } from "recoil";
import darkModeAtom from "@/app/store/darkModeAtom";

type Recipe = {
  recipe_category: string;
  recipe_people: string;
  recipe_info: { time: number; level: number; serving: number };
  recipe_thumbnail: string;
  recipe_title: string;
  recipe_description: string;
  recipe_ingredients: { name: string; amount: string }[];
  recipe_sequence: { description: string; picture: string; step: number }[];
  recipe_tip: string;
  recipe_video: string;
  recipe_id: string;
};

type RecipeFormState = {
  selectedCategory: string;
  selectedPeople: number;
  selectedTime: number;
  selectedDifficulty: string;
  selectedImage: string;
  recipeTitle: string;
  cookingIntro: string;
  ingredients: { ingredient: string; quantity: string }[];
  steps: { step: number; stepDetail: string; stepImage: string }[];
  stepImages: string[];
  cookingTips: string;
  videoLink: string;
};

const categories = [
  { label: "한식", value: "korean" },
  { label: "중식", value: "chinese" },
  { label: "일식", value: "japanese" },
  { label: "양식", value: "western" },
  { label: "채식", value: "vegetarian" },
  { label: "기타", value: "other" },
];
const peopleCount = [1, 2, 3, 4, 5];
const times = [
  { label: "10분 이내", value: 10 },
  { label: "20분 이내", value: 20 },
  { label: "30분 이내", value: 30 },
  { label: "1시간 이내", value: 60 },
  { label: "1시간 이상", value: 61 },
];

const difficulties = ["쉬움", "중간", "어려움"];

const UpdateRecipeForm = ({ recipe }: { recipe: Recipe }) => {
  const router = useRouter();
  const {
    recipe_category,
    recipe_info,
    recipe_thumbnail,
    recipe_title,
    recipe_description,
    recipe_ingredients,
    recipe_sequence,
    recipe_tip,
    recipe_video,
    recipe_id,
  } = recipe;
  const [state, setState] = useState<RecipeFormState>({
    selectedCategory: recipe_category,
    selectedPeople: recipe_info.serving,
    selectedTime: recipe_info.time,
    selectedDifficulty: difficulties[recipe_info.level],
    selectedImage: recipe_thumbnail,
    recipeTitle: recipe_title,
    cookingIntro: recipe_description,
    ingredients: recipe_ingredients.map((x) => ({
      ingredient: x.name,
      quantity: x.amount,
    })),
    steps: recipe_sequence.map((x) => ({
      step: x.step,
      stepDetail: x.description,
      stepImage: x.picture,
    })),
    stepImages: recipe_sequence.map((x) => x.picture),
    cookingTips: recipe_tip,
    videoLink: recipe_video,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isDarkMode, setIsDarkMode] = useRecoilState(darkModeAtom);

  // 종류
  const handleCategoryChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setState({ ...state, selectedCategory: e.target.value });
  };

  // 몇인분인지
  const handlePeopleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setState({ ...state, selectedPeople: +e.target.value });
  };

  // 시간
  const handleTimeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setState({ ...state, selectedTime: +e.target.value });
  };

  // 난이도
  const handleDifficultyChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setState({ ...state, selectedDifficulty: e.target.value });
  };

  // 섬네일 이미지
  const handleThumbnailChange = (imageUrl: string) => {
    setState({ ...state, selectedImage: imageUrl });
  };

  // 레시피 제목
  const handleRecipeTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > 23) {
      toast.error("레시피 제목은 23자까지만 입력 가능합니다.");
    } else {
      setState({ ...state, recipeTitle: e.target.value });
    }
  };

  // 요리 소개
  const handleCookingIntroChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setState({ ...state, cookingIntro: e.target.value });
  };

  // 유튜브 동영상 핸들러
  const handleVideoLinkChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setState({ ...state, videoLink: e.target.value });
  };

  // 재료 변경 핸들러
  const handleIngredientChange = (
    e: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newIngredients = [...state.ingredients];
    const ingredientName = e.target.value.slice(0, 12); // 12자로 제한

    if (e.target.value.length > 12) {
      toast.error("재료명은 최대 12자까지 입력 가능합니다.");
    } else {
      newIngredients[index].ingredient = ingredientName;
      setState({ ...state, ingredients: newIngredients });
    }
  };

  // 재료의 양 변경 핸들러
  const handleQuantityChange = (
    e: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newIngredients = [...state.ingredients];
    const ingredientQuantity = e.target.value.slice(0, 7); // 7자로 제한

    if (e.target.value.length > 7) {
      toast.error("재료의 양은 최대 7자까지 입력 가능합니다.");
    } else {
      newIngredients[index].quantity = ingredientQuantity;
      setState({ ...state, ingredients: newIngredients });
    }
  };

  // 재료와 양 추가 핸들러
  const handleAddIngredient = () => {
    setState({
      ...state,
      ingredients: [...state.ingredients, { ingredient: "", quantity: "" }],
    });
  };

  // 재료 삭제 핸들러
  const handleRemoveIngredient = (index: number) => {
    if (state.ingredients.length > 1) {
      const newIngredients = [...state.ingredients];
      newIngredients.splice(index, 1);
      setState({ ...state, ingredients: newIngredients });
    }
  };

  // 스텝에 이미지 넣기 핸들러
  const handleStepImageChange = (imageUrl: string, index: number) => {
    const newStepImages = [...state.stepImages];
    newStepImages[index] = imageUrl;
    setState({ ...state, stepImages: newStepImages });
  };

  // 스텝 내용 변경 핸들러
  const handleStepDetailChange = (
    e: ChangeEvent<HTMLTextAreaElement>,
    index: number
  ) => {
    const newSteps = [...state.steps];
    newSteps[index].stepDetail = e.target.value;
    setState({ ...state, steps: newSteps });
  };

  // 스텝 추가 핸들러
  const handleAddStep = () => {
    setState({
      ...state,
      steps: [...state.steps, { step: 0, stepDetail: "", stepImage: "" }],
    });
  };

  // 스텝 제거 핸들러
  const handleRemoveStep = (index: number) => {
    if (state.steps.length > 1) {
      const newSteps = [...state.steps];
      newSteps.splice(index, 1);

      const newStepImages = [...state.stepImages];
      newStepImages.splice(index, 1);

      setState({ ...state, steps: newSteps, stepImages: newStepImages });
    }
  };

  // 요리팁 변경 핸들러
  const handleCookingTipsChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setState({ ...state, cookingTips: e.target.value });
  };

  // 유효성 검사
  const validateForm = () => {
    // 카테고리 검사
    if (state.selectedCategory === "") {
      toast.error("카테고리를 선택해주세요.");
      return false;
    }

    // 섬네일 이미지 검사
    if (state.selectedImage === "") {
      toast.error("섬네일 이미지를 선택해주세요.");
      return false;
    }

    // 레시피 제목 검사
    if (state.recipeTitle === "") {
      toast.error("레시피 제목을 입력해주세요.");
      return false;
    }

    // 요리 소개 검사
    if (state.cookingIntro === "") {
      toast.error("요리 소개를 입력해주세요.");
      return false;
    }

    // 재료 유효성 검사
    const hasEmptyIngredient = state.ingredients.some(
      (ingredient) => ingredient.ingredient === ""
    );
    if (hasEmptyIngredient) {
      toast.error("재료를 입력해주세요.");
      return false;
    }

    // 양 유효성 검사
    const hasEmptyQuantity = state.ingredients.some(
      (ingredient) => ingredient.quantity === ""
    );
    if (hasEmptyQuantity) {
      toast.error("재료의 양을 입력해주세요.");
      return false;
    }

    // 요리 과정 유효성 검사
    const hasEmptyStepDetail = state.steps.some(
      (step) => step.stepDetail === ""
    );
    if (hasEmptyStepDetail) {
      toast.error("요리 과정을 입력해주세요.");
      return false;
    }

    // 요리 과정 사진 유효성 검사
    const hasEmptyStepImage = state.stepImages.length === 0;

    if (hasEmptyStepImage) {
      toast.error("요리 과정의 이미지를 추가해주세요.");
      return false;
    }

    // 요리 팁 검사
    if (state.cookingTips === "") {
      toast.error("요리 팁을 입력해주세요.");
      return false;
    }

    return true;
  };

  // 저장 핸들러
  const handleUpdate = async () => {
    const recipeData = {
      recipe_title: state.recipeTitle,
      recipe_thumbnail: state.selectedImage,
      recipe_video: state.videoLink
        ? state.videoLink
        : "https://www.youtube.com/watch?v=JVQaQBsCbrE",
      recipe_description: state.cookingIntro,
      recipe_category: state.selectedCategory,
      recipe_info: {
        serving: state.selectedPeople,
        time: state.selectedTime,
        level: difficulties.indexOf(state.selectedDifficulty),
      },
      recipe_ingredients: state.ingredients.map(({ ingredient, quantity }) => ({
        name: ingredient,
        amount: quantity,
      })),
      recipe_sequence: state.steps.map(({ stepDetail, stepImage }, index) => ({
        step: index + 1,
        picture: state.stepImages[index],
        description: stepDetail,
      })),
      recipe_tip: state.cookingTips,
    };

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    updateRecipe(recipe_id, recipeData)
      .then((res) => {
        toast.success("레시피가 수정되었습니다!");
        router.push(`/recipe/${recipe_id}`);
      })
      .catch((err) => {
        toast.error(err.response.data.detail);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  // 취소 핸들러
  const handleCancel = () => {
    setShowConfirmModal(true);
  };

  // 취소 모달 확인 핸들러
  const handleConfirm = () => {
    router.back();
  };

  useEffect(() => {
    // 새로고침 막기
    window.onbeforeunload = function () {
      return true;
    };
    return () => {
      window.onbeforeunload = null;
    };
  }, []);

  return (
    <FormLayout>
      {isLoading && <LoadingModal />}
      <Title isDarkMode={isDarkMode}>레시피 수정하기</Title>
      <ThumbnailAndCategoryAndInfoContainer>
        <ImageWrapper>
          <ThumbnailUpload
            selectedImage={state.selectedImage}
            handleThumbnailChange={handleThumbnailChange}
          />
        </ImageWrapper>
        <CategoryAndInfo
          selectedCategory={state.selectedCategory}
          handleCategoryChange={handleCategoryChange}
          selectedPeople={state.selectedPeople.toString()}
          handlePeopleChange={handlePeopleChange}
          selectedTime={state.selectedTime.toString()}
          handleTimeChange={handleTimeChange}
          selectedDifficulty={state.selectedDifficulty}
          handleDifficultyChange={handleDifficultyChange}
          categories={categories}
          peopleCount={peopleCount}
          times={times}
          difficulties={difficulties}
        />
      </ThumbnailAndCategoryAndInfoContainer>
      <RecipeTitleWrapper>
        <Label>레시피 제목</Label>
        <Input
          type="text"
          value={state.recipeTitle}
          onChange={handleRecipeTitleChange}
          placeholder="ex) 소고기 미역국 끓이기"
        />
      </RecipeTitleWrapper>
      <CookingIntroWrapper>
        <Label>요리 소개</Label>
        <TextArea
          value={state.cookingIntro}
          onChange={handleCookingIntroChange}
          placeholder="요리 소개를 입력해주세요."
        />
      </CookingIntroWrapper>
      <VideoSection
        videoLink={state.videoLink}
        handleVideoLinkChange={handleVideoLinkChange}
      />

      <IngredientSection
        ingredients={state.ingredients}
        handleIngredientChange={handleIngredientChange}
        handleQuantityChange={handleQuantityChange}
        handleAddIngredient={handleAddIngredient}
        handleRemoveIngredient={handleRemoveIngredient}
      />
      <CookingStepsSection
        steps={state.steps}
        stepImages={state.stepImages}
        handleStepDetailChange={handleStepDetailChange}
        handleStepImageChange={handleStepImageChange}
        handleAddStep={handleAddStep}
        handleRemoveStep={handleRemoveStep}
      />
      <CookingTipsWrapper>
        <TipsLabel>요리팁</TipsLabel>
        <TipsTextArea
          value={state.cookingTips}
          onChange={handleCookingTipsChange}
          placeholder="나만의 요리팁을 입력해주세요."
        />
      </CookingTipsWrapper>
      <ButtonContainer>
        <SaveButtonWrapper>
          <Button
            onClick={handleUpdate}
            type="button"
            isBgColor
            fullWidth
            disabled={isLoading}
          >
            {isLoading ? "수정 중..." : "수정"}
          </Button>
        </SaveButtonWrapper>
        <CancleButtonWrapper>
          <Button
            onClick={handleCancel}
            type="button"
            isBorderColor
            fullWidth
            disabled={isLoading}
          >
            취소
          </Button>
        </CancleButtonWrapper>
      </ButtonContainer>
      {showConfirmModal && (
        <ConfirmModal
          message="레시피를 수정을 취소하시겠습니까?"
          onCancel={() => setShowConfirmModal(false)}
          onConfirm={handleConfirm}
        />
      )}
    </FormLayout>
  );
};

export default UpdateRecipeForm;

// 공통 스타일 적용
const Label = styled.label`
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 2.1rem;
  margin-right: 3rem;
  padding-top: 0.5rem;

  margin-bottom: 1rem;

  @media (min-width: 1024px) {
    width: 9.8rem;
    height: 2.1rem;
  }
`;

const Input = styled.input`
  box-sizing: border-box;
  width: 100%;
  height: 3.6rem;

  border-radius: 1.5rem;
  padding-left: 1rem;
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 1.9rem;

  @media (min-width: 1024px) {
    width: 57.2rem;
  }
`;

const TextArea = styled.textarea`
  box-sizing: border-box;
  width: 100%;
  height: 10rem;

  border-radius: 1.5rem;
  padding: 1rem;
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 1.9rem;
  resize: none;

  ::placeholder {
    color: #a9a9a9;
  }

  @media (min-width: 1024px) {
    width: 57.2rem;
  }
`;

// 전체 폼 스타일링
const FormLayout = styled.form`
  width: 100%;
  padding: 1.5rem;
  margin-bottom: 2rem;

  @media (min-width: 1024px) {
    width: 70rem;
    // display: flex;
    // flex-direction: column;
    // align-items: flex-start;
    margin: 5rem auto 0;
    margin-bottom: 16rem;

    padding: 0;
  }
`;

const Title = styled.h2<{ isDarkMode: boolean }>`
  width: 16.8rem;
  height: 2.7rem;
  font-family: "Inter";
  font-style: normal;
  font-weight: 600;
  font-size: 22px;
  line-height: 2.7rem;
  color: ${(props) => (props.isDarkMode ? "#fff" : "#333")};
  margin: 0;
`;

const ThumbnailAndCategoryAndInfoContainer = styled.div`
  flex-direction: column;

  @media (min-width: 1024px) {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 2rem;
  }
`;

const ImageWrapper = styled.div`
  display: flex;
  justify-content: flex-start;

  @media (min-width: 1024px) {
    justify-content: center;
    margin-top: 2rem;
    margin-right: 4.9rem;
  }
`;

const RecipeTitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 4rem;

  @media (min-width: 1024px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    margin-top: 10rem;
  }
`;

const CookingIntroWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 2rem;

  @media (min-width: 1024px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
  }
`;

const CookingTipsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  margin-top: 4rem;

  @media (min-width: 1024px) {
    flex-direction: row;
  }
`;

const TipsLabel = styled(Label)`
  margin-right: -2rem;
`;

const TipsTextArea = styled(TextArea)`
  width: 100%;

  @media (min-width: 1024px) {
    width: 62rem;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 3.4rem;
  gap: 1.8rem;
  width: 100%;
`;

const SaveButtonWrapper = styled.div`
  width: 18rem;
`;

const CancleButtonWrapper = styled.div`
  width: 18rem;
`;
