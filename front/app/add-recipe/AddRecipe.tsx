"use client";

import React, { useState, useRef, ChangeEvent } from "react";
import styled from "styled-components";
import ThumbnailUpload from "../components/add-recipe/ThumbnailUpload";

const categories = ["한식", "중식", "일식", "양식"];
const peopleCount = [1, 2, 3, 4, 5];
const times = ["15분 이내", "30분 이내", "1시간 이내", "1시간 이상"];
const difficulties = ["상", "중", "하"];

const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  width: 700px;
  align-items: flex-start;
  background-color: rgba(1, 1, 1, 0.2);
`;

const StyledMainSection = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 20px;
`;

const StyledTitle = styled.h2`
  width: 148px;
  height: 27px;
  font-family: "Inter";
  font-style: normal;
  font-weight: 600;
  font-size: 22px;
  line-height: 27px;
  color: #4f3d21;
  margin: 0;
`;

const StyledLabel = styled.label`
  width: 88px;
  height: 21px;
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 21px;
  color: #4f3d21;
  margin-right: 30px;
`;

const StyledSelect = styled.select`
  box-sizing: border-box;
  width: 135px;
  height: 36px;
  border: 1px solid #d9d9d9;
  border-radius: 50px;
  margin: 5px 0;
`;

const StyledImageContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  margin-right: 49px;
`;

const StyledCategory = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
`;

const StyledInfoSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 20px;
`;

const StyledLabelWithInfo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
`;

const StyledInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const RecipeForm = () => {
  const [selectedCategory, setCategory] = useState<string>("");
  const [selectedPeople, setPeople] = useState<string>("");
  const [selectedTime, setTime] = useState<string>("");
  const [selectedDifficulty, setDifficulty] = useState<string>("");
  const [selectedImage, setSelectedImage] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleCategoryChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value);
  };

  const handlePeopleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setPeople(e.target.value);
  };

  const handleTimeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setTime(e.target.value);
  };

  const handleDifficultyChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setDifficulty(e.target.value);
  };

  const handleThumbnailChange = (imageUrl: string) => {
    setSelectedImage(imageUrl);
  };

  return (
    <FormWrapper>
      <StyledTitle>레시피 등록하기</StyledTitle>
      <StyledMainSection>
        <StyledImageContainer>
          <ThumbnailUpload onThumbnailChange={handleThumbnailChange} />
        </StyledImageContainer>
        <div>
          <StyledCategory>
            <StyledLabel>카테고리</StyledLabel>
            <StyledSelect
              value={selectedCategory}
              onChange={handleCategoryChange}
            >
              <option value="" disabled hidden>
                종류
              </option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </StyledSelect>
          </StyledCategory>
          <StyledInfoSection>
            <StyledLabelWithInfo>
              <StyledLabel>요리정보</StyledLabel>
              <StyledInfo>
                <StyledSelect
                  value={selectedPeople}
                  onChange={handlePeopleChange}
                >
                  <option value="" disabled hidden>
                    인원
                  </option>
                  {peopleCount.map((count) => (
                    <option key={count} value={count}>
                      {count}
                    </option>
                  ))}
                </StyledSelect>
                <StyledSelect value={selectedTime} onChange={handleTimeChange}>
                  <option value="" disabled hidden>
                    시간
                  </option>
                  {times.map((time) => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))}
                </StyledSelect>
                <StyledSelect
                  value={selectedDifficulty}
                  onChange={handleDifficultyChange}
                >
                  <option value="" disabled hidden>
                    난이도
                  </option>
                  {difficulties.map((difficulty) => (
                    <option key={difficulty} value={difficulty}>
                      {difficulty}
                    </option>
                  ))}
                </StyledSelect>
              </StyledInfo>
            </StyledLabelWithInfo>
          </StyledInfoSection>
        </div>
      </StyledMainSection>
    </FormWrapper>
  );
};

export default RecipeForm;
