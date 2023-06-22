"use client";

import { useState, useEffect } from "react";
import styled from "styled-components";
import Image from "next/image";
import darkModeAtom from "@/app/store/darkModeAtom";
import { useRecoilState } from "recoil";

type PaginationProps = {
  recipesPerPage: number;
  totalRecipes: number;
  paginate: (pageNumber: number) => void;
  currentPage: number;
};

const Pagination = (props: PaginationProps) => {
  // 페이지네이션 input 상태
  const [pageInput, setPageInput] = useState("");

  // 화면 너비 상태
  const [windowWidth, setWindowWidth] = useState(0);

  // 다크모드 상태
  const [isDarkMode, setIsDarkMode] = useRecoilState(darkModeAtom);

  // 화면 너비에 따른 스크롤 이벤트
  useEffect(() => {
    setWindowWidth(window.innerWidth);
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // 총 페이지 수 계산
  const totalPages = Math.ceil(props.totalRecipes / props.recipesPerPage);

  // 페이지네이션 버튼 수 (화면 너비 480px 이하는 5개 까지)
  const pagesToShow = windowWidth <= 480 ? 5 : 10;

  // 버튼 시작 및 끝나는 위치 조정
  const startBlock =
    Math.floor((props.currentPage - 1) / pagesToShow) * pagesToShow;
  const endBlock = startBlock + pagesToShow;

  // 이전 버튼 로직
  const handlePrevClick = () => {
    if (props.currentPage > 1) {
      props.paginate(props.currentPage - 1);
    }
  };

  // 다음 버튼 로직
  const handleNextClick = () => {
    if (props.currentPage < totalPages) {
      props.paginate(props.currentPage + 1);
    }
  };

  // 입력한 페이지로 이동하는 inputHandler
  const handlePageInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Enter 키를 눌렀을 때 실행
    if (e.key === "Enter") {
      const pageNum = Number(pageInput);

      // 페이지 번호가 적절한 범위 내에 있을 경우 해당 페이지로 이동
      if (pageNum >= 1 && pageNum <= totalPages) {
        props.paginate(pageNum);
      } else {
        alert(
          `해당 페이지가 존재하지 않습니다. 마지막 페이지는 ${totalPages}페이지 입니다.`
        );
      }

      // 페이지 입력 상태 초기화
      setPageInput("");
    }
  };

  // 페이지 번호 계산
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);
  const startIndex = startBlock;
  const endIndex = Math.min(endBlock, totalPages);

  return (
    <>
      <PaginationLayout>
        <PaginationList>
          <PaginationPrevButtonContainer onClick={handlePrevClick}>
            <PaginationPrevButton onClick={handlePrevClick}>
              <Image
                src="/images/prevButtonIcon.png"
                alt="이전 버튼"
                width={9.5}
                height={15}
              />
            </PaginationPrevButton>
          </PaginationPrevButtonContainer>
          {pageNumbers.slice(startIndex, endIndex).map((number) => (
            <PaginationItem key={number}>
              <PaginationButtonWrapper
                onClick={() => props.paginate(number)}
                className={props.currentPage === number ? "active" : ""}
                isDarkMode={isDarkMode}
              >
                <PaginationButton
                  onClick={() => props.paginate(number)}
                  className={props.currentPage === number ? "active" : ""}
                >
                  {number}
                </PaginationButton>
              </PaginationButtonWrapper>
            </PaginationItem>
          ))}
          <PaginationNextButtonContainer onClick={handleNextClick}>
            <PaginationNextButton onClick={handleNextClick}>
              <Image
                src="/images/nextButtonIcon.png"
                alt="다음 버튼"
                width={9.5}
                height={15}
              />
            </PaginationNextButton>
          </PaginationNextButtonContainer>
        </PaginationList>
      </PaginationLayout>
      <PaginationInputWrapper>
        <div>
          <Image
            src="/images/bookicon.png"
            width={20}
            height={20}
            alt="searchIcon"
          />
        </div>
        <PaginationInput
          type="number"
          value={pageInput}
          onChange={(e) => setPageInput(e.target.value)}
          onKeyDown={handlePageInput}
          placeholder="페이지 번호를 입력하세요."
          isDarkMode={isDarkMode}
        />
      </PaginationInputWrapper>
    </>
  );
};

export default Pagination;

const PaginationLayout = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: 3rem 0;
`;

const PaginationList = styled.ul`
  display: flex;
`;

const PaginationItem = styled.li``;

const PaginationButtonWrapper = styled.div<{ isDarkMode: boolean }>`
  display: flex;
  width: 4.25rem;
  height: 4rem;
  text-align: center;
  align-items: center;
  justify-content: center;
  border-radius: 1rem;
  margin: 0.3rem;
  color: #ababab;

  &: hover {
    background-color: ${(props) =>
      props.isDarkMode ? props.theme.white : "#e0e0e0"};
    color: ${(props) => (props.isDarkMode ? props.theme.deepNavy : "#ababab")};
    cursor: pointer;
  }

  &.active {
    color: ${(props) =>
      props.isDarkMode ? props.theme.deepYellow : "#4f3d21"};
  }
`;

const PaginationButton = styled.button`
  font-size: 16px;
`;

const PaginationPrevButton = styled.button``;

const PaginationPrevButtonContainer = styled.div`
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

const PaginationNextButtonContainer = styled.div`
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

const PaginationInputWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 0.8rem 1.6rem;
  height: 4rem;
  gap: 1.6rem;
  max-width: 25rem;
  margin: 0 auto;

  border: 0.1rem solid rgb(200, 200, 200);
  border-radius: 0.8rem;

  &:focus-within {
    border: 0.1rem solid #fbd26a;
    box-shadow: inset 0 0 0.1rem 0.2rem #fbd26a;
  }
`;

const PaginationInput = styled.input<{ isDarkMode: boolean }>`
  width: 100%;
  border: none;
  font-size: 16px;
  font-weight: 400;
  background-color: ${(props) =>
    props.isDarkMode ? props.theme.deepNavy : props.theme.white};

  &:focus {
    outline: none;
  }
`;
