"use client";

import styled from "styled-components";
import Image from "next/image";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

type MemoItemProps = {
  created_at: string;
  recipe_id: string;
  recipe_like: string[];
  recipe_thumbnail: string;
  recipe_title: string;
  recipe_view: number;
  user_id: string;
  user_nickname: string;
};

type ScrapItemProps = {
  scrapData: MemoItemProps;
  memo: string;
  user_id: string;
};

type ScrapCardProps = {
  memoText: string;
  recipeData: {
    created_at: string;
    recipe_id: string;
    recipe_like: string[];
    recipe_thumbnail: string;
    recipe_title: string;
    recipe_view: number;
    user_id: string;
    user_nickname: string;
  };
  setParsedMemo: React.Dispatch<React.SetStateAction<ScrapItemProps[]>>;
};

/** 스크랩 카드 컴포넌트 */
const ScrapCardItem: React.FC<ScrapCardProps> = ({
  recipeData,
  memoText,
  setParsedMemo,
}) => {
  const {
    created_at,
    recipe_id,
    recipe_like,
    recipe_thumbnail,
    recipe_title,
    recipe_view,
    user_id,
    user_nickname,
  } = recipeData;

  const hasMemo = memoText ? true : false;
  const router = useRouter();

  /** 해당 스크랩 데이터 로컬스토리지에서 삭제하는 핸들러 */
  const scrapDeleteHandler = (recipe_id: string) => {
    const memoScrapData = localStorage.getItem("scrapMemo");

    // 가져온 데이터가 존재하면 배열로 변환
    const memoScrapArray = memoScrapData ? JSON.parse(memoScrapData) : [];

    // recipe_id를 가지고 있는 객체를 찾아서 삭제
    const filteredScrapArray = memoScrapArray.filter(
      (item: any) => item.scrapData.recipe_id !== recipe_id
    );

    // 수정된 배열을 다시 로컬 스토리지에 저장
    localStorage.setItem("scrapMemo", JSON.stringify(filteredScrapArray));
    setParsedMemo(filteredScrapArray);
    toast.success("해당 스크랩이 삭제되었습니다!");
  };

  return (
    <>
      <ScrapCardContainerDiv>
        <div
          className="cursor-pointer"
          onClick={() => {
            router.push(`/recipe/${recipe_id}`);
          }}
        >
          <RecipeTitleDiv>
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
          </RecipeTitleDiv>
          {/* 레시피 썸네일 */}
          <RecipeImageDiv>
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
          </RecipeImageDiv>
          {/* 레시피 제목, 작성자, 좋아요 수 */}
          <RecipeDescriptionDiv>
            <RecipeTitleH2>{recipe_title}</RecipeTitleH2>
            <NicknameLikeDiv>
              <div className="text-[1.35rem] text-[#6F6F6F]">
                {user_nickname}
              </div>
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
                <LikesCount>{recipe_like.length}</LikesCount>
              </LikesWrapperButton>
            </NicknameLikeDiv>
          </RecipeDescriptionDiv>
        </div>
        {/* 스크랩 메모 내용 */}
        <MemoContainerDiv>
          <ScrapTextDiv hasMemo={hasMemo}>
            {hasMemo ? memoText : "게시글에서 메모를 입력해보세요!"}
          </ScrapTextDiv>
        </MemoContainerDiv>
        {/* 스크랩 삭제 버튼 */}
        <ButtonDiv>
          <DeleteButton onClick={() => scrapDeleteHandler(recipe_id)}>
            삭제
          </DeleteButton>
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
`;

/** 스크랩 카드 제목 Div */
const RecipeTitleDiv = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1.7rem;
`;

/** 스크랩 썸네일 이미지 Div */
const RecipeImageDiv = styled.div`
  width: 24rem;
  height: 18rem;
  margin-bottom: 1rem;
`;

/** 스크랩 설명 Div */
const RecipeDescriptionDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1.2rem;
`;

/** 레시피 제목 H2 */
const RecipeTitleH2 = styled.h2`
  font-size: 1.45rem;
`;

/** 닉네임, 좋아요 감싸는 Div */
const NicknameLikeDiv = styled.div`
  display: flex;
  justify-content: space-between;
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
`;

/** 메모 입력하는 Textarea */
const ScrapTextDiv = styled.div<{ hasMemo: boolean }>`
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
