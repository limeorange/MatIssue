import React, { useState, ChangeEvent } from "react";
import styled from "styled-components";

type VideoSectionProps = {
  videoLink: string;
  handleVideoLinkChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
};

const VideoSection = ({
  videoLink,
  handleVideoLinkChange,
}: VideoSectionProps) => {
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
          <IframWrapper>
            <iframe
              title="video thumbnail"
              src={`https://www.youtube.com/embed/${videoLink.split("v=")[1]}`}
              style={{ width: "100%", height: "100%", border: "none" }}
            />
          </IframWrapper>
        ) : (
          <EmptyThumbnailBox />
        )}
      </ThumbnailWrapper>
    </VideoWrapper>
  );
};

export default VideoSection;

const Label = styled.label`
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 2.1rem;
  color: #4f3d21;
  margin-right: 3rem;
  padding-top: 0.5rem;

  margin-bottom: 1rem;

  @media (min-width: 1024px) {
    width: 9.8rem;
    height: 2.1rem;
  }
`;

const VideoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 2rem;

  @media (min-width: 1024px) {
    flex-direction: row;
    justify-content: space-between;
  }
`;

const VideoTextArea = styled.textarea`
  box-sizing: border-box;
  width: 100%;
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
  resize: none;
  ::placeholder {
    color: #a9a9a9;
  }
  &:focus {
    border: 0.1rem solid #fbd26a;
    outline: none;
    box-shadow: 0 0 0 0.2rem #fbd26a;
  }

  @media (min-width: 1024px) {
    width: 37.2rem;
  }
`;

const ThumbnailWrapper = styled.div`
  width: 100%;
  height: 18.6rem;
  margin-top: 1rem;

  @media (min-width: 1024px) {
    margin-top: 0;
    width: 17.4rem;
    height: 11.6rem;
  }
`;

const IframWrapper = styled.div`
  width: 100%;
  height: 18.6rem;
  border-radius: 1.5rem;
  overflow: hidden;

  @media (min-width: 1024px) {
    width: 17.4rem;
    height: 11.6rem;
  }
`;

const EmptyThumbnailBox = styled.div`
  position: relative;
  width: 100%;
  height: 18.6rem;
  background: #f6f5f5 url("/images/videoIcon.png") no-repeat center top 6.8rem;
  background-size: auto;
  border-radius: 1.5rem;

  ::before {
    content: "동영상 섬네일";
    position: absolute;
    bottom: 5.3rem;
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

  @media (min-width: 1024px) {
    width: 17.4rem;
    height: 11.6rem;
    background: #f6f5f5 url("/images/videoIcon.png") no-repeat center top 3.5rem;

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
  }
`;
