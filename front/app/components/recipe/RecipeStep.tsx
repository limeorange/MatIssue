import styled, { css } from "styled-components";
import Image from "next/image";

type RecipeStepProps = {
  stepNumber: number;
  stepImage: string;
  lastStep: number;
  stepDescription: string;
};

// 레시피 한 단계 컴포넌트
const RecipeStep = ({
  stepNumber,
  stepImage,
  lastStep,
  stepDescription,
}: RecipeStepProps) => {
  const isLastStep = stepNumber === lastStep;
  return (
    <>
      <div className="flex">
        {/* 단계 숫자, 점선 */}
        <div className="flex flex-col">
          <div
            className="flex bg-[#FBE2A1] h-[35px] w-[35px]
          rounded-[100px] items-center justify-center"
          >
            <h3 className="text-[20px] text-[#A17C43]">{stepNumber}</h3>
          </div>
          <StepDotDiv isLastStep={isLastStep}></StepDotDiv>
        </div>

        {/* 요리 과정 사진 */}
        <ImageWrapperDiv>
          <Image
            src={stepImage}
            alt={`step${stepNumber}`}
            fill
            style={{ objectFit: "cover", borderRadius: 20 }}
          />
        </ImageWrapperDiv>

        {/* 요리 과정 설명 */}
        <div className="pt-[45px] pl-[18px] w-[300px]">{stepDescription}</div>
      </div>
    </>
  );
};

const ImageWrapperDiv = styled.div`
  width: 290px;
  height: 290px;
  position: relative;
  margin-top: 35px;
  margin-left: 12px;
`;

const StepDotDiv = styled.div<{ isLastStep: boolean }>`
  /* 기본 스타일 */
  border-right-width: 2.5px;
  border-right-color: #ababab;
  border-right-style: dotted;
  height: 300px;
  width: 19px;
  margin-top: 3px;

  /* isLastStep이 true인 경우 스타일 변경 */
  ${({ isLastStep }) =>
    isLastStep &&
    css`
      display: none;
    `}
`;

export default RecipeStep;
