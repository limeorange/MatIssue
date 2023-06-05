import { axiosBase } from "./axios";

export const getRecipeById = async (recipe_id: string) => {
  try {
    const response = await axiosBase.get(`recipes/${recipe_id}`);
    const recipeData = JSON.parse(response.data[0].body);
    return recipeData;
  } catch (error) {
    console.error("Error fetching recipe data:", error);
  }
};
