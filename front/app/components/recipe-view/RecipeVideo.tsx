import styled from "styled-components";

type RecipeVideoProps = {
  recipe_video: string;
};

/** 유튜브 고유 id 추출하는 함수 */
const extractVideoId = (url: string): string | null => {
  const youtubeRegex =
    /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = url.match(youtubeRegex);

  if (match && match[4]) {
    // 동영상 고유 id 반환
    return match[4];
  }

  // 유튜브 링크가 아닌 경우 또는 고유 id를 찾을 수 없는 경우
  return "JVQaQBsCbrE";
};

/** 레시피 비디오 컴포넌트 */
const RecipeVideo: React.FC<RecipeVideoProps> = ({ recipe_video }) => {
  return (
    <>
      <VideoContainerDiv>
        <VideoIframe
          title="요리 동영상 썸네일"
          src={`https://www.youtube.com/embed/${extractVideoId(recipe_video)}`}
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
