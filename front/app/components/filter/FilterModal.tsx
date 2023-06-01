"use client";

import styled from "styled-components";

type FilterModalProps = {
  options: { value: number; name: string }[];
  setState: any;
};

const FilterModal = (props: FilterModalProps) => {
  const { options, setState } = props;

  return (
    <FilterModalContainer>
      <FilterModalUl>
        {options.map((option) => (
          <FilterModalLi
            key={option.value}
            onClick={() => {
              setState(option);
            }}
          >
            {option.name}
          </FilterModalLi>
        ))}
      </FilterModalUl>
    </FilterModalContainer>
  );
};

const FilterModalContainer = styled.div`
  position: absolute;
  top: 4.4rem;
  z-index: 90;
  width: 100%;
  padding: 0.6rem 0;
  background-color: white;
  box-shadow: 0px 0.1rem 0.3rem rgba(0, 0, 0, 0.25);
  border-bottom-left-radius: 0.5rem;
  border-bottom-right-radius: 0.5rem;
  font-size: 16px;
  font-weight: 400;
  color: #4f3d21;
  margin-left: -1.3rem;
`;

const FilterModalUl = styled.ul`
  display: flex;
  flex-direction: column;
`;

const FilterModalLi = styled.li`
  padding: 1rem;
  text-align: center;

  &:hover {
    background: #fbe2a1;
    cursor: pointer;
  }
`;

export default FilterModal;
