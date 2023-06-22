"use client";

import { whiteBrownToggle } from "@/app/constants/darkMode.constants";
import darkModeAtom from "@/app/store/darkModeAtom";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import RecentSearchItem from "../RecentSearchItem";
import recentSearchAtom from "@/app/store/recentSearchAtom";

type SearchModalProps = {
  isModal: boolean;
  setIsModal: React.Dispatch<React.SetStateAction<boolean>>;
};

/** 모바일 전용 검색 모달 컴포넌트 */
const SearchModal = (props: SearchModalProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [scrollPosition, setScrollPosition] = useState<number>(0);
  const [recentSearches, setRecentSearches] =
    useRecoilState<string[]>(recentSearchAtom);
  const isDarkMode = useRecoilValue(darkModeAtom);

  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  /** 검색 버튼 핸들러 */
  const searchSubmitHandler: React.KeyboardEventHandler<HTMLInputElement> = (
    e
  ) => {
    if (e.key === "Enter" && searchQuery.length !== 0) {
      const newSearches = [searchQuery, ...recentSearches]
        .slice(0, 10)
        .filter((item, index, self) => self.indexOf(item) === index);
      localStorage.setItem("searches", JSON.stringify(newSearches));
      setRecentSearches(newSearches);
      router.push(`recipes/search?query=${encodeURIComponent(searchQuery)}`);
      closeModalHandler();
    }
  };

  /** 모달 닫는 핸들러 */
  const closeModalHandler = () => {
    document.body.style.overflow = "auto";
    window.scrollTo(0, scrollPosition);
    props.setIsModal(false);
  };

  /** 최근 검색어 삭제 핸들러 */
  const recentSearchDeleteHandler = (e: React.MouseEvent) => {
    e.stopPropagation();
    const searches = e.currentTarget.id;
    const newSearches = recentSearches.filter((item) => item !== searches);
    localStorage.setItem("searches", JSON.stringify(newSearches));
    setRecentSearches(newSearches);
  };

  // 검색 모달 오픈시 인풋에 포커스 줘서 바로 키보드 띄우기
  useEffect(() => {
    if (props.isModal && inputRef.current) {
      inputRef.current.focus();
    }
  }, [props.isModal]);

  // 모달 오픈시 스크롤 기능 정지, 재개
  useEffect(() => {
    if (props.isModal) {
      setScrollPosition(window.pageYOffset);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [props.isModal]);

  // 로컬 스토리지에서 최근 검색어를 가져옴
  useEffect(() => {
    const savedSearches = JSON.parse(localStorage.getItem("searches") || "[]");
    setRecentSearches(savedSearches);
  }, []);

  return (
    <>
      <Backdrop isModal={props.isModal} onClick={closeModalHandler} />
      <ModalContainer isModal={props.isModal} isDarkMode={isDarkMode}>
        <SearchBarWrapper>
          <SearchBarDiv isDarkMode={isDarkMode}>
            <div>
              <Image
                src="/images/searchIcon.svg"
                width={18}
                height={18}
                alt="searchIcon"
              />
            </div>
            <SearchBarInput
              onKeyUp={searchSubmitHandler}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setSearchQuery(e.target.value)
              }
              ref={inputRef}
            />
          </SearchBarDiv>

          <CancelBtn onClick={closeModalHandler}>취소</CancelBtn>
        </SearchBarWrapper>
        <>
          <RecentSearchesList>
            <RecentSearchItemHeader>
              <span>최근 검색어</span>
              <DeleteAll
                onClick={() => {
                  localStorage.removeItem("searches");
                  setRecentSearches([]);
                }}
              >
                전체 삭제
              </DeleteAll>
            </RecentSearchItemHeader>
            {recentSearches.map((search: string, index: number) => (
              <RecentSearchItem
                key={index}
                search={search}
                index={index}
                recentSearchDeleteHandler={recentSearchDeleteHandler}
              />
            ))}
          </RecentSearchesList>
        </>
      </ModalContainer>
    </>
  );
};

export default SearchModal;

const Backdrop = styled.div<{ isModal: boolean }>`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9999;
  display: ${(props) => (props.isModal ? "block" : "none")};
  transition: opacity 0.3s ease-in-out;
`;

const ModalContainer = styled.div<{ isModal: boolean; isDarkMode: boolean }>`
  display: flex;
  flex-direction: column;
  position: fixed;
  z-index: 10000;
  left: 0;
  top: 0;
  width: 100%;
  min-height: 100vh;
  background-color: ${(props) =>
    props.isDarkMode ? props.theme.deepNavy : props.theme.white};
  padding: 2rem;
  gap: 2rem;
  font-size: 16px;

  transform: translateY(${(props) => (props.isModal ? "0" : "-100%")});
  opacity: ${(props) => (props.isModal ? "1" : "0")};

  transition: all 0.3s ease-in-out;
`;

const SearchBarWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
`;

const SearchBarDiv = styled.div<{ isDarkMode: boolean }>`
  display: flex;
  align-items: center;
  padding: 0.8rem 1.6rem;
  gap: 1.6rem;
  width: 100%;

  border: 0.1rem solid rgb(200, 200, 200);
  border-radius: 0.8rem;
  background-color: ${(props) =>
    props.isDarkMode ? props.theme.lightNavy : props.theme.white};

  &:focus-within {
    border: 0.1rem solid #fbd26a;
    box-shadow: inset 0 0 0.1rem 0.2rem #fbd26a;
  }
`;

const SearchBarInput = styled.input`
  width: 100%;
  height: 2.4rem;
  border: none;
  font-size: 16px;
  font-weight: 400;
  &:focus {
    outline: none;
    border: none;
  }
`;

const CancelBtn = styled.div`
  width: 5rem;
  text-align: center;
  font-size: 16px;
  font-weight: 500;
`;

const RecentSearchesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
`;

const RecentSearchItemHeader = styled.div`
  display: flex;
  padding: 0.2rem 1.6rem;
  width: 100%;
  justify-content: space-between;
  font-size: 14px;
`;

const DeleteAll = styled.span`
  cursor: pointer;
`;
