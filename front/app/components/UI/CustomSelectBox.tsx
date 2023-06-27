import darkModeAtom from "@/app/store/darkModeAtom";
import React, { useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";

type CustomSelectProps = {
  options: { label: string; value: string }[];
  selectedOption: string;
  handleOptionChange: (selectedOption: string) => void;
  placeholder: string;
};

const CustomSelectBox = ({
  options,
  selectedOption,
  handleOptionChange,
  placeholder,
}: CustomSelectProps): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useRecoilState(darkModeAtom);
  const selectBoxRef = useRef<HTMLDivElement>(null);

  const selectedOptionObject = options.find(
    (option) => option.value === selectedOption
  );

  const handleSelectBoxClick = () => {
    setIsOpen(!isOpen);
    if (selectBoxRef.current) {
      selectBoxRef.current.focus();
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectBoxRef.current &&
        !selectBoxRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <SelectBoxWrapper ref={selectBoxRef}>
      <SelectBox
        isDarkMode={isDarkMode}
        ref={selectBoxRef}
        onClick={handleSelectBoxClick}
        tabIndex={0}
      >
        {selectedOptionObject ? selectedOptionObject.label : placeholder}
      </SelectBox>
      {isOpen && (
        <OptionList isDarkMode={isDarkMode}>
          {options.map((option) => (
            <OptionItem
              key={option.value}
              onClick={() => {
                handleOptionChange(option.value);
                setIsOpen(false);
              }}
            >
              {option.label}
            </OptionItem>
          ))}
        </OptionList>
      )}
    </SelectBoxWrapper>
  );
};

export default CustomSelectBox;

const SelectBoxWrapper = styled.div`
  position: relative;
  width: 12.5rem;
`;

const SelectBox = styled.div<{ isDarkMode: boolean }>`
  box-sizing: border-box;
  width: 12.5rem;
  height: 3.6rem;
  border: ${(props) =>
    props.isDarkMode ? "0.05rem solid #ccc" : "0.1rem solid #ccc"};
  border-radius: 5rem;
  padding-left: 1rem;
  padding-top: 0.7rem;
  margin-bottom: 1rem;
  color: ${(props) => (props.isDarkMode ? "#ccc" : "#6f6f6f")};
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 1.9rem;
  appearance: none;

  background: ${(props) =>
    props.isDarkMode
      ? "#404353 url('/images/listIconDark.png') no-repeat"
      : "#ffffff url('/images/listIcon.png') no-repeat"};

  background-position: right 1rem center;
  -webkit-appearance: none; /* for chrome /
  -moz-appearance:none; /for firefox*/

  &:focus {
    border: 0.1rem solid #fbe2a1;
    border-radius: 0.5rem 0.5rem 0 0;
    border-bottom: none;
    outline: none;
    box-shadow: 0 0 0 0.2rem #fbe2a1;
  }
`;

const OptionList = styled.ul<{ isDarkMode: boolean }>`
  position: absolute;
  top: 3.45rem;
  left: -0.2rem;
  width: 12.9rem;
  border: 3px solid #fbe2a1;
  border-top: none;
  background-color: ${(props) => (props.isDarkMode ? "#404353" : "#fff")};
  border-bottom-left-radius: 0.5rem;
  border-bottom-right-radius: 0.5rem;
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  color: ${(props) => (props.isDarkMode ? "#ccc" : "#6f6f6f")};
  list-style: none;
  padding: 0;
  margin: 0;
  z-index: 1;

  li:hover {
    color: ${(props) => (props.isDarkMode ? props.theme.deepNavy : "#6f6f6f")};
  }
`;

const OptionItem = styled.li`
  padding: 1rem;
  cursor: pointer;

  &:last-child {
    border-bottom-left-radius: 0.15rem;
    border-bottom-right-radius: 0.15rem;
  }

  &:hover {
    background-color: #fbe2a1;
  }
`;
