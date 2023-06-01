import React, { ChangeEvent } from "react";
import styled from "styled-components";

interface Step {
  stepDetail: string;
}

interface CookingStepSectionProps {
  steps: Step[];
  handleStepDetailChange: (
    e: ChangeEvent<HTMLTextAreaElement>,
    index: number
  ) => void;
  handleAddStep: () => void;
  handleRemoveStep: (index: number) => void;
}

const CookingStepSection = ({
  steps,
  handleStepDetailChange,
  handleAddStep,
  handleRemoveStep,
}: CookingStepSectionProps) => {
  return (
    <CookingStep>
      <Label>요리 순서</Label>
      {steps.map((step, index) => (
        <div key={index}>
          <StepWrapper>
            <StepLabel>Step {index + 1}</StepLabel>
            <StepTextArea
              value={step.stepDetail}
              onChange={(e) => handleStepDetailChange(e, index)}
              placeholder="요리 과정을 알려주세요."
            />
            <ImageUploadBox>
              {/* Add the image upload component here and handle onChange using handleStepImageChange */}
            </ImageUploadBox>
            {steps.length !== 1 && (
              <RemoveStepButton
                type="button"
                onClick={() => handleRemoveStep(index)}
              ></RemoveStepButton>
            )}
          </StepWrapper>
        </div>
      ))}
      <AddStepButton type="button" onClick={handleAddStep}>
        + 순서 추가하기
      </AddStepButton>
    </CookingStep>
  );
};

export default CookingStepSection;

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

const TextArea = styled.textarea`
  box-sizing: border-box;
  width: 57.2rem;
  height: 10rem;
  border: 0.1rem solid #d9d9d9;
  border-radius: 1.5rem;
  padding-left: 1rem;
  padding-top: 1rem;
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 1.9rem;
  ::placeholder {
    color: #a9a9a9;
  }
`;

const CookingStep = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  margin-top: 2rem;
`;

const StepLabel = styled(Label)`
  margin-bottom: 1rem;
  align-self: flex-start;
  margin-right: -2rem;
`;

const ImageUploadBox = styled.div`
  width: 19.9rem;
  height: 16rem;
  background: #f7f5f5;
  border-radius: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 2rem;
`;

const StepWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  align-items: center;
  margin-top: 2rem;
`;

const StepTextArea = styled(TextArea)`
  width: 35.6rem;
  height: 16rem;
`;

const AddStepButton = styled.button`
  font-family: "Pretendard", sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 2.8rem;
  color: #4f3d21;
  border: none;
  cursor: pointer;
  background: transparent;
  align-self: center;
  padding-left: 3.5rem;
  margin-top: 1.4rem;
`;

const RemoveStepButton = styled.button`
  width: 2.5rem;
  height: 2.5rem;
  border: none;
  margin-left: 1.4rem;
  margin-top: 0.6rem;
  cursor: pointer;
  background: url("/images/deleteIcon.png") no-repeat center;
  background-size: contain;
`;
