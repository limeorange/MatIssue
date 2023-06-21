"use client";

import Image from "next/image";
import styled, { css } from "styled-components";
import BannerSearchBar from "./BannerSearchBar";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Banner = () => {
  const [currentBannerIndex, setCurrentBannerIndex] = useState<number>(0); // 현재 배너 인덱스
  const [translateValue, setTranslateValue] = useState<number>(0); // 현재 위치
  const [windowWidth, setWindowWidth] = useState(window.innerWidth); // 윈도우창 너비
  const sliderRef = React.useRef<HTMLDivElement>(null); // 배너 슬라이드 div
  const bannerWrapperWidth = sliderRef.current
    ? sliderRef.current.offsetWidth
    : 0;

  const slideChildLength = windowWidth >= 1024 ? 3 : 2;

  useEffect(() => {
    // 브라우저 크기가 변경될 때마다 이벤트 핸들러를 호출하여 windowWidth를 업데이트
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    // 컴포넌트가 마운트될 때와 화면 크기가 변경될 때마다 이벤트 리스너를 추가하고 제거합
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  /** 배너 인덱스 계산해서 다음 배너로 슬라이드해주는 함수 */
  const slide = (currentBannerIndex: number) => {
    if (currentBannerIndex > slideChildLength - 2) {
      setCurrentBannerIndex(0);
    } else {
      setCurrentBannerIndex(currentBannerIndex + 1);
    }
  };

  useEffect(() => {
    if (currentBannerIndex === 0) {
      setTranslateValue(-bannerWrapperWidth * currentBannerIndex);
    }
    if (currentBannerIndex === 1) {
      setTranslateValue(-bannerWrapperWidth * currentBannerIndex);
    }
    if (currentBannerIndex === 2) {
      setTranslateValue(-bannerWrapperWidth * currentBannerIndex);
    }
  }, [currentBannerIndex, bannerWrapperWidth]);

  useEffect(() => {
    const interval = setInterval(() => {
      slide(currentBannerIndex);
    }, 8000);

    return () => {
      clearInterval(interval);
    };
  }, [currentBannerIndex]);

  return (
    <BannerContainer>
      <BannerWindow>
        <SliderContainer>
          <Slider ref={sliderRef} translateValue={translateValue}>
            <BannerWrapper2>
              <SearchArea>
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
                  <Image
                    src="/images/banner/bannerImage1.png"
                    alt="banner"
                    width={450}
                    height={280}
                  />
                </ImageWrapper>
              </ImageArea>
            </BannerWrapper2>
            <BannerWrapper>
              <Link href="/mbti">
                <Image
                  src="/images/banner/banner22.jpg"
                  width={1100}
                  height={400}
                  quality={100}
                  alt="banner2"
                />
              </Link>
            </BannerWrapper>
            <BannerWrapper>
              <Link href="/worldcup">
                <Image
                  src="/images/banner/banner33.jpg"
                  width={1100}
                  height={400}
                  quality={100}
                  alt="banner3"
                />
              </Link>
            </BannerWrapper>
          </Slider>
        </SliderContainer>
        <IndicatorWrapper>
          <IndicatorDot
            active={0 === currentBannerIndex}
            onClick={() => setCurrentBannerIndex(0)}
          />
          <IndicatorDot
            active={1 === currentBannerIndex}
            onClick={() => setCurrentBannerIndex(1)}
          />
          <IndicatorDot
            active={2 === currentBannerIndex}
            onClick={() => setCurrentBannerIndex(2)}
          />
        </IndicatorWrapper>
      </BannerWindow>
    </BannerContainer>
  );
};

export default Banner;

const BannerContainer = styled.div`
  display: block;
  width: 100%;
  padding: 1.5rem 1.5rem 0 1.5rem;
  color: #4f3d21;

  @media (min-width: 1024px) {
    display: block;
    padding: 0;
    border-radius: 0;
    min-width: 102.4rem;
    height: 40rem;
    background-color: #ffea85;
    margin: 0 auto;
  }
`;

const BannerWindow = styled.div`
  position: relative;
  width: 100%;
  max-width: 120rem;
  margin: 0 auto;
`;

const SliderContainer = styled.div`
  overflow: hidden;
`;

const Slider = styled.div<{ translateValue: number }>`
  display: flex;
  ${({ translateValue }) =>
    css`
      transform: translateX(${translateValue}px);
    `}
  transition: transform 0.5s ease-in-out;
`;

const BannerWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  padding: 0;
  overflow: hidden;
  border-radius: 0.8rem;
  flex: 0 0 100%;

  @media (min-width: 1024px) {
    padding: 0 2rem;
  }
`;

const BannerWrapper2 = styled.div`
  display: none;

  @media (min-width: 1024px) {
    display: flex;
    padding: 0 2rem;
    flex: 0 0 100%;
    justify-content: center;
    width: 100%;
    height: 100%;
    margin: 0 auto;
    padding: 0;
    overflow: hidden;
    border-radius: 0.8rem;
    position: relative;
  }
`;

const SearchArea = styled.div`
  display: flex;
  margin-top: 8rem;
  flex-direction: column;
  padding: 2rem;
  width: 45%;
  height: 100%;
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
  height: 40rem;
`;

const ImageWrapper = styled.div`
  display: flex;
  obejct-fit: contain;
  position: relative;
  width: 45rem;
  height: 28rem;
  right: 0;
`;

const IndicatorWrapper = styled.div`
  display: none;
  @media (min-width: 1024px) {
    display: block;
    position: absolute;
    bottom: 10px;
    left: 50%;
    transform: translateX(-50%);
  }
`;

const IndicatorDot = styled.div<{ active: boolean }>`
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  margin: 0 5px;
  cursor: pointer;
  opacity: 0.7;

  background-color: ${(props) => (props.active ? "#4F3D21" : "white")};
`;
