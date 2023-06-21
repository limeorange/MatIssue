"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import styled from "styled-components";
import Image from "next/image";

import CategoryModal from "./CategoryModal";
import { useRecoilValue } from "recoil";
import darkModeAtom from "@/app/store/darkModeAtom";

/** 헤더 카테고리바 컴포넌트 */
const CategoryBar = () => {
  const [isModal, setIsModal] = useState<boolean>(false);
  const isDarkMode = useRecoilValue(darkModeAtom);

  const router = useRouter();

  return (
    <CategoryBarWrapper isDarkMode={isDarkMode}>
      <CategoryList>
        <CategoryItem
          onClick={() => setIsModal(!isModal)}
          onMouseOver={() => setIsModal(true)}
          onMouseOut={() => setIsModal(false)}
        >
          {isModal && <CategoryModal isModal={isModal} />}
          <IconWrapper isDarkMode={isDarkMode}>
            <Image src="/images/category/listIcon.svg" alt="list_icon" fill />
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

const CategoryBarWrapper = styled.div<{ isDarkMode: boolean }>`
  display: flex;
  align-items: center;
  width: 100%;
  color: ${(props) =>
    props.isDarkMode ? props.theme.lightYellow : props.theme.brown};

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

    border-radius: 0;
    box-sizing: content-box;
    align-items: center;
    gap: 0.8rem;
    border-bottom: 0.4rem solid rgb(255, 255, 255, 0);
    padding: 0.8rem 1rem 0.4rem 1rem;
    &:hover {
      cursor: pointer;
      font-weight: 600;
      border-bottom: 0.4rem solid #f8b551;
    }
  }

  transition: all 0.3s;
`;

const IconWrapper = styled.div<{ isDarkMode: boolean }>`
  display: none;
  @media (min-width: 1024px) {
    display: block;
    position: relative;
    width: 1.4rem;
    height: 0.9rem;
    filter: ${(props) =>
      props.isDarkMode
        ? "invert(89%) sepia(27%) saturate(436%) hue-rotate(334deg) brightness(105%) contrast(104%)"
        : "invert(18%) sepia(10%) saturate(2848%) hue-rotate(357deg) brightness(103%) contrast(82%)"};
  }
`;
