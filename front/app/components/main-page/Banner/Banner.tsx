"use client";

import Image from "next/image";
import styled from "styled-components";
import BannerSearchBar from "./BannerSearchBar";
import Link from "next/link";

const Banner = () => {
  return (
    <BannerContainer>
      <BannerWrapper>
        <Link href="/mbti">
          <Image
            src="/images/banner/banner1.svg"
            width={1100}
            height={400}
            alt="banner"
          />
        </Link>
        {/* <SearchArea>
          <SearchTextContainer>
            <SearchTextWrapper>
              대한민국 No.1 레시피 커뮤니티 맛이슈에서
            </SearchTextWrapper>
            <SearchTextWrapper>
              찾으시는 레시피를 검색해보세요!
            </SearchTextWrapper>
          </SearchTextContainer>
          <BannerSearchBar />
        </SearchArea>
        <ImageArea>
          <ImageWrapper>
            <Image src="/images/banner/bannerImage1.png" alt="banner" fill />
          </ImageWrapper>
        </ImageArea> */}
      </BannerWrapper>
    </BannerContainer>
  );
};

export default Banner;

const BannerContainer = styled.div`
  display: none;
  color: rgb(75, 75, 75);
  @media (min-width: 1024px) {
    display: block;
    min-width: 102.4rem;
    height: 40rem;
    background-color: #ffea85;
    margin: 0 auto;
  }
`;

const BannerWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  width: 100%;
  max-width: 120rem;
  height: 100%;
  margin: 0 auto;
  padding: 0 2rem;
`;

const SearchArea = styled.div`
  display: flex;
  margin-top: 8rem;
  flex-direction: column;
  padding: 2rem;
  width: 45%;
`;

const SearchTextContainer = styled.div`
  padding: 2rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SearchTextWrapper = styled.div`
  font-size: 24px;
  font-weight: 600;
`;

const ImageArea = styled.div`
  display: flex;
  align-items: center;
  padding: 6rem 2rem;
  wdith: 50%;
`;

const ImageWrapper = styled.div`
  display: flex;
  obejct-fit: contain;
  position: relative;
  width: 45rem;
  height: 30rem;
  right: 0;
`;
