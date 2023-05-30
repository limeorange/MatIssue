import styled, { css } from "styled-components";
import { useState } from "react";

type CheckboxInputProps = {
  isChecked: boolean;
  onClick: () => void;
};

type CheckboxLabelProps = {
  isChecked: boolean;
  onClick: () => void;
};

// 요리 재료 데이터 (백엔드분들과 소통 예정)
const data = [
  { name: "순두부", count: "1개" },
  { name: "달걀", count: "3개" },
  { name: "대파", count: "1/2대" },
  { name: "청양고추", count: "1개" },
  { name: "멸치 다시마 물", count: "400mL" },
  { name: "새우젓", count: "1작은술" },
  { name: "다진 마늘", count: "1작은술" },
  { name: "후춧가루", count: "약간" },
];

// 재료 준비 목록 컴포넌트
const IngredientList = () => {
  const [isCheckedList, setIsCheckedList] = useState<boolean[]>(
    Array(data.length).fill(false)
  );

  const CheckClickHandler = (index: number) => {
    const updatedList = [...isCheckedList];
    updatedList[index] = !updatedList[index];
    setIsCheckedList(updatedList);
  };

  return (
    <ContainerDiv>
      <ul>
        {data.map((item, index) => (
          <IngredientItemLi>
            <IngredientSpan isChecked={isCheckedList[index]}>
              {item.name}
            </IngredientSpan>
            <IngredientCountSpan isChecked={isCheckedList[index]}>
              {item.count}
            </IngredientCountSpan>
            <CheckboxWrapperDiv>
              <CheckboxInput
                type="checkbox"
                isChecked={isCheckedList[index]}
                onClick={() => CheckClickHandler(index)}
              />
              <CheckboxLabel
                onClick={() => CheckClickHandler(index)}
                isChecked={isCheckedList[index]}
              />
            </CheckboxWrapperDiv>
          </IngredientItemLi>
        ))}
      </ul>
    </ContainerDiv>
  );
};

const itemHeight = 37;
const containerHeight = 50 + itemHeight * data.length;
const ContainerDiv = styled.div`
  height: ${containerHeight}px;
  width: 330px;
  border: 10px solid #fff6df;
  border-radius: 20px;
  padding: 20px;
`;

const IngredientItemLi = styled.li`
  display: flex;
  margin-bottom: 12px;
  height: 25px;
  justify-items: center;
  align-items: center;
`;

const IngredientSpan = styled.span<{ isChecked: boolean }>`
  font-size: 16px;
  width: 150px;
  ${({ isChecked }) =>
    isChecked
      ? css`
          color: #aaa;
          text-decoration: line-through;
        `
      : null}
`;

const IngredientCountSpan = styled.span<{ isChecked: boolean }>`
  font-size: 16px;
  width: 80px;
  margin-right: 10px;
  ${({ isChecked }) =>
    isChecked
      ? css`
          color: #aaa;
          text-decoration: line-through;
        `
      : null}
`;

const CheckboxWrapperDiv = styled.div`
  position: relative;
`;

const CheckboxInput = styled.input<CheckboxInputProps>`
  visibility: hidden;
  ${({ isChecked }) =>
    isChecked
      ? css`
          background-color: #66bb6a;
          border-color: #66bb6a;
          &:after: {
            opacity: 1;
          }
        `
      : null}
`;

const CheckboxLabel = styled.label<CheckboxLabelProps>`
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 50%;
  cursor: pointer;
  width: 25px;
  height: 25px;
  position: absolute;
  left: 0;
  top: 0;
  ${function ({ isChecked }) {
    return isChecked
      ? css`
          background-color: #fbd26a;
          border-color: #fbd26a;
          &:after {
            border: 2px solid #fff;
            border-top: none;
            border-right: none;
            content: "";
            height: 6px;
            left: 6px;
            position: absolute;
            top: 8px;
            transform: rotate(-45deg);
            width: 12px;
          }
        `
      : css`
          background-color: #fff !important;
          &:after {
            opacity: 1;
          }
        `;
  }}
`;

export default IngredientList;
