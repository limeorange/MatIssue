"use client";

import React, { useState, ChangeEvent } from "react";
import styled from "styled-components";
import VideoSection from "../../components/add-recipe/VideoSection";
import IngredientSection from "../../components/add-recipe/IngredientSection";
import CategoryAndInfo from "../../components/add-recipe/CategoryAndInfo";
import ThumbnailUpload from "../../components/add-recipe/ThumbnailUpload";
import CookingStepsSection from "../../components/add-recipe/CookingStepsSection";

const categories = ["한식", "중식", "일식", "양식"];
const peopleCount = [1, 2, 3, 4, 5];
const times = ["15분 이내", "30분 이내", "1시간 이내", "1시간 이상"];
const difficulties = ["상", "중", "하"];

const RecipeForm = () => {
  const [selectedCategory, setCategory] = useState("");
  const [selectedPeople, setPeople] = useState("");
  const [selectedTime, setTime] = useState("");
  const [selectedDifficulty, setDifficulty] = useState("");
  const [selectedImage, setSelectedImage] = useState("");
  const [recipeTitle, setRecipeTitle] = useState("");
  const [cookingIntro, setCookingIntro] = useState("");
  const [ingredient, setIngredient] = useState("");
  const [quantity, setQuantity] = useState("");
  const [ingredients, setIngredients] = useState([
    { ingredient: "", quantity: "" },
  ]);
  const [steps, setSteps] = useState([{ stepDetail: "", stepImage: "" }]);
  const [stepImages, setStepImages] = useState<string[]>([]);

  // 종류
  const handleCategoryChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value);
  };

  // 몇인분인지
  const handlePeopleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setPeople(e.target.value);
  };

  // 시간
  const handleTimeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setTime(e.target.value);
  };

  // 난이도
  const handleDifficultyChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setDifficulty(e.target.value);
  };

  // 섬네일 이미지
  const handleThumbnailChange = (imageUrl: string) => {
    setSelectedImage(imageUrl);
  };

  // 레시피 제목
  const handleRecipeTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setRecipeTitle(e.target.value);
  };

  // 요리 소개
  const handleCookingIntroChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setCookingIntro(e.target.value);
  };

  // 재료 변경 핸들러
  const handleIngredientChange = (
    e: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newIngredients = [...ingredients];
    newIngredients[index].ingredient = e.target.value;
    setIngredients(newIngredients);
  };

  // 재료의 양 변경 핸들러
  const handleQuantityChange = (
    e: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newIngredients = [...ingredients];
    newIngredients[index].quantity = e.target.value;
    setIngredients(newIngredients);
  };

  // 재료와 양 추가 핸들러
  const handleAddIngredient = () => {
    setIngredients([...ingredients, { ingredient: "", quantity: "" }]);
  };

  // 재료 삭제 핸들러
  const handleRemoveIngredient = (index: number) => {
    if (ingredients.length > 1) {
      const newIngredients = [...ingredients];
      newIngredients.splice(index, 1);
      setIngredients(newIngredients);
    }
  };

  // 스텝에 이미지 넣기 핸들러
  const handleStepImageChange = (
    e: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const file = e.target.files![0];
    const reader = new FileReader();

    reader.onloadend = () => {
      const newStepImages = [...stepImages];
      newStepImages[index] = reader.result as string;
      setStepImages(newStepImages);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  // 스텝 내용 변경 핸들러
  const handleStepDetailChange = (
    e: ChangeEvent<HTMLTextAreaElement>,
    index: number
  ) => {
    const newSteps = [...steps];
    newSteps[index].stepDetail = e.target.value;
    setSteps(newSteps);
  };

  // 스텝 추가 핸들러
  const handleAddStep = () => {
    setSteps([...steps, { stepDetail: "", stepImage: "" }]);
  };

  // 스텝 제거 핸들러
  const handleRemoveStep = (index: number) => {
    if (steps.length > 1) {
      const newSteps = [...steps];
      newSteps.splice(index, 1);
      setSteps(newSteps);

      const newStepImages = [...stepImages];
      newStepImages.splice(index, 1);
      setStepImages(newStepImages);
    }
  };

  return (
    <FormWrapper>
      <Title>레시피 등록하기</Title>
      <MainSection>
        <ImageContainer>
          <ThumbnailUpload
            selectedImage={selectedImage}
            handleThumbnailChange={handleThumbnailChange}
          />
        </ImageContainer>
        <div>
          <CategoryAndInfo
            selectedCategory={selectedCategory}
            handleCategoryChange={handleCategoryChange}
            selectedPeople={selectedPeople}
            handlePeopleChange={handlePeopleChange}
            selectedTime={selectedTime}
            handleTimeChange={handleTimeChange}
            selectedDifficulty={selectedDifficulty}
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
          value={recipeTitle}
          onChange={handleRecipeTitleChange}
          placeholder="ex) 소고기 미역국 끓이기"
        />
      </RecipeTitle>
      <CookingIntro>
        <Label>요리 소개</Label>
        <TextArea
          value={cookingIntro}
          onChange={handleCookingIntroChange}
          placeholder="요리 소개를 입력해주세요."
        />
      </CookingIntro>
      <VideoSection />
      <IngredientSection
        ingredients={ingredients}
        handleIngredientChange={handleIngredientChange}
        handleQuantityChange={handleQuantityChange}
        handleAddIngredient={handleAddIngredient}
        handleRemoveIngredient={handleRemoveIngredient}
      />
      <CookingStepsSection
        steps={steps}
        stepImages={stepImages}
        handleStepDetailChange={handleStepDetailChange}
        handleStepImageChange={handleStepImageChange}
        handleAddStep={handleAddStep}
        handleRemoveStep={handleRemoveStep}
      />
    </FormWrapper>
  );
};

export default RecipeForm;

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
  ::placeholder {
    color: #a9a9a9;
  }
`;

// 전체 폼 스타일링
const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  width: 70rem;
  align-items: flex-start;
  margin: 5rem auto 0;
  background-color: rgba(1, 1, 1, 0.2);
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
