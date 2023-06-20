"use client";

import { ReactNode } from "react";
import { ThemeProvider } from "styled-components";

const theme = {
  deepYellow: "#F8B551",
  yellow: "#FBD26A",
  lightYellow: "#FFF1C0",
  brown: "#4F3D21",
  deepNavy: "#2A2E41",
  lightNavy: "#404353",

  // 여기에 추가적으로 사용할 색상들을 정의할 수 있습니다.
};

type Props = {
  children: ReactNode;
};

function StyledTheme({ children }: Props) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}

export default StyledTheme;
