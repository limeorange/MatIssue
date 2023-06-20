import RecipeStep from "./RecipeStepItem";

/** 단계 Props */
type Step = { step: number; picture: string; description: string };

/** 단계 리스트 Props */
type StepListProps = {
  recipe_sequence: Step[];
};

/** 요리 과정 컴포넌트 */
const RecipeSteps = ({ recipe_sequence }: StepListProps) => {
  return (
    <>
      <div>
        {recipe_sequence.map((step) => (
          <RecipeStep
            key={step.step}
            stepNumber={step.step}
            stepImage={step.picture}
            lastStep={recipe_sequence.length}
            stepDescription={step.description}
          />
        ))}
      </div>
    </>
  );
};

export default RecipeSteps;
