"use client";

import Image from "next/image";
import { useState } from "react";
import styled from "styled-components";
import RecipeCard from "../../recipe-card/RecipeCard";

const DUMMY_DATA: Recipe[] = [
  {
    image: "/images/sushi1.png",
    title: "기가 막히는 초밥 만들기",
    author: "목동최고미남정훈",
    likes: 1234,
    view: "15,324",
    id: "ex1",
    timestamp: 1,
    servings: 1,
    duration: 10,
    difficulty: 1,
  },
  {
    image: "/images/sushi2.png",
    title: "혼자 알기 아까운 후토마끼 레시피",
    author: "킹갓제너럴팀장윤수",
    likes: 1112,
    view: "15,324",
    id: "ex2",
    timestamp: 2,
    servings: 2,
    duration: 20,
    difficulty: 2,
  },
  {
    image: "/images/sushi3.png",
    title: "전여자친구가 해주던 그 맛의 유부초밥",
    author: "영앤리치톨엔인텔리",
    likes: 1134,
    view: "15,324",
    id: "ex3",
    timestamp: 3,
    servings: 3,
    duration: 30,
    difficulty: 3,
  },
  {
    image: "/images/sushi4.png",
    title: "자취생을 위한 초간단 계란 초밥",
    author: "브라우니물어",
    likes: 1435,
    view: "15,324",
    id: "ex4",
    timestamp: 4,
    servings: 4,
    duration: 60,
    difficulty: 1,
  },
  {
    image: "/images/sushi1.png",
    title: "기가 막히는 초밥 만들기",
    author: "목동최고미남정훈",
    likes: 1144,
    view: "15,324",
    id: "ex1",
    timestamp: 5,
    servings: 5,
    duration: 60,
    difficulty: 2,
  },
  {
    image: "/images/sushi2.png",
    title: "혼자 알기 아까운 후토마끼 레시피",
    author: "킹갓제너럴팀장윤수",
    likes: 1518,
    view: "15,324",
    id: "ex2",
    timestamp: 6,
    servings: 4,
    duration: 20,
    difficulty: 1,
  },
  {
    image: "/images/sushi3.png",
    title: "전여자친구가 해주던 그 맛의 유부초밥",
    author: "영앤리치톨엔인텔리",
    likes: 2324,
    view: "15,324",
    id: "ex3",
    timestamp: 8,
    servings: 3,
    duration: 30,
    difficulty: 2,
  },
  {
    image: "/images/sushi4.png",
    title: "자취생을 위한 초간단 계란 초밥",
    author: "브라우니물어",
    likes: 3324,
    view: "15,324",
    id: "ex4",
    timestamp: 11,
    servings: 2,
    duration: 10,
    difficulty: 3,
  },
  {
    image: "/images/sushi1.png",
    title: "기가 막히는 초밥 만들기",
    author: "목동최고미남정훈",
    likes: 1888,
    view: "15,324",
    id: "ex1",
    timestamp: 9,
    servings: 1,
    duration: 60,
    difficulty: 2,
  },
  {
    image: "/images/sushi2.png",
    title: "혼자 알기 아까운 후토마끼 레시피",
    author: "킹갓제너럴팀장윤수",
    likes: 1999,
    view: "15,324",
    id: "ex2",
    timestamp: 10,
    servings: 3,
    duration: 30,
    difficulty: 1,
  },
  {
    image: "/images/sushi3.png",
    title: "전여자친구가 해주던 그 맛의 유부초밥",
    author: "영앤리치톨엔인텔리",
    likes: 4324,
    view: "15,324",
    id: "ex3",
    timestamp: 14,
    servings: 2,
    duration: 20,
    difficulty: 2,
  },
  {
    image: "/images/sushi4.png",
    title: "자취생을 위한 초간단 계란 초밥",
    author: "브라우니물어",
    likes: 1098,
    view: "15,324",
    id: "ex4",
    timestamp: 12,
    servings: 5,
    duration: 60,
    difficulty: 3,
  },
  {
    image: "/images/sushi1.png",
    title: "기가 막히는 초밥 만들기",
    author: "목동최고미남정훈",
    likes: 1987,
    view: "15,324",
    id: "ex1",
    timestamp: 13,
    servings: 4,
    duration: 10,
    difficulty: 1,
  },
  {
    image: "/images/sushi2.png",
    title: "혼자 알기 아까운 후토마끼 레시피",
    author: "킹갓제너럴팀장윤수",
    likes: 1324,
    view: "15,324",
    id: "ex2",
    timestamp: 16,
    servings: 1,
    duration: 30,
    difficulty: 2,
  },
  {
    image: "/images/sushi3.png",
    title: "전여자친구가 해주던 그 맛의 유부초밥",
    author: "영앤리치톨엔인텔리",
    likes: 2343,
    view: "15,324",
    id: "ex3",
    timestamp: 15,
    servings: 2,
    duration: 20,
    difficulty: 3,
  },
  {
    image: "/images/sushi4.png",
    title: "자취생을 위한 초간단 계란 초밥",
    author: "브라우니물어",
    likes: 500,
    view: "15,324",
    id: "ex4",
    timestamp: 17,
    servings: 3,
    duration: 60,
    difficulty: 1,
  },
];

const MainBest = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const bestRecipes = DUMMY_DATA;

  const contentsPerPage = 8;
  const totalPage = bestRecipes.length / contentsPerPage;

  const leftBtnHandler = () => {
    if (currentPage === 1) {
      return;
    }
    setCurrentPage(currentPage - 1);
  };

  const rightBtnHandler = () => {
    if (currentPage >= totalPage) {
      return;
    }
    setCurrentPage(currentPage + 1);
  };

  return (
    <MainWrapper>
      <LeftSlideBtn onClick={leftBtnHandler}>
        <Image
          src="/images/main/leftSlideBtn.png"
          alt="left_slice_btn"
          width={42}
          height={122}
        />
      </LeftSlideBtn>
      <MainContainer>
        <BestTitleBox>
          <BestTitle>베스트 레시피</BestTitle>
          <PeriodList>
            <li>일간</li>
            <li>|</li>
            <li>월간</li>
            <li>|</li>
            <li>주간</li>
          </PeriodList>
        </BestTitleBox>
        <ListingRecipeContainer contentsPerPage={contentsPerPage}>
          {bestRecipes
            .slice(
              contentsPerPage * (currentPage - 1),
              contentsPerPage * currentPage
            )
            .map((data, index) => (
              <RecipeCard key={index} data={data} />
            ))}
        </ListingRecipeContainer>
      </MainContainer>
      <RightSlideBtn onClick={rightBtnHandler}>
        <Image
          src="/images/main/rightSlideBtn.png"
          alt="right_slice_btn"
          width={42}
          height={122}
        />
      </RightSlideBtn>
    </MainWrapper>
  );
};

export default MainBest;

const MainWrapper = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  width: 100%;
  max-width: 120rem;
  padding: 1rem 2rem;

  @media (min-width: 768px) {
    margin: 0 auto;
    padding: 2rem;
  }
`;

const LeftSlideBtn = styled.button`
  display: none;

  @media (min-width: 768px) {
    display: block;
    position: absolute;
    width: 3rem;
    heght: 9rem;
    left: -4rem;
    transition: transform 0.3s;
    &:hover {
      transform: scale(130%, 130%);
    }
  }
`;

const RightSlideBtn = styled.button`
  display: none;

  @media (min-width: 768px) {
    display: block;
    position: absolute;
    width: 3rem;
    heght: 9rem;
    right: -4rem;
    transition: transform 0.3s;
    &:hover {
      transform: scale(130%, 130%);
    }
  }
`;

const MainContainer = styled.div`
  width: 100%;
  margin: 0 auto;
`;

const BestTitleBox = styled.div`
  display: flex;
  gap: 1rem;
  padding: 1.6rem 0;
  align-items: end;
`;

const BestTitle = styled.div`
  font-size: 22px;
  font-weight: 500;
`;

const PeriodList = styled.ul`
  display: flex;
  gap: 0.5rem;
  font-size: 16px;
`;

const ListingRecipeContainer = styled.div<{ contentsPerPage: number }>`
  display: flex;
  overflow-x: auto;
  gap: 2rem;
  white-space: nowrap;
  &::-webkit-scrollbar {
    display: none;
  }

  @media (min-width: 768px) {
    display: grid;
    grid-template-columns: ${(props) =>
      `repeat(${props.contentsPerPage / 2}, auto)`};
    row-gap: 3rem;
    column-gap: 2rem;
  }
`;
