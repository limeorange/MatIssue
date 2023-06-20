export type User = {
  user_id: string;
  username: string;
  email: string;
  birth_date: string;
  img: string;
  password: string;
  created_at: string;
  session_id: string;
  email_code?: string;
  id: string;
  fans: string[];
  subscriptions: string[];
};

export type Recipe = {
  recipe_id: string;
  recipe_title: string;
  recipe_thumbnail: string;
  recipe_video: string;
  recipe_description: string;
  recipe_category: string;
  recipe_info: {
    serving: number;
    time: number;
    level: number;
  };
  recipe_ingredients: {
    name: string;
    amount: string;
  }[];
  recipe_sequence: {
    step: number;
    picture: string;
    description: string;
  }[];
  recipe_tip: string;
  recipe_view: number;
  recipe_like: string[];
  user_id: string;
  user_nickname: string;
  created_at: string;

  // 댓글 관련 Data Type 정의
  comments: Comments[];
};

export type Comments = {
  comment_author: string;
  comment_text: string;
  comment_like: string[];
  comment_id: string;
  created_at: string;
  comment_parent: string;
  updated_at: string;
  comment_nickname: string;
  comment_profile_img: string;
};
