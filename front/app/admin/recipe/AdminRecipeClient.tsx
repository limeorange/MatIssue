"use client";

import { getAllRecipes } from "@/app/api/recipe";
import LoadingModal from "@/app/components/UI/LoadingModal";
import AdminRecipeList from "@/app/components/admin/recipe/AdminRecipeList";
import AdminSearchBar from "@/app/components/admin/AdminSearchBar";
import NotFound from "@/app/not-found";
import { Recipe } from "@/app/types";
import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const AdminRecipeClient = () => {
  const searchParams = useSearchParams();
  const search = searchParams?.get("search");

  const {
    data: recipes,
    isLoading,
    isError,
  } = useQuery<Recipe[]>(["recipes"], () => getAllRecipes(), {
    retry: 0,
    initialData: [],
  });

  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>(recipes);

  useEffect(() => {
    if (search) {
      const filteredRecipe = recipes?.filter((item) =>
        Object.values(item).some(
          (value) => typeof value === "string" && value.includes(search)
        )
      );
      setFilteredRecipes(filteredRecipe);
    } else {
      setFilteredRecipes(recipes);
    }
  }, [recipes, search]);

  if (isLoading) {
    return <LoadingModal />;
  }

  if (isError) {
    return <NotFound />;
  }

  return (
    <PanelContainer>
      <PanelHeaderArea>
        <AdminSearchBar />
      </PanelHeaderArea>
      <PanelTitle>
        <h1>레시피</h1>
        <span>({recipes.length})</span>
      </PanelTitle>
      <AdminRecipeList recipes={filteredRecipes} />
    </PanelContainer>
  );
};

export default AdminRecipeClient;

const PanelContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const PanelHeaderArea = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #ddd;
  background-color: white;
  height: 8rem;
  padding: 0 3rem;
`;

const PanelProfileBox = styled.div``;

const PanelTitle = styled.div`
  display: flex;
  align-items: center;
  margin-left: 3rem;

  h1 {
    font-size: 20px;
  }

  span {
    font-size: 18px;
    font-weight: 500;
  }
`;
