"use client";

import styled from "styled-components";
import Logo from "../components/header/Logo";
import { useState } from "react";
import AdminSearchBar from "../components/admin/AdminSearchBar";
import AdminUserList from "../components/admin/AdminUserList";
import AdminRecipeList from "../components/admin/AdminRecipeList";
import { Recipe } from "../types";

type UserData = {
  user_id: string;
  username: string;
  email: string;
  birthdate: string;
  authority: string;
  state: string;
};

const USER_DATA: UserData[] = [
  {
    user_id: "shagrat",
    username: "ynnsuis",
    email: "shagrat@naver.com",
    birthdate: "2000-01-01",
    authority: "admin",
    state: "활동가능",
  },
  {
    user_id: "shagrat",
    username: "ynnsuis",
    email: "shagrat@naver.com",
    birthdate: "2000-01-01",
    authority: "admin",
    state: "활동가능",
  },
  {
    user_id: "shagrat",
    username: "ynnsuis",
    email: "shagrat@naver.com",
    birthdate: "2000-01-01",
    authority: "admin",
    state: "활동가능",
  },
  {
    user_id: "shagrat",
    username: "ynnsuis",
    email: "shagrat@naver.com",
    birthdate: "2000-01-01",
    authority: "admin",
    state: "활동가능",
  },
  {
    user_id: "shagrat",
    username: "ynnsuis",
    email: "shagrat@naver.com",
    birthdate: "2000-01-01",
    authority: "admin",
    state: "활동가능",
  },
  {
    user_id: "shagrat",
    username: "ynnsuis",
    email: "shagrat@naver.com",
    birthdate: "2000-01-01",
    authority: "admin",
    state: "활동가능",
  },
  {
    user_id: "shagrat",
    username: "ynnsuis",
    email: "shagrat@naver.com",
    birthdate: "2000-01-01",
    authority: "admin",
    state: "활동가능",
  },
  {
    user_id: "shagrat",
    username: "ynnsuis",
    email: "shagrat@naver.com",
    birthdate: "2000-01-01",
    authority: "admin",
    state: "활동가능",
  },
  {
    user_id: "shagrat",
    username: "ynnsuis",
    email: "shagrat@naver.com",
    birthdate: "2000-01-01",
    authority: "admin",
    state: "활동가능",
  },
  {
    user_id: "shagrat",
    username: "ynnsuis",
    email: "shagrat@naver.com",
    birthdate: "2000-01-01",
    authority: "admin",
    state: "활동가능",
  },
  {
    user_id: "shagrat",
    username: "ynnsuis",
    email: "shagrat@naver.com",
    birthdate: "2000-01-01",
    authority: "admin",
    state: "활동가능",
  },
  {
    user_id: "shagrat",
    username: "ynnsuis",
    email: "shagrat@naver.com",
    birthdate: "2000-01-01",
    authority: "admin",
    state: "활동가능",
  },
  {
    user_id: "shagrat",
    username: "ynnsuis",
    email: "shagrat@naver.com",
    birthdate: "2000-01-01",
    authority: "admin",
    state: "활동가능",
  },
  {
    user_id: "shagrat",
    username: "ynnsuis",
    email: "shagrat@naver.com",
    birthdate: "2000-01-01",
    authority: "admin",
    state: "활동가능",
  },
  {
    user_id: "shagrat",
    username: "ynnsuis",
    email: "shagrat@naver.com",
    birthdate: "2000-01-01",
    authority: "admin",
    state: "활동가능",
  },
  {
    user_id: "shagrat",
    username: "ynnsuis",
    email: "shagrat@naver.com",
    birthdate: "2000-01-01",
    authority: "admin",
    state: "활동가능",
  },
  {
    user_id: "shagrat",
    username: "ynnsuis",
    email: "shagrat@naver.com",
    birthdate: "2000-01-01",
    authority: "admin",
    state: "활동가능",
  },
  {
    user_id: "shagrat",
    username: "ynnsuis",
    email: "shagrat@naver.com",
    birthdate: "2000-01-01",
    authority: "admin",
    state: "활동가능",
  },
  {
    user_id: "shagrat",
    username: "ynnsuis",
    email: "shagrat@naver.com",
    birthdate: "2000-01-01",
    authority: "admin",
    state: "활동가능",
  },
  {
    user_id: "shagrat",
    username: "ynnsuis",
    email: "shagrat@naver.com",
    birthdate: "2000-01-01",
    authority: "admin",
    state: "활동가능",
  },
  {
    user_id: "shagrat",
    username: "ynnsuis",
    email: "shagrat@naver.com",
    birthdate: "2000-01-01",
    authority: "admin",
    state: "활동가능",
  },
  {
    user_id: "shagrat",
    username: "ynnsuis",
    email: "shagrat@naver.com",
    birthdate: "2000-01-01",
    authority: "admin",
    state: "활동가능",
  },
  {
    user_id: "shagrat",
    username: "ynnsuis",
    email: "shagrat@naver.com",
    birthdate: "2000-01-01",
    authority: "admin",
    state: "활동가능",
  },
  {
    user_id: "shagrat",
    username: "ynnsuis",
    email: "shagrat@naver.com",
    birthdate: "2000-01-01",
    authority: "admin",
    state: "활동가능",
  },
  {
    user_id: "shagrat",
    username: "ynnsuis",
    email: "shagrat@naver.com",
    birthdate: "2000-01-01",
    authority: "admin",
    state: "활동가능",
  },
  {
    user_id: "shagrat",
    username: "ynnsuis",
    email: "shagrat@naver.com",
    birthdate: "2000-01-01",
    authority: "admin",
    state: "활동가능",
  },
  {
    user_id: "shagrat",
    username: "ynnsuis",
    email: "shagrat@naver.com",
    birthdate: "2000-01-01",
    authority: "admin",
    state: "활동가능",
  },
  {
    user_id: "shagrat",
    username: "ynnsuis",
    email: "shagrat@naver.com",
    birthdate: "2000-01-01",
    authority: "admin",
    state: "활동가능",
  },
  {
    user_id: "shagrat",
    username: "ynnsuis",
    email: "shagrat@naver.com",
    birthdate: "2000-01-01",
    authority: "admin",
    state: "활동가능",
  },
  {
    user_id: "shagrat",
    username: "ynnsuis",
    email: "shagrat@naver.com",
    birthdate: "2000-01-01",
    authority: "admin",
    state: "활동가능",
  },
];

const RECIPE_DATA: Recipe[] = [];

const AdminClient = () => {
  const [currentCategory, setCurrentCategory] = useState<"유저" | "레시피">(
    "유저"
  );
  const [selectedUser, setSelectedUser] = useState();

  return (
    <AdminContainer>
      <CategoryBar>
        <LogoWrapper>
          <div>
            <Logo />
          </div>
        </LogoWrapper>
        <CategoryWrapper>
          <CategoryList>
            <CategoryItem
              onClick={() => setCurrentCategory("유저")}
              clicked={currentCategory === "유저"}
            >
              유저
            </CategoryItem>
            <CategoryItem
              onClick={() => setCurrentCategory("레시피")}
              clicked={currentCategory === "레시피"}
            >
              레시피
            </CategoryItem>
          </CategoryList>
        </CategoryWrapper>
      </CategoryBar>
      <MainContainer>
        <PanelContainer>
          <PanelHeaderArea>
            <AdminSearchBar />
            <PanelProfileBox>프로필네임</PanelProfileBox>
          </PanelHeaderArea>
          <PanelTitle>
            <h1>{currentCategory} </h1>
            <span>
              &nbsp;(
              {currentCategory === "유저" && USER_DATA.length}
              {currentCategory === "레시피" && RECIPE_DATA.length})
            </span>
          </PanelTitle>
          {currentCategory === "유저" && (
            <AdminUserList USER_DATA={USER_DATA} />
          )}
          {currentCategory === "레시피" && (
            <AdminRecipeList RECIPE_DATA={RECIPE_DATA} />
          )}
        </PanelContainer>
      </MainContainer>
    </AdminContainer>
  );
};

export default AdminClient;

const AdminContainer = styled.div`
  display: flex;
  width: 100vw;
  min-height: 100vh;
  font-size: 16px;
  font-weight: 600;
  color: #666;
`;

const CategoryBar = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 30rem;
  border-right: 1px solid #ddd;
  background-color: white;
`;

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  padding-left: 4rem;
  height: 8rem;
  border-bottom: 1px solid #ddd;
  background-color: #fbe2a1;
`;

const CategoryWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 3rem;
  padding-left: 5rem;
`;

const CategoryList = styled.ul`
  display: flex;

  flex-direction: column;
  gap: 1rem;

  font-size: 18px;
  font-weight: 500;
`;

const CategoryItem = styled.li<{ clicked: boolean }>`
  list-style-type: disc;
  cursor: pointer;

  ${(props) => props.clicked && "color : #000;"}
  ${(props) => props.clicked && "font-weight : 700;"}
`;

const MainContainer = styled.div`
  display: flex;
  width: 100%;
  min-height: 100vh;

  background-color: #f6f6f9;
`;

const PanelContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const PanelHeaderArea = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #ddd;
  background-color: white;
  height: 8rem;
  padding: 0 3rem;
`;

const PanelProfileBox = styled.div``;

const PanelTitle = styled.div`
  display: flex;
  align-items: center;
  margin-left: 3rem;

  h1 {
    font-size: 20px;
  }

  span {
    font-size: 18px;
    font-weight: 500;
  }
`;
