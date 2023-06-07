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
        <CategoryLi onClick={() => router.push("/repcipes/category/best")}>
          베스트 레시피
        </CategoryLi>
        <CategoryLi onClick={() => router.push("/repcipes/category/newest")}>
          최신 레시피
        </CategoryLi>
        <CategoryLi
          onClick={() =>
            router.push("/repcipes/category/honmuk?category=honmuk")
          }
        >
          혼먹 레시피
        </CategoryLi>
        <CategoryLi
          onClick={() =>
            router.push("/repcipes/category/vegetarian?category=vegetarian")
          }
        >
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

  justify-content: start;

  @media (min-width: 1024px) {
    display: inline-block;
    width: 100%;
    height: 5rem;
  }
`;

const CategoryUl = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;

  @media (min-width: 1024px) {
    gap: 2rem;
    height: 100%;
  }
`;

const CategoryLi = styled.li`
  position: relative;
  font-size: 13px;
  padding: 0.3rem 0.6rem;
  background-color: #fbd26a;
  border-radius: 0.5rem;

  @media (min-width: 1024px) {
    display: flex;
    font-size: 16px;

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
