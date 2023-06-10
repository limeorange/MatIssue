"use client";

import styled from "styled-components";
import Link from "next/link";
import Button from "../UI/Button";
import { Recipe, User } from "@/app/types";
import { useQuery } from "@tanstack/react-query";

const Follower = () => {
  return (
    <>
      <Container>
        <div>
          <h2>팔로워</h2>
          <h2>5</h2>
        </div>
        <div>
          <input type="text" placeholder="검색" />
          <StyledImage src="/images/reading-glasses.svg" />
        </div>
      </Container>
    </>
  );
};

const Container = styled.div``;

const StyledImage = styled.img``;
