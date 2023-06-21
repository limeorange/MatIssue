import React from "react";
import styled from "styled-components";
import Button from "../../components/UI/Button";
import Image from "next/image";
import { useRecoilValue } from "recoil";
import darkModeAtom from "@/app/store/darkModeAtom";

type ConfirmModalProps = {
  message: string;
  btnValue: string;
  onConfirm: () => void;
  onClose: () => void;
};

const ConfirmModal = ({
  message,
  onConfirm,
  btnValue,
  onClose,
}: ConfirmModalProps) => {
  const isDarkMode = useRecoilValue(darkModeAtom);

  return (
    <ModalWrapper isDarkMode={isDarkMode}>
      <ModalContent isDarkMode={isDarkMode}>
        <CloseBtn onClick={onClose}>
          <Image
            src="/images/xBtn.png"
            width={16}
            height={16}
            alt="close_btn"
          />
        </CloseBtn>
        <ModalMessage>{message}</ModalMessage>
        <Button
          type="button"
          isBorderColor={false}
          isBgColor={true}
          fullWidth={true}
          fullHeight={false}
          onClick={onConfirm}
        >
          {btnValue}
        </Button>
      </ModalContent>
    </ModalWrapper>
  );
};

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
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: center;
  justify-content: center;
  background-color: ${(props) =>
    props.isDarkMode ? props.theme.lightNavy : props.theme.white};
  color: ${(props) =>
    props.isDarkMode ? props.theme.white : props.theme.brown};
  padding: 4rem 8rem;
  border-radius: 1.3rem;
`;

const ModalMessage = styled.p`
  font-size: 18px;
  font-weight: 500;
`;

const CloseBtn = styled.div`
  position: absolute;
  top: 2rem;
  right: 2rem;

  cursor: pointer;

  &:hover {
    transform: scale(1.2);
    opacity: 0.5;
  }

  transition: all 0.2s;
`;

export default ConfirmModal;

