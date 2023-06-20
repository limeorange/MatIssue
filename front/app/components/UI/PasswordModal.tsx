import React from "react";
import styled from "styled-components";
import Button from "./Button";

type PasswordModalProps = {
  icon: React.ReactNode;
  message: string;
  onCancel: () => void;
  onConfirm: () => void;
  showCancelButton?: boolean;
  enteredPassword: string; // 추가: 입력한 패스워드
  onPasswordChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const PasswordModal: React.FC<PasswordModalProps> = ({
  icon,
  message,
  onCancel,
  onConfirm,
  showCancelButton = true,
  enteredPassword,
  onPasswordChange,
}) => {
  return (
    <ModalWrapper>
      <ModalContent>
        <div>{icon}</div>
        <ModalMessage>{message}</ModalMessage>
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
  background-color: white;
  padding: 2rem;
  border-radius: 1.3rem;
  padding: 2rem 4rem;
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
  -webkit-autocomplete: off;
  -moz-autocomplete: off;
  autocomplete: off;
`;
