"use client";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Image from "next/image";
import { useParams } from "react-router-dom";
import { getRecipeById } from "@/app/api/recipe";
import Logo from "@/app/components/header/Logo";
import { useSearchParams } from "next/navigation";
import LoadingModal from "@/app/components/UI/LoadingModal";

type StyledComponentProps = {
  isAnimateOut?: boolean;
};

type Recipe = {
  recipe_id: string;
  recipe_title: string;
  recipe_thumbnail: string;
};

const ResultPage: React.FC = () => {
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [isAnimateOut, setIsAnimateOut] = useState(false);
  const searchParams = useSearchParams();
  const id = searchParams.get("winnerId");

  useEffect(() => {
    if (id) {
      getRecipeById(id)
        .then((data) => {
          setRecipe(data);
        })
        .catch((err) => console.error(err));
    }
  }, [id]);

  if (!recipe) {
    return <LoadingModal />;
  }

  return (
    <WorldcupLayout>
      <Logo />
      <GameHeader isAnimateOut={isAnimateOut}>레시피 이상형 월드컵!</GameHeader>
      <GameProgress>축하합니다! 우승 레시피입니다.</GameProgress>
      <RecipeTitle>
        {recipe.recipe_title} <br /> 사진 클릭시 레시피로 이동합니다.
      </RecipeTitle>
      <ImageWrapper>
        <ImageContainer>
          <Image
            src={recipe.recipe_thumbnail}
            alt={recipe.recipe_title}
            layout="fill"
            objectFit="cover"
            style={{ borderRadius: "1.5rem" }}
          />
        </ImageContainer>
      </ImageWrapper>
    </WorldcupLayout>
  );
};

export default ResultPage;
const ResultLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 3em;
`;

const CongratsText = styled.p`
  font-size: 50px;
  color: #fbd26a;
  font-family: "Dongle-Bold";
  margin-bottom: -3rem;
`;

const ResultPageLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2em;
`;

const RecipeCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #ccc;
  padding: 1em;
  border-radius: 1em;
`;

const RecipeTitle = styled.h2`
  font-size: 2em;
  margin-bottom: 1em;
`;

const RecipeImage = styled.img`
  max-width: 100%;
  height: auto;
`;

const WorldcupLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 3em;

  @keyframes slideUp {
    0% {
      transform: translateY(10%);
      opacity: 0;
    }

    100% {
      transform: translateY(0);
      opacity: 1;
    }
  }
`;

const GameHeader = styled.p<StyledComponentProps>`
  font-size: 80px;
  color: #fbd26a;
  font-family: "Dongle-Bold";
  margin-bottom: -3rem;

  & span {
    font-size: 40px;
  }

  animation: ${(props) =>
    props.isAnimateOut
      ? "slideOut 1.3s ease-in-out"
      : "slideUp 1s ease-in-out"};
  animation-delay: ${(props) => (props.isAnimateOut ? "0s" : "0.3s")};
`;

const GameProgress = styled.div`
  font-size: 50px;
  color: #4f3d21;
  margin-bottom: 5rem;
  font-family: "Dongle-Bold";
  transform-origin: center;
  transition: all 0.5s ease;
  opacity: 1;

  &.grow {
    transform: scale(0.1);
    opacity: 0;
  }
  &.normal {
    transform: scale(1);
    opacity: 1;
  }
  &.shrink {
    transform: scale(0.1);
    opacity: 0;
  }
`;

const CardContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Card = styled.div`
  width: 32.5rem;
  border: none;
  box-sizing: border-box;
  cursor: pointer;
  margin-right: 2rem;
  position: relative;
  transition: transform 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
  }
`;

const RecipeTitleBox = styled.div`
  font-size: 15px;
  color: #4f3d21;
  white-space: pre-line;
  text-align: center;
  transform-origin: center;
  transition: all 0.3s ease;
  opacity: 1;

  ${Card}:hover & {
    transform: translateY(-5px);
  }
`;

const ImageWrapper = styled.div`
  width: 32.5rem;
  height: 32.5rem;
  overflow: hidden;
  border: 0.2rem solid #fbd26a;
  border-radius: 1.5rem;
  position: relative;
  transition: transform 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
  }
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  transition: opacity 0.3s ease;
  opacity: 1;

  ${ImageWrapper}:hover & {
    opacity: 0.8;
  }
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 1rem;
`;

const ResultText = styled.p<StyledComponentProps>`
  font-size: 17px;
  color: #4f3d21;

  animation: ${(props) =>
    props.isAnimateOut
      ? "slideOut 1.3s ease-in-out"
      : "slideUp 1s ease-in-out"};
  animation-delay: ${(props) => (props.isAnimateOut ? "0s" : "0.3s")};
`;
