import { useEffect, useState } from "react";
import styled from "styled-components";

/** 목차 사이드바용 스크롤 진행바 컴포넌트 */
const StickyProgressBar = () => {
  // 스크롤 진행 퍼센트 상태 관리
  const [scrollPercentage, setScrollPercentage] = useState(0);

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

  // 768px 이하일 때 사이드 진행바 숨김 반응형 처리
  const [isSidebarVisible, setSidebarVisible] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      if (screenWidth <= 900) {
        setSidebarVisible(false);
      } else {
        setSidebarVisible(true);
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
      {isSidebarVisible && (
        <ProgressBarContainerDiv>
          <ProgressBarDiv progress={scrollPercentage} />
        </ProgressBarContainerDiv>
      )}
    </>
  );
};

/** 스크롤 진행바 전체 박스 */
const ProgressBarContainerDiv = styled.div`
  position: fixed;
  top: 24rem;
  left: 16.5rem;
  height: 29rem;
  width: 1rem;
  background-color: #f2f2f2;
  border-radius: 1rem;
  z-index: 40;
`;

/** 스크롤 진행바 */
const ProgressBarDiv = styled.div<{ progress: number }>`
  width: 100%;
  height: ${({ progress }) => `${progress}%`};
  background-color: #fbd26a;
  border-radius: 1rem;
`;

export default StickyProgressBar;
