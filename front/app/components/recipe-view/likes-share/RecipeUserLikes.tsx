import darkModeAtom from "@/app/store/darkModeAtom";
import Image from "next/image";
import { useRecoilState } from "recoil";
import styled from "styled-components";

type UserLikesProps = {
  isLiked: boolean;
  countText: string;
  heartClickHandler: () => void;
};

/** 게시글 좋아요 컴포넌트 */
const RecipeUserLikes = ({
  isLiked,
  countText,
  heartClickHandler,
}: UserLikesProps) => {
  // 다크 모드 상태 관리
  const [isDarkMode, setIsDarkMode] = useRecoilState(darkModeAtom);

  return (
    <>
      <LikesButtonWrapper isDarkMode={isDarkMode} onClick={heartClickHandler}>
        <LikesIcon>
          <Image
            src={
              isLiked
                ? "/images/recipe-view/heart_full.svg"
                : "/images/recipe-view/heart.svg"
            }
            alt="게시글 좋아요 하트"
            width={30}
            height={26}
            style={{ objectFit: "cover", cursor: "pointer" }}
          />
        </LikesIcon>
        <LikesCount isDarkMode={isDarkMode}>{countText}</LikesCount>
      </LikesButtonWrapper>
    </>
  );
};

/** 좋아요 아이콘과 카운트 묶는 Button */
const LikesButtonWrapper = styled.button<{ isDarkMode: boolean }>`
  display: flex;
  width: 7rem;
  height: 4.2rem;
  border-radius: 1.5rem;
  justify-content: center;
  align-items: center;
  background-color: ${(props) =>
    props.isDarkMode ? props.theme.lightNavy : "#ffffff"};
  box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.3);

  @media (min-width: 1024px) {
    width: 9rem;
    height: 5.5rem;
    margin-top: 1rem;
  }
`;

/** 좋아요 아이콘 Div */
const LikesIcon = styled.div`
  width: 2.1rem;
  height: 1.8rem;
  margin-right: 0.6rem;

  @media (min-width: 1024px) {
    width: 3.2rem;
    height: 2.8rem;
  }
`;

/** 좋아요 개수 Span */
const LikesCount = styled.span<{ isDarkMode: boolean }>`
  font-size: 16px;
  color: ${(props) => (props.isDarkMode ? props.theme.lightGrey : "#4F3D21")};

  @media (min-width: 1024px) {
    font-size: 18px;
  }
`;

export default RecipeUserLikes;
