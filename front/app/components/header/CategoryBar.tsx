"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import styled from "styled-components";
import CategoryModal from "./CategoryModal";

const CategoryBar = () => {
  const router = useRouter();
  const [isModal, setIsModal] = useState<boolean>(false);

  return (
    <CategoryBarDiv>
      <CategoryUl>
        <CategoryLi
          onClick={() => setIsModal(!isModal)}
          onMouseOver={() => setIsModal(true)}
          onMouseOut={() => setIsModal(false)}
        >
          {isModal && <CategoryModal isModal={isModal} />}
          <IconWrapper>
            <Image src="/images/listIcon.png" alt="list_icon" fill />
          </IconWrapper>
          음식 카테고리
        </CategoryLi>
        <CategoryLi onClick={() => router.push("/category/best")}>
          베스트 레시피
        </CategoryLi>
        <CategoryLi onClick={() => router.push("/category/newest")}>
          최신 레시피
        </CategoryLi>
        <CategoryLi onClick={() => router.push("/category/honmuk")}>
          혼먹 레시피
        </CategoryLi>
        <CategoryLi onClick={() => router.push("/category/vegan")}>
          비건 레시피
        </CategoryLi>
      </CategoryUl>
    </CategoryBarDiv>
  );
};

export default CategoryBar;

const CategoryBarDiv = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  color: #4f3d21;
  height: 4rem;

  @media (max-width: 768px) {
    overflow-x: scroll;
    white-space: nowrap;
    &::-webkit-scrollbar {
      display: none;
    }
  }

  @media (min-width: 768px) {
    display: inline-block;
    width: 100%;
    height: 5rem;
  }
`;

const CategoryUl = styled.ul`
  display: flex;
  gap: 2rem;
`;

const IconWrapper = styled.div`
  display: block;
  position: relative;
  width: 1.4rem;
  height: 0.9rem;
`;

const CategoryLi = styled.li`
  display: flex;
  position: relative;
  box-sizing: content-box;
  align-items: center;
  gap: 0.8rem;
  border-bottom: 0.4rem solid #ffffff;
  padding: 0.8rem 1rem 0.4rem 1rem;
  &:hover {
    cursor: pointer;
    font-weight: 600;
    border-bottom: 0.4rem solid #f8b551;
  }

  @media (min-width: 768px) {
    padding: 1.3rem 1.3rem 0.9rem 1.3rem;
  }

  transition: all 0.3s;
`;
