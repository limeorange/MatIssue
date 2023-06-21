"use client";

import styled from "styled-components";
import RecipeCards from "../../components/my-page/RecipeCardList";
import ProfileCard from "../../components/my-page/ProfileCard";
import { useQuery } from "@tanstack/react-query";
import { Recipe } from "@/app/types";
import { getRecipeByCurrentId } from "@/app/api/recipe";

const MyPage = ({
  initialCurrentUserRecipes,
}: {
  initialCurrentUserRecipes: Recipe[];
}) => {
  /* 로그인한 유저가 작성한 레시피 데이터를 리액트쿼리 캐시로 관리
  초기값으로 서버에서 받아온 데이터를 넣고, 캐시를 초기화하면 데이터를 다시 패치함 */
  const { data: currentUserRecipes } = useQuery(
    ["currentUserRecipes"],
    () => getRecipeByCurrentId(),
    {
      refetchOnWindowFocus: false,
      retry: 0,
      initialData: initialCurrentUserRecipes,
    }
  );

  return (
    <Container>
      <Wrapper>
        <ProfileCard />
        <RecipeCards currentUserRecipes={currentUserRecipes} />
      </Wrapper>
    </Container>
  );
};

export default MyPage;

const Container = styled.div`
  flex-direction: column;
  width:100%;
  padding: 0 1.5rem;
  @media (min-width: 1024px) {
    
    max-width: 120rem;
  margin: 0 auto;
`;

const Wrapper = styled.div`
  margin: 0 auto;
  @media (min-width: 1024px) {
    display: flex;
    justify-content: flex-start;
    padding-top: 5rem;
  }
`;
