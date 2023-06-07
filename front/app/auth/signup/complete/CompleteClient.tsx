"use client";

import { AuthContainer } from "@/app/styles/auth/auth.style";
import { useRouter } from "next/navigation";
import styled from "styled-components";

const CompleteClient = () => {
  const router = useRouter();

  return (
    <AuthContainer>
      <MessageWrapper>
        <StyledTitleBox>
          <StyledTitle>이메일로 인증메일을 전송했습니다</StyledTitle>
        </StyledTitleBox>
        <LoginBtn
          type="button"
          onClick={() => {
            router.push("/auth/login");
          }}
        >
          로그인 하러가기
        </LoginBtn>
      </MessageWrapper>
    </AuthContainer>
  );
};

const MessageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 4rem;
  background-color: #white;
  border-radius: 1.5rem;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.25);
`;

const StyledTitleBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledTitle = styled.div`
  font-size: 22px;
  font-weight: 500;
  margin-bottom: 2rem;
`;

const LoginBtn = styled.button`
  width: 14rem;
  background-color: white;
  border-radius: 0.5rem;
  padding: 0.8rem 0.8rem;
  font-size: 16px;
  font-weight: 500;
  background-color: #fbd26a;

  &:hover {
    background-color: #f8b551;
  }

  transition: all 0.3s;
`;

export default CompleteClient;
