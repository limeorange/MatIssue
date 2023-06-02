import React, { useState, ChangeEvent } from "react";
import styled from "styled-components";

const VideoSection = () => {
  const [videoLink, setVideoLink] = useState("");

  const handleVideoLinkChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setVideoLink(e.target.value);
  };

  return (
    <VideoWrapper>
      <Label>동영상</Label>
      <VideoTextArea
        value={videoLink}
        onChange={handleVideoLinkChange}
        placeholder="유튜브 동영상 링크를 입력해주세요."
      />
      <ThumbnailWrapper>
        {videoLink ? (
          <div
            style={{
              width: "17.4rem",
              height: "11.6rem",
              borderRadius: "1.5rem",
              overflow: "hidden",
            }}
          >
            <iframe
              title="video thumbnail"
              src={`https://www.youtube.com/embed/${videoLink.split("v=")[1]}`}
              style={{ width: "100%", height: "100%", border: "none" }}
            />
          </div>
        ) : (
          <EmptyThumbnailBox />
        )}
      </ThumbnailWrapper>
    </VideoWrapper>
  );
};

export default VideoSection;

const Label = styled.label`
  width: 8.8rem;
  height: 2.1rem;
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 2.1rem;
  color: #4f3d21;
  margin-right: 3rem;
  padding-top: 0.5rem;
`;

const VideoWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-top: 2rem;
`;

const VideoTextArea = styled.textarea`
  box-sizing: border-box;
  width: 37.2rem;
  height: 11.6rem;
  border: 0.1rem solid #d9d9d9;
  border-radius: 1.5rem;
  padding-left: 1rem;
  padding-top: 1rem;
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 1.9rem;
  margin-right: 2.5rem;
  ::placeholder {
    color: #a9a9a9;
  }
`;

const ThumbnailWrapper = styled.div`
  width: 17.4rem;
  height: 11.6rem;
`;

const EmptyThumbnailBox = styled.div`
  position: relative;
  width: 17.4rem;
  height: 11.6rem;
  background: #f6f5f5 url("/images/videoIcon.png") no-repeat center top 3.5rem;
  background-size: auto;
  border-radius: 1.5rem;

  ::before {
    content: "동영상 섬네일";
    position: absolute;
    bottom: 1.9rem;
    left: 0;
    width: 100%;
    text-align: center;
    font-family: "Pretendard";
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 1.9rem;
    color: #ababab;
  }
`;
