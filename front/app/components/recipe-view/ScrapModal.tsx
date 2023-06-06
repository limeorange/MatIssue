import styled from "styled-components";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type ScrapModalProps = {
  modalCloseHandler: () => void;
  setIsSaved: React.Dispatch<React.SetStateAction<boolean>>;
};
const ScrapModal: React.FC<ScrapModalProps> = ({
  modalCloseHandler,
  setIsSaved,
}) => {
  // 스크랩 모달 이동 상태 관리
  const [isDragging, setIsDragging] = useState(false);

  // 스크랩 메모 내용 상태 관리
  const [memo, setMemo] = useState("");

  // 스크랩 메모 원본 상태 관리
  const originalLocal = localStorage.getItem("scrapMemo");
  const originalMemo = originalLocal ? originalLocal : "";

  const modalRef = useRef<HTMLDivElement>(null);
  const offsetXRef = useRef<number>(0);
  const offsetYRef = useRef<number>(0);

  const mouseDownHandler = (event: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    const { clientX, clientY } = event;
    const { left, top } = modalRef.current!.getBoundingClientRect();
    offsetXRef.current = clientX - left;
    offsetYRef.current = clientY - top;
  };

  const mouseMoveHandler = (event: React.MouseEvent<HTMLDivElement>) => {
    if (isDragging) {
      const { clientX, clientY } = event;
      const newLeft = clientX - offsetXRef.current;
      const newTop = clientY - offsetYRef.current;
      modalRef.current!.style.left = `${newLeft}px`;
      modalRef.current!.style.top = `${newTop}px`;
    }
  };

  const mouseUpHandler = () => {
    setIsDragging(false);
  };

  const memoChangeHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMemo(event.target.value);
  };

  const memoSaveHandler = () => {
    localStorage.setItem("scrapMemo", memo);
    setIsSaved(memo ? true : false);
    modalCloseHandler();
  };

  const memoCancelHandler = () => {
    setMemo(originalMemo);
    modalCloseHandler();
  };

  // 기존의 저장된 메모 보여주는 의존성 설정
  useEffect(() => {
    const savedMemo = localStorage.getItem("scrapMemo");
    if (savedMemo) {
      setMemo(savedMemo);
    }
  }, []);

  const hasMemo = memo.trim().length > 0;

  return (
    <>
      <ScrapContainerDiv
        ref={modalRef}
        onMouseDown={mouseDownHandler}
        onMouseMove={mouseMoveHandler}
        onMouseUp={mouseUpHandler}
      >
        <div className="flex flex-col">
          {/* 스크랩 메모하기 Title */}
          <div className="flex text-[#4F3D21] mt-[2rem] mb-[2rem] gap-[0.5rem] items-center">
            <Image
              src="/images/recipe-view/note.svg"
              alt="게시글 좋아요 하트"
              width={36}
              height={35}
              style={{ objectFit: "cover" }}
            />
            <span className="text-[1.7rem] font-[500]">스크랩 메모하기</span>
          </div>
          <MemoContainerDiv>
            <ScrapTextArea
              placeholder="마우스로 메모를 원하는 곳에 배치해보세요!"
              value={memo}
              onChange={memoChangeHandler}
              hasMemo={hasMemo}
            ></ScrapTextArea>
          </MemoContainerDiv>
          <ButtonDiv>
            <CancelButton onClick={memoCancelHandler}>취소</CancelButton>
            <SaveButton onClick={memoSaveHandler}>저장</SaveButton>
          </ButtonDiv>
        </div>
      </ScrapContainerDiv>
    </>
  );
};

/** 스크랩 메모 전체 감싸는 Div */
const ScrapContainerDiv = styled.div`
  position: fixed;
  top: 45%;
  left: 59%;
  display: flex;
  justify-content: center;
  width: 33rem;
  height: 36.5rem;
  background: #ffffff;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1), -2px -2px 5px rgba(0, 0, 0, 0.1);
  border-radius: 20px;
  z-index: 90;
  cursor: pointer;
`;

/** 메모 입력칸 전체 감싸는 Div */
const MemoContainerDiv = styled.div`
  width: 29.5rem;
  height: 21.5rem;
  font-size: 15.5px;
  cursor: pointer;
`;

/** 메모 입력하는 Textarea */
const ScrapTextArea = styled.textarea<{ hasMemo: boolean }>`
  outline: none;
  width: 100%;
  height: 100%;
  background: ${({ hasMemo }) => (hasMemo ? "#fbe2a1" : "#fdeec7")};
  color: ${({ hasMemo }) => (hasMemo ? "#4f3d21" : "#9ca3af")};
  font-size: 15.5px;
  resize: none;
  border-radius: 1.5rem;
  padding: 1.5rem;

  ::-webkit-scrollbar {
    width: 1rem;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #fbd26a;
    border-radius: 1.5rem;
  }

  ::-webkit-scrollbar-track {
    border-radius: 1.5rem;
  }
`;

/** 수정, 삭제 버튼 감싸는 Div */
const ButtonDiv = styled.div`
  display: flex;
  gap: 0.8rem;
  margin-top: 2rem;
  justify-content: flex-end;
`;

/** 저장 Button */
const SaveButton = styled.button`
  width: 6rem;
  height: 3.5rem;
  border-radius: 1rem;
  background: #fbe2a1;
  font-weight: 500;
  font-size: 16px;
  color: #4f3d21;
`;

/** 취소 Button */
const CancelButton = styled.button`
  width: 6rem;
  height: 3.5rem;
  border-radius: 1rem;
  border: 2px solid #fbe2a1;
  font-weight: 500;
  font-size: 16px;
  color: #4f3d21;
`;

export default ScrapModal;
