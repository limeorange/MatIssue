"use client";

import styled from "styled-components";
import Image from "next/image";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useRecoilState } from "recoil";
import darkModeAtom from "@/app/store/darkModeAtom";

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

  // 다크 모드 상태 관리
  const [isDarkMode, setIsDarkMode] = useRecoilState(darkModeAtom);

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
      <ScrapCardContainer isDarkMode={isDarkMode}>
        <div
          className="cursor-pointer"
          onClick={() => {
            router.push(`/recipe/${recipe_id}`);
          }}
        >
          <ScrapTitleWrapper>
            <Image
              src="/images/recipe-view/note.svg"
              alt="스크랩 노트 이모티콘"
              width={30}
              height={35}
              style={{ objectFit: "cover" }}
            />
            <ScrapTitle isDarkMode={isDarkMode}>
              {recipe_title.length > 15
                ? `${recipe_title.slice(0, 15)}...`
                : recipe_title}
            </ScrapTitle>
          </ScrapTitleWrapper>
          {/* 레시피 썸네일 */}
          <RecipeImage>
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
          </RecipeImage>
          {/* 레시피 제목, 작성자, 좋아요 수 */}
          <RecipeDescriptionWrapper>
            <RecipeTitle>{recipe_title}</RecipeTitle>
            <NicknameLikeBox>
              <Nickname isDarkMode={isDarkMode}>{user_nickname}</Nickname>
              <LikesButtonWrapper>
                <LikesIcon>
                  <Image
                    src="/images/recipe-view/heart_full.svg"
                    alt="게시글 좋아요 하트"
                    width={28}
                    height={24}
                    style={{ objectFit: "cover", cursor: "pointer" }}
                  />
                </LikesIcon>
                <LikesCount isDarkMode={isDarkMode}>
                  {recipe_like.length}
                </LikesCount>
              </LikesButtonWrapper>
            </NicknameLikeBox>
          </RecipeDescriptionWrapper>
        </div>
        {/* 스크랩 메모 내용 */}
        <MemoWrapper>
          <ScrapText isDarkMode={isDarkMode} hasMemo={hasMemo}>
            {hasMemo ? memoText : "게시글에서 메모를 입력해보세요!"}
          </ScrapText>
        </MemoWrapper>
        {/* 스크랩 삭제 버튼 */}
        <DeleteButtonBox>
          <DeleteButton
            isDarkMode={isDarkMode}
            onClick={() => scrapDeleteHandler(recipe_id)}
          >
            삭제
          </DeleteButton>
        </DeleteButtonBox>
      </ScrapCardContainer>
    </>
  );
};

/** 스크랩 카드 전체 Div */
const ScrapCardContainer = styled.div<{ isDarkMode: boolean }>`
  display: flex;
  flex-direction: column;
  width: 28rem;
  height: 52rem;
  padding: 2rem;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1), -2px -2px 5px rgba(0, 0, 0, 0.1);
  border-radius: 20px;

  background: ${(props) =>
    props.isDarkMode ? props.theme.lightNavy : "#ffffff"};
`;

/** 스크랩 카드 제목 Div */
const ScrapTitleWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1.7rem;
`;

/** 스크랩 썸네일 이미지 Div */
const RecipeImage = styled.div`
  width: 24rem;
  height: 18rem;
  margin-bottom: 1rem;
`;

/** 스크랩 설명 Div */
const RecipeDescriptionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1.2rem;
`;

/** 레시피 제목 H2 */
const RecipeTitle = styled.h2`
  font-size: 1.45rem;
`;

/** 닉네임, 좋아요 감싸는 Div */
const NicknameLikeBox = styled.div`
  display: flex;
  justify-content: space-between;
`;

/** 닉네임 Div */
const Nickname = styled.div<{ isDarkMode: boolean }>`
  font-size: 13.5px;
  color: ${(props) => (props.isDarkMode ? props.theme.lightGrey : "#6F6F6F")};
`;

/** 스크랩 메모하기 제목 Span */
const ScrapTitle = styled.span<{ isDarkMode: boolean }>`
  font-size: 16px;
  font-weight: 500;
  margin-left: 0.6rem;
  color: ${(props) => (props.isDarkMode ? props.theme.lightGrey : "#4F3D21")};
`;

/** 좋아요 아이콘과 카운트 묶는 Button */
const LikesButtonWrapper = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 1.5rem;
`;

/** 좋아요 아이콘 Div */
const LikesIcon = styled.div`
  width: 1.6rem;
  height: 1.2rem;
  margin-right: 0.6rem;
`;

/** 좋아요 개수 Span */
const LikesCount = styled.span<{ isDarkMode: boolean }>`
  font-size: 13px;
  color: ${(props) => (props.isDarkMode ? props.theme.lightGrey : "#6F6F6F")};
`;

/** 메모 입력칸 전체 감싸는 Div */
const MemoWrapper = styled.div`
  width: 24rem;
  height: 15rem;
  font-size: 15.5px;
`;

/** 메모 입력하는 Textarea */
const ScrapText = styled.div<{ hasMemo: boolean; isDarkMode: boolean }>`
  outline: none;
  width: 100%;
  height: 100%;
  font-size: 14px;
  resize: none;
  border-radius: 1.5rem;
  padding: 1.3rem;

  background-color: ${({ hasMemo, isDarkMode, theme }) =>
    hasMemo
      ? isDarkMode
        ? theme.lightGrey
        : "#fdeec7"
      : isDarkMode
      ? theme.lightGrey
      : "#fdeec7"};

  color: ${({ hasMemo, isDarkMode, theme }) =>
    hasMemo
      ? isDarkMode
        ? theme.navy
        : "#4f3d21"
      : isDarkMode
      ? theme.navy
      : "#9ca3af"};

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
const DeleteButtonBox = styled.div`
  display: flex;
  gap: 0.8rem;
  margin-top: 2rem;
  justify-content: flex-end;
`;

/** 삭제 Button */
const DeleteButton = styled.button<{ isDarkMode: boolean }>`
  width: 6rem;
  height: 3.5rem;
  border-radius: 1rem;
  border: 2px solid;

  font-weight: 500;
  font-size: 16px;

  border-color: ${(props) =>
    props.isDarkMode ? props.theme.lightGrey : "#fbe2a1"};

  &:hover {
    background: ${(props) =>
      props.isDarkMode ? props.theme.lightGrey : "#fbe2a1"};
    color: ${(props) => (props.isDarkMode ? props.theme.navy : "#4F3D21")};
  }

  color: ${(props) => (props.isDarkMode ? props.theme.lightGrey : "#4F3D21")};
`;

export default ScrapCardItem;
