import styled, { css } from "styled-components";
import { useState } from "react";
import { useRecoilState } from "recoil";
import darkModeAtom from "@/app/store/darkModeAtom";

type CheckboxInputProps = {
  isChecked: boolean;
  onClick: () => void;
};

type CheckboxLabelProps = {
  isChecked: boolean;
  onClick: () => void;
};

/** 요리 재료 Props */
type Ingredient = {
  name: string;
  amount: string;
};

/** 요리 재료 리스트 Props */
type IngredientListProps = {
  recipe_ingredients: Ingredient[];
};

/** 재료 준비 목록 컴포넌트 */
const IngredientList = ({ recipe_ingredients }: IngredientListProps) => {
  const [isCheckedList, setIsCheckedList] = useState<boolean[]>(
    Array(recipe_ingredients.length).fill(false)
  );

  // 체크박스 클릭 핸들러
  const CheckClickHandler = (index: number) => {
    const updatedList = [...isCheckedList];
    updatedList[index] = !updatedList[index];
    setIsCheckedList(updatedList);
  };

  // 다크 모드 상태 관리
  const [isDarkMode, setIsDarkMode] = useRecoilState(darkModeAtom);

  return (
    <IngredientsContainer isDarkMode={isDarkMode}>
      <IngredientsList>
        {recipe_ingredients.map((item, index) => (
          <IngredientItem key={index}>
            <IngredientName isChecked={isCheckedList[index]}>
              {item.name}
            </IngredientName>
            <IngredientCount isChecked={isCheckedList[index]}>
              {item.amount}
            </IngredientCount>
            <CheckboxWrapper>
              <CheckboxInput
                type="checkbox"
                isChecked={isCheckedList[index]}
                onClick={() => CheckClickHandler(index)}
              />
              <CheckboxLabel
                onClick={() => CheckClickHandler(index)}
                isChecked={isCheckedList[index]}
              />
            </CheckboxWrapper>
          </IngredientItem>
        ))}
      </IngredientsList>
    </IngredientsContainer>
  );
};

/** 재료 목록 전체 감싸는 Div */
const IngredientsContainer = styled.div<{ isDarkMode: boolean }>`
  width: 100%;
  height: 100%;
  border-radius: 2rem;
  padding: 1.7rem;

  border: ${(props) =>
    props.isDarkMode
      ? `1rem solid ${props.theme.lightNavy}`
      : "1rem solid #fff6df"};

  @media (min-width: 1024px) {
    width: 40rem;
    padding: 2rem;
  }
`;

/** 재료 목록 리스트 Ul */
const IngredientsList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

/** 재료 목록 Li */
const IngredientItem = styled.li`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

/** 재료명 Div */
const IngredientName = styled.div<{ isChecked: boolean }>`
  font-size: 16px;
  flex-grow: 1;

  ${({ isChecked }) =>
    isChecked
      ? css`
          color: #aaa;
          text-decoration: line-through;
        `
      : null}
`;

/** 재료 양 Div */
const IngredientCount = styled.div<{ isChecked: boolean }>`
  font-size: 16px;
  margin-right: 1rem;
  align-self: flex-start;

  ${({ isChecked }) =>
    isChecked
      ? css`
          color: #aaa;
          text-decoration: line-through;
        `
      : null}
`;

/** 체크박스 감싸는 Div */
const CheckboxWrapper = styled.div`
  position: relative;
  margin-bottom: 0.7rem;
  margin-right: 1rem;

  @media (min-width: 1024px) {
    position: relative;
    margin-bottom: 0.7rem;
  }
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
