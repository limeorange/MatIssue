"use client";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import styled from "styled-components";

const AdminSearchBar = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const pathname = usePathname();

  const searchSubmitHandler: React.KeyboardEventHandler<HTMLInputElement> = (
    e
  ) => {
    if (e.key === "Enter") {
      router.push(`${pathname}?search=${encodeURIComponent(searchQuery)}`);
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
  height: 4rem;
  flex-grow: 1;
  gap: 1.6rem;
  max-width: 36rem;

  border: 0.1rem solid #ddd;
  border-radius: 0.5rem;

  &:focus-within {
    border: 0.1rem solid #fbd26a;
    box-shadow: inset 0 0 0.1rem 0.2rem #fbd26a;
  }
`;

const SearchBarInput = styled.input`
  width: 100%;
  border: none;
  font-size: 16px;
  font-weight: 400;
  &:focus {
    outline: none;
  }
`;

export default AdminSearchBar;
