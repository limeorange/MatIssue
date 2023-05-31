"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import styled from "styled-components";

const SearchBar = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const searchSubmitHandler: React.KeyboardEventHandler<HTMLInputElement> = (
    e
  ) => {
    if (e.key === "Enter") {
      router.push(`/search?query=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <SearchBarDiv>
      <div>
        <Image
          src="/images/searchIcon.png"
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
      />
    </SearchBarDiv>
  );
};

const SearchBarDiv = styled.div`
  display: flex;
  align-items: center;
  padding: 0.8rem 1.6rem;
  width: 36rem;
  height: 4rem;
  gap: 1.6rem;

  border: 0.1rem solid rgb(200, 200, 200);
  border-radius: 10rem;
`;

const SearchBarInput = styled.input`
  width: 100%;
  border: none;
  font-size: 1.6rem;
  font-weight: 400;
  &:focus {
    outline: none;
  }
`;

export default SearchBar;
