import Image from "next/image";
import { useState } from "react";
import styled from "styled-components";
import SearchModal from "./SearchModal";

const SearchBtn = () => {
  const [isModal, setIsModal] = useState<boolean>(false);

  return (
    <>
      <SearchModal isModal={isModal} setIsModal={setIsModal} />
      <SearchBtnContainer
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

const SearchBtnContainer = styled.div`
  diplay: block;

  @media (min-width: 1024px) {
    display: none;
  }
`;
