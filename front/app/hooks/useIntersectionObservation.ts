import { useEffect, useRef } from "react";

/** 교차 관찰 Hook */
const useIntersectionObservation = (
  setActiveId: (id: string) => void
): void => {
  // 참조 저장
  const contentRef = useRef<{ [key: string]: IntersectionObserverEntry }>({});

  // 컴포넌트가 마운트될 때와 setActiveId가 변경될 때마다 실행
  useEffect(() => {
    // observedContent : 교차 관찰된 내용을 담고 있는 배열
    //
    const callback: IntersectionObserverCallback = (observedContent) => {
      observedContent.forEach((content) => {
        contentRef.current[content.target.id] = content;
      });

      // 화면에 보이는 교차 관찰 내용을 담은 배열
      const visibleContent = Object.values(contentRef.current).filter(
        (content) => content.isIntersecting
      );

      // 화면에 교차되는 내용 중 최상위에 있는 컨텐츠를 선택해서 활성화된 항목 ID 업데이트
      setActiveId(visibleContent[0].target.id);
    };

    // 1. 새로운 observer 설정
    // IntersectionObserver : 교차 관찰에 사용되는 기능 제공하는 웹 API
    // 1번째 인자 callback : 교차 관찰 이벤트 처리
    // 2번째 인자 : observer 설정
    const observer = new IntersectionObserver(callback, {
      rootMargin: "-20% 0px",
      threshold: [0, 0.5, 1],
    });

    // 2. DOM 요소 찾고 Observer 달아주기
    const contents = Array.from(
      document.querySelectorAll("#content")
    ) as Element[];

    contents.forEach((content) => observer.observe(content));

    // 3. 언 마운트시 옵저버 해제
    return () => observer.disconnect();
  }, [setActiveId]);
};

export default useIntersectionObservation;
