"use client";

import styled from "styled-components";

/** 버튼 컴포넌트 (type, fullWidth, fullRound, isBgColor, onClick, disabled) 인자로 전달가능 */
type ButtonProps = {
  type?: "button" | "submit" | "reset" | undefined;
  fullWidth?: boolean;
  isBgColor?: boolean;
  children?: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
};

const Button = (props: ButtonProps) => {
  const { type, fullWidth, isBgColor, children, onClick, disabled } = props;
  return (
    <StyledButton
      onClick={onClick}
      type={type}
      isBgColor={isBgColor}
      fullWidth={fullWidth}
      disabled={disabled}
    >
      {children}
    </StyledButton>
  );
};

const StyledButton = styled.button<ButtonProps>`
  padding: 0.8rem 1.6rem;
  font-size: 1.6rem;
  font-weight: 600;
  color: #4f3d21;
  height : 4.8rem;
  border-radius: 1.5rem;
  &:hover {
    background-color : #F8B551;
  }

  background-color: ${(props) => (props.isBgColor ? "#FBD26A" : "#ffffff")};
  width: ${(props) => props.fullWidth && "100%"};
  opacity: ${(props) => props.disabled && 50}
  cursor: ${(props) => props.disabled && "default"}

  &:focus-visible {
    outline: 2px solid #a17c43;
    outline-offset: 2px;
  }
`;

export default Button;
