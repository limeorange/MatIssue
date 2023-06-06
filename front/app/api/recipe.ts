import { axiosBase } from "./axios";

export const getRecipeById = async (recipe_id: string) => {
  try {
    const response = await axiosBase.get(`recipes/${recipe_id}`);
    const recipeData = response.data.recipe;
    return recipeData;
  } catch (error) {
    console.error("Error fetching recipe data:", error);
  }
};

export const getAllRecipes = async () => {
  try {
    const response = await axiosBase.get("/recipes/");
    return response.data;
  } catch (err: any) {
    console.log(err.response.data.detail);
  }
};
