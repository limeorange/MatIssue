"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import styled from "styled-components";
import Image from "next/image";

import CategoryModal from "./CategoryModal";

/** 헤더 카테고리바 컴포넌트 */
const CategoryBar = () => {
  const [isModal, setIsModal] = useState<boolean>(false);

  const router = useRouter();

  return (
    <CategoryBarWrapper>
      <CategoryList>
        <CategoryItem
          onClick={() => setIsModal(!isModal)}
          onMouseOver={() => setIsModal(true)}
          onMouseOut={() => setIsModal(false)}
        >
          {isModal && <CategoryModal isModal={isModal} />}
          <IconWrapper>
            <Image src="/images/listIcon.png" alt="list_icon" fill />
          </IconWrapper>
          음식 카테고리
        </CategoryItem>
        <CategoryItem
          onClick={() => router.push("/recipes/category/best?category=best")}
        >
          베스트 레시피
        </CategoryItem>
        <CategoryItem
          onClick={() =>
            router.push("/recipes/category/newest?category=newest")
          }
        >
          최신 레시피
        </CategoryItem>
        <CategoryItem
          onClick={() =>
            router.push("/recipes/category/honmuk?category=honmuk")
          }
        >
          혼먹 레시피
        </CategoryItem>
        <CategoryItem
          onClick={() =>
            router.push("/recipes/category/vegetarian?category=vegetarian")
          }
        >
          채식 레시피
        </CategoryItem>
      </CategoryList>
    </CategoryBarWrapper>
  );
};

export default CategoryBar;

const CategoryBarWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  color: #4f3d21;

  justify-content: start;

  @media (min-width: 1024px) {
    display: inline-block;
    width: 100%;
    height: 5rem;
  }
`;

const CategoryList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;

  @media (min-width: 1024px) {
    gap: 2rem;
    height: 100%;
  }
`;

const CategoryItem = styled.li`
  display: none;

  @media (min-width: 1024px) {
    display: flex;
    font-size: 16px;
    position: relative;

    background-color: white;
    border-radius: 0;
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
  }

  transition: all 0.3s;
`;

const IconWrapper = styled.div`
  display: none;
  @media (min-width: 1024px) {
    display: block;
    position: relative;
    width: 1.4rem;
    height: 0.9rem;
  }
`;
