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

export type Recipe = {
  created_at: string;
  recipe_category?: string;
  recipe_description?: string;
  recipe_id: string;
  recipe_info?: { serving: number; time: number; level: number };
  recipe_ingredients?: { name: "string"; amount: "string" }[];
  recipe_like: number;
  recipe_sequence?: { step: number; picture: string; description: string }[];
  recipe_thumbnail: string;
  recipe_tip?: string;
  recipe_title: string;
  recipe_video?: string;
  recipe_view: number;
  user_id: string;
  user_nickname: string;
  _id?: string;
};
