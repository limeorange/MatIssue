"use client";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Image from "next/image";
import { getAllRecipes } from "@/app/api/recipe";

// Assuming that a recipe has an id, a title, and a thumbnail image.
interface Recipe {
  recipe_id: string;
  recipe_title: string;
  recipe_thumbnail: string;
}

const GameStart: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [rounds, setRounds] = useState<Recipe[][]>([]);
  const [roundIndex, setRoundIndex] = useState(0);
  const [totalRounds, setTotalRounds] = useState(0); // 추가: 전체 라운드 수

  // Load recipes initially
  useEffect(() => {
    const fetchRecipes = async () => {
      const allRecipes = await getAllRecipes();
      setRecipes(allRecipes);
    };
    fetchRecipes();
  }, []);

  // When recipes are set, select 16 random ones for the game
  useEffect(() => {
    if (recipes.length > 0) {
      const gameRecipes = [...recipes]
        .sort(() => Math.random() - 0.5)
        .slice(0, 16);
      const numberOfRounds = Math.ceil(Math.log2(gameRecipes.length)); // 추가: 전체 라운드 수 계산
      setRounds([gameRecipes]);
      setTotalRounds(numberOfRounds); // 추가: 전체 라운드 수 설정
    }
  }, [recipes]);

  const handleSelectRecipe = (selectedRecipe: Recipe) => {
    // Move selected recipe to next round
    const currentRound = rounds[rounds.length - 1];
    const nextRound = currentRound.filter(
      (recipe) => recipe.recipe_id === selectedRecipe.recipe_id
    );

    setRounds([...rounds, nextRound]);

    // Update round index
    setRoundIndex(roundIndex + 1);
  };

  const currentMatch = rounds[0]
    ? rounds[0].slice(roundIndex, roundIndex + 2)
    : [];

  return (
    <WorldcupLayout>
      <GameHeader>레시피 이상형 월드컵!</GameHeader>
      <RoundHeader>
        {/* 추가: 현재 라운드와 전체 라운드 수 출력 */}
        {rounds.length > 0 && `라운드 (${roundIndex + 1}/${totalRounds})`}
      </RoundHeader>
      <CardContainer>
        {currentMatch.map((recipe: Recipe) => (
          <Card
            key={recipe.recipe_id}
            onClick={() => handleSelectRecipe(recipe)}
          >
            <h2>{recipe.recipe_title}</h2>
            <Image
              src={recipe.recipe_thumbnail}
              alt={recipe.recipe_title}
              width={320}
              height={320}
            />
          </Card>
        ))}
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

const RoundHeader = styled.h2`
  text-align: center;
  margin-bottom: 1rem;
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
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 32rem;
  height: 32rem;
`;
