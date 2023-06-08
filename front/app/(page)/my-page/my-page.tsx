"use client";

import Link from "next/link";
import styled from "styled-components";
import Button from "../../components/UI/Button";
import RecipeCards from "../../components/my-page/RecipeCardList";
import { useEffect, useState } from "react";
import ProfileCard from "../../components/my-page/ProfileCard";
import { useQuery } from "@tanstack/react-query";
import { User, Recipe } from "@/app/types";

const MyPage = ({ currentUserRecipes }: { currentUserRecipes: Recipe[] }) => {
  const { data } = useQuery<User>(["currentUser"]);
  return (
    <>
      <Container>
        <Wrapper>
          <ProfileCard currentUser={data} />
          <RecipeCards currentUserRecipes={currentUserRecipes} />
        </Wrapper>
      </Container>
    </>
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
