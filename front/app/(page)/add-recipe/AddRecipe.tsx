"use client";

import React, { useState, ChangeEvent } from "react";
import styled from "styled-components";
import VideoSection from "../../components/add-recipe/VideoSection";
import IngredientSection from "../../components/add-recipe/IngredientSection";
import CategoryAndInfo from "../../components/add-recipe/CategoryAndInfo";
import ThumbnailUpload from "../../components/add-recipe/ThumbnailUpload";

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
    const newIngredients = [...ingredients];
    newIngredients.splice(index, 1);
    setIngredients(newIngredients);
  };

  const handleStepDetailChange = (
    e: ChangeEvent<HTMLTextAreaElement>,
    index: number
  ) => {
    const newSteps = [...steps];
    newSteps[index].stepDetail = e.target.value;
    setSteps(newSteps);
  };

  const handleAddStep = () => {
    setSteps([...steps, { stepDetail: "", stepImage: "" }]);
  };

  const handleRemoveStep = (index: number) => {
    if (steps.length > 1) {
      const newSteps = [...steps];
      newSteps.splice(index, 1);
      setSteps(newSteps);
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
      <CookingStep>
        <Label>요리 순서</Label>
        {steps.map((step, index) => (
          <div key={index}>
            <StepWrapper>
              <StepLabel>Step {index + 1}</StepLabel>
              <StepTextArea
                value={step.stepDetail}
                onChange={(e) => handleStepDetailChange(e, index)}
                placeholder="단계별 요리 방법을 입력해주세요."
              />
              <ImageUploadBox>
                {/* Add the image upload component here and handle onChange using handleStepImageChange */}
              </ImageUploadBox>
              {steps.length !== 1 && (
                <RemoveStepButton
                  type="button"
                  onClick={() => handleRemoveStep(index)}
                ></RemoveStepButton>
              )}
            </StepWrapper>
          </div>
        ))}
        <AddStepButton type="button" onClick={handleAddStep}>
          + 순서 추가하기
        </AddStepButton>
      </CookingStep>
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

const CookingStep = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  margin-top: 2rem;
`;

const StepLabel = styled(Label)`
  margin-bottom: 1rem;
  align-self: flex-start;
  margin-right: -2rem;
`;

const ImageUploadBox = styled.div`
  width: 19.9rem;
  height: 16rem;
  background: #f7f5f5;
  border-radius: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 2rem;
`;

const StepWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  align-items: center;
  margin-top: 2rem;
`;

const StepTextArea = styled(TextArea)`
  width: 35.6rem;
  height: 16rem;
`;

const AddStepButton = styled.button`
  font-family: "Pretendard", sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 2.8rem;
  color: #4f3d21;
  border: none;
  cursor: pointer;
  background: transparent;
  align-self: center;
  padding-left: 3.5rem;
  margin-top: 1.4rem;
`;

const RemoveStepButton = styled.button`
  width: 2.5rem;
  height: 2.5rem;
  border: none;
  margin-left: 1.4rem;
  margin-top: 0.6rem;
  cursor: pointer;
  background: url("/images/deleteIcon.png") no-repeat center;
  background-size: contain;
`;
