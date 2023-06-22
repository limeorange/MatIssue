"use client";

import darkModeAtom from "@/app/store/darkModeAtom";
import { useRef, useEffect } from "react";
import { useRecoilState } from "recoil";
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

  // 다크모드 상태
  const [isDarkMode, setIsDarkMode] = useRecoilState(darkModeAtom);

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
    <FilterModalLayout ref={modalRef} isDarkMode={isDarkMode}>
      <FilterModalList>
        {options.map((option) => (
          <FilterModalItem
            isDarkMode={isDarkMode}
            key={option.value}
            onClick={() => {
              setState(option);
            }}
          >
            {option.name}
          </FilterModalItem>
        ))}
      </FilterModalList>
    </FilterModalLayout>
  );
};

const FilterModalLayout = styled.div<{ isDarkMode: boolean }>`
  position: absolute;
  top: 4.4rem;
  z-index: 90;
  width: 100%;
  padding: 0.6rem 0;
  background-color: ${(props) =>
    props.isDarkMode ? props.theme.lightNavy : props.theme.white};
  box-shadow: 0px 0.1rem 0.3rem rgba(0, 0, 0, 0.25);
  border-bottom-left-radius: 0.5rem;
  border-bottom-right-radius: 0.5rem;
  font-size: 16px;
  font-weight: 400;
  color: #4f3d21;
`;

const FilterModalList = styled.ul`
  display: flex;
  flex-direction: column;
`;

const FilterModalItem = styled.li<{ isDarkMode: boolean }>`
  padding: 1rem;
  text-align: center;
  color: ${(props) =>
    props.isDarkMode ? props.theme.grey : props.theme.brown};

  &:hover {
    background: #fbe2a1;
    cursor: pointer;
    color: ${(props) =>
      props.isDarkMode ? props.theme.deepNavy : props.theme.brown};
  }
`;

export default FilterModal;
