import { FieldErrors } from "react-hook-form";
import styled from "styled-components";

type StyledInputProps = {
  errors: FieldErrors;
  disabled?: boolean;
};

export const AuthContainer = styled.div`
  margin-top: 3.2rem;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  max-width: 40rem;
  color: #4f3d21;
`;

export const AuthFormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 4rem;
  background-color: #ffffff;
  padding-left: 3.2rem;
  padding-right: 3.2rem;
  padding-top: 3.2rem;
  padding-bottom: 3.2rem;
  box-shadow: 0 0.1rem 0.3rem 0 rgb(0 0 0 / 0.1);
  border-radius: 1.5rem;
  min-height: 80vh;

  form {
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 2rem;
  }
`;

export const StyledLabel = styled.label`
  display: inline-block;
  font-size: 1.6rem;
  font-weight: 500;
  margin-bottom: 1rem;
  padding-left: 0.5rem;
`;

export const StyledInput = styled.input<StyledInputProps>`
  appearance: none;
  background-color: #fff;
  border-color: #ddd;
  border-width: 1px;
  padding: 0.6rem 1.2rem;
  font-size: 1.6rem;
  line-height: 2.4rem;
  display: block;
  width: 100%;
  height: 4.8rem;
  border-radius: 1.5rem;
  color: #333333;
  outline: none;
  &:focus {
  box-shadow: inset 0 0 0.1rem 0.2rem #fbd26a;
  opacity: ${(props) => props.disabled && "0.5"};
  cursor: ${(props) => props.disabled && "default"};

  &:placeholder {
    color: #999999;
  }
`;

export const ErrorMessageText = styled.span`
  display: inline-block;
  padding: 0.3rem 1.3rem 0 1.3rem;
  font-size: 13px;
  color: #ff2f2f;
`;

export const AuthChangeBox = styled.div`
  display: flex;
  gap: 0.6rem;
  font-size: 1.4rem;
  color: rgb(150, 150, 150);
`;

export const UnderLineLinkDiv = styled.div`
  text-decoration-line: underline;
  cursor: pointer;
`;