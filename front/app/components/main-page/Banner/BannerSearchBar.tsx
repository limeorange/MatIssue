"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import styled from "styled-components";

const BannerSearchBar = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const searchSubmitHandler: React.KeyboardEventHandler<HTMLInputElement> = (
    e
  ) => {
    if (e.key === "Enter") {
      router.push(`/recipes/search?query=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <SearchBarDiv>
      <div>
        <Image
          src="/images/searchIcon.svg"
          width={24}
          height={24}
          alt="searchIcon"
        />
      </div>
      <SearchBarInput
        onKeyUp={searchSubmitHandler}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setSearchQuery(e.target.value)
        }
        placeholder="검색어를 입력하세요."
      />
    </SearchBarDiv>
  );
};

const SearchBarDiv = styled.div`
  display: flex;
  align-items: center;
  padding: 1.2rem 2.4rem;
  flex: grow;
  height: 5.5rem;
  width: 100%;
  gap: 1.6rem;

  background-color: rgb(255, 255, 255);
  border-radius: 10rem;
`;

const SearchBarInput = styled.input`
  width: 100%;
  border: none;
  font-size: 22px;
  font-weight: 400;
  background-color: white;
  border: none;
  color: #4f3d21;
  &:focus {
    box-shadow: none;
    border: none;
    outline: none;
  }
`;

export default BannerSearchBar;
