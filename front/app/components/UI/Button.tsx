"use client";

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
  } = props;
  return (
    <StyledButton
      onClick={onClick}
      type={type}
      isBgColor={isBgColor}
      isBorderColor={isBorderColor}
      isHoverColor={isHoverColor}
      fullWidth={fullWidth}
      fullHeight={fullHeight}
      disabled={disabled}
      isSmallFont={isSmallFont}
    >
      {children}
    </StyledButton>
  );
};

const StyledButton = styled.button<ButtonProps>`

  padding: 0.6rem 1.3rem;
  font-weight: 600;
  
  color: #4f3d21;
  height : 4.8rem;
  border-radius: 1.5rem;
  &:hover {
    transition: all 0.2s ease-in-out;
    background-color: ${(props) =>
      props.isHoverColor ? "#FBD26A" : "#F8B551"}; 
  }

font-size: ${(props) => (props.isSmallFont ? "12px" : "16px")};
  background-color: ${(props) => (props.isBgColor ? "#FBD26A" : "#ffffff")};
  border: ${(props) => (props.isBorderColor ? "0.2rem solid #FBD26A" : "none")};
  width: ${(props) => props.fullWidth && "100%"};
  height : ${(props) => props.fullHeight && "100%"};
  opacity: ${(props) => props.disabled && 50}
  cursor: ${(props) => props.disabled && "default"}

  &:focus-visible {
    outline: 2px solid #a17c43;
    outline-offset: 2px;
  }
`;

export default Button;
