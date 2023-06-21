import Image from "next/image";
import { useState } from "react";
import styled from "styled-components";
import SearchModal from "./SearchModal";
import { useRecoilValue } from "recoil";
import darkModeAtom from "@/app/store/darkModeAtom";

const SearchBtn = () => {
  const [isModal, setIsModal] = useState<boolean>(false);
  const isDarkMode = useRecoilValue(darkModeAtom);

  return (
    <>
      <SearchModal isModal={isModal} setIsModal={setIsModal} />
      <SearchBtnContainer
        isDarkMode={isDarkMode}
        onClick={() => {
          setIsModal(true);
          document.body.style.overflow = "hidden";
        }}
      >
        <Image
          src="/images/header/search.svg"
          height={28}
          width={28}
          alt="search_icon"
        />
      </SearchBtnContainer>
    </>
  );
};

export default SearchBtn;

const SearchBtnContainer = styled.div<{ isDarkMode: boolean }>`
  diplay: block;

  filter: ${(props) =>
    props.isDarkMode
      ? "invert(89%) sepia(27%) saturate(436%) hue-rotate(334deg) brightness(105%) contrast(104%)"
      : "invert(18%) sepia(10%) saturate(2848%) hue-rotate(357deg) brightness(103%) contrast(82%)"};

  @media (min-width: 1024px) {
    display: none;
  }
`;
