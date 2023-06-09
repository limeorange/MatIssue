"use client";

import styled from "styled-components";
import UsersPanel from "../components/admin/UsersPanel";
import Logo from "../components/header/Logo";

const AdminClient = () => {
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
            <li>유저</li>
            <li>레시피</li>
          </CategoryList>
        </CategoryWrapper>
      </CategoryBar>
      <MainContainer>
        <UsersPanel />
      </MainContainer>
    </AdminContainer>
  );
};

export default AdminClient;

const AdminContainer = styled.div`
  display: flex;
  width: 100vw;
  heght: 100vh;
  font-size: 16px;
  font-weight: 600;
  color: #666;
`;

const CategoryBar = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
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
  padding-top: 4rem;
  padding-left: 4rem;
`;

const CategoryList = styled.ul`
  display: flex;

  flex-direction: column;
  gap: 2rem;

  font-size: 18px;
  font-weight: 500;
`;

const MainContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  padding: 4rem;

  background-color: #f6f6f9;
`;
