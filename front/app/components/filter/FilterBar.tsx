import React, { useState, useEffect, useRef } from "react";
import FilterModal from "./FilterModal";
import styled from "styled-components";
import Image from "next/image";
import { SetFilter } from "../listings/ListingRecipe";

type OptionsType = {
  value: number;
  name: string;
};

type FilterBarProps = {
  setFilter: SetFilter;
};

const servings = [
  { value: 0, name: "인원" },
  { value: 1, name: "1인" },
  { value: 2, name: "2인" },
  { value: 3, name: "3인" },
  { value: 4, name: "4인" },
  { value: 5, name: "5인" },
];

const duration = [
  { value: 0, name: "시간" },
  { value: 10, name: "10분" },
  { value: 20, name: "20분" },
  { value: 30, name: "30분" },
  { value: 60, name: "1시간" },
  { value: 100, name: "1시간 이상" },
];

const difficulty = [
  { value: -1, name: "난이도" },
  { value: 0, name: "쉬움" },
  { value: 1, name: "중간" },
  { value: 2, name: "어려움" },
];

const FilterBar = (props: FilterBarProps) => {
  const { setFilter } = props;
  const [newServings, setNewServings] = useState<OptionsType>(servings[0]);
  const [newDuration, setNewDuration] = useState<OptionsType>(duration[0]);
  const [newDifficulty, setNewDifficulty] = useState<OptionsType>(
    difficulty[0]
  );
  const [isServingsModal, setIsServingsModal] = useState<boolean>(false);
  const [isDurationModal, setIsDurationModal] = useState<boolean>(false);
  const [isDifficultyModal, setIsDifficultyModal] = useState<boolean>(false);

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
