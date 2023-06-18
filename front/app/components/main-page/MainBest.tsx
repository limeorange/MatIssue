"use client";

import { useQuery } from "@tanstack/react-query";

import MainListingRecipe from "../listings/MainListingRecipe";

import { getRecipesByPopularity } from "@/app/api/recipe";
import { Recipe } from "@/app/types";

const MainBest = ({ initialBestRecipes }: { initialBestRecipes: Recipe[] }) => {
  /*  베스트 레시피 데이터를 리액트쿼리를 사용해서 캐시로 관리
  초기값은 서버에서 받아온 데이터를 넣고, 클라이언트에서 데이터를 업데이트하면 리패치함 */
  const {
    data: bestRecipes,
    isLoading,
    isError,
  } = useQuery<Recipe[]>(["bestRecipes"], () => getRecipesByPopularity(), {
    refetchOnWindowFocus: false, // 우리 페이지 focus할때마다 리패치 여부
    retry: 0, // 데이터 패치 실패할때 재시도 횟수
    initialData: initialBestRecipes, // 데이터 초기값 지정 (page.tsx 에서 패치해온 값)
  });

  return (
    <MainListingRecipe
      title="베스트 레시피"
      recipes={bestRecipes}
      isLoading={isLoading}
      isError={isError}
      isFilter={true}
      categoryUrl="/recipes/category/best?category=best"
    />
  );
};

export default MainBest;
