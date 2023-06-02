import { useEffect, useRef } from "react";
import styled from "styled-components";

type CommentModalProps = {
  // 모달의 열림/닫힘 상태
  isModal: boolean;

  // 모달을 닫을 때 호출되는 콜백 함수
  onCloseModal: () => void;
};

const CommentModal: React.FC<CommentModalProps> = ({
  isModal,
  onCloseModal,
}) => {
  // 모달 컨테이너의 ref 생성
  const modalRef = useRef<HTMLDivElement>(null);

  //
  useEffect(() => {
    const outsideClickHandler = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onCloseModal();
      }
    };
    if (isModal) {
      document.addEventListener("mousedown", outsideClickHandler);
    }

    return () => {
      document.removeEventListener("mousedown", outsideClickHandler);
    };
  }, [isModal, onCloseModal]);

  return (
    <CommentModalContainer ref={modalRef}>
      <CommentModalUl>
        <CommentModalSpan>수정</CommentModalSpan>
        <CommentModalSpan>삭제</CommentModalSpan>
      </CommentModalUl>
    </CommentModalContainer>
  );
};

const CommentModalContainer = styled.div`
  position: absolute;
  z-index: 9;
  padding: 0.6rem 0;
  background-color: white;
  box-shadow: 0px 0.1rem 0.3rem rgba(0, 0, 0, 0.25);
  border-bottom-left-radius: 0.5rem;
  border-bottom-right-radius: 0.5rem;
  font-size: 16px;
  font-weight: 400;
  color: #4f3d21;
`;

const CommentModalUl = styled.ul`
  display: flex;
  flex-direction: column;
`;

const CommentModalSpan = styled.span`
  display: flex;
  width: 100%;
  text-align: center;
  padding: 0.6rem 1.2rem;

  &:hover {
    cursor: pointer;
    background-color: #fbe2a1;
  }
`;

export default CommentModal;
