import React, { ChangeEvent, FunctionComponentElement } from "react";
import styled from "styled-components";
import CustomSelectBox from "@/app/components/UI/CustomSelectBox";

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
      <InfoSectionWrapper>
        <LabelWithInfoBox>
          <Label>카테고리</Label>
          <Info>
            <CustomSelectBox
              options={categories}
              selectedOption={selectedCategory}
              handleOptionChange={(selectedOption) => {
                handleCategoryChange({
                  target: {
                    value: selectedOption,
                  },
                } as ChangeEvent<HTMLSelectElement>);
              }}
              placeholder="종류"
            />
          </Info>
        </LabelWithInfoBox>
      </InfoSectionWrapper>
      <InfoSectionWrapper>
        <LabelWithInfoBox>
          <Label>요리정보</Label>
          <Info>
            <CustomSelectBox
              options={peopleCount.map((count) => ({
                label: `${count}`,
                value: `${count}`,
              }))}
              selectedOption={selectedPeople}
              handleOptionChange={(selectedOption) => {
                handlePeopleChange({
                  target: {
                    value: selectedOption,
                  },
                } as ChangeEvent<HTMLSelectElement>);
              }}
              placeholder="인원"
            />
            <CustomSelectBox
              options={times.map((time) => ({
                label: time.label,
                value: `${time.value}`,
              }))}
              selectedOption={selectedTime}
              handleOptionChange={(selectedOption) => {
                handleTimeChange({
                  target: {
                    value: selectedOption,
                  },
                } as ChangeEvent<HTMLSelectElement>);
              }}
              placeholder="시간"
            />
            <CustomSelectBox
              options={difficulties.map((difficulty) => ({
                label: difficulty,
                value: difficulty,
              }))}
              selectedOption={selectedDifficulty}
              handleOptionChange={(selectedOption) => {
                handleDifficultyChange({
                  target: {
                    value: selectedOption,
                  },
                } as ChangeEvent<HTMLSelectElement>);
              }}
              placeholder="난이도"
            />
          </Info>
        </LabelWithInfoBox>
      </InfoSectionWrapper>
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
  margin-right: 3rem;
  padding-top: 0.5rem;
  margin-left: 0.5rem;

  @media (min-width: 1024px) {
    margin-left: 0;
  }
`;

const InfoSectionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 2rem;

  @media (min-width: 1024px) {
    flex-direction: row;
  }
`;

const LabelWithInfoBox = styled.div`
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
