import React, { useState } from "react";
import KakaoMap from "./kakaoMap";
import styled from "styled-components";

export interface propsType {
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
      <InnerContainer>
        <SearchFormContainer>
          <SearchForm onSubmit={submitKeyword}>
            <Label htmlFor="place">
              <Input
                type="text"
                id="movie-title"
                name="place"
                onChange={keywordChange}
                placeholder="검색어를 입력해주세요. (ex: 강남 맛집)"
                required
              />
              <ButtonBox>
                <SubmitButton
                  type="submit"
                  value="검색"
                  onClick={valueChecker}
                />
              </ButtonBox>
            </Label>
          </SearchForm>
        </SearchFormContainer>
        {/* 제출한 검색어 넘기기 */}
        <KakaoMap searchKeyword={Keyword} />
      </InnerContainer>
    </LandingPageContainer>
  );
};

export default LandingPage;

const LandingPageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f5f5;
`;

const InnerContainer = styled.div`
  width: 80%;
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
`;

const SearchFormContainer = styled.div`
  margin-bottom: 20px;
`;

const SearchForm = styled.form`
  display: flex;
  justify-content: space-between;
`;

const Label = styled.label`
  width: 100%;
`;

const Input = styled.input`
  border-radius: 3px;
  box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.2);
  display: block;
  font-size: 16px;
  height: 45px;
  line-height: 45px;
  padding: 0 15px 0 35px;
  width: 100%;
`;

const ButtonBox = styled.div`
  width: 10%;
  padding-top: 1rem;
`;

const SubmitButton = styled.input`
  width: 100%;
  height: 2rem;
  padding: 10px;
  background-color: #3399ff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #007acc;
  }
`;
