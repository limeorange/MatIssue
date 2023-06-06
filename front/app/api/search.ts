import { axiosBase } from "./axios";

export const getRecipeByTitle = async (recipe_title: string | null) => {
  try {
    const response = await axiosBase.get(
      `recipes/search?title=${recipe_title}`
    );

    return response.data;
  } catch (err: any) {
    console.log(err.response.data.detail);
  }
};
