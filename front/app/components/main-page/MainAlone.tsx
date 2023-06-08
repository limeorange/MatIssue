import {
  StyledContainer,
  StyledContentsArea,
  StyledSubTitle,
  StyledTitle,
  StyledTitleBox,
} from "@/app/styles/main/main.style";
import { Recipe } from "@/app/types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import styled from "styled-components";

const MainAlone = ({ aloneRecipes }: { aloneRecipes: Recipe[] }) => {
  const router = useRouter();

  if (aloneRecipes.length < 5) {
    return null;
  }

  return (
    <StyledContainer>
      <StyledContentsArea>
        <StyledTitleBox>
          <StyledTitle>혼먹 자취생 레시피</StyledTitle>
          <StyledSubTitle>
            자취생이 해먹을수 있는 색다른 추천 레시피들
          </StyledSubTitle>
        </StyledTitleBox>
        <RecipeContainer>
          <RecipeImageWrapperBase
            onClick={() =>
              router.push(`/recipes/${aloneRecipes?.[0].recipe_id}`)
            }
          >
            <SquareImageWrapper>
              <Image
                src={aloneRecipes?.[0].recipe_thumbnail}
                alt="ingredient"
                fill
                style={{ objectFit: "cover" }}
              />
            </SquareImageWrapper>
            <TitleOnImage>{aloneRecipes?.[0].recipe_title}</TitleOnImage>
          </RecipeImageWrapperBase>
          <RecipeImageWrapper2
            onClick={() =>
              router.push(`/recipes/${aloneRecipes?.[0].recipe_id}`)
            }
          >
            <SquareImageWrapper>
              <Image
                src={aloneRecipes?.[1].recipe_thumbnail}
                alt="ingredient"
                fill
                style={{ objectFit: "cover" }}
              />
            </SquareImageWrapper>
            <TitleOnImage>{aloneRecipes?.[1].recipe_title}</TitleOnImage>
          </RecipeImageWrapper2>
          <RecipeImageWrapper3
            onClick={() =>
              router.push(`/recipes/${aloneRecipes?.[0].recipe_id}`)
            }
          >
            <SquareImageWrapper>
              <Image
                src={aloneRecipes?.[2].recipe_thumbnail}
                alt="ingredient"
                fill
                style={{ objectFit: "cover" }}
              />
            </SquareImageWrapper>
            <TitleOnImage>{aloneRecipes?.[2].recipe_title}</TitleOnImage>
          </RecipeImageWrapper3>
          <RecipeImageWrapper4
            onClick={() =>
              router.push(`/recipes/${aloneRecipes?.[0].recipe_id}`)
            }
          >
            <SquareImageWrapper>
              <Image
                src={aloneRecipes?.[3].recipe_thumbnail}
                alt="ingredient"
                fill
                style={{ objectFit: "cover" }}
              />
            </SquareImageWrapper>
            <TitleOnImage>{aloneRecipes?.[3].recipe_title}</TitleOnImage>
          </RecipeImageWrapper4>
        </RecipeContainer>
      </StyledContentsArea>
    </StyledContainer>
  );
};

export default MainAlone;

const RecipeContainer = styled.div`
  max-width: 120rem;
  margin: 0 auto;
  padding: 2rem 2rem;
  display: grid;
  grid-template-columns: repeat(4, 21rem);
  grid-template-rows: repeat(2, 21rem);
  gap: 2rem;
`;

const RecipeImageWrapperBase = styled.div`
  position: relative;
  grid-row: 1/3;
  grid-column: 1/3;

  &:hover {
    transform: scale(1.03);
  }

  transition: all 0.5s;
`;

const RecipeImageWrapper2 = styled(RecipeImageWrapperBase)`
  grid-row: 1/2;
  grid-column: 3/4;
`;

const RecipeImageWrapper3 = styled(RecipeImageWrapperBase)`
  grid-row: 1/2;
  grid-column: 4/5;
`;

const RecipeImageWrapper4 = styled(RecipeImageWrapperBase)`
  grid-row: 2/3;
  grid-column: 3/5;
`;

const SquareImageWrapper = styled.div`
  position: relative;
  border-radius: 1.5rem;
  overflow: hidden;
  width: 100%;
  height: 100%;
  cursor: pointer;
  filter: drop-shadow(0px 2px 5px rgba(0, 0, 0, 0.25));
`;

const TitleOnImage = styled.div`
  position: absolute;
  width: calc(100% - 4rem);
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  z-index: 5;
  left: 2rem;
  bottom: 2rem;
  font-size: 20px;
  font-weight: 500;
  cursor: pointer;
  color: white;
  text-shadow: 0px 0.2rem 0.2rem rgba(0, 0, 0, 0.25);
`;
