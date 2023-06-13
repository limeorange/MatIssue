import React, { ChangeEvent } from "react";
import styled from "styled-components";
import Image from "next/image";
import uploadImage from "@/app/api/aws";

type Step = {
  stepDetail: string;
};

type CookingStepsSectionProps = {
  steps: Step[];
  stepImages: string[];
  handleStepDetailChange: (
    e: ChangeEvent<HTMLTextAreaElement>,
    index: number
  ) => void;
  handleStepImageChange: (imageUrl: string, index: number) => void;
  handleAddStep: () => void;
  handleRemoveStep: (index: number) => void;
};

const CookingStepsSection = ({
  steps,
  stepImages,
  handleStepDetailChange,
  handleStepImageChange,
  handleAddStep,
  handleRemoveStep,
}: CookingStepsSectionProps) => {
  const handleImageChange = async (
    e: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];

      try {
        const response = await uploadImage(file);
        const imageUrl = response.imageUrl;

        handleStepImageChange(imageUrl, index);
      } catch (error) {
        console.error("Image upload failed:", error);
      }
    }
  };
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
              placeholder="단계별 요리 방법을 입력해주세요."
            />
            <ImageUploadBox imgExists={Boolean(stepImages[index])}>
              <FileInput
                id={`step-image-input-${index}`}
                type="file"
                accept="image/*"
                onChange={(e) => handleImageChange(e, index)}
              />
              {stepImages[index] && (
                <ImageWrapper
                  onClick={() =>
                    document
                      .getElementById(`step-image-input-${index}`)
                      ?.click()
                  }
                >
                  <ImageContainer>
                    <Image
                      src={stepImages[index]}
                      alt="step"
                      layout="fill"
                      objectFit="cover"
                      style={{ borderRadius: "1.5rem" }}
                    />
                  </ImageContainer>
                </ImageWrapper>
              )}
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

export default CookingStepsSection;

const Label = styled.label`
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 2.1rem;
  color: #4f3d21;
  margin-right: 3rem;
  padding-top: 0.5rem;

  margin-bottom: 1rem;

  @media (min-width: 1024px) {
    width: 9.8rem;
    height: 2.1rem;
    margin-bottom: 2rem;
  }
`;

const TextArea = styled.textarea`
  box-sizing: border-box;
  width: 100%;
  height: 10rem;
  border: 0.1rem solid #d9d9d9;
  border-radius: 1.5rem;
  padding: 1rem;
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 1.9rem;
  resize: none;
  ::placeholder {
    color: #a9a9a9;
  }
  &:focus {
    border: 0.1rem solid #fbd26a;
    outline: none;
    box-shadow: 0 0 0 0.2rem #fbd26a;
  }

  @media (min-width: 1024px) {
    width: 57.2rem;
  }
`;

const CookingStep = styled.div`
  @media (min-width: 1024px) {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    margin-top: 4.3rem;
  }
`;

const StepLabel = styled(Label)`
  margin-bottom: 1rem;
  align-self: flex-start;
  margin-right: -2rem;
`;

const ImageUploadBox = styled.div<{ imgExists: boolean }>`
  width: 100%;
  height: 18.6rem;
  background: ${(props) =>
    props.imgExists
      ? "#f7f5f5"
      : '#f6f5f5 url("/images/cameraIcon.png") no-repeat center'};
  background-size: ${(props) => (props.imgExists ? "auto" : "6rem 6rem")};
  border-radius: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  cursor: pointer;
  margin-top: 1rem;

  @media (min-width: 1024px) {
    width: 19.9rem;
    height: 16rem;
    margin-left: 2rem;
    margin-top: 0;
  }
`;

const StepWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 2rem;

  @media (min-width: 1024px) {
    flex-direction: row;
  }
`;

const StepTextArea = styled(TextArea)`
  width: 100%;
  height: 16rem;

  @media (min-width: 1024px) {
    width: 35.6rem;
  }
`;

const AddStepButton = styled.button`
  width: 100%;
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
  margin-top: 1.4rem;
`;

const RemoveStepButton = styled.button`
  width: 2.5rem;
  height: 2.5rem;
  border: none;
  margin-left: 0;
  margin-top: 0.5rem;
  cursor: pointer;
  align-self: center;
  background: url("/images/stepDeleteIcon.png") no-repeat center;
  background-size: contain;
  position: absolute;
  right: 0;
  top: 0;

  @media (min-width: 1024px) {
    position: relative;
    margin-left: 1.4rem;
    margin-top: 0.6rem;
  }
`;

const FileInput = styled.input`
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
`;

const ImageWrapper = styled.div`
  width: 19.9rem;
  height: 16rem;
  overflow: hidden;
  border-radius: 1.5rem;
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 100%;
`;
