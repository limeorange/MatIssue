import Image from "next/image";
import styled from "styled-components";

type UserLikesProps = {
  isLiked: boolean;
  countText: string;
  heartClickHandler: () => void;
};

/** 게시글 좋아요 컴포넌트 */
const RecipeUserLikes: React.FC<UserLikesProps> = ({
  isLiked,
  countText,
  heartClickHandler,
}) => {
  return (
    <>
      <LikesWrapperButton onClick={heartClickHandler}>
        <IconDiv>
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
        </IconDiv>
        <LikesCount>{countText}</LikesCount>
      </LikesWrapperButton>
    </>
  );
};

/** 좋아요 아이콘과 카운트 묶는 Button */
const LikesWrapperButton = styled.button`
  display: flex;
  width: 11rem;
  height: 5.5rem;
  border: 0.17rem solid #c8c8c8;
  border-radius: 1.5rem;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
`;

/** 좋아요 아이콘 Div */
const IconDiv = styled.div`
  width: 3.2rem;
  height: 2.8rem;
  margin-right: 0.6rem;
`;

/** 좋아요 개수 Span */
const LikesCount = styled.span`
  font-size: 18px;
`;

export default RecipeUserLikes;
