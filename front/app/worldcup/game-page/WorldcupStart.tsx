"use client";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Image from "next/image";
import { getAllRecipes } from "@/app/api/recipe";
import Link from "next/link";
import LoadingModal from "@/app/components/UI/LoadingModal";
import Logo from "@/app/components/header/Logo";

type StyledComponentProps = {
  isAnimateOut?: boolean;
};

type Recipe = {
  recipe_id: string;
  recipe_title: string;
  recipe_thumbnail: string;
};

const WorldcupGame: React.FC = () => {
  const [foods, setFoods] = useState<Recipe[]>([]);
  const [displays, setDisplays] = useState<Recipe[]>([]);
  const [winners, setWinners] = useState<Recipe[]>([]);
  const [stage, setStage] = useState(32);
  const [selectedCount, setSelectedCount] = useState(0);
  const [isAnimateOut, setIsAnimateOut] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const recipes = await getAllRecipes();
        recipes.sort(() => Math.random() - 0.5);
        const selectedRecipes = recipes.slice(0, 32); // 랜덤으로 32개의 레시피 선택
        setFoods(selectedRecipes);
        setDisplays([selectedRecipes[0], selectedRecipes[1]]);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  const clickHandler = (food: Recipe) => () => {
    if (stage !== 1) {
      setSelectedCount((prevCount) => prevCount + 1);
    }

    if (foods.length <= 2) {
      if (winners.length === 0) {
        setDisplays([food]);
        setStage(1);
      } else {
        const updatedFood = [...winners, food];
        setFoods(updatedFood);
        setDisplays([updatedFood[0], updatedFood[1]]);
        setWinners([]);
        setStage((prevStage) => prevStage / 2);
        setSelectedCount(0);
      }
    } else if (foods.length > 2) {
      setWinners([...winners, food]);
      setDisplays([foods[2], foods[3]]);
      setFoods(foods.slice(2));
    }
  };

  if (isLoading) {
    // 데이터 로딩 중일 때 로딩 모달 표시
    return <LoadingModal />;
  }

  return (
    <WorldcupLayout>
      <Logo />
      <GameHeader isAnimateOut={isAnimateOut}>레시피 이상형 월드컵!</GameHeader>
      <GameProgress>
        {stage === 1 && displays.length === 1
          ? "우승 레시피 선정!"
          : stage === 2
          ? "결승전"
          : `${stage}강 (${selectedCount + 1}/${stage / 2})`}
      </GameProgress>
      <CardContainer>
        {displays.map((recipe) =>
          stage === 1 && displays.length === 1 ? (
            <Link
              href={`/recipes/${recipe.recipe_id}`}
              key={recipe.recipe_id}
              passHref
            >
              <Card onClick={clickHandler(recipe)}>
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
              </Card>
            </Link>
          ) : (
            <Card onClick={clickHandler(recipe)} key={recipe.recipe_id}>
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
            </Card>
          )
        )}
        <TextContainer>
          {displays.length === 1 && (
            <ResultText>
              짜잔! 우승 레시피입니다. <br /> 사진을 클릭시 해당 레시피로
              이동합니다.
            </ResultText>
          )}
        </TextContainer>
      </CardContainer>
    </WorldcupLayout>
  );
};

export default WorldcupGame;

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
