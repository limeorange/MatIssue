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

    if (!response.data) {
      return [];
    }
    return response.data;
  } catch (err: any) {
    console.log(err?.response?.data?.detail);
  }
};

export const getRecipesByParams = async (searchParams: any) => {
  try {
    const response = await axiosBase.get(
      `/recipes/search?value=${searchParams}`
    );

    if (!response.data) {
      return [];
    }
    return response.data;
  } catch (err: any) {
    console.log(err?.response?.data?.detail);
  }
};

export const getRecipesByCategory = async (category: string) => {
  try {
    const response = await axiosBase.get(
      `/recipes/categories?value=${category}`
    );

    if (!response.data) {
      return [];
    }
    return response.data;
  } catch (err: any) {
    console.log(err?.response?.data?.detail);
  }
};

export const getRecipesByPopularity = async () => {
  try {
    const response = await axiosBase.get("/recipes/popularity");

    if (!response.data) {
      return [];
    }
    return response.data;
  } catch (err: any) {
    console.log(err?.response?.data?.detail);
  }
};

export const getRecipesByLastest = async () => {
  try {
    const response = await axiosBase.get("/recipes/latest");

    if (!response.data) {
      return [];
    }
    return response.data;
  } catch (err: any) {
    console.log(err?.respons?.data?.detail);
  }
};

export const getRecipesBySingle = async () => {
  try {
    const response = await axiosBase.get("/recipes/single");

    if (!response.data) {
      return [];
    }
    return response.data;
  } catch (err: any) {
    console.log(err?.response?.data?.detail);
  }
};

export const getRecipesByVegetarian = async () => {
  try {
    const response = await axiosBase.get("/recipes/vegetarian");

    if (!response.data) {
      return [];
    }
    return response.data;
  } catch (err: any) {
    console.log(err?.response?.data?.detail);
  }
};

export const postRecipe = async (recipeData: any) => {
  try {
    const response = await axiosBase.post("/recipes/", recipeData);
    return response;
  } catch (error) {
    console.log("Error creating recipe:", error);
  }
};

export const updateRecipe = async (recipe_id: string, recipeData: any) => {
  try {
    const response = await axiosBase.patch(`recipes/${recipe_id}`, recipeData);
    return response;
  } catch (error) {
    console.log("Error updating recipe:", error);
  }
};

export const getRecipeByCurrentId = async () => {
  try {
    const response = await axiosBase.get("/recipes/user");

    if (!response.data.recipes) {
      return [];
    }

    return response.data.recipes;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getRecipesByUserId = async (user_id: string) => {
  try {
    const response = await axiosBase.get(`/recipes/user/${user_id}`);
    if (!response.data) {
      return [];
    }
    return response.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};
