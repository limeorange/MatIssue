"use client";

import darkModeAtom from "@/app/store/darkModeAtom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";

/** 버튼 컴포넌트 (type, fullWidth, fullHeight, fullRound, isBgColor, isHoverColor, onClick, disabled, isBorderColor, isSmallFont) 인자로 전달가능 */
type ButtonProps = {
  type?: "button" | "submit" | "reset" | undefined;
  fullWidth?: boolean;
  fullHeight?: boolean;
  isBgColor?: boolean;
  isBorderColor?: boolean;
  isHoverColor?: boolean;
  children?: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  isSmallFont?: boolean;
  isMediumFont?: boolean;
  isDarkMode?: boolean;
};

const Button = (props: ButtonProps) => {
  const {
    type,
    fullWidth,
    fullHeight,
    isBgColor,
    isBorderColor,
    isHoverColor,
    children,
    onClick,
    disabled,
    isSmallFont,
    isMediumFont,
  } = props;
  const isDarkMode = useRecoilValue(darkModeAtom);

  return (
    <StyledButton
      onClick={onClick}
      type={type}
      isDarkMode={isDarkMode}
      isBgColor={isBgColor}
      isBorderColor={isBorderColor}
      isHoverColor={isHoverColor}
      fullWidth={fullWidth}
      fullHeight={fullHeight}
      disabled={disabled}
      isSmallFont={isSmallFont}
      isMediumFont={isMediumFont}
    >
      {children}
    </StyledButton>
  );
};

const StyledButton = styled.button<ButtonProps>`
  padding: 0.6rem 1.3rem;
  font-weight: 600;
  
  height : 4.8rem;
  border-radius: 1.5rem;


  font-size: ${(props) =>
    props.isSmallFont ? "12px" : props.isMediumFont ? "15px" : "16px"};

  width: ${(props) => props.fullWidth && "100%"};
  height : ${(props) => props.fullHeight && "100%"};
  opacity: ${(props) => props.disabled && 50}
  cursor: ${(props) => props.disabled && "default"};

   
  border: ${(props) =>
    props.isDarkMode
      ? props.isBorderColor
        ? `0.2rem solid ${props.theme.yellow}`
        : "none"
      : props.isBorderColor
      ? `0.2rem solid ${props.theme.lightYellow}`
      : "none"};
  background-color: ${(props) =>
    props.isDarkMode
      ? props.isBgColor
        ? props.theme.lightYellow
        : props.theme.white
      : props.isBgColor
      ? props.theme.yellow
      : props.theme.white};
  color: ${(props) =>
    props.isDarkMode ? props.theme.deepNavy : props.theme.brown};

    &:hover {
      transition: all 0.2s ease-in-out;
      background-color: ${(props) =>
        props.isDarkMode
          ? props.isHoverColor
            ? props.theme.lightYellow
            : props.theme.yellow
          : props.isHoverColor
          ? props.theme.yellow
          : props.theme.deepYellow};
        }

  &:focus-visible {
    outline: 2px solid #a17c43;
    outline-offset: 2px;
  }

  &.selected {
    background-color: #f8b551;
  }
`;

export default Button;
