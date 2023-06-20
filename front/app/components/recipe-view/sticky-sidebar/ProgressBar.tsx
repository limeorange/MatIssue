import useMovingContentByScrolling from "@/app/hooks/useMovingContentByScrolling";
import { useEffect, useState } from "react";
import styled from "styled-components";

/** 페이지 전체 진행바 컴포넌트 */
const ProgressBar = () => {
  // 스크롤 진행 퍼센트 상태 관리
  const [scrollPercentage, setScrollPercentage] = useState(0);
  // 스크롤 진행바 반응형 상태 관리
  const [isVisible, setIsVisible] = useState(true);

  const isHeaderVisible = useMovingContentByScrolling();

  useEffect(() => {
    // 스크롤 진행 퍼센트를 현재 스크롤 위치를 기반으로 계산해주는 핸들러
    const scrollHandler = () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      const windowHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const percentage = (scrollTop / windowHeight) * 100;
      setScrollPercentage(percentage);
    };

    // 스크롤이 발생할 때마다 스크롤 진행 퍼센트 계산
    window.addEventListener("scroll", scrollHandler);

    // 컴포넌트가 언마운트될 때 이전에 등록한 스크롤 이벤트 리스너 제거 => 메모리 누수 방지
    return () => window.removeEventListener("scroll", scrollHandler);
  }, []);

  // 768px 이하일 때 사이드바 숨김 반응형 처리
  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      if (screenWidth <= 900) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      {isVisible && (
        <ProgressBarWrapper isHeaderVisible={isHeaderVisible}>
          <ProgressBarBox progress={scrollPercentage} />
        </ProgressBarWrapper>
      )}
    </>
  );
};

// 스크롤 진행바 전체 박스
const ProgressBarWrapper = styled.div<{ isHeaderVisible: boolean }>`
  position: fixed;
  left: 0;
  top: 13.1rem;
  width: 100%;
  height: 1rem;
  background-color: #f2f2f2;
  z-index: 40;

  transform: ${(props) =>
    props.isHeaderVisible ? "translateY(0)" : "translateY(-131px)"};
  transition: transform 0.3s ease-in-out;
`;

// 스크롤 진행바
const ProgressBarBox = styled.div<{ progress: number }>`
  height: 100%;
  width: ${({ progress }) => `${progress}%`};
  background-color: #fbd26a;
  border-radius: 0 1rem 1rem 0;
`;

export default ProgressBar;
