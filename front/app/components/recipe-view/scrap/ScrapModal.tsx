"use client";

import styled from "styled-components";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { Recipe } from "@/app/types";
import { useQuery } from "@tanstack/react-query";
import getCurrentUser from "@/app/api/user";
import React from "react";

type ScrapModalProps = {
  modalCloseHandler: () => void;
  setIsSaved: React.Dispatch<React.SetStateAction<boolean>>;
  recipe: Recipe;
};

/** 스크랩 모달 컴포넌트 */
const ScrapModal = ({
  modalCloseHandler,
  setIsSaved,
  recipe,
}: ScrapModalProps) => {
  const { data: currentUser } = useQuery(["currentUser"], () =>
    getCurrentUser()
  );

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

  // 스크랩 모달 이동 상태 관리
  const [isDragging, setIsDragging] = useState(false);

  // 스크랩 메모 내용 상태 관리
  const [memo, setMemo] = useState("");

  // 스크랩 메모 내용 유무에 따른 배경, 글자색 변경을 위한 상태 관리
  const hasMemo = memo ? true : false;

  // 스크랩 모달창 자유 이동 설정
  const modalRef = useRef<HTMLDivElement>(null);
  const offsetXRef = useRef<number>(0);
  const offsetYRef = useRef<number>(0);

  const mouseUpHandler = useCallback(() => {
    setIsDragging(false);
  }, []);

  const mouseDownHandler = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      setIsDragging(true);
      const { clientX, clientY } = event;
      const { left, top } = modalRef.current!.getBoundingClientRect();
      offsetXRef.current = clientX - left;
      offsetYRef.current = clientY - top;
    },
    []
  );

  const mouseMoveHandler = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      if (isDragging) {
        const { clientX, clientY } = event;
        const newLeft = clientX - offsetXRef.current;
        const newTop = clientY - offsetYRef.current;
        modalRef.current!.style.left = `${newLeft}px`;
        modalRef.current!.style.top = `${newTop}px`;
      }
    },
    [isDragging]
  );

  // 기존의 저장된 메모 보여주는 의존성 설정
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedMemo = localStorage.getItem("scrapMemo");
      const savedParsedMemo = savedMemo ? JSON.parse(savedMemo) : [];
      const savedMemotext = savedParsedMemo.filter(
        (item: any) => item.scrapData.recipe_id === recipe_id
      );
      if (savedMemotext.length !== 0) {
        setMemo(savedMemotext[0]["memo"]);
      } else {
        setMemo("");
      }
    }
  }, [recipe_id]);

  /** 메모 작성 내용 업데이트 핸들러 */
  const memoChangeHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMemo(event.target.value);
  };

  /** 메모 저장 버튼 핸들러 */
  const memoSaveHandler = () => {
    const existingMemo = localStorage.getItem("scrapMemo");
    const parsedMemo = existingMemo ? JSON.parse(existingMemo) : [];

    // 해당 recipe_id 값을 가진 객체 삭제한 배열
    const updatedMemo = parsedMemo.filter(
      (item: any) => item.scrapData.recipe_id !== recipe_id
    );
    const newMemo = { scrapData, memo, user_id: currentUser.user_id };
    updatedMemo.push(newMemo);

    // 업데이트된 배열을 다시 localStorage에 저장
    localStorage.setItem("scrapMemo", JSON.stringify(updatedMemo));

    // memo 내용이 있으면 색칠 아이콘 표시하기 위한 상태값 부여
    setIsSaved(true);
    modalCloseHandler();
  };

  /** 메모 취소 버튼 핸들러 */
  // memo 변수는 ScrapModal 컴포넌트의 상태로서 해당 컴포넌트가 언마운트되면 초기화됨
  // 즉, 모달이 닫히면 메모 내용이 사라짐 => 원본 따로 저장해서 띄워줄 필요 없음!
  const memoCancelHandler = () => {
    modalCloseHandler();
  };

  return (
    <>
      <ScrapContainer
        ref={modalRef}
        onMouseDown={mouseDownHandler}
        onMouseMove={mouseMoveHandler}
        onMouseUp={mouseUpHandler}
      >
        <ScrapContentsWrapper>
          {/* 스크랩 메모하기 Title */}
          <ScrapTitleIconBox>
            <Image
              src="/images/recipe-view/note.svg"
              alt="스크랩 노트 이모티콘"
              width={36}
              height={35}
              style={{ objectFit: "cover" }}
            />
            <ScrapTitle>스크랩 메모하기</ScrapTitle>
          </ScrapTitleIconBox>
          <MemoBox>
            <ScrapTextArea
              placeholder="마우스로 메모를 원하는 곳에 배치해보세요!"
              value={memo}
              onChange={memoChangeHandler}
              hasMemo={hasMemo}
            ></ScrapTextArea>
          </MemoBox>
          <ButtonBox>
            <CancelButton onClick={memoCancelHandler}>취소</CancelButton>
            <SaveButton onClick={memoSaveHandler}>저장</SaveButton>
          </ButtonBox>
        </ScrapContentsWrapper>
      </ScrapContainer>
    </>
  );
};

/** 스크랩 메모 전체 감싸는 Div */
const ScrapContainer = styled.div`
  position: fixed;
  top: 35%;
  left: 6%;
  display: flex;
  justify-content: center;
  width: 33rem;
  height: 34.5rem;
  background: #ffffff;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1), -2px -2px 5px rgba(0, 0, 0, 0.1);
  border-radius: 20px;
  z-index: 90;
  cursor: pointer;

  @media (min-width: 1024px) {
    top: 39.1%;
    left: 56.2%;
  }
`;

/** 스크랩 모달창 컨텐츠 세로 정렬을 위한 Div */
const ScrapContentsWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

/** 스크랩 메모하기 제목 및 아이콘을 담은 Div */
const ScrapTitleIconBox = styled.div`
  display: flex;
  text-color: #4f3d21;
  margin-top: 2rem;
  margin-bottom: 2rem;
  gap: 0.5rem;
  align-items: center;
`;

/** 스크랩 메모하기 제목 Span */
const ScrapTitle = styled.span`
  font-size: 16px;
  font-weight: 500;

  @media (min-width: 1024px) {
    font-size: 17px;
  }
`;

/** 메모 입력칸 전체 감싸는 Div */
const MemoBox = styled.div`
  width: 29.5rem;
  height: 19.5rem;
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
const ButtonBox = styled.div`
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

export default React.memo(ScrapModal);
