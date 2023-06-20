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
      <LikesButtonWrapper onClick={heartClickHandler}>
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
        <LikesCount>{countText}</LikesCount>
      </LikesButtonWrapper>
    </>
  );
};

/** 좋아요 아이콘과 카운트 묶는 Button */
const LikesButtonWrapper = styled.button`
  display: flex;
  width: 7rem;
  height: 4.2rem;
  border-radius: 1.5rem;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
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
const LikesCount = styled.span`
  font-size: 16px;

  @media (min-width: 1024px) {
    font-size: 18px;
  }
`;

export default RecipeUserLikes;
