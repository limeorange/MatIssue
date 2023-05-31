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
`;

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

const StepDescriptionDiv = styled.div`
  padding-top: 45px;
  padding-left: 18px;
  width: 300px;
`;

const RoundedStepDiv = styled.div`
  display: flex;
  background-color: #fbe2a1;
  height: 35px;
  width: 35px;
  border-radius: 100px;
  align-items: center;
  justify-content: center;

  h3 {
    font-size = 20px;
    color: #A17C43;
  }
`;

export default RecipeStep;
