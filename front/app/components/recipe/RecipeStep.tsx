import styled, { css } from "styled-components";
import Image from "next/image";

type RecipeStepProps = {
  stepNumber: number;
  stepImage: string;
  lastStep: number;
  stepDescription: string;
};

// 레시피 단일 단계 컴포넌트
const RecipeStep = ({
  stepNumber,
  stepImage,
  lastStep,
  stepDescription,
}: RecipeStepProps) => {
  // 마지막 단계일 경우 점선 빼주기 위함
  const isLastStep = stepNumber === lastStep;

  return (
    <>
      <Container>
        {/* 단계 숫자, 점선 */}
        <StepNavigationDiv>
          <RoundedStepDiv>
            <h3>{stepNumber}</h3>
          </RoundedStepDiv>
          <StepDotDiv isLastStep={isLastStep}></StepDotDiv>
        </StepNavigationDiv>

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
        <StepDescriptionDiv>{stepDescription}</StepDescriptionDiv>
      </Container>
    </>
  );
};

const Container = styled.div`
  display: flex;
`;

const StepNavigationDiv = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 2rem;
`;

const ImageWrapperDiv = styled.div`
  width: 29rem;
  height: 29rem;
  position: relative;
  margin-top: 3.5rem;
  margin-left: 1.2rem;
`;

const StepDotDiv = styled.div<{ isLastStep: boolean }>`
  /* 기본 스타일 */
  border-right-width: 0.25rem;
  border-right-color: #ababab;
  border-right-style: dotted;
  height: 30rem;
  width: 1.9rem;
  margin-top: 0.3rem;

  /* isLastStep이 true인 경우 스타일 변경 */
  ${({ isLastStep }) =>
    isLastStep &&
    css`
      display: none;
    `}
`;

const StepDescriptionDiv = styled.div`
  padding-top: 4.5rem;
  padding-left: 1.8rem;
  width: 30rem;
  font-size: 1.6rem;
`;

const RoundedStepDiv = styled.div`
  display: flex;
  background-color: #fbe2a1;
  height: 3.5rem;
  width: 3.5rem;
  border-radius: 10rem;
  align-items: center;
  justify-content: center;

  h3 {
    font-size = 2rem;
    color: #A17C43;
  }
`;

export default RecipeStep;
