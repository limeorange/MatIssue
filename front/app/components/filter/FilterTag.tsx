"use client";

import { useEffect, useState } from "react";
import { Filter } from "../listings/ListingRecipe";
import styled from "styled-components";

type FilterTagProps = {
  search: string | null;
  filter: Filter;
};

const FilterTag = (
  props: FilterTagProps & { onRemove: (tagType: string) => void }
) => {
  const [tagList, setTagList] = useState<{ tag: string; type: string }[]>([]);
  const { search, filter, onRemove } = props;

  // 검색바 입력값 및 필터바 필터 값에 따른 태그 추가
  useEffect(() => {
    let newTagList: { tag: string; type: string }[] = [];

    if (search) {
      newTagList.push({ tag: `#${search}`, type: "search" });
    }

    if (filter.servings > 0) {
      newTagList.push({ tag: `#${filter.servings}인`, type: "servings" });
    }

    if (filter.duration > 0) {
      newTagList.push({ tag: `#${filter.duration}분`, type: "duration" });
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
  }, [search, filter]);

  return (
    <>
      <FilterTagBox>
        <p>검색결과</p>
        {tagList.map((item, index) => (
          <>
            <span key={index}>
              {item.tag}
              <RemoveButton onClick={() => onRemove(item.type)}>X</RemoveButton>
            </span>
          </>
        ))}
      </FilterTagBox>
    </>
  );
};

export default FilterTag;

const FilterTagBox = styled.div`
  font-size: 16px;
  color: #9f783a;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 2rem 0;
  gap: 1.6rem;

  & p {
    color: #4f3d21;
  }

  & span {
    background-color: #fbd26a;
    border-radius: 10rem;
    padding: 0.5rem 1.5rem;
  }
`;

const RemoveButton = styled.button`
  margin-left: 0.5rem;
  color: #b89b6f;
  border-radius: 0.5rem;
  font-size: 1.3rem;

  &:hover {
    color: #9f783a;
  }
`;