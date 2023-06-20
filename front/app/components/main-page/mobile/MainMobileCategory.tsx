"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import styled from "styled-components";

const CATEGORY_DATA = [
  {
    title: "한식",
    imgUrl: "/images/main/category/korean.svg",
    routerUrl: "/recipes/category/한식?category=korean",
  },
  {
    title: "양식",
    imgUrl: "/images/main/category/western.svg",
    routerUrl: "/recipes/category/양식?category=western",
  },
  {
    title: "일식",
    imgUrl: "/images/main/category/japanese.png",
    routerUrl: "/recipes/category/일식?category=japanese",
  },
  {
    title: "중식",
    imgUrl: "/images/main/category/chinese.svg",
    routerUrl: "/recipes/category/중식?category=chinese",
  },
  {
    title: "베스트",
    imgUrl: "/images/main/category/best.svg",
    routerUrl: "/recipes/category/best?category=best",
  },
  {
    title: "최신",
    imgUrl: "/images/main/category/newest.svg",
    routerUrl: "/recipes/category/newest?category=newest",
  },
  {
    title: "혼먹",
    imgUrl: "/images/main/category/alone.svg",
    routerUrl: "/recipes/category/honmuk?category=honmuk",
  },
  {
    title: "채식",
    imgUrl: "/images/main/category/vegetarian.svg",
    routerUrl: "/recipes/category/vegetarian?category=vegetarian",
  },
];

const MainMobileCategory = () => {
  const router = useRouter();

  return (
    <CategoryWrapper>
      <CategoryContainer>
        <CategoryList>
          {CATEGORY_DATA.map((item, index) => {
            return (
              <CategoryItem
                key={index}
                onClick={() => router.push(item.routerUrl)}
              >
                <IconWrapper>
                  <Image
                    src={item.imgUrl}
                    alt={item.title}
                    width={50}
                    height={50}
                  />
                </IconWrapper>
                <TitleWrapper>{item.title}</TitleWrapper>
              </CategoryItem>
            );
          })}
        </CategoryList>
      </CategoryContainer>
    </CategoryWrapper>
  );
};

export default MainMobileCategory;

const CategoryWrapper = styled.div`
  display: block;
  width: 100%;
  padding: 3rem 1.5rem 1rem 1.5rem;

  @media (min-width: 1024px) {
    display: none;
  }
`;

const CategoryContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
`;

const CategoryList = styled.ul`
  display: grid;
  row-gap: 1rem;

  grid-template-columns: repeat(4, minmax(0, 1fr));
  place-items: center;

  @media (min-width: 768px) {
    grid-template-columns: repeat(8, minmax(0, 1fr));
  }
`;

const CategoryItem = styled.li`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 6rem;
  gap: 0.5rem;
`;

const IconWrapper = styled.div`
  background-color: #ffefc8;
  padding: 1rem;
  border-radius: 1.5rem;
`;

const TitleWrapper = styled.div`
  font-size: 14px;
`;
