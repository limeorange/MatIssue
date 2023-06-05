import styled from "styled-components";

type RecipeVideoProps = {
  recipeVideoUrl: string;
};

/** 레시피 비디오 컴포넌트 */
const RecipeVideo: React.FC<RecipeVideoProps> = ({ recipeVideoUrl }) => {
  return (
    <>
      <VideoContainerDiv>
        <VideoIframe
          title="요리 동영상 썸네일"
          src={`https://www.youtube.com/embed/${recipeVideoUrl.split("e/")[1]}`}
          allowFullScreen
        />
      </VideoContainerDiv>
    </>
  );
};

/** 비디오 감싸는 Div */
const VideoContainerDiv = styled.div`
  width: 48rem;
  height: 27rem;
  border-radius: 1.5rem;
  overflow: hidden;
`;

/** 유튜브 영상 Iframe */
const VideoIframe = styled.iframe`
  width: 100%;
  height: 100%;
  border: none;
`;

export default RecipeVideo;
