import styled from "styled-components";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type ScrapModalProps = {
  modalCloseHandler: () => void;
  setIsSaved: React.Dispatch<React.SetStateAction<boolean>>;
  localStorageKey: string;
  recipe: {
    recipe_title: string;
    recipe_thumbnail: string;
    recipe_video: string;
    recipe_description: string;
    recipe_category: string;
    recipe_info: {
      serving: number;
      time: number;
      level: number;
    };
    recipe_ingredients: {
      name: string;
      amount: string;
    }[];
    recipe_sequence: {
      step: number;
      picture: string;
      description: string;
    }[];
    recipe_tip: string;
    recipe_id: string;
    recipe_view: number;
    recipe_like: number;
    user_id: string;
    user_nickname: string;
    created_at: string;

    // 댓글 관련 Data Type 정의
    comments: {
      comment_author: string;
      comment_text: string;
      comment_like: number;
      comment_id: string;
      created_at: string;
      comment_parent: string;
      updated_at: string;
    };
  };
};

/** 스크랩 모달 컴포넌트 */
const ScrapModal: React.FC<ScrapModalProps> = ({
  modalCloseHandler,
  setIsSaved,
  localStorageKey,
  recipe,
}) => {
  // 스크랩 카드에 필요한 정보만 객체 분해 할당
  const {
    created_at,
    recipe_id,
    recipe_like,
    recipe_thumbnail,
    recipe_title,
    recipe_view,
    user_id,
    user_nickname,
  } = recipe;

  // 스크랩 카드 데이터 한 object에 모으기
  const scrapData = {
    created_at,
    recipe_id,
    recipe_like,
    recipe_thumbnail,
    recipe_title,
    recipe_view,
    user_id,
    user_nickname,
  };

  console.log(scrapData);

  // 스크랩 모달 이동 상태 관리
  const [isDragging, setIsDragging] = useState(false);

  // 스크랩 메모 내용 상태 관리
  const [memo, setMemo] = useState("");

  // 스크랩 메모 내용 유무에 따른 배경, 글자색 변경을 위한 상태 관리
  const hasMemo = memo.trim().length > 0;

  // 스크랩 메모 원본 상태 관리
  const originalSaved = localStorage.getItem(localStorageKey);
  const originalMemo = originalSaved ? JSON.parse(originalSaved)[0] : "";

  // 스크랩 모달창 자유 이동 설정
  const modalRef = useRef<HTMLDivElement>(null);
  const offsetXRef = useRef<number>(0);
  const offsetYRef = useRef<number>(0);

  const mouseUpHandler = () => {
    setIsDragging(false);
  };

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

  /** 메모 작성 내용 업데이트 핸들러 */
  const memoChangeHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMemo(event.target.value);
  };

  /** 메모 저장 버튼 핸들러 */
  const memoSaveHandler = () => {
    localStorage.setItem(localStorageKey, JSON.stringify([memo, scrapData]));
    // memo 내용이 있으면 색칠된 아이콘 표시하고,
    // 내용 없을 시 아이콘 색칠 해제를 위한 상태값 부여
    setIsSaved(localStorage.getItem(localStorageKey) ? true : false);
    modalCloseHandler();
  };

  /** 메모 취소 버튼 핸들러 */
  const memoCancelHandler = () => {
    setMemo(originalMemo);
    modalCloseHandler();
  };

  // 기존의 저장된 메모 보여주는 의존성 설정
  useEffect(() => {
    const savedMemo = localStorage.getItem(localStorageKey);
    if (savedMemo) {
      const memoArray = JSON.parse(savedMemo);
      setMemo(memoArray[0]);
    }
  }, []);

  return (
    <>
      <ScrapContainerDiv
        ref={modalRef}
        onMouseDown={mouseDownHandler}
        onMouseMove={mouseMoveHandler}
        onMouseUp={mouseUpHandler}
      >
        <ScrapContentsDiv>
          {/* 스크랩 메모하기 Title */}
          <ScrapTitleDiv>
            <Image
              src="/images/recipe-view/note.svg"
              alt="스크랩 노트 이모티콘"
              width={36}
              height={35}
              style={{ objectFit: "cover" }}
            />
            <ScrapTitleSpan>스크랩 메모하기</ScrapTitleSpan>
          </ScrapTitleDiv>
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
        </ScrapContentsDiv>
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

/** 스크랩 모달창 컨텐츠 세로 정렬을 위한 Div */
const ScrapContentsDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

/** 스크랩 메모하기 제목 및 아이콘을 담은 Div */
const ScrapTitleDiv = styled.div`
  display: flex;
  text-color: #4f3d21;
  margin-top: 2rem;
  margin-bottom: 2rem;
  gap: 0.5rem;
  align-items: center;
`;

/** 스크랩 메모하기 제목 Span */
const ScrapTitleSpan = styled.span`
  font-size: 17px;
  font-weight: 500;
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
