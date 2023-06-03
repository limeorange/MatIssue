import React, { useState, useEffect } from "react";
import FilterModal from "./FilterModal";
import styled from "styled-components";
import Image from "next/image";
import { SetFilter, OptionsType } from "../listings/ListingRecipe";

type FilterBarProps = {
  setFilter: SetFilter;
  removeTag: (tagType: string) => void;
  newServings: OptionsType;
  setNewServings: React.Dispatch<React.SetStateAction<OptionsType>>;
  newDuration: OptionsType;
  setNewDuration: React.Dispatch<React.SetStateAction<OptionsType>>;
  newDifficulty: OptionsType;
  setNewDifficulty: React.Dispatch<React.SetStateAction<OptionsType>>;
  servings: OptionsType[];
  duration: OptionsType[];
  difficulty: OptionsType[];
};

const FilterBar = (props: FilterBarProps) => {
  const {
    setFilter,
    removeTag,
    newServings,
    setNewServings,
    newDuration,
    setNewDuration,
    newDifficulty,
    setNewDifficulty,
    servings,
    duration,
    difficulty,
  } = props;
  const [isServingsModal, setIsServingsModal] = useState<boolean>(false); // 인원수 필터링 모달창
  const [isDurationModal, setIsDurationModal] = useState<boolean>(false); // 조리 시간 필터링 모달창
  const [isDifficultyModal, setIsDifficultyModal] = useState<boolean>(false); // 난이도 필터링 모달창

  // 필터바 값에 따른 필터링
  useEffect(() => {
    setFilter({
      servings: newServings.value,
      duration: newDuration.value,
      difficulty: newDifficulty.value,
    });
  }, [newServings, newDuration, newDifficulty, setFilter]);

  return (
    <FilterContainer>
      <FilterBarLi onClick={() => setIsServingsModal(!isServingsModal)}>
        {isServingsModal && (
          <FilterModal
            options={servings}
            setState={setNewServings}
            onClose={() => setIsServingsModal(false)}
          />
        )}
        <div>
          <Image
            src="/images/filterBarIcon.png"
            alt="filterBarIcon"
            width={14}
            height={12}
          />
        </div>
        {newServings.name}
      </FilterBarLi>
      <FilterBarLine></FilterBarLine>
      <FilterBarLi onClick={() => setIsDurationModal(!isDurationModal)}>
        {isDurationModal && (
          <FilterModal
            options={duration}
            setState={setNewDuration}
            onClose={() => setIsDurationModal(false)}
          />
        )}
        <div>
          <Image
            src="/images/filterBarIcon.png"
            alt="filterBarIcon"
            width={14}
            height={12}
          />
        </div>
        {newDuration.name}
      </FilterBarLi>
      <FilterBarLine></FilterBarLine>
      <FilterBarLi onClick={() => setIsDifficultyModal(!isDifficultyModal)}>
        {isDifficultyModal && (
          <FilterModal
            options={difficulty}
            setState={setNewDifficulty}
            onClose={() => setIsDifficultyModal(false)}
          />
        )}
        <div>
          <Image
            src="/images/filterBarIcon.png"
            alt="filterBarIcon"
            width={14}
            height={12}
          />
        </div>
        {newDifficulty.name}
      </FilterBarLi>
    </FilterContainer>
  );
};

const FilterContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.8rem 1.6rem;
  width: 30rem;
  height: 4rem;
  color: #ababab;
  border: 0.1rem solid rgb(200, 200, 200);
  border-radius: 10rem;
  font-size: 15px;
`;

const FilterBarLine = styled.div`
  width: 0;
  height: 3rem;
  border-right: solid #d9d9d9 0.1rem;
`;

const FilterBarLi = styled.li`
  display: flex;
  position: relative;
  align-items: center;
  gap: 0.8rem;
  border-bottom: 0.4rem solid #ffffff;
  padding: 1.3rem 1.3rem 0.9rem 1.3rem;
  margin: 0 auto;
  width: 100%;

  &:hover {
    cursor: pointer;
    font-weight: 600;
  }
`;

export default FilterBar;
