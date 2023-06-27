"use client";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Image from "next/image";
import { getAllRecipes } from "@/app/api/recipe";
import Link from "next/link";
import LoadingModal from "@/app/components/UI/LoadingModal";
import Logo from "@/app/components/header/Logo";
import { useRecoilState } from "recoil";
import darkModeAtom from "@/app/store/darkModeAtom";

type StyledComponentProps = {
  isAnimateOut?: boolean;
};

type Recipe = {
  recipe_id: string;
  recipe_title: string;
  recipe_thumbnail: string;
};

const WorldcupGame = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const num = searchParams?.get("stage");

  const [foods, setFoods] = useState<Recipe[]>([]);
  const [displays, setDisplays] = useState<Recipe[]>([]);
  const [winners, setWinners] = useState<Recipe[]>([]);
  const [stage, setStage] = useState(num ? parseInt(num) : 16);
  const [selectedCount, setSelectedCount] = useState(0);
  const [isAnimateOut, setIsAnimateOut] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isDarkMode, setIsDarkMode] = useRecoilState(darkModeAtom);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const recipes = await getAllRecipes();
        recipes.sort(() => Math.random() - 0.5);
        const selectedRecipes = recipes.slice(0, num);
        setFoods(selectedRecipes);
        setDisplays([selectedRecipes[0], selectedRecipes[1]]);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };

    fetchRecipes();
  }, [num]);

  const clickHandler = (food: Recipe) => () => {
    if (stage !== 1) {
      setSelectedCount((prevCount) => prevCount + 1);
    }

    if (foods.length <= 2) {
      if (winners.length === 0) {
        const queryParams = { winnerId: food.recipe_id };
        const query = new URLSearchParams(queryParams).toString();
        router.push(`/worldcup/game-page/result?${query}`);
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
    return <LoadingModal />;
  }

  return (
    <WorldcupLayout>
      <Logo />
      <GameHeader>레시피 이상형 월드컵!</GameHeader>
      <GameProgressBox isDarkMode={isDarkMode}>
        {stage === 2 ? (
          "결승전"
        ) : (
          <>
            {`${stage}강 (`}
            <span style={{ color: "#fbd26a" }}>{selectedCount + 1}</span>
            {`/${stage / 2})`}
          </>
        )}
      </GameProgressBox>
      <CardContainer>
        {displays.map((recipe, index) =>
          stage === 1 && displays.length === 1 ? (
            <>
              {index !== 0 && <VSBox isDarkMode={isDarkMode}>VS</VSBox>}
              <Link
                href={`/recipes/${recipe.recipe_id}`}
                key={recipe.recipe_id}
                passHref
              >
                <Card onClick={clickHandler(recipe)}>
                  <RecipeTitleBox isDarkMode={isDarkMode}>
                    {recipe.recipe_title}
                  </RecipeTitleBox>
                  <ImageWrapper>
                    <ImageBox>
                      <Image
                        src={recipe.recipe_thumbnail}
                        alt={recipe.recipe_title}
                        layout="fill"
                        objectFit="cover"
                        style={{ borderRadius: "1.5rem" }}
                      />
                    </ImageBox>
                  </ImageWrapper>
                </Card>
              </Link>
            </>
          ) : (
            <>
              {index !== 0 && <VSBox isDarkMode={isDarkMode}>VS</VSBox>}
              <Card onClick={clickHandler(recipe)} key={recipe.recipe_id}>
                <RecipeTitleBox isDarkMode={isDarkMode}>
                  {recipe.recipe_title}
                </RecipeTitleBox>
                <ImageWrapper>
                  <ImageBox>
                    <Image
                      src={recipe.recipe_thumbnail}
                      alt={recipe.recipe_title}
                      layout="fill"
                      objectFit="cover"
                      style={{ borderRadius: "1.5rem" }}
                    />
                  </ImageBox>
                </ImageWrapper>
              </Card>
            </>
          )
        )}
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
  margin: auto;
  padding: 1.5rem;
  width: 100%;
  max-width: 50rem;
  height: 100vh;

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

  @media (min-width: 1024px) {
    padding: 0;
  }
`;

const GameHeader = styled.p<StyledComponentProps>`
  font-size: 60px;
  color: #fbd26a;
  font-family: "Dongle-Bold";
  margin-bottom: -3rem;
  display: none;

  & span {
    font-size: 40px;
  }

  @media (min-width: 1024px) {
    font-size: 80px;
    display: block;
  }
`;

const GameProgressBox = styled.div<{ isDarkMode: boolean }>`
  font-size: 35px;
  color: ${(props) => (props.isDarkMode ? props.theme.lightGrey : "#4f3d21")};
  margin-bottom: 0.5rem;
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

  @media (min-width: 1024px) {
    font-size: 50px;
    margin-bottom: 2rem;
  }
`;

const CardContainer = styled.div`
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  align-items: center;

  @media (min-width: 1024px) {
    flex-direction: row;
  }
`;

const VSBox = styled.div<{ isDarkMode: boolean }>`
  font-size: 25px;
  color: ${(props) => (props.isDarkMode ? props.theme.lightGrey : "#4f3d21")};
  font-family: "Dongle-Bold";
  margin-left: 2rem;
  margin-right: 2rem;
  margin-top: 1rem;
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

  @media (min-width: 1024px) {
    font-size: 50px;
    margin-top: 3rem;
  }
`;

const Card = styled.div`
  width: 32.5rem;
  border: none;
  box-sizing: border-box;
  cursor: pointer;
  position: relative;
  transition: transform 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
  }
`;

const RecipeTitleBox = styled.div<{ isDarkMode: boolean }>`
  font-size: 20px;
  color: ${(props) => (props.isDarkMode ? props.theme.lightGrey : "#4f3d21")};
  margin-bottom: 1rem;
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
  width: 100%;
  height: 20.5rem;
  overflow: hidden;
  box-shadow: 0 0 0.3rem rgba(0, 0, 0, 0.3);
  border-radius: 1.5rem;
  position: relative;
  transition: transform 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
  }

  @media (min-width: 1024px) {
    width: 32.5rem;
    height: 32.5rem;
  }
`;

const ImageBox = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  transition: opacity 0.3s ease;
  opacity: 1;

  ${ImageWrapper}:hover & {
    opacity: 0.8;
  }
`;
