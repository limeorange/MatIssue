import React, { ChangeEvent } from "react";
import styled from "styled-components";

const StyledInfoSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 20px;
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

interface CookingInfoSectionProps {
  selectedPeople: string;
  selectedTime: string;
  selectedDifficulty: string;
  handlePeopleChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  handleTimeChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  handleDifficultyChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  peopleCount: number[];
  times: string[];
  difficulties: string[];
}

const CookingInfoSection: React.FC<CookingInfoSectionProps> = ({
  selectedPeople,
  selectedTime,
  selectedDifficulty,
  handlePeopleChange,
  handleTimeChange,
  handleDifficultyChange,
  peopleCount,
  times,
  difficulties,
}) => {
  return (
    <StyledInfoSection>
      <StyledLabel>요리정보</StyledLabel>
      <div>
        <StyledSelect value={selectedPeople} onChange={handlePeopleChange}>
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
      </div>
    </StyledInfoSection>
  );
};

export default CookingInfoSection;
