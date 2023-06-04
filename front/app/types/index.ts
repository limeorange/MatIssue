export type User =
  | {
      user_id: string;
      username: string;
      email: string;
      birth_date: string;
      img: string;
      created_at: string;
    }
  | undefined;

export type RecipeData = {
  image: string;
  title?: string;
  author?: string;
  likes?: number;
  view?: string;
  id?: string;
  timestamp?: number;
  servings?: number;
  duration?: number;
  difficulty?: 0 | 1 | 2;
};
