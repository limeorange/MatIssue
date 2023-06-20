"use client";

import styled from "styled-components";
import Logo from "../header/Logo";

const Footer = () => {
  return (
    <FooterContainer>
      <FooterWrapper>
        <Logo />
        <FooterTextBox>
          팀장 : 신유빈 | 팀원 : 김동균 송호준 이나현 이수현 임정훈 장윤수
          <br />
          주소: 서울특별시 성동구 아차산로 17길 48 | 전화번호 : 010-1234-5678 |
          이메일 : matissue@gmx.com
        </FooterTextBox>
        <FooterAllRightsReserved>
          개인정보 보호정책 | 이용약관 | 문의하기
        </FooterAllRightsReserved>
        <FooterAllRightsReserved>
          © 2023 맛이슈. All rights reserved.
        </FooterAllRightsReserved>
        맛이슈는 레시피 공유, 요리 팁 및 관련 정보를 제공하는 온라인
        커뮤니티입니다. 모든 레시피 및 콘텐츠는 사용자들 간의 공유를 통해
        생성되었으며, 맛이슈는 그 내용에 대한 책임을 지지 않습니다. 자세한
        내용은 이용약관을 참조해주세요.
      </FooterWrapper>
    </FooterContainer>
  );
};

export default Footer;

const FooterContainer = styled.div`
  width: 100%;
  background-color: #fbe2a1;
`;

const FooterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.8rem;
  max-width: 120rem;
  width: 100%;
  padding: 2rem;
  margin: 0 auto;
  font-size: 10px;

  @media (min-width: 1024px) {
    font-size: 12px;
    padding: 4rem;
  }
`;

const FooterTextBox = styled.div`
  font-size: 12px;

  @media (min-width: 1024px) {
    font-size: 16px;
  }
`;

const FooterAllRightsReserved = styled.div`
  font-size: 10px;

  @media (min-width: 1024px) {
    font-size: 14px;
  }
`;
