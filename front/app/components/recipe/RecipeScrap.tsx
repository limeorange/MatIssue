import Image from "next/image";
import styled from "styled-components";

type UserScrapProps = {
  isBooked: boolean;
  scrapClickHandler: () => void;
};

/** 게시글 스크랩 컴포넌트 */
const RecipeScrap: React.FC<UserScrapProps> = ({
  isBooked,
  scrapClickHandler,
}) => {
  return (
    <>
      <ScrapWrapperDiv>
        <IconDiv>
          <Image
            src={
              isBooked
                ? "/images/recipe-view/scrap_full.svg"
                : "/images/recipe-view/scrap_empty.svg"
            }
            alt="게시글 스크랩 아이콘"
            width={32}
            height={28}
            onClick={scrapClickHandler}
            style={{ objectFit: "cover", cursor: "pointer" }}
          />
        </IconDiv>
        <ScrapTitle>스크랩</ScrapTitle>
      </ScrapWrapperDiv>
    </>
  );
};

/** 스크랩 아이콘과 글자 묶는 Div */
const ScrapWrapperDiv = styled.div`
  display: flex;
  width: 12rem;
  height: 5.5rem;
  border: 0.17rem solid #c8c8c8;
  border-radius: 1.5rem;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
`;

/** 스크랩 아이콘 Div */
const IconDiv = styled.div`
  width: 3.2rem;
  height: 3rem;
  margin-right: 0.6rem;
  margin-bottom: 0.3rem;
`;

/** 스크랩 글자 Span */
const ScrapTitle = styled.span`
  font-size: 18px;
`;

export default RecipeScrap;
