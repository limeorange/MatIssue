export type ExampleItems = {
  title: string;
  description: string;
};

export type User = {
  id: string;
  name: string | null;
  email: string | null;
  emailVerified: Date | null;
  image: string | null;
  hashedPassword: string | null;
  createdAt: Date;
  updatedAt: Date;
  followingIDs: string[];
  followerIDs: string[];
  likedRecipes: string[];
};
