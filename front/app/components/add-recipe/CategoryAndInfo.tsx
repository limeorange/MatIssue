// CategoryAndInfo.tsx
import React, { ChangeEvent, FunctionComponentElement } from "react";
import styled from "styled-components";

type Props = {
  selectedCategory: string;
  handleCategoryChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  selectedPeople: string;
  handlePeopleChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  selectedTime: string;
  handleTimeChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  selectedDifficulty: string;
  handleDifficultyChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  categories: { label: string; value: string }[];
  peopleCount: number[];
  times: { label: string; value: number }[];
  difficulties: string[];
};

const CategoryAndInfo = ({
  selectedCategory,
  handleCategoryChange,
  selectedPeople,
  handlePeopleChange,
  selectedTime,
  handleTimeChange,
  selectedDifficulty,
  handleDifficultyChange,
  categories,
  peopleCount,
  times,
  difficulties,
}: Props): FunctionComponentElement<Props> => {
  return (
    <InfoSectionContainer>
      <InfoSection>
        <LabelWithInfo>
          <Label>카테고리</Label>
          <Info>
            <Select value={selectedCategory} onChange={handleCategoryChange}>
              <option value="" disabled hidden>
                종류
              </option>
              {categories.map((category) => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </Select>
          </Info>
        </LabelWithInfo>
      </InfoSection>
      <InfoSection>
        <LabelWithInfo>
          <Label>요리정보</Label>
          <Info>
            <Select value={selectedPeople} onChange={handlePeopleChange}>
              <option value="" disabled hidden>
                인원
              </option>
              {peopleCount.map((count) => (
                <option key={count} value={count}>
                  {count}
                </option>
              ))}
            </Select>
            <Select value={selectedTime} onChange={handleTimeChange}>
              <option value="" disabled hidden>
                시간
              </option>
              {times.map((time) => (
                <option key={time.value} value={time.value}>
                  {time.label}
                </option>
              ))}
            </Select>
            <Select
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
            </Select>
          </Info>
        </LabelWithInfo>
      </InfoSection>
    </InfoSectionContainer>
  );
};

export default CategoryAndInfo;

const InfoSectionContainer = styled.div`
  display: flex;
  justify-content: space-between;

  @media (min-width: 1024px) {
    flex-direction: column;
  }
`;

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
  margin-left: 0.5rem;

  @media (min-width: 1024px) {
    margin-left: 0;
  }
`;

const Select = styled.select`
  box-sizing: border-box;
  width: 12.5rem;
  height: 3.6rem;
  border: 0.1rem solid #d9d9d9;
  border-radius: 5rem;
  padding-left: 1rem;
  margin: 0.5rem 0;
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 1.9rem;
  appearance: none;
  background: #ffffff url("/images/listIcon.png") no-repeat;
  background-position: right 1rem center;
  -webkit-appearance: none; /* for chrome /
  -moz-appearance:none; /for firefox*/
  &:focus {
    border: 0.1rem solid #fbd26a;
    outline: none;
    box-shadow: 0 0 0 0.2rem #fbd26a;
  }

  @media (min-width: 1024px) {
  }
`;

const InfoSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 2rem;

  @media (min-width: 1024px) {
    flex-direction: row;
  }
`;

const LabelWithInfo = styled.div`
  @media (min-width: 1024px) {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
  }
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
`;
