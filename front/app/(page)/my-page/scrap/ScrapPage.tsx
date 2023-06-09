"use client";

import { useQuery } from "@tanstack/react-query";
import { Recipe, User } from "@/app/types";
import ProfileCard from "@/app/components/my-page/ProfileCard";
import styled from "styled-components";
import ScrapCardList from "@/app/components/my-page/scrap/ScrapCardList";

/** 레시피 스크랩 조회 페이지 컴포넌트 */
const Scrap = ({ currentUserRecipes }: { currentUserRecipes: Recipe[] }) => {
  const { data } = useQuery<User>(["currentUser"]);
  const recipesLength = currentUserRecipes.length;

  return (
    <>
      <Container>
        <Wrapper>
          <ProfileCard />
          {/* <ScrapCardList /> */}
        </Wrapper>
      </Container>
    </>
  );
};

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

export default Scrap;
