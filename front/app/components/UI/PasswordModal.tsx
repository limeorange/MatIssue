import React from "react";
import styled from "styled-components";
import Button from "./Button";
import { useRecoilValue } from "recoil";
import darkModeAtom from "@/app/store/darkModeAtom";

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
  const isDarkMode = useRecoilValue(darkModeAtom);
  return (
    <ModalWrapper isDarkMode={isDarkMode}>
      <ModalContent isDarkMode={isDarkMode}>
        <div>{icon}</div>
        <ModalMessage>{message}</ModalMessage>
        <PasswordInput
          type="password"
          placeholder="입력 후 확인 버튼을 누르면 탈퇴 처리됩니다."
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

const ModalWrapper = styled.div<{ isDarkMode: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${(props) =>
    props.isDarkMode ? props.theme.deepNavy : "rgba(0, 0, 0, 0.5)"};
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 99;
`;

const ModalContent = styled.div<{ isDarkMode: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${(props) =>
    props.isDarkMode ? props.theme.lightNavy : props.theme.white};
  padding: 2rem;
  border-radius: 1.3rem;
  padding: 2rem 4rem;
`;

const ModalMessage = styled.h2`
  margin-top: 1rem;
  font-size: 19px;
  font-weight: 600;
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
  padding: 1rem;
  font-size: 16px;
  border: 1px solid #e5e5e5;
  border-radius: 1rem;
  &::placeholder {
    color: #c4c4c4;
  }
  -webkit-autocomplete: off;
  -moz-autocomplete: off;
  autocomplete: off;
`;
