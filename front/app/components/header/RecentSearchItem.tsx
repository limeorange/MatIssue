"use client";

import { whiteBrownToggle } from "@/app/constants/darkMode.constants";
import darkModeAtom from "@/app/store/darkModeAtom";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useRecoilValue } from "recoil";
import styled from "styled-components";

type RecentSearchItemProps = {
  index: number;
  search: string;
  recentSearchDeleteHandler: (e: React.MouseEvent) => void;
};

const RecentSearchItem = (props: RecentSearchItemProps) => {
  const { index, search, recentSearchDeleteHandler } = props;
  const isDarkMode = useRecoilValue(darkModeAtom);
  const router = useRouter();

  return (
    <RecentSearchItemContainer
      isDarkMode={isDarkMode}
      key={index}
      onClick={() => router.push(`/recipes/search?query=${search}`)}
    >
      <IconWrapper isDarkMode={isDarkMode}>
        <Image
          src="/images/header/nextArrow.svg"
          width={12}
          height={12}
          alt="arrow_icon"
        />
      </IconWrapper>
      <span>{search}</span>
      <IconWrapper
        id={search}
        onClick={recentSearchDeleteHandler}
        isDarkMode={isDarkMode}
      >
        <Image
          src="/images/xBtn.png"
          width={10}
          height={10}
          alt="delete_icon"
        />
      </IconWrapper>
    </RecentSearchItemContainer>
  );
};

export default RecentSearchItem;

const RecentSearchItemContainer = styled.li<{ isDarkMode: boolean }>`
  display: flex;
  padding: 0.2rem 1.6rem;
  gap: 1rem;
  border-radius: 0.5rem;
  align-items: center;

  &:hover {
    background-color: ${(props) => (props.isDarkMode ? "#2c344d" : "#FFF1C0")};
    cursor: pointer;
  }

  span {
    flex-grow: 1;
  }
`;

const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  z-index: 1;
  filter: ${whiteBrownToggle};

  :hover {
    transform: scale(1.1);
  }
`;
