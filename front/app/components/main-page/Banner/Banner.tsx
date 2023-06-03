import Image from "next/image";
import styled from "styled-components";
import BannerSearchBar from "./BannerSearchBar";

const Banner = () => {
  return (
    <BannerContainer>
      <BannerWrapper>
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
              width={590}
              height={360}
            />
          </ImageWrapper>
        </ImageArea>
      </BannerWrapper>
    </BannerContainer>
  );
};

export default Banner;

const BannerContainer = styled.div`
  display: none;

  @media (min-width: 768px) {
    display: block;
    width: 100%;
    min-width: 120rem;
    height: 46rem;
    background-color: #ffea85;
  }
`;

const BannerWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  width: 120rem;
  height: 100%;
  margin: 0 auto;
`;

const SearchArea = styled.div`
  display: flex;
  margin-top: 7rem;
  flex-direction: column;
  padding: 2rem;
  width: 50%;
`;

const SearchTextContainer = styled.div`
  padding: 3rem 0;
`;

const SearchTextWrapper = styled.div`
  font-size: 24px;
  font-weight: 600;
`;

const ImageArea = styled.div`
  display: flex;
  align-items: center;
  padding: 2rem;
  wdith: 50%;
`;

const ImageWrapper = styled.div`
  display: flex;
  position: relative;
  width: 59rem;
  height: 36rem;
  right: 0;
`;
