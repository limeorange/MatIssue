"use client";

import { useEffect, useState } from "react";
import styled from "styled-components";

const ContentSideBar = () => {
  const [scrollPercentage, setScrollPercentage] = useState(0);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const scrollHandler = () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      const windowHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const percentage = (scrollTop / windowHeight) * 100;
      setScrollPercentage(percentage);
    };

    const sectionHandler = () => {
      const sections = document.querySelectorAll("section");
      const scrollPosition = window.scrollY + window.innerHeight / 2;
      let activeSectionId = "";

      for (const section of sections) {
        const { top, bottom, id } = section.getBoundingClientRect();

        if (top <= scrollPosition && bottom >= scrollPosition) {
          activeSectionId = id;
          break;
        }
      }

      setActiveSection(activeSectionId);
    };

    window.addEventListener("scroll", scrollHandler);
    window.addEventListener("scroll", sectionHandler);

    return () => {
      window.removeEventListener("scroll", scrollHandler);
      window.removeEventListener("scroll", sectionHandler);
    };
  }, []);

  return (
    <Container>
      <ProgressBarContainer>
        <ProgressBar progress={scrollPercentage} />
      </ProgressBarContainer>
      <Sidebar>
        <TableOfContents>
          <TableOfContentsItem>Section 1</TableOfContentsItem>
          <TableOfContentsItem>Section 2</TableOfContentsItem>
          <TableOfContentsItem>Section 3</TableOfContentsItem>
          <TableOfContentsItem>Section 4</TableOfContentsItem>
        </TableOfContents>
      </Sidebar>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
`;

const ProgressBarContainer = styled.div`
  width: 10px;
  height: 100%;
  background-color: #f2f2f2;
`;

const ProgressBar = styled.div<{ progress: number }>`
  width: 100%;
  height: ${({ progress }) => `${progress}%`};
  background-color: #ff6b6b;
`;

const Sidebar = styled.div`
  width: 200px;
  height: 50vh;
  position: fixed;
  top: 0;
  right: 0;
  background-color: #f2f2f2;
`;

const TableOfContents = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`;

const TableOfContentsItem = styled.li`
  padding: 8px;
  cursor: pointer;

  &:hover {
    background-color: #ddd;
  }
`;

export default ContentSideBar;
