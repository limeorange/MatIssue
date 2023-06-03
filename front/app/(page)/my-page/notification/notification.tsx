"use client";
import Link from "next/link";
import styled from "styled-components";
import Button from "../../../components/UI/Button";
import React, { useState } from "react";

const Notification = () => {
  return (
    <>
      <Container>
        <Header>알림</Header>
      </Container>
    </>
  );
};

export default Notification;

const Container = styled.div``;

const Header = styled.h1``;
