import React, { ChangeEvent } from "react";
import styled from "styled-components";
import Image from "next/image";
import uploadImage from "@/app/api/aws";
import darkModeAtom from "@/app/store/darkModeAtom";
import { useRecoilState } from "recoil";

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
  const [isDarkMode, setIsDarkMode] = useRecoilState(darkModeAtom);

  const handleImageChange = async (
    e: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];

      try {
        const response = await uploadImage(file);
        let imageUrl = response.imageUrl;

        const timestamp = new Date().getTime();
        imageUrl += `?${timestamp}`;

        handleStepImageChange(imageUrl, index);
      } catch (error) {
        console.error("Image upload failed:", error);
      }
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = async (
    e: React.DragEvent<HTMLDivElement>,
    index: number
  ) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];

    try {
      const response = await uploadImage(file);
      let imageUrl = response.imageUrl;

      const timestamp = new Date().getTime();
      imageUrl += `?${timestamp}`;

      handleStepImageChange(imageUrl, index);
    } catch (error) {
      console.error("Image upload failed:", error);
    }
  };

  return (
    <CookingStepContainer>
      <Label>요리 순서</Label>
      {steps.map((step, index) => (
        <div key={index}>
          <StepContainer>
            <StepLabel>Step {index + 1}</StepLabel>
            <StepContentsWrapper>
              <StepTextArea
                value={step.stepDetail}
                onChange={(e) => handleStepDetailChange(e, index)}
                placeholder="단계별 요리 방법을 입력해주세요."
              />
              <ImageUploadBox
                isDarkMode={isDarkMode}
                imgExists={Boolean(stepImages[index])}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, index)}
              >
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
                    <ImageBox>
                      <Image
                        src={stepImages[index]}
                        alt="step"
                        layout="fill"
                        objectFit="cover"
                        style={{ borderRadius: "1.5rem" }}
                      />
                    </ImageBox>
                  </ImageWrapper>
                )}
              </ImageUploadBox>
              {steps.length !== 1 && (
                <RemoveStepButton
                  type="button"
                  onClick={() => handleRemoveStep(index)}
                />
              )}
            </StepContentsWrapper>
          </StepContainer>
        </div>
      ))}
      <AddStepButton
        isDarkMode={isDarkMode}
        type="button"
        onClick={handleAddStep}
      >
        + 순서 추가하기
      </AddStepButton>
    </CookingStepContainer>
  );
};

export default CookingStepsSection;

const Label = styled.label`
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 2.1rem;
  margin-right: 3rem;
  padding-top: 0.5rem;

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

  @media (min-width: 1024px) {
    width: 57.2rem;
  }
`;

const CookingStepContainer = styled.div`
  margin-top: 4rem;

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
  margin-right: -0.5rem;
`;

const StepContentsWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column-reverse;

  @media (min-width: 1024px) {
    flex-direction: row;
  }
`;

const ImageUploadBox = styled.div<{ isDarkMode: boolean; imgExists: boolean }>`
  width: 100%;
  height: 18.6rem;
  background: ${(props) =>
    props.imgExists
      ? "#f7f5f5"
      : props.isDarkMode
      ? "#212739 url('/images/cameraIconDark.png') no-repeat center / 4.2rem 3.5rem"
      : '#f6f5f5 url("/images/cameraIcon.png") no-repeat center / 6rem 6rem'};
  border: ${(props) => (props.isDarkMode ? "0.05rem" : "none")} solid #d9d9d9;
  border-radius: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  cursor: pointer;
  margin-top: 1rem;
  margin-bottom: 1rem;

  @media (min-width: 1024px) {
    width: 19.9rem;
    height: 16rem;
    margin-left: 2rem;
    margin-top: 0;
    margin-bottom: 0;
  }
`;

const StepContainer = styled.div`
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

const AddStepButton = styled.button<{ isDarkMode: boolean }>`
  width: 100%;
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

const ImageBox = styled.div`
  width: 100%;
  height: 100%;
`;
