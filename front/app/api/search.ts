import { axiosBase } from "./axios";

export const getRecipeByTitle = async (recipe_title: string) => {
  try {
    const response = await axiosBase.get(
      `recipes/search?title=${recipe_title}`
    );
    const recipeData = JSON.parse(response.data[0].body);
    return recipeData;
  } catch (error) {
    console.error("Error fetching recipe data:", error);
  }
};
