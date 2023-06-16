import React from "react";
import styled from "styled-components";
import Button from "./Button";

type PasswordModalProps = {
  icon: React.ReactNode;
  message: string;
  onCancel: () => void;
  onConfirm: () => void;
  showCancelButton?: boolean; // 추가: 취소 버튼을 보여줄지 여부를 결정하는 prop
  errorMessage?: string;
  password: string; // 추가: 사용자의 패스워드
  enteredPassword: string; // 추가: 입력한 패스워드
  onPasswordChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const PasswordModal: React.FC<PasswordModalProps> = ({
  icon,
  message,
  onCancel,
  onConfirm,
  showCancelButton = true, // 추가: 기본값은 true로 설정
  errorMessage = "",
  password,
  enteredPassword,
  onPasswordChange,
}) => {
  const isPasswordMismatch = enteredPassword !== password;

  return (
    <ModalWrapper>
      <ModalContent>
        <div>{icon}</div>
        <ModalMessage>{message}</ModalMessage>
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
        {isPasswordMismatch && (
          <ErrorMessage>비밀번호가 일치하지 않습니다.</ErrorMessage>
        )}
        <PasswordInput
          type="password"
          placeholder="탈퇴를 원하시면 비밀번호를 입력해주세요."
          value={enteredPassword}
          onChange={onPasswordChange}
        />
        <ModalActions></ModalActions>
        <ModalActions>
          <ConfirmButton>
            <Button
              type="button"
              isBorderColor={true}
              fullWidth={true}
              fullHeight={true}
              isHoverColor={true}
              onClick={onConfirm}
            >
              확인
            </Button>
          </ConfirmButton>
          {showCancelButton && ( // 추가: showCancelButton이 true인 경우에만 취소 버튼 표시
            <CancelButton>
              <Button
                type="button"
                isBgColor={true}
                fullWidth={true}
                fullHeight={true}
                isBorderColor={false}
                isHoverColor={false}
                onClick={onCancel}
              >
                취소
              </Button>
            </CancelButton>
          )}
        </ModalActions>
      </ModalContent>
    </ModalWrapper>
  );
};

export default PasswordModal;

const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 99;
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 31rem;
  height: 23rem;
  background-color: white;
  padding: 2rem;
  border-radius: 1.3rem;
`;

const ModalMessage = styled.p`
  margin-top: 1rem;
  font-size: 19px;
  font-weight: 600;
  color: #4f3d21;
`;

const ModalActions = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 1rem;
`;

const ConfirmButton = styled.div`
  width: 7.5rem;
  margin-right: 1.8rem;
`;

const CancelButton = styled.div`
  width: 7.5rem;
`;

const ErrorMessage = styled.p`
color: red;
margin-top: 0.5rem;
`;

const PasswordInput = styled.input`
  width: 100%;
  margin-top: 1.5rem;
  padding: 0.5rem 1rem;
  border: 1px solid #e5e5e5;
  border-radius: 1rem;
  font-size: 2.6rem;
  color: #4f3d21;
  &::placeholder {
    color: #c4c4c4;
    font-size: 1.6rem;
  }
  &:focus {
      outline: 0.3rem solid #fbd26a;
      border: none;
  }
`;