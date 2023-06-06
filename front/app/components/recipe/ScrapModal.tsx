import styled from "styled-components";
import Image from "next/image";

type ScrapModalProps = {
  modalCloseHandler: () => void;
};
const ScrapModal: React.FC<ScrapModalProps> = ({ modalCloseHandler }) => {
  return (
    <>
      <ScrapContainerDiv>
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
            <span className="text-[1.8rem] font-[500]">스크랩 메모하기</span>
          </div>
          <MemoContainerDiv>
            <ScrapTextArea></ScrapTextArea>
          </MemoContainerDiv>
          <ButtonDiv>
            <DeleteButton onClick={modalCloseHandler}>취소</DeleteButton>
            <EditButton>저장</EditButton>
          </ButtonDiv>
        </div>
      </ScrapContainerDiv>
    </>
  );
};

/** 스크랩 메모 전체 감싸는 Div */
const ScrapContainerDiv = styled.div`
  position: fixed;
  top: 0;
  left: calc(100% + 20px);
  display: flex;
  justify-content: center;
  width: 40rem;
  height: 36.5rem;
  background: #ffffff;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1), -2px -2px 5px rgba(0, 0, 0, 0.1);
  border-radius: 20px;
  z-index: 99;
`;

/** 메모 입력칸 전체 감싸는 Div */
const MemoContainerDiv = styled.div`
  width: 36.5rem;
  height: 21.5rem;
  font-size: 15.5px;
  cursor: pointer;
`;

/** 메모 입력하는 Textarea */
const ScrapTextArea = styled.textarea`
  outline: none;
  width: 100%;
  height: 100%;
  background: #fdeec7;
  color: #9ca3af;
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

/** 수정 Button */
const EditButton = styled.button`
  width: 6rem;
  height: 3.5rem;
  border-radius: 1rem;
  background: #fbe2a1;
  font-weight: 500;
  font-size: 15.5px;
  color: #4f3d21;
`;

/** 삭제 Button */
const DeleteButton = styled.button`
  width: 6rem;
  height: 3.5rem;
  border-radius: 1rem;
  border: 2px solid #fbe2a1;
  font-weight: 500;
  font-size: 15.5px;
  color: #4f3d21;
`;

export default ScrapModal;
