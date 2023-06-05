"use client";

import styled from "styled-components";
import RecipeCards from "../../components/my-page/RecipeCards";
import ProfileCard from "../../components/my-page/ProfileCard";

const Admin = () => {
  return (
    <>
      <Container>
        <Wrapper>
          <ProfileCard />
          <RecipeCards />
        </Wrapper>
      </Container>
    </>
  );
};

export default Admin;

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
