"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import styled from "styled-components";

type SearchModalProps = {
  isModal: boolean;
  setIsModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const SearchModal = (props: SearchModalProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [scrollPosition, setScrollPosition] = useState<number>(0);

  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  const searchSubmitHandler: React.KeyboardEventHandler<HTMLInputElement> = (
    e
  ) => {
    if (e.key === "Enter") {
      router.push(`recipes/search?query=${encodeURIComponent(searchQuery)}`);
    }
  };

  const closeModalHandler = () => {
    document.body.style.overflow = "auto";
    window.scrollTo(0, scrollPosition);
    props.setIsModal(false);
  };

  useEffect(() => {
    if (props.isModal && inputRef.current) {
      inputRef.current.focus();
    }
  }, [props.isModal]);

  useEffect(() => {
    if (props.isModal) {
      setScrollPosition(window.pageYOffset);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [props.isModal]);

  return (
    <>
      <Backdrop isModal={props.isModal} onClick={closeModalHandler} />
      <ModalContainer isModal={props.isModal}>
        <SearchBarWrapper>
          <SearchBarDiv>
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

const ModalContainer = styled.div<{ isModal: boolean }>`
  display: flex;
  flex-direction: column;
  position: fixed;
  z-index: 10000;
  left: 0;
  top: 0;
  width: 100%;
  height: 40rem;
  background-color: white;
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

const SearchBarDiv = styled.div`
  display: flex;
  align-items: center;
  padding: 0.8rem 1.6rem;
  gap: 1.6rem;
  width: 100%;

  border: 0.1rem solid rgb(200, 200, 200);
  border-radius: 0.8rem;

  &:focus-within {
    border: 0.1rem solid #fbd26a;
    box-shadow: inset 0 0 0.1rem 0.2rem #fbd26a;
  }
`;

const SearchBarInput = styled.input`
  width: 100%;
  height: 2.8rem;
  border: none;
  font-size: 16px;
  font-weight: 400;
  &:focus {
    outline: none;
  }
`;

const CancelBtn = styled.div`
  width: 5rem;
  text-align: center;
  font-size: 16px;
  font-weight: 500;
`;
