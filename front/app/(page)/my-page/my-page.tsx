"use client";

import styled from "styled-components";
import RecipeCards from "../../components/my-page/RecipeCardList";
import ProfileCard from "../../components/my-page/ProfileCard";
import { useQuery } from "@tanstack/react-query";
import { User, Recipe } from "@/app/types";

const MyPage = ({ currentUserRecipes }: { currentUserRecipes: Recipe[] }) => {
  const { data } = useQuery<User>(["currentUser"]);

  // const recipesLength = currentUserRecipes.length;
  console.log(currentUserRecipes);
  return (
    <Container>
      <Wrapper>
        <ProfileCard currentUser={data} />
        <RecipeCards initialCurrentUserRecipes={currentUserRecipes} />
      </Wrapper>
    </Container>
  );
};

export default MyPage;

const Container = styled.div`
  width: 100%;
  max-width: 120rem;
  margin: 0 auto;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  padding-top: 5rem;
`;
