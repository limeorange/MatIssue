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
  padding: 0.5rem 1rem;
  width: 360px;
  height: 40px;
  gap: 1rem;

  border: 1px solid rgb(200, 200, 200);
  border-radius: 100px;
`;

const SearchBarInput = styled.input`
  width: 100%;
  border: none;
  font-size: 1rem;
  font-weight: 400;
  &:focus {
    outline: none;
  }
`;

export default SearchBar;
