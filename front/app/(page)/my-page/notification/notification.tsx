"use client";
import Link from "next/link";
import styled from "styled-components";
import Button from "../../../components/UI/Button";
import React, { useState } from "react";
import ProfileCard from "@/app/components/my-page/ProfileCard";
import NotificationComponent from "@/app/components/my-page/Notification";

const Notification = () => {
  return (
    <>
      <Container>
        <Wrapper>
          <ProfileCard />
          <NotificationComponent />
        </Wrapper>
      </Container>
    </>
  );
};

export default Notification;

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
