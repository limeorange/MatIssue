"use client";

import React, { useState, ChangeEvent } from "react";
import styled from "styled-components";
import VideoSection from "@/app/components/add-recipe/VideoSection";
import IngredientSection from "@/app/components/add-recipe/IngredientSection";
import CategoryAndInfo from "@/app/components/add-recipe/CategoryAndInfo";
import ThumbnailUpload from "@/app/components/add-recipe/ThumbnailUpload";
import CookingStepsSection from "@/app/components/add-recipe/CookingStepsSection";
import Button from "@/app/components/UI/Button";
import { axiosBase } from "@/app/api/axios";
import { updateRecipe } from "@/app/api/recipe";

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
  selectedDifficulty: number;
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
  { label: "비건", value: "vegetarian" },
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
    selectedDifficulty: recipe_info.level,
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
    setState({ ...state, selectedDifficulty: +e.target.value });
  };

  // 섬네일 이미지
  const handleThumbnailChange = (imageUrl: string) => {
    setState({ ...state, selectedImage: imageUrl });
  };

  // 레시피 제목
  const handleRecipeTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, recipeTitle: e.target.value });
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
    newIngredients[index].ingredient = e.target.value;
    setState({ ...state, ingredients: newIngredients });
  };

  // 재료의 양 변경 핸들러
  const handleQuantityChange = (
    e: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newIngredients = [...state.ingredients];
    newIngredients[index].quantity = e.target.value;
    setState({ ...state, ingredients: newIngredients });
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

  // 저장 핸들러
  const handleUpdate = async () => {
    const recipeData = {
      recipe_title: state.recipeTitle,
      recipe_thumbnail: state.selectedImage,
      recipe_video: state.videoLink,
      recipe_description: state.cookingIntro,
      recipe_category: state.selectedCategory,
      recipe_info: {
        serving: state.selectedPeople,
        time: state.selectedTime,
        level: state.selectedDifficulty,
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

    try {
      const response = await updateRecipe(recipe_id, recipeData);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  // 취소 핸들러
  const handleCancel = () => {
    // 취소
  };
  return (
    <FormWrapper>
      <Title>레시피 수정하기</Title>
      <MainSection>
        <ImageContainer>
          <ThumbnailUpload
            selectedImage={state.selectedImage}
            handleThumbnailChange={handleThumbnailChange}
          />
        </ImageContainer>
        <div>
          <CategoryAndInfo
            selectedCategory={state.selectedCategory}
            handleCategoryChange={handleCategoryChange}
            selectedPeople={state.selectedPeople.toString()}
            handlePeopleChange={handlePeopleChange}
            selectedTime={state.selectedTime.toString()}
            handleTimeChange={handleTimeChange}
            selectedDifficulty={state.selectedDifficulty.toString()}
            handleDifficultyChange={handleDifficultyChange}
            categories={categories}
            peopleCount={peopleCount}
            times={times}
            difficulties={difficulties}
          />
        </div>
      </MainSection>
      <RecipeTitle>
        <Label>레시피 제목</Label>
        <Input
          type="text"
          value={state.recipeTitle}
          onChange={handleRecipeTitleChange}
          placeholder="ex) 소고기 미역국 끓이기"
        />
      </RecipeTitle>
      <CookingIntro>
        <Label>요리 소개</Label>
        <TextArea
          value={state.cookingIntro}
          onChange={handleCookingIntroChange}
          placeholder="요리 소개를 입력해주세요."
        />
      </CookingIntro>
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
      <CookingTips>
        <TipsLabel>요리팁</TipsLabel>
        <TipsTextArea
          value={state.cookingTips}
          onChange={handleCookingTipsChange}
          placeholder="나만의 요리팁을 입력해주세요."
        />
      </CookingTips>
      <ButtonContainer>
        <SaveButton>
          <Button onClick={handleUpdate} type="button" isBgColor fullWidth>
            수정
          </Button>
        </SaveButton>
        <CancleButton>
          <Button onClick={handleCancel} type="button" isBorderColor fullWidth>
            취소
          </Button>
        </CancleButton>
      </ButtonContainer>
    </FormWrapper>
  );
};

export default UpdateRecipeForm;

// 공통 스타일 적용
const Label = styled.label`
  width: 8.8rem;
  height: 2.1rem;
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 2.1rem;
  color: #4f3d21;
  margin-right: 3rem;
  padding-top: 0.5rem;
`;

const Input = styled.input`
  box-sizing: border-box;
  width: 57.2rem;
  height: 3.6rem;
  border: 0.1rem solid #d9d9d9;
  border-radius: 1.5rem;
  padding-left: 1rem;
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 1.9rem;
  &:focus {
    border: 0.1rem solid #d9d9d9;
    outline: none;
    box-shadow: 0 0 0 0.2rem #fbd26a;
  }
`;

const TextArea = styled.textarea`
  box-sizing: border-box;
  width: 57.2rem;
  height: 10rem;
  border: 0.1rem solid #d9d9d9;
  border-radius: 1.5rem;
  padding-left: 1rem;
  padding-top: 1rem;
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 1.9rem;
  resize: none;
  ::placeholder {
    color: #a9a9a9;
  }
  &:focus {
    border: 0.1rem solid #d9d9d9;
    outline: none;
    box-shadow: 0 0 0 0.2rem #fbd26a;
  }
`;

// 전체 폼 스타일링
const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  width: 70rem;
  align-items: flex-start;
  margin: 5rem auto 0;
  // background-color: rgba(1, 1, 1, 0.2);
`;

const Title = styled.h2`
  width: 14.8rem;
  height: 2.7rem;
  font-family: "Inter";
  font-style: normal;
  font-weight: 600;
  font-size: 22px;
  line-height: 2.7rem;
  color: #4f3d21;
  margin: 0;
`;

const MainSection = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 2rem;
`;

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
  margin-right: 4.9rem;
`;

const RecipeTitle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  margin-top: 10rem;
`;

const CookingIntro = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  margin-top: 2rem;
`;

const CookingTips = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  margin-top: 4rem;
`;

const TipsLabel = styled(Label)`
  margin-right: -2rem;
`;

const TipsTextArea = styled(TextArea)`
  width: 62rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 3.4rem;
  gap: 1.8rem;
  width: 100%;
`;

const SaveButton = styled.div`
  width: 18rem;
`;

const CancleButton = styled.div`
  width: 18rem;
`;
