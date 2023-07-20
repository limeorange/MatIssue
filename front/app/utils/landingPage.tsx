import React, { useState } from "react";
import KakaoMap from "./kakaoMap";
import styled from "styled-components";

export interface propsType {
  condition: any;
  searchKeyword: string;
}

const LandingPage = (): JSX.Element => {
  // 입력 폼 변화 감지하여 입력 값 관리
  const [Value, setValue] = useState("");
  // 제출한 검색어 관리
  const [Keyword, setKeyword] = useState("");

  // 입력 폼 변화 감지하여 입력 값을 state에 담아주는 함수
  const keywordChange = (e: {
    preventDefault: () => void;
    target: { value: string };
  }) => {
    e.preventDefault();
    setValue(e.target.value);
  };

  // 제출한 검색어 state에 담아주는 함수
  const submitKeyword = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setKeyword(Value);
  };

  // 검색어를 입력하지 않고 검색 버튼을 눌렀을 경우
  const valueChecker = () => {
    if (Value === "") {
      alert("검색어를 입력해주세요.");
    }
  };

  return (
    <LandingPageContainer>
      <SearchFormContainer>
        <form onSubmit={submitKeyword}>
          <Label htmlFor="place">
            <Input
              type="text"
              id="search-input"
              name="place"
              onChange={keywordChange}
              placeholder="검색어를 입력해주세요. (ex: 강남 맛집)"
              required
            />
          </Label>
        </form>
      </SearchFormContainer>
      <KakaoMap searchKeyword={Keyword} />
    </LandingPageContainer>
  );
};

export default LandingPage;

const LandingPageContainer = styled.div`
  height: 100%;
  margin-bottom: 1rem;
`;

const SearchFormContainer = styled.div`
  width: 100%;
  max-width: 31rem;
  padding: 1rem 0 1rem 0;
  margin-left: 27.8rem;
`;

const Label = styled.label`
  width: 100%;
  max-width: 30rem;
`;

const Input = styled.input`
  font-size: 16px;
  width: 100%;
  max-width: 30rem;
  padding: 2%;
  text-align: center;
`;
