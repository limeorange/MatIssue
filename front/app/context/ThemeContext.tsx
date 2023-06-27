"use client";

import { ReactNode } from "react";
import { useRecoilValue } from "recoil";
import { ThemeProvider } from "styled-components";
import { createGlobalStyle } from "styled-components";
import darkModeAtom from "../store/darkModeAtom";
import { Theme } from "../types/darkMode";

const theme = {
  deepYellow: "#F8B551",
  yellow: "#FBD26A",
  lightYellow: "#FFF1C0",
  brown: "#4F3D21",
  lightBrown: "#B08038",
  deepNavy: "#212739",
  navy: "#2C344D",
  lightNavy: "#404353",
  deepGrey: "#666",
  grey: "#ccc",
  lightGrey: "#ddd",
  white: "#fff",

  // 여기에 추가적으로 사용할 색상들을 정의
};

type Props = {
  children: ReactNode;
};

function StyledTheme({ children }: Props) {
  /** 다크모드 리코일 상태값  */
  const isDarkMode = useRecoilValue(darkModeAtom);

  /**  스타일드 컴포넌트 전역 CSS 설정 */
  const GlobalStyle = createGlobalStyle<{ isDarkMode: boolean; theme: Theme }>`
  ${(props) => {
    const { isDarkMode, theme } = props;
    const {
      deepYellow,
      yellow,
      lightYellow,
      brown,
      lightBrown,
      deepNavy,
      navy,
      lightNavy,
      deepGrey,
      grey,
      lightGrey,
      white,
    } = theme;
    return `
      body {
        background-color : ${isDarkMode ? deepNavy : white};
        color : ${isDarkMode ? lightGrey : brown};
      }

      h2 {
        color: ${isDarkMode ? white : brown};
      }

      h3 {
        color: ${isDarkMode ? grey : deepGrey};
      }

      h5 {
        color : ${isDarkMode ? lightYellow : brown};
      }

      span {
        color : ${isDarkMode ? white : brown};
      }

      label {
        color : ${isDarkMode ? white : brown};
      }

      input {
        background-color : ${isDarkMode ? lightNavy : white};
        border : ${
          isDarkMode ? `0.05rem solid ${lightGrey}` : `0.1rem solid ${grey}`
        };
        color : ${isDarkMode ? white : brown};
        &:focus {
          border : ${isDarkMode ? "0.05rem" : "0.1rem"} solid ${yellow};
          outline : 0.2rem solid ${yellow}
        }
        &:-webkit-autofill,
        &:-webkit-autofill:hover, 
        &:-webkit-autofill:focus {
          -webkit-box-shadow: 0 0 0 1000px ${
            isDarkMode ? lightNavy : white
          } inset;
          -webkit-text-fill-color: ${isDarkMode ? white : brown};
          font-size: 16px; 
        }
      }

      textarea {
        background-color: ${isDarkMode ? lightNavy : white};
        border : ${isDarkMode ? "0.05rem" : "0.1rem"} solid ${grey};
        &:focus {
          border : ${isDarkMode ? "0.05rem" : "0.1rem"} solid ${yellow};
          outline : 0.2rem solid ${yellow};
        }
      }
    `;
  }}
`;

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle isDarkMode={isDarkMode} />
      {children}
    </ThemeProvider>
  );
}

export default StyledTheme;
