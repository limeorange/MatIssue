import useMovingContentByScrolling from "@/app/hooks/useMovingContentByScrolling";
import { useEffect, useState } from "react";
import styled from "styled-components";

/** 목차 사이드바용 스크롤 진행바 컴포넌트 */
const StickyProgressBar = () => {
  // 스크롤 진행 퍼센트 상태 관리
  const [scrollPercentage, setScrollPercentage] = useState(0);

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

  return (
    <>
      {
        <ProgressBarWrapper isHeaderVisible={isHeaderVisible}>
          <ProgressBarBox progress={scrollPercentage} />
        </ProgressBarWrapper>
      }
    </>
  );
};

/** 스크롤 진행바 전체 박스 */
const ProgressBarWrapper = styled.div<{ isHeaderVisible: boolean }>`
  position: fixed;
  top: 21rem;
  left: 16.5rem;
  height: 29rem;
  width: 1rem;
  background-color: #f2f2f2;
  border-radius: 1rem;
  z-index: 40;

  transform: ${(props) =>
    props.isHeaderVisible ? "translateY(0)" : "translateY(-131px)"};
  transition: transform 0.3s ease-in-out;
`;

/** 스크롤 진행바 */
const ProgressBarBox = styled.div<{ progress: number }>`
  width: 100%;
  height: ${({ progress }) => `${progress}%`};
  background-color: #fbd26a;
  border-radius: 1rem;
`;

export default StickyProgressBar;
