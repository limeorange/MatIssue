import styled from "styled-components";
import Image from "next/image";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

type ScrapCardProps = {
  memoContent: string;
  memoItemData: {
    created_at: string;
    recipe_id: string;
    recipe_like: number;
    recipe_thumbnail: string;
    recipe_title: string;
    recipe_view: number;
    user_id: string;
    user_nickname: string;
  };
};

const ScrapCardItem: React.FC<ScrapCardProps> = ({
  memoItemData,
  memoContent,
}) => {
  const {
    recipe_id,
    recipe_like,
    recipe_thumbnail,
    recipe_title,
    recipe_view,
    user_nickname,
  } = memoItemData;

  const hasMemo = memoContent ? true : false;

  // const router = useRouter();
  // const scrapClickHandler = (recipe_id: string) => {
  //   router.push(`/recipes/${recipe_id}`);
  // };

  const scrapDeleteHandler = () => {
    const memoKey = `memo_${memoItemData.recipe_id}`;
    localStorage.removeItem(memoKey);
    toast.success("해당 스크랩이 삭제되었습니다!");
  };

  return (
    <>
      <ScrapCardContainerDiv>
        <div className="flex items-center mb-[1.7rem]">
          <Image
            src="/images/recipe-view/note.svg"
            alt="스크랩 노트 이모티콘"
            width={30}
            height={35}
            style={{ objectFit: "cover" }}
          />
          <ScrapTitleSpan>
            {recipe_title.length > 15
              ? `${recipe_title.slice(0, 15)}...`
              : recipe_title}
          </ScrapTitleSpan>
        </div>
        {/* 레시피 썸네일 */}
        <div className="w-[24rem] h-[18rem] mb-[1rem]">
          <Image
            src={recipe_thumbnail}
            alt="스크랩 레시피 썸네일"
            width={244}
            height={150}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: 15,
            }}
          />
        </div>
        {/* 레시피 제목, 작성자, 좋아요 수 */}
        <div className="flex flex-col mb-[1.2rem]">
          <div className="text-[1.45rem]">{recipe_title}</div>
          <div className="flex justify-between">
            <div className="text-[1.35rem] text-[#6F6F6F]">{user_nickname}</div>
            <LikesWrapperButton>
              <IconDiv>
                <Image
                  src="/images/recipe-view/heart_full.svg"
                  alt="게시글 좋아요 하트"
                  width={28}
                  height={24}
                  style={{ objectFit: "cover", cursor: "pointer" }}
                />
              </IconDiv>
              <LikesCount>{recipe_like}</LikesCount>
            </LikesWrapperButton>
          </div>
        </div>
        {/* 스크랩 메모 내용 */}
        <MemoContainerDiv>
          <ScrapTextArea
            placeholder="게시글에서 메모를 입력해보세요!"
            value={memoContent}
            // onChange={memoChangeHandler}
            hasMemo={hasMemo}
          ></ScrapTextArea>
        </MemoContainerDiv>

        <ButtonDiv>
          <DeleteButton onClick={scrapDeleteHandler}>삭제</DeleteButton>
          {/* <SaveButton onClick={memoSaveHandler}>저장</SaveButton> */}
        </ButtonDiv>
      </ScrapCardContainerDiv>
    </>
  );
};

/** 스크랩 카드 전체 Div */
const ScrapCardContainerDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 28rem;
  height: 52rem;
  padding: 2rem;
  background: #ffffff;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1), -2px -2px 5px rgba(0, 0, 0, 0.1);
  border-radius: 20px;
  cursor: pointer;
`;

/** 스크랩 메모하기 제목 Span */
const ScrapTitleSpan = styled.span`
  font-size: 16px;
  font-weight: 500;
  margin-left: 0.6rem;
  color: #4f3d21;
`;

/** 좋아요 아이콘과 카운트 묶는 Button */
const LikesWrapperButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 1.5rem;
`;

/** 좋아요 아이콘 Div */
const IconDiv = styled.div`
  width: 1.6rem;
  height: 1.2rem;
  margin-right: 0.6rem;
`;

/** 좋아요 개수 Span */
const LikesCount = styled.span`
  font-size: 13px;
  color: #6f6f6f;
`;

/** 메모 입력칸 전체 감싸는 Div */
const MemoContainerDiv = styled.div`
  width: 24rem;
  height: 15rem;
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
  font-size: 14px;
  resize: none;
  border-radius: 1.5rem;
  padding: 1.3rem;

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

/** 삭제 버튼 감싸는 Div */
const ButtonDiv = styled.div`
  display: flex;
  gap: 0.8rem;
  margin-top: 2rem;
  justify-content: flex-end;
`;

/** 삭제 Button */
const DeleteButton = styled.button`
  width: 6rem;
  height: 3.5rem;
  border-radius: 1rem;
  border: 2px solid #fbe2a1;
  font-weight: 500;
  font-size: 16px;
  color: #4f3d21;

  &:hover {
    background-color: #fbe2a1;
  }
`;

export default ScrapCardItem;
