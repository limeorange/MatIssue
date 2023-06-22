import { useRouter } from "next/navigation";
import { ChangeEvent, useState, useEffect, useRef } from "react";
import styled from "styled-components";
import Image from "next/image";
import { useRecoilValue } from "recoil";
import darkModeAtom from "@/app/store/darkModeAtom";
import { iconColor } from "@/app/constants/darkMode.constants";

/** 헤더 검색바 컴포넌트 */
const SearchBar = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [showRecentSearches, setShowRecentSearches] = useState(false);
  const isDarkMode = useRecoilValue(darkModeAtom);
  const searchRef = useRef(null);

  // 로컬 스토리지에서 최근 검색어를 가져옴
  useEffect(() => {
    const savedSearches = JSON.parse(localStorage.getItem("searches") || "[]");
    setRecentSearches(savedSearches);
  }, []);

  useEffect(() => {
    // Listen for clicks outside of the search bar
    const handleClickOutside = (e: MouseEvent) => {
      if (
        searchRef.current &&
        !(searchRef.current as HTMLElement).contains(e.target as Node)
      ) {
        setShowRecentSearches(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchRef]);

  /** 검색 핸들러 */
  const searchSubmitHandler: React.KeyboardEventHandler<HTMLInputElement> = (
    e
  ) => {
    if (e.key === "Enter") {
      setShowRecentSearches(false);
      const newSearches = [searchQuery, ...recentSearches]
        .slice(0, 10)
        .filter((item, index, self) => self.indexOf(item) === index);
      localStorage.setItem("searches", JSON.stringify(newSearches));
      setRecentSearches(newSearches);
      router.push(`/recipes/search?query=${encodeURIComponent(searchQuery)}`);
    }
  };

  const searchDeleteHandler = (e: React.MouseEvent) => {
    e.stopPropagation();
    const searches = e.currentTarget.id;
    const newSearches = recentSearches.filter((item) => item !== searches);
    localStorage.setItem("searches", JSON.stringify(newSearches));
    setRecentSearches(newSearches);
  };

  return (
    <SearchBarContainer
      ref={searchRef}
      showRecentSearches={showRecentSearches}
      isDarkMode={isDarkMode}
    >
      <SearchBarInputContainer>
        <Image
          src="/images/searchIcon.svg"
          width={18}
          height={18}
          alt="searchIcon"
        />
        <SearchBarInputWrapper>
          <SearchBarInput
            isDarkMode={isDarkMode}
            onKeyUp={searchSubmitHandler}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setSearchQuery(e.target.value)
            }
            onFocus={() => setShowRecentSearches(true)}
          />
        </SearchBarInputWrapper>
      </SearchBarInputContainer>

      {showRecentSearches && (
        <>
          <RecentSearchesList isDarkMode={isDarkMode}>
            <UderLine />
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
            {recentSearches.map((search, index) => (
              <RecentSearchItem
                isDarkMode={isDarkMode}
                key={index}
                onClick={() => router.push(`/recipes/search?query=${search}`)}
              >
                <Image
                  src="/images/searchIcon.svg"
                  width={12}
                  height={12}
                  alt="searchIcon"
                />
                <span>{search}</span>
                <IconWrapper
                  isDarkMode={isDarkMode}
                  id={search}
                  onClick={searchDeleteHandler}
                >
                  <Image
                    src="/images/xBtn.png"
                    width={10}
                    height={10}
                    alt="searchIcon"
                  />
                </IconWrapper>
              </RecentSearchItem>
            ))}
          </RecentSearchesList>
        </>
      )}
    </SearchBarContainer>
  );
};

const SearchBarContainer = styled.div<{
  showRecentSearches: boolean;
  isDarkMode: boolean;
}>`
  display: none;
  position: relative;
  align-items: center;
  padding: 0.8rem 1.6rem;
  height: 4rem;
  flex-grow: 1;
  gap: 1.6rem;
  max-width: 36rem;
  z-index: 999;

  border: 0.1rem solid
    ${(props) => (props.isDarkMode ? props.theme.lightNavy : "#ccc")};
  background-color: ${(props) =>
    props.isDarkMode ? props.theme.lightNavy : "#fff"};
  color: ${(props) => (props.isDarkMode ? "#fff" : "#000")};

  @media (min-width: 1024px) {
    display: flex;
    flex-direction: column;
    position: absolute;
    box-sizing: border-box;
    width: 36rem;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 10rem;
    ${(props) => props.showRecentSearches && "border: 0.2rem solid #fbd26a;"}
    ${(props) =>
      props.showRecentSearches && "border-radius: 0.8rem 0.8rem 0 0;"}
      ${(props) => props.showRecentSearches && "padding: 0.7rem 1.5rem"};
  }
`;

const SearchBarInputContainer = styled.div`
  display: flex;
  gap: 1.6rem;
  width: 100%;
`;

const SearchBarInputWrapper = styled.div`
  width: 100%;
`;

const SearchBarInput = styled.input<{ isDarkMode: boolean }>`
  width: 100%;
  border: none;
  font-size: 16px;
  font-weight: 400;
  &:focus {
    outline: none;
    border: none;
  }
`;

const UderLine = styled.div`
  display: block;
  border-top: 0.1rem solid #ddd;
  padding-top: 0.5rem;
  width: calc(100% - 3.2rem);
  margin: 0 auto;
`;

const RecentSearchesList = styled.ul<{ isDarkMode: boolean }>`
  display: flex;
  flex-direction: column;
  position: absolute;
  box-sizing: border-box;
  z-index: 999;
  top: 3.5rem;
  left: -0.2rem;
  background-color: ${(props) =>
    props.isDarkMode ? props.theme.lightNavy : "#fff"};
  padding: 0.5rem 0 1rem 0;
  width: 36rem;
  border-left: 0.2rem solid #fbd26a;
  border-right: 0.2rem solid #fbd26a;
  border-bottom: 0.2rem solid #fbd26a;
  border-radius: 0 0 0.8rem 0.8rem;
  font-size: 14px;
`;

const RecentSearchItemHeader = styled.li`
  display: flex;
  padding: 0.2rem 1.6rem;
  gap: 1rem;
  border-radius: 0.5rem;
  align-items: center;
  justify-content: space-between;
`;

const RecentSearchItem = styled.li<{ isDarkMode: boolean }>`
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
  height: 2.1rem;
  padding-left: 1rem;
  z-index: 1;
  filter: ${iconColor};

  :hover {
    transform: scale(1.1);
  }
`;

const DeleteAll = styled.span`
  :hover {
    cursor: pointer;
  }
`;

export default SearchBar;
