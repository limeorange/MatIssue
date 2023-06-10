"use client";

import styled from "styled-components";
import Image from "next/image";

type PaginationProps = {
  recipesPerPage: number;
  totalRecipes: number;
  paginate: (pageNumber: number) => void;
  currentPage: number;
};

const Pagination = (props: PaginationProps) => {
  const pageNumbers = [];

  const totalPages = Math.ceil(props.totalRecipes / props.recipesPerPage);

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  // 이전 버튼 로직
  const handlePrevClick = () => {
    if (props.currentPage > 1) {
      props.paginate(props.currentPage - 1);
    }
  };

  // 다음 버튼 로직
  const handleNextClick = () => {
    if (props.currentPage < pageNumbers.length) {
      props.paginate(props.currentPage + 1);
    }
  };

  return (
    <PaginationWrapper>
      <PaginationUl>
        <PaginationPrevButtonBox onClick={handlePrevClick}>
          <PaginationPrevButton onClick={handlePrevClick}>
            <Image
              src="/images/prevButtonIcon.png"
              alt="이전 버튼"
              width={9.5}
              height={15}
            />
          </PaginationPrevButton>
        </PaginationPrevButtonBox>
        {pageNumbers.map((number) => (
          <PaginationLi key={number} className="page-item">
            <PaginationButtonBox
              onClick={() => props.paginate(number)}
              className={props.currentPage === number ? "active" : ""}
            >
              <PaginationButton
                onClick={() => props.paginate(number)}
                className={props.currentPage === number ? "active" : ""}
              >
                {number}
              </PaginationButton>
            </PaginationButtonBox>
          </PaginationLi>
        ))}
        <PaginationNextButtonBox onClick={handleNextClick}>
          <PaginationNextButton onClick={handleNextClick}>
            <Image
              src="/images/nextButtonIcon.png"
              alt="다음 버튼"
              width={9.5}
              height={15}
            />
          </PaginationNextButton>
        </PaginationNextButtonBox>
      </PaginationUl>
    </PaginationWrapper>
  );
};

export default Pagination;

const PaginationWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: 5rem 0;
`;

const PaginationUl = styled.ul`
  display: flex;
`;

const PaginationLi = styled.li``;

const PaginationButtonBox = styled.div`
  display: flex;
  width: 4.25rem;
  height: 4rem;
  text-align: center;
  align-items: center;
  justify-content: center;
  border-radius: 1rem;
  margin: 0.3rem;

  &: hover {
    background-color: #e0e0e0;
    cursor: pointer;
  }
`;

const PaginationButton = styled.button`
  font-size: 1.6rem;
  color: #ababab;

  &.active {
    color: #4f3d21;
  }
`;

const PaginationPrevButton = styled.button``;

const PaginationPrevButtonBox = styled.div`
  display: flex;
  width: 4.25rem;
  height: 4rem;
  text-align: center;
  align-items: center;
  justify-content: center;
  border-radius: 10rem;
  margin: 0.3rem;
  background-color: #fbd26a;

  &: hover {
    background-color: #e6bb4e;
    cursor: pointer;
  }
`;

const PaginationNextButton = styled.button``;

const PaginationNextButtonBox = styled.div`
  display: flex;
  width: 4.25rem;
  height: 4rem;
  text-align: center;
  align-items: center;
  justify-content: center;
  border-radius: 10rem;
  margin: 0.3rem;
  background-color: #fbd26a;

  &: hover {
    background-color: #e6bb4e;
    cursor: pointer;
  }
`;
