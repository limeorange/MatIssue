import RecipeStep from "./RecipeStep";

type Step = { stepNumber: number; stepImage: string; stepDescription: string };

// 요리 과정 데이터 (백엔드분들과 소통 예정)
const steps: Step[] = [
  {
    stepNumber: 1,
    stepImage: "/step1.png",
    stepDescription: "볼에 달걀을 풀은 후 소금을 넣어 섞어주세요.",
  },
  {
    stepNumber: 2,
    stepImage: "/step2.png",
    stepDescription:
      "순두부는 2cm 길이로 잘라주세요. 대파와 청양고추는 송송 썰어주세요.",
  },
  {
    stepNumber: 3,
    stepImage: "/step3.png",
    stepDescription:
      "끓으면 순두부 주변으로 달걀을 조금씩 붓고 살살 저어주세요.",
  },
  {
    stepNumber: 4,
    stepImage: "/step4.png",
    stepDescription:
      "냄비에 순두부를 가지런히 두고 멸치다시마물을 부어 끓으면 새우젓과 다진 마늘을 넣고 뚜껑을 닫아 끓여주세요. 끓으면서 생기는 거품은 걷어주세요.",
  },
  {
    stepNumber: 5,
    stepImage: "/step5.png",
    stepDescription:
      "대파와 청양고추를 넣고 후춧가루를 뿌려 맛있게 즐겨주세요. 기호에 따라 소금이나 새우젓으로 간을 조절해주세요.",
  },
];

// 요리 과정 컴포넌트
const RecipeSteps = () => {
  return (
    <>
      <div>
        {steps.map((step) => (
          <RecipeStep
            key={step.stepNumber}
            stepNumber={step.stepNumber}
            stepImage={step.stepImage}
            lastStep={steps.length}
            stepDescription={step.stepDescription}
          />
        ))}
      </div>
    </>
  );
};

export default RecipeSteps;
