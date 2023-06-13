"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import styled from "styled-components";

const MobileCategory = () => {
  const router = useRouter();

  return (
    <CategoryWrapper>
      <CategoryContainer>
        <CategoryList>
          <CategoryItem
            onClick={() =>
              router.push("/recipes/category/한식?category=korean")
            }
          >
            <IconWrapper>
              <Image
                src="/images/main/category/korean.svg"
                alt="korea_food"
                width={50}
                height={50}
              />
            </IconWrapper>
            <TitleWrapper>한식</TitleWrapper>
          </CategoryItem>
          <CategoryItem
            onClick={() =>
              router.push("/recipes/category/양식?category=western")
            }
          >
            <IconWrapper>
              <Image
                src="/images/main/category/western.svg"
                alt="western_food"
                width={50}
                height={50}
              />
            </IconWrapper>
            <TitleWrapper>양식</TitleWrapper>
          </CategoryItem>
          <CategoryItem
            onClick={() =>
              router.push("/recipes/category/일식?category=japanese")
            }
          >
            <IconWrapper>
              <Image
                src="/images/main/category/japanese.svg"
                alt="japanese_food"
                width={50}
                height={50}
              />
            </IconWrapper>
            <TitleWrapper>일식</TitleWrapper>
          </CategoryItem>
          <CategoryItem
            onClick={() =>
              router.push("/recipes/category/중식?category=chinese")
            }
          >
            <IconWrapper>
              <Image
                src="/images/main/category/chinese.svg"
                alt="chinese_food"
                width={50}
                height={50}
              />
            </IconWrapper>
            <TitleWrapper>중식</TitleWrapper>
          </CategoryItem>
        </CategoryList>
        <CategoryList>
          <CategoryItem
            onClick={() => router.push("/recipes/category/best?category=best")}
          >
            <IconWrapper>
              <Image
                src="/images/main/category/best.svg"
                alt="korea_food"
                width={50}
                height={50}
              />
            </IconWrapper>
            <TitleWrapper>베스트</TitleWrapper>
          </CategoryItem>
          <CategoryItem
            onClick={() =>
              router.push("/recipes/category/newest?category=newest")
            }
          >
            <IconWrapper>
              <Image
                src="/images/main/category/newest.svg"
                alt="western_food"
                width={50}
                height={50}
              />
            </IconWrapper>
            <TitleWrapper>최신</TitleWrapper>
          </CategoryItem>
          <CategoryItem
            onClick={() =>
              router.push("/recipes/category/honmuk?category=honmuk")
            }
          >
            <IconWrapper>
              <Image
                src="/images/main/category/alone.svg"
                alt="japanese_food"
                width={50}
                height={50}
              />
            </IconWrapper>
            <TitleWrapper>혼먹</TitleWrapper>
          </CategoryItem>
          <CategoryItem
            onClick={() =>
              router.push("/recipes/category/vegetarian?category=vegetarian")
            }
          >
            <IconWrapper>
              <Image
                src="/images/main/category/vegetarian.svg"
                alt="chinese_food"
                width={50}
                height={50}
              />
            </IconWrapper>
            <TitleWrapper>채식</TitleWrapper>
          </CategoryItem>
        </CategoryList>
      </CategoryContainer>
    </CategoryWrapper>
  );
};

export default MobileCategory;

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
  grid-template-columns: repeat(4, minmax(0, 1fr));
  place-items: center;
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
  border-radius: 0.8rem;
`;

const TitleWrapper = styled.div`
  font-size: 14px;
`;
