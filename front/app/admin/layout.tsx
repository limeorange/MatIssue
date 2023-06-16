"use client";

import styled from "styled-components";
import Logo from "../components/header/Logo";
import { usePathname, useRouter } from "next/navigation";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const currentPath = usePathname();

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
              onClick={() => router.push("/admin/user")}
              clicked={currentPath === "/admin/user"}
            >
              유저
            </CategoryItem>
            <CategoryItem
              onClick={() => router.push("/admin/recipe")}
              clicked={currentPath === "/admin/recipe"}
            >
              레시피
            </CategoryItem>
          </CategoryList>
        </CategoryWrapper>
      </CategoryBar>
      <MainContainer>{children}</MainContainer>
    </AdminContainer>
  );
};

export default AdminLayout;

const AdminContainer = styled.div`
  display: flex;
  width: 100%;
  min-width: 100vw;
  min-height: 100vh;
  font-size: 16px;
  font-weight: 600;
  color: #666;
`;

const CategoryBar = styled.div`
  display: flex;
  flex: none;
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
  flex: 1;
  width: 100%;
  min-height: 100vh;

  background-color: #f6f6f9;
`;
