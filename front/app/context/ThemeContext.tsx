"use client";

import { ReactNode, useEffect } from "react";
import { useRecoilValue } from "recoil";
import { ThemeProvider } from "styled-components";
import { createGlobalStyle } from "styled-components";
import darkModeAtom from "../store/darkModeAtom";

export type Theme = {
  deepYellow: string;
  yellow: string;
  lightYellow: string;
  brown: string;
  deepNavy: string;
  lightNavy: string;
  grey: string;
  lightGrey: string;
  white: string;
};

const theme = {
  deepYellow: "#F8B551",
  yellow: "#FBD26A",
  lightYellow: "#FFF1C0",
  brown: "#4F3D21",
  deepNavy: "#212739",
  navy: "#2C344D",
  lightNavy: "#404353",
  grey: "#ccc",
  lightGrey: "#ddd",
  white: "#fff",

  // 여기에 추가적으로 사용할 색상들을 정의할 수 있습니다.
};

type Props = {
  children: ReactNode;
};

function StyledTheme({ children }: Props) {
  const isDarkMode = useRecoilValue(darkModeAtom);

  const GlobalStyle = createGlobalStyle<{ isDarkMode: boolean }>`
  h2 {
    color: ${(props) => (props.isDarkMode ? "#fff" : "#4F3D21")};
  }

  h3 {
    color: ${(props) => (props.isDarkMode ? "#ccc" : "#666")};
  }
  span {
    color : ${(props) => (props.isDarkMode ? "#fff" : "#4F3D21")};
  }
  input {
    background-color : ${(props) => (props.isDarkMode ? "#404353" : "#fff")};
    border : ${(props) =>
      props.isDarkMode ? "0.05rem solid #ccc" : "0.1rem solid #ddd"};
    color : ${(props) => (props.isDarkMode ? "#fff" : "#333")};
    &:focus {
      box-shadow: inset 0 0 0.1rem 0.1rem #fbd26a;
      border : 0.1rem solid #fbd26a;
    }
  }
    input {
    background-color : ${(props) => (props.isDarkMode ? "#404353" : "#fff")};
    border : ${(props) =>
      props.isDarkMode ? "0.1rem solid #404353" : "0.1rem solid #ccc"};
    color : ${(props) => (props.isDarkMode ? "#fff" : "#333")};
  }
  label {
    color : ${(props) => (props.isDarkMode ? "#fff" : "#4F3D21")};
  }
  textarea {
    background-color: ${(props) => (props.isDarkMode ? "#404353" : "#fff")};
    border : ${(props) =>
      props.isDarkMode ? "0.05rem solid #ccc" : "0.1rem solid #ccc"};
  }
`;

  useEffect(() => {
    if (isDarkMode) {
      document.body.style.backgroundColor = "#212739";
      document.body.style.color = "#fff";
    } else {
      document.body.style.backgroundColor = "#fff";
      document.body.style.color = "#4F3D21";
    }
  }, [isDarkMode]);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle isDarkMode={isDarkMode} />
      {children}
    </ThemeProvider>
  );
}

export default StyledTheme;
