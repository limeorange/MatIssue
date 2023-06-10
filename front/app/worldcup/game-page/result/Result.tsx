"use client";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Image from "next/image";
import { getRecipeById } from "@/app/api/recipe";
import Logo from "@/app/components/header/Logo";
import { useSearchParams } from "next/navigation";
import LoadingModal from "@/app/components/UI/LoadingModal";
import Link from "next/link";

type StyledComponentProps = {
  isAnimateOut?: boolean;
};

type Recipe = {
  recipe_id: string;
  recipe_title: string;
  recipe_thumbnail: string;
};

const ResultPage: React.FC = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("winnerId");

  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [isAnimateOut, setIsAnimateOut] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

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
      <GameProgress>
        우승 레시피입니다! <br /> 클릭시 해당 레시피로 이동!
      </GameProgress>
      <Link href={`/recipe/${recipe.recipe_id}`} passHref>
        <CardLink>
          <RecipeTitleBox>{recipe.recipe_title}</RecipeTitleBox>
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
        </CardLink>
      </Link>
    </WorldcupLayout>
  );
};

export default ResultPage;

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
  margin-bottom: 1rem;
  font-family: "Dongle-Bold";
  transform-origin: center;
  transition: all 0.5s ease;
  opacity: 1;
  text-align: center;

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

const RecipeTitleBox = styled.div`
  font-size: 15px;
  color: #4f3d21;
  white-space: pre-line;
  text-align: center;
  transform-origin: center;
  transition: all 0.3s ease;
  opacity: 1;
`;

const CardLink = styled.div`
  transition: transform 0.3s ease;
  &:hover {
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
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  transition: opacity 0.3s ease;
  opacity: 1;
`;
