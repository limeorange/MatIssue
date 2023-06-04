import React, { ChangeEvent } from "react";
import styled from "styled-components";

interface IngredientSectionProps {
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
}

const IngredientSection = ({
  ingredients,
  handleIngredientChange,
  handleQuantityChange,
  handleAddIngredient,
  handleRemoveIngredient,
}: IngredientSectionProps) => {
  const showRemoveButton = ingredients.length > 1;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        marginTop: "7.2rem",
      }}
    >
      <Label>재료 등록</Label>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {ingredients.map((_, index) => (
          <IngredientRow key={index}>
            <IngredientInput
              type="text"
              value={ingredients[index].ingredient}
              onChange={(e) => handleIngredientChange(e, index)}
              placeholder="재료"
            />
            <QuantityInput
              type="text"
              value={ingredients[index].quantity}
              onChange={(e) => handleQuantityChange(e, index)}
              placeholder="재료의 양"
            />
            {showRemoveButton && (
              <RemoveIngredientButton
                type="button"
                onClick={() => handleRemoveIngredient(index)}
              />
            )}
          </IngredientRow>
        ))}
        <AddIngredientButton
          type="button"
          onClick={(event) => {
            event.preventDefault();
            handleAddIngredient();
          }}
        >
          + 재료 추가하기
        </AddIngredientButton>
      </div>
    </div>
  );
};

export default IngredientSection;

const Label = styled.label`
  width: 8.8rem;
  height: 2.1rem;
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 2.1rem;
  color: #4f3d21;
  margin-right: 3rem;
  padding-top: 0.5rem;
`;

const IngredientInput = styled.input`
  width: 27.5rem;
  height: 3.6rem;
  margin-right: 1.2rem;
  border: 1px solid #c4c4c4;
  box-sizing: border-box;
  border-radius: 1.5rem;
  padding: 1rem;
  font-size: 16px;
  &:focus {
    border: 0.1rem solid #d9d9d9;
    outline: none;
    box-shadow: 0 0 0 0.2rem #fbd26a;
  }
`;

const QuantityInput = styled.input`
  width: 12.5rem;
  height: 3.6rem;
  border: 1px solid #c4c4c4;
  box-sizing: border-box;
  border-radius: 1.5rem;
  padding: 1rem;
  font-size: 16px;
  &:focus {
    border: 0.1rem solid #d9d9d9;
    outline: none;
    box-shadow: 0 0 0 0.2rem #fbd26a;
  }
`;

const IngredientRow = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 1.5rem;
`;

const AddIngredientButton = styled.button`
  font-family: "Pretendard", sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 2.8rem;
  color: #4f3d21;
  border: none;
  cursor: pointer;
  background: transparent;
`;

const RemoveIngredientButton = styled.button`
  width: 2.5rem;
  height: 2.5rem;
  border: none;
  margin-left: 1.4rem;
  margin-top: 0.6rem;
  cursor: pointer;
  background: url("/images/stepDeleteIcon.png") no-repeat center;
  background-size: contain;
`;
