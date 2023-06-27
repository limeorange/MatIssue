import darkModeAtom from "@/app/store/darkModeAtom";
import { useEffect, useRef } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";

type CommentModalProps = {
  isModal: boolean;
  modalCloseHandler: () => void;
  editClickHandler: () => void;
  deleteClickHandler: () => void;
};

const CommentModal = ({
  isModal,
  modalCloseHandler,
  editClickHandler,
  deleteClickHandler,
}: CommentModalProps) => {
  // 다크 모드 상태 관리
  const [isDarkMode, setIsDarkMode] = useRecoilState(darkModeAtom);

  // 모달 컨테이너의 ref 생성
  const modalRef = useRef<HTMLDivElement>(null);

  // 모달창 닫는 의존성 설정
  useEffect(() => {
    const outsideClickHandler = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        modalCloseHandler();
      }
    };
    if (isModal) {
      document.addEventListener("mousedown", outsideClickHandler);
    }

    return () => {
      document.removeEventListener("mousedown", outsideClickHandler);
    };
  }, [isModal, modalCloseHandler]);

  return (
    <CommentModalContainer isDarkMode={isDarkMode} ref={modalRef}>
      <CommentModalList>
        <CommentModalItem isDarkMode={isDarkMode} onClick={editClickHandler}>
          수정
        </CommentModalItem>
        <CommentModalItem isDarkMode={isDarkMode} onClick={deleteClickHandler}>
          삭제
        </CommentModalItem>
      </CommentModalList>
    </CommentModalContainer>
  );
};

const CommentModalContainer = styled.div<{ isDarkMode: boolean }>`
  position: absolute;
  right: 1.7rem;
  z-index: 9;
  padding: 0.6rem 0;
  box-shadow: 0rem 0.1rem 0.3rem rgba(0, 0, 0, 0.25);
  border-bottom-left-radius: 0.5rem;
  border-bottom-right-radius: 0.5rem;
  font-size: 16px;
  font-weight: 400;

  background: ${(props) =>
    props.isDarkMode ? props.theme.lightGrey : "#ffffff"};

  @media (min-width: 1024px) {
    right: auto;
  }
`;

const CommentModalList = styled.ul`
  display: flex;
  flex-direction: column;
`;

const CommentModalItem = styled.span<{ isDarkMode: boolean }>`
  display: flex;
  width: 100%;
  text-align: center;
  padding: 0.6rem 1.2rem;
  color: ${(props) => (props.isDarkMode ? props.theme.navy : "#4f3d21")};

  &:hover {
    cursor: pointer;
    background: ${(props) =>
      props.isDarkMode ? props.theme.lightNavy : "#fbe2a1"};
    color: ${(props) => (props.isDarkMode ? props.theme.lightGrey : "#4f3d21")};
  }
`;

export default CommentModal;
