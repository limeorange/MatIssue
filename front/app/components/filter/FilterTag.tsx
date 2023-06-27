"use client";

import { useEffect, useState } from "react";
import { Filter } from "../listings/ListingRecipe";
import styled from "styled-components";
import darkModeAtom from "@/app/store/darkModeAtom";
import { useRecoilState } from "recoil";

type FilterTagProps = {
  search: string | null | undefined;
  filter: Filter;
  category: string | null | undefined;
  onRemove: (tagType: string) => void;
};

type TagListType = {
  tag: string;
  type: string;
};

const FilterTag = (props: FilterTagProps) => {
  const { search, filter, category, onRemove } = props;

  // 다크모드 상태
  const [isDarkMode, setIsDarkMode] = useRecoilState(darkModeAtom);

  // 필터 태그 상태 빈 배열로 설정
  const [tagList, setTagList] = useState<TagListType[]>([]);

  // 검색바 입력값 및 필터바 필터 값에 따른 태그 추가
  useEffect(() => {
    const newTagList: TagListType[] = [];

    if (search) {
      newTagList.push({ tag: `#${search}`, type: "search" });
    }

    if (category === "western") {
      newTagList.push({ tag: `#양식`, type: "category" });
    }
    if (category === "chinese") {
      newTagList.push({ tag: `#중식`, type: "category" });
    }
    if (category === "japanese") {
      newTagList.push({ tag: `#일식`, type: "category" });
    }
    if (category === "korean") {
      newTagList.push({ tag: `#한식`, type: "category" });
    }
    if (category === "best") {
      newTagList.push({ tag: `#베스트 레시피`, type: "category" });
    }
    if (category === "newest") {
      newTagList.push({ tag: `#최신 레시피`, type: "category" });
    }
    if (category === "honmuk") {
      newTagList.push({ tag: `#혼먹 레시피`, type: "category" });
    }
    if (category === "vegetarian") {
      newTagList.push({ tag: `#채식 레시피`, type: "category" });
    }
    if (filter.servings > -1) {
      newTagList.push({ tag: `#${filter.servings}인`, type: "servings" });
    }
    if (filter.duration > -1) {
      if (filter.duration === 61) {
        newTagList.push({ tag: `#1시간 이상`, type: "duration" });
      } else {
        newTagList.push({ tag: `#${filter.duration}분`, type: "duration" });
      }
    }
    if (filter.difficulty > -1) {
      if (filter.difficulty === 0) {
        newTagList.push({ tag: `#쉬움`, type: "difficulty" });
      } else if (filter.difficulty === 1) {
        newTagList.push({ tag: `#중간`, type: "difficulty" });
      } else {
        newTagList.push({ tag: `#어려움`, type: "difficulty" });
      }
    }

    setTagList(newTagList);
  }, [search, filter, category]);

  return (
    <>
      <SearchText isDarkMode={isDarkMode}>검색결과</SearchText>
      <FilterTagLayout isDarkMode={isDarkMode}>
        {tagList.map((item, index) => (
          <span key={index}>
            {item.tag}
            <RemoveButton onClick={() => onRemove(item.type)}>X</RemoveButton>
          </span>
        ))}
      </FilterTagLayout>
    </>
  );
};

export default FilterTag;

const FilterTagLayout = styled.div<{ isDarkMode: boolean }>`
  font-size: 14px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
  overflow-x: auto;
  padding-bottom: 1rem;

  & span {
    background-color: #fbe2a1;
    border-radius: 10rem;
    padding: 0.2rem 0.9rem;
    flex-shrink: 0;
    color: ${(props) =>
      props.isDarkMode ? props.theme.deepNavy : props.theme.brown};

    @media (min-width: 1024px) {
      padding: 0.5rem 1.5rem;
    }
  }

  &::-webkit-scrollbar-thumb {
    width: 10px;
    background: #217af4;

    border-radius: 10px;
  }

  @media (min-width: 768px) {
    font-size: 16px;
    gap: 1.6rem;
  }
`;

const SearchText = styled.p<{ isDarkMode: boolean }>`
  margin: 1rem auto;
  font-size: 16px;

  color: ${(props) =>
    props.isDarkMode ? props.theme.lightYellow : props.theme.brown};

  @media (min-width: 1024px) {
    margin-top: 2rem;
  }
`;

const RemoveButton = styled.button`
  margin-left: 0.5rem;
  color: #b89b6f;
  border-radius: 0.5rem;
  font-size: 13px;

  &:hover {
    color: #9f783a;
  }

  @media (max-width: 425px) {
    font-size: 15px;
  }
`;
