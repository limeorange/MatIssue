"use client";

import styled from "styled-components";
import { useRouter, usePathname } from "next/navigation";

const UserNavBar = ({ userProfileId }: { userProfileId: string }) => {
  const currentPath = usePathname();
  const router = useRouter();

  return (
    <>
      <NavList>
        <NavItem
          onClick={() => router.push(`/user/${userProfileId}`)}
          clicked={currentPath === `/user/${userProfileId}`}
        >
          레시피
        </NavItem>
        <NavItem
          onClick={() => router.push(`/user/${userProfileId}/followers`)}
          clicked={currentPath === `/user/${userProfileId}/followers`}
        >
          팔로워
        </NavItem>
        <NavItem
          onClick={() => router.push(`/user/${userProfileId}/following`)}
          clicked={currentPath === `/user/${userProfileId}/following`}
        >
          팔로잉
        </NavItem>
      </NavList>
    </>
  );
};

export default UserNavBar;

const NavList = styled.ul`
  display: flex;
  height: 4rem;
  justify-content: center;
  border-bottom: 0.1rem solid rgb(200, 200, 200);
  gap: 3rem;
  @media (min-width: 1024px) {
    height: 6rem;
    gap: 6rem;
  }
`;

const NavItem = styled.li<{ clicked: boolean }>`
  display: flex;
  position: relative;
  align-items: center;
  border-bottom: 0.4rem solid #ffffff;
  padding: 1.3rem 1.3rem 0.9rem 1.3rem;
  font-size: 14px;
  font-weight: 600;
  color: #4f3d21;
  cursor: pointer;
    ${(props) => props.clicked && "color: #f8b551;"}
    ${(props) => props.clicked && "border-bottom: 0.4rem solid #f8b551;"}
    ${(props) => props.clicked && "transition: all 0.2s ease-in-out;"}
  }

  @media (min-width: 1024px) {
    font-size: 18px;
    border-bottom: 0.35rem solid #ffffff;
    &:hover {
      border-bottom: 0.35rem solid #f8b551;
    }
  }
`;
