import RecipeStep from "./RecipeStep";

/** 단계 Props */
type Step = { step: number; picture: string; description: string };

/** 단계 리스트 Props */
type StepListProps = {
  recipeSequence: Step[];
};

/** 요리 과정 컴포넌트 */
const RecipeSteps: React.FC<StepListProps> = ({ recipeSequence }) => {
  return (
    <>
      <div>
        {recipeSequence.map((step) => (
          <RecipeStep
            key={step.step}
            stepNumber={step.step}
            stepImage={step.picture}
            lastStep={recipeSequence.length}
            stepDescription={step.description}
          />
        ))}
      </div>
    </>
  );
};

export default RecipeSteps;
