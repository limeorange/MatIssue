import {
  StyledContainer,
  StyledContentsArea,
  StyledSubTitle,
  StyledTitle,
  StyledTitleBox,
} from "@/app/styles/main/main.style";
import { RecipeData } from "@/app/types";
import Image from "next/image";
import styled from "styled-components";

const DUMMY_DATA: RecipeData[] = [
  {
    image: "/images/sushi1.png",
    title: "기가 막히는 초밥 만들기",
    author: "목동최고미남정훈",
    likes: 1234,
    view: "15,324",

    id: "1",
  },
  {
    image: "/images/sushi2.png",
    title: "메가 막히는 초밥 만들기",
    author: "목동최고미남정훈",
    likes: 1234,
    view: "15,324",
    id: "2",
  },
  {
    image: "/images/sushi3.png",
    title: "입이 막히는 초밥 만들기",
    author: "목동최고미남정훈",
    likes: 1234,
    view: "15,324",
    id: "3",
  },
  {
    image: "/images/sushi4.png",
    title: "코가 막히는 초밥 만들기",
    author: "목동최고미남정훈",
    likes: 1234,
    view: "15,324",
    id: "4",
  },
];

const MainAlone = () => {
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
          <RecipeImageWrapperBase>
            <SquareImageWrapper>
              <Image
                src={DUMMY_DATA[0].image}
                alt="ingredient"
                fill
                style={{ objectFit: "cover" }}
              />
            </SquareImageWrapper>
            <TitleOnImage>{DUMMY_DATA[0].title}</TitleOnImage>
          </RecipeImageWrapperBase>
          <RecipeImageWrapper2>
            <SquareImageWrapper>
              <Image
                src={DUMMY_DATA[1].image}
                alt="ingredient"
                fill
                style={{ objectFit: "cover" }}
              />
            </SquareImageWrapper>
            <TitleOnImage>{DUMMY_DATA[1].title}</TitleOnImage>
          </RecipeImageWrapper2>
          <RecipeImageWrapper3>
            <SquareImageWrapper>
              <Image
                src={DUMMY_DATA[2].image}
                alt="ingredient"
                fill
                style={{ objectFit: "cover" }}
              />
            </SquareImageWrapper>
            <TitleOnImage>{DUMMY_DATA[2].title}</TitleOnImage>
          </RecipeImageWrapper3>
          <RecipeImageWrapper4>
            <SquareImageWrapper>
              <Image
                src={DUMMY_DATA[3].image}
                alt="ingredient"
                fill
                style={{ objectFit: "cover" }}
              />
            </SquareImageWrapper>
            <TitleOnImage>{DUMMY_DATA[3].title}</TitleOnImage>
          </RecipeImageWrapper4>
        </RecipeContainer>
      </StyledContentsArea>
    </StyledContainer>
  );
};

export default MainAlone;

const RecipeContainer = styled.div`
  width: 100%;
  max-width: 120rem;
  margin: 0 auto;
  padding: 4rem 2rem;
  display: grid;
  grid-template-columns: repeat(4, 25rem);
  grid-template-rows: repeat(2, 25rem);
  gap: 2.5rem;
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
  filter: drop-shadow(0px 2px 16px rgba(0, 0, 0, 0.25));
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
