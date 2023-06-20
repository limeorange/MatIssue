import React, { useEffect, useRef, useState } from "react";
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
      <SelectBox ref={selectBoxRef} onClick={handleSelectBoxClick} tabIndex={0}>
        {selectedOptionObject ? selectedOptionObject.label : placeholder}
      </SelectBox>
      {isOpen && (
        <OptionList>
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

const SelectBox = styled.div`
  box-sizing: border-box;
  width: 12.5rem;
  height: 3.6rem;
  border: 0.1rem solid #d9d9d9;
  border-radius: 5rem;
  padding-left: 1rem;
  padding-top: 0.7rem;
  margin-bottom: 1rem;
  color: #6f6f6f;
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 1.9rem;
  appearance: none;
  background: #ffffff url("/images/listIcon.png") no-repeat;
  background-position: right 1rem center;
  -webkit-appearance: none; /* for chrome /
-moz-appearance:none; /for firefox*/

  &:focus {
    border: 0.1rem solid #fbd26a;
    outline: none;
    box-shadow: 0 0 0 0.2rem #fbd26a;
  }

  @media (min-width: 1024px) {
  }
`;

const OptionList = styled.ul`
  position: absolute;
  top: 100%;
  width: 12.5rem;
  border: 1px solid #d9d9d9;
  background-color: #ffffff;
  border-radius: 1.5rem;
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  color: #6f6f6f;
  list-style: none;
  padding: 0;
  margin: 0;
  z-index: 1;
`;

const OptionItem = styled.li`
  padding: 1rem;
  cursor: pointer;

  &:first-child {
    border-top-left-radius: 1.3rem;
    border-top-right-radius: 1.3rem;
  }

  &:last-child {
    border-bottom-left-radius: 1.3rem;
    border-bottom-right-radius: 1.3rem;
  }

  &:hover {
    background-color: #fbe2a1;
  }
`;
