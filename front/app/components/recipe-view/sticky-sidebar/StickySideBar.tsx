import useMovingContentByScrolling from "@/app/hooks/useMovingContentByScrolling";
import { useEffect, useState } from "react";
import { Link } from "react-scroll";
import styled from "styled-components";

/** 목차 사이드바 컴포넌트 */
const StickySideBar = () => {
  const isHeaderVisible = useMovingContentByScrolling();

  const sections = [
    { id: "heading1", label: "요리 정보" },
    { id: "heading2", label: "재료 준비" },
    { id: "heading3", label: "요리 과정" },
    { id: "heading4", label: "요리팁" },
    { id: "heading5", label: "요리 동영상" },
    { id: "heading6", label: "댓글" },
  ];

  /** 목차 클릭 시 해당 위치로 스크롤 이동 */
  const titleClickHandler = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  // 768px 이하일 때 사이드바 숨김 반응형 처리
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
        <SidebarContainerDiv isHeaderVisible={isHeaderVisible}>
          <TitleH3>목차</TitleH3>
          <SidebarContentsDiv>
            {sections.map((section) => (
              <ItemLink
                key={section.id}
                to={section.id}
                smooth={true}
                duration={500}
                spy={true}
                offset={-160}
                activeClass="active"
                onClick={() => titleClickHandler(section.id)}
              >
                {section.label}
              </ItemLink>
            ))}
          </SidebarContentsDiv>
        </SidebarContainerDiv>
      )}
    </>
  );
};

/** 목차 사이드바 전체 감싸는 Div */
const SidebarContainerDiv = styled.div<{ isHeaderVisible: boolean }>`
  position: fixed;
  top: 17rem;
  left: 20rem;
  transform: ${(props) =>
    props.isHeaderVisible ? "translateY(0)" : "translateY(-131px)"};
  transition: transform 0.3s ease-in-out;
`;

/** 목차 사이드바 감싸는 Div */
const SidebarContentsDiv = styled.div`
  z-index: 50;
`;

/** 목차 H3 */
const TitleH3 = styled.h3`
  font-size: 22px;
  color: #b08038;
  font-weight: 500;
  margin-bottom: 2.5rem;
`;

/** 목차 제목 Link */
const ItemLink = styled(Link)`
  display: block;
  font-size: 16.5px;
  margin-bottom: 2.1rem;
  cursor: pointer;

  &.active {
    color: #d2a225;
    font-weight: 500;
  }
`;

export default StickySideBar;
