"use client";

import { useRef, useEffect } from "react";
import styled from "styled-components";

type FilterModalProps = {
  options: { value: number; name: string }[];
  setState: React.Dispatch<
    React.SetStateAction<{ value: number; name: string }>
  >;
  onClose: () => void;
};

const FilterModal = (props: FilterModalProps) => {
  const { options, setState, onClose } = props;

  // 필터바 모달창 ref
  const modalRef = useRef<HTMLDivElement | null>(null);

  // 바깥 화면 클릭 시 모달창 닫힘
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <FilterModalContainer ref={modalRef}>
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

const Backdrop = styled.div``;

export default FilterModal;
