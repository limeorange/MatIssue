"use client";

import styled from "styled-components";
import getCurrentUser from "../api/user";
import Header from "../components/header/Header";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();
  console.log(currentUser);

  return (
    <>
      <Header currentUser={currentUser} />
      <Main>{children}</Main>
    </>
  );
}

const Main = styled.main`
  padding-bottom: 8rem;
  padding-top: 13.1rem;
`;
