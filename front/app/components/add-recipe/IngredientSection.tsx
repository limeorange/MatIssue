import darkModeAtom from "@/app/store/darkModeAtom";
import React, { ChangeEvent } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";

type IngredientSectionProps = {
  ingredients: { ingredient: string; quantity: string }[];
  handleIngredientChange: (
    e: ChangeEvent<HTMLInputElement>,
    index: number
  ) => void;
  handleQuantityChange: (
    e: ChangeEvent<HTMLInputElement>,
    index: number
  ) => void;
  handleAddIngredient: () => void;
  handleRemoveIngredient: (index: number) => void;
};

const IngredientSection = ({
  ingredients,
  handleIngredientChange,
  handleQuantityChange,
  handleAddIngredient,
  handleRemoveIngredient,
}: IngredientSectionProps) => {
  const [isDarkMode, setIsDarkMode] = useRecoilState(darkModeAtom);

  const showRemoveButton = ingredients.length > 1;
  // 재료 추가를 위한 엔터키 핸들러
  const handleIngredientKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault(); // 'Enter' 키를 눌렀을 때 발생하는 기본 동작(폼 제출)을 막음
      handleAddIngredient(); // 'Enter' 키를 눌렀을 때 재료 추가 함수 호출
    }
  };

  return (
    <IngredientContainer>
      <Label>재료 등록</Label>
      <IngredientWrapper>
        {ingredients.map((_, index) => (
          <IngredientRowBox key={index}>
            <IngredientInput
              type="text"
              value={ingredients[index].ingredient}
              onChange={(e) => handleIngredientChange(e, index)}
              onKeyPress={handleIngredientKeyPress}
              placeholder="재료"
            />
            <QuantityInput
              type="text"
              value={ingredients[index].quantity}
              onChange={(e) => handleQuantityChange(e, index)}
              onKeyPress={handleIngredientKeyPress}
              placeholder="재료의 양"
            />
            <ButtonPlaceBox>
              {showRemoveButton && (
                <RemoveIngredientButton
                  type="button"
                  onClick={() => handleRemoveIngredient(index)}
                />
              )}
            </ButtonPlaceBox>
          </IngredientRowBox>
        ))}
        <CenteredAddButtonRowBox>
          <AddIngredientButton
            isDarkMode={isDarkMode}
            type="button"
            onClick={(event) => {
              event.preventDefault();
              handleAddIngredient();
            }}
            onKeyPress={handleIngredientKeyPress}
          >
            + 재료 추가하기
          </AddIngredientButton>
        </CenteredAddButtonRowBox>
      </IngredientWrapper>
    </IngredientContainer>
  );
};

export default IngredientSection;

const IngredientContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  margin-top: 4rem;

  @media (min-width: 1024px) {
    flex-direction: row;
    margin-top: 7.2rem;
  }
`;

const IngredientWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Label = styled.label`
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 2.1rem;
  margin-right: 3rem;
  padding-top: 0.5rem;

  margin-bottom: 1rem;

  @media (min-width: 1024px) {
    width: 9.8rem;
    height: 2.1rem;
  }
`;

const IngredientInput = styled.input`
  width: 100%;
  height: 3.6rem;
  margin-right: 1.2rem;
  border: 1px solid #c4c4c4;
  box-sizing: border-box;
  border-radius: 1.5rem;
  padding: 1rem;
  font-size: 16px;
  &:focus {
    border: 0.1rem solid #fbd26a;
    outline: none;
    box-shadow: 0 0 0 0.2rem #fbd26a;
  }

  @media (min-width: 1024px) {
    width: 27.5rem;
  }
`;

const QuantityInput = styled.input`
  width: 60%;
  height: 3.6rem;
  border: 1px solid #c4c4c4;
  box-sizing: border-box;
  border-radius: 1.5rem;
  padding: 1rem;
  font-size: 16px;
  &:focus {
    border: 0.1rem solid #fbd26a;
    outline: none;
    box-shadow: 0 0 0 0.2rem #fbd26a;
  }

  @media (min-width: 1024px) {
    width: 12.5rem;
  }
`;

const IngredientRowBox = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 1.5rem;
`;

const ButtonPlaceBox = styled.div`
  width: 2.5rem;
  height: 2.5rem;
`;

const CenteredAddButtonRowBox = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const AddIngredientButton = styled.button<{ isDarkMode: boolean }>`
  font-family: "Pretendard", sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 2.8rem;

  color: ${(props) =>
    props.isDarkMode ? props.theme.white : props.theme.brown};

  border: none;
  cursor: pointer;
  background: transparent;
`;

const RemoveIngredientButton = styled.button`
  width: 2.5rem;
  height: 2.5rem;
  border: none;
  margin-left: 0.5rem;
  margin-top: 0.6rem;
  cursor: pointer;
  background: url("/images/stepDeleteIcon.png") no-repeat center;
  background-size: contain;

  @media (min-width: 1024px) {
    margin-left: 1.4rem;
  }
`;
