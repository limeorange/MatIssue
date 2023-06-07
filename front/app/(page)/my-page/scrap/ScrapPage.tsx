"use client";

import { useQuery } from "@tanstack/react-query";
import { User } from "@/app/types";
import ProfileCard from "@/app/components/my-page/ProfileCard";
import styled from "styled-components";
import RecipeCards from "@/app/components/my-page/RecipeCards";

/** 레시피 스크랩 조회 페이지 컴포넌트 */
const Scrap = () => {
  const { data } = useQuery<User>(["currentUser"]);
  return (
    <>
      <Container>
        <Wrapper>
          <ProfileCard currentUser={data} />
          {/* <RecipeCards userId={data?.user_id} /> */}
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
