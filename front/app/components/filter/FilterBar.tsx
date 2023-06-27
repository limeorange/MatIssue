import React, { useState, useEffect } from "react";
import FilterModal from "./FilterModal";
import styled from "styled-components";
import Image from "next/image";
import { SetFilter, OptionsType } from "../listings/ListingRecipe";
import darkModeAtom from "@/app/store/darkModeAtom";
import { useRecoilState } from "recoil";

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

  // 다크모드 상태
  const [isDarkMode, setIsDarkMode] = useRecoilState(darkModeAtom);

  // 필터바 값에 따른 필터링
  useEffect(() => {
    setFilter({
      servings: newServings.value,
      duration: newDuration.value,
      difficulty: newDifficulty.value,
    });
  }, [newServings, newDuration, newDifficulty, setFilter]);

  return (
    <FilterBarLayout>
      <FilterBarItem
        onClick={() => setIsServingsModal(!isServingsModal)}
        isDarkMode={isDarkMode}
      >
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
      </FilterBarItem>
      <FilterBarLine></FilterBarLine>
      <FilterBarItem
        onClick={() => setIsDurationModal(!isDurationModal)}
        isDarkMode={isDarkMode}
      >
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
      </FilterBarItem>
      <FilterBarLine></FilterBarLine>
      <FilterBarItem
        onClick={() => setIsDifficultyModal(!isDifficultyModal)}
        isDarkMode={isDarkMode}
      >
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
      </FilterBarItem>
    </FilterBarLayout>
  );
};

export default FilterBar;

const FilterBarLayout = styled.div`
  display: flex;
  align-items: center;
  height: 4rem;
  font-size: 14px;
  margin: 0 auto;
  border: 0.1rem solid rgb(200, 200, 200);
  border-radius: 10rem;
  color: grey;

  @media (min-width: 768px) {
    width: 36rem;
    font-size: 16px;
  }
`;

const FilterBarLine = styled.div`
  width: 0;
  height: 100%;
  border-right: solid #d9d9d9 0.1rem;
`;

const FilterBarItem = styled.li<{ isDarkMode: boolean }>`
  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;
  gap: 1.2rem;
  border-bottom: ${(props) =>
    props.isDarkMode ? "0.4rem solid #212739" : "0.4rem solid #ffffff"};
  padding: 1.3rem 1.3rem 0.9rem 1.3rem;
  margin: 0 auto;
  width: 100%;

  &:hover {
    cursor: pointer;
    font-weight: 600;
  }
`;
