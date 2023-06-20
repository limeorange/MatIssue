import useMovingContentByScrolling from "@/app/hooks/useMovingContentByScrolling";
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

  return (
    <>
      {
        <SidebarContainer isHeaderVisible={isHeaderVisible}>
          <Title>목차</Title>
          <SidebarContentsWrapper>
            {sections.map((section) => (
              <TitleLink
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
              </TitleLink>
            ))}
          </SidebarContentsWrapper>
        </SidebarContainer>
      }
    </>
  );
};

/** 목차 사이드바 전체 감싸는 Div */
const SidebarContainer = styled.div<{ isHeaderVisible: boolean }>`
  position: fixed;
  top: 17rem;
  left: 20rem;
  transform: ${(props) =>
    props.isHeaderVisible ? "translateY(0)" : "translateY(-131px)"};
  transition: transform 0.3s ease-in-out;
`;

/** 목차 사이드바 감싸는 Div */
const SidebarContentsWrapper = styled.div`
  z-index: 50;
`;

/** 목차 H3 */
const Title = styled.h3`
  font-size: 22px;
  color: #b08038;
  font-weight: 500;
  margin-bottom: 2.5rem;
`;

/** 목차 제목 Link */
const TitleLink = styled(Link)`
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
