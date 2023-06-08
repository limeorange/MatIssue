"use client";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Image from "next/image";
import { getAllRecipes } from "@/app/api/recipe";

type Recipe = {
  recipe_id: string;
  recipe_title: string;
  recipe_thumbnail: string;
};

const GameStart: React.FC = () => {
  const [foods, setFoods] = useState<Recipe[]>([]);
  const [displays, setDisplays] = useState<Recipe[]>([]);
  const [winners, setWinners] = useState<Recipe[]>([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const recipes = await getAllRecipes();
        recipes.sort(() => Math.random() - 0.5);
        const selectedRecipes = recipes.slice(0, 32); // 랜덤으로 32개의 레시피 선택
        setFoods(selectedRecipes);
        setDisplays([selectedRecipes[0], selectedRecipes[1]]);
      } catch (error) {
        // Handle error
      }
    };

    fetchRecipes();
  }, []);

  const clickHandler = (food: Recipe) => () => {
    if (foods.length <= 2) {
      if (winners.length === 0) {
        setDisplays([food]);
      } else {
        const updatedFood = [...winners, food];
        setFoods(updatedFood);
        setDisplays([updatedFood[0], updatedFood[1]]);
        setWinners([]);
      }
    } else if (foods.length > 2) {
      setWinners([...winners, food]);
      setDisplays([foods[2], foods[3]]);
      setFoods(foods.slice(2));
    }
  };

  return (
    <WorldcupLayout>
      <GameHeader>레시피 이상형 월드컵!</GameHeader>

      <CardContainer>
        {displays.map((recipe) => (
          <Card key={recipe.recipe_id} onClick={clickHandler(recipe)}>
            <h2>{recipe.recipe_title}</h2>
            <Image
              src={recipe.recipe_thumbnail}
              alt={recipe.recipe_title}
              width={320}
              height={320}
            />
          </Card>
        ))}

        {displays.length === 1 && (
          <h2>짜잔! 우승 레시피입니다: {displays[0].recipe_title}</h2>
        )}
      </CardContainer>
    </WorldcupLayout>
  );
};

export default GameStart;

const WorldcupLayout = styled.div`
  width: 70rem;
  margin: 0 auto;
`;

const GameHeader = styled.h1`
  text-align: center;
  margin-bottom: 2rem;
`;

const CardContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Card = styled.div`
  width: 33rem;
  border: 1px solid #000;
  padding: 1rem;
  box-sizing: border-box;
  cursor: pointer;
`;
