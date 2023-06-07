"use client";

import Link from "next/link";
import styled from "styled-components";
import Button from "../../components/UI/Button";
import RecipeCards from "../../components/my-page/RecipeCards";
import { useEffect, useState } from "react";
import ProfileCard from "../../components/my-page/ProfileCard";
import { useQuery } from "@tanstack/react-query";
import { User } from "@/app/types";

const MyPage = () => {
  const { data } = useQuery<User>(["currentUser"]);
  return (
    <>
      <Container>
        <Wrapper>
          <ProfileCard currentUser={data} />
          <RecipeCards />
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
