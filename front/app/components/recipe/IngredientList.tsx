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
  { name: "순두부", amount: "1개" },
  { name: "달걀", amount: "3개" },
  { name: "대파", amount: "1/2대" },
  { name: "청양고추", amount: "1개" },
  { name: "멸치 다시마 물", amount: "400mL" },
  { name: "새우젓", amount: "1작은술" },
  { name: "다진 마늘", amount: "1작은술" },
  { name: "후춧가루", amount: "약간" },
];

// 재료 준비 목록 컴포넌트
const IngredientList = () => {
  const [isCheckedList, setIsCheckedList] = useState<boolean[]>(
    Array(data.length).fill(false)
  );

  // 체크박스 클릭 핸들러
  const CheckClickHandler = (index: number) => {
    const updatedList = [...isCheckedList];
    updatedList[index] = !updatedList[index];
    setIsCheckedList(updatedList);
  };

  return (
    <ContainerDiv>
      <IngredientUl>
        {data.map((item, index) => (
          <IngredientItemLi key={index}>
            <IngredientSpan isChecked={isCheckedList[index]}>
              {item.name}
            </IngredientSpan>
            <IngredientCountSpan isChecked={isCheckedList[index]}>
              {item.amount}
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
      </IngredientUl>
    </ContainerDiv>
  );
};

/** 재료 목록 전체 감싸는 Div */
const ContainerDiv = styled.div`
  width: 33rem;
  border: 1rem solid #fff6df;
  border-radius: 2rem;
  padding: 2rem;
`;

/** 재료 목록 리스트 Ul */
const IngredientUl = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

/** 재료 목록 Li */
const IngredientItemLi = styled.li`
  display: flex;
  height: 2.5rem;
  justify-items: center;
  align-items: center;
`;

/** 재료명 Span */
const IngredientSpan = styled.span<{ isChecked: boolean }>`
  font-size: 16px;
  width: 15rem;
  ${({ isChecked }) =>
    isChecked
      ? css`
          color: #aaa;
          text-decoration: line-through;
        `
      : null}
`;

/** 재료 양 Span */
const IngredientCountSpan = styled.span<{ isChecked: boolean }>`
  font-size: 16px;
  width: 8rem;
  margin-right: 1rem;
  ${({ isChecked }) =>
    isChecked
      ? css`
          color: #aaa;
          text-decoration: line-through;
        `
      : null}
`;

/** 체크박스 감싸는 Div */
const CheckboxWrapperDiv = styled.div`
  position: relative;
  margin-bottom: 0.7rem;
`;

/** 체크박스 Input */
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

/** 체크박스 Label */
const CheckboxLabel = styled.label<CheckboxLabelProps>`
  background-color: #fff;
  border: 0.1rem solid #ccc;
  border-radius: 50%;
  cursor: pointer;
  width: 2.5rem;
  height: 2.5rem;
  position: absolute;
  left: 0;
  top: 0;

  ${function ({ isChecked }) {
    return isChecked
      ? css`
          background-color: #fbd26a;
          border-color: #fbd26a;
          &:after {
            border: 0.2rem solid #fff;
            border-top: none;
            border-right: none;
            content: "";
            height: 0.6rem;
            left: 0.6rem;
            position: absolute;
            top: 0.8rem;
            transform: rotate(-45deg);
            width: 1.2rem;
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
