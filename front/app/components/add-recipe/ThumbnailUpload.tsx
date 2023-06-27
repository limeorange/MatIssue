import React, { useRef, ChangeEvent, ReactElement } from "react";
import styled from "styled-components";
import uploadImage from "@/app/api/aws";
import { useRecoilState } from "recoil";
import darkModeAtom from "@/app/store/darkModeAtom";

type Props = {
  selectedImage: string;
  handleThumbnailChange: (imageUrl: string) => void;
};

const ThumbnailUpload = ({
  selectedImage,
  handleThumbnailChange,
}: Props): ReactElement => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDarkMode, setIsDarkMode] = useRecoilState(darkModeAtom);

  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      await uploadFile(file);
    }
  };

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    await uploadFile(file);
  };

  const uploadFile = async (file: File) => {
    try {
      const response = await uploadImage(file);
      const imageUrl = response.imageUrl;

      handleThumbnailChange(imageUrl);
    } catch (error) {
      console.error("Image upload failed:", error);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (
    <ImageWrapper
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onClick={handleImageClick}
    >
      <Label>썸네일 등록</Label>
      {selectedImage ? (
        <Image src={selectedImage} alt="thumbnail" />
      ) : (
        <EmptyBox isDarkMode={isDarkMode} />
      )}
      <FileInput
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleImageChange}
      />
    </ImageWrapper>
  );
};

export default ThumbnailUpload;

const Label = styled.label`
  margin-bottom: 2rem;
  margin-top: 3rem;
  display: block;
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 2.1rem;

  @media (min-width: 1024px) {
    width: 9.8rem;
    height: 2.1rem;
    margin-top: 0;
    margin-right: 3rem;
    padding-top: 0.5rem;
  }
`;

const ImageWrapper = styled.div`
  flex-direction: column;
  width: 100%;

  @media (min-width: 1024px) {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
  }
`;

const Image = styled.img`
  width: 100%;
  border-radius: 1.5rem;

  @media (min-width: 1024px) {
    cursor: pointer;
    object-fit: cover;
    width: 28rem;
    height: 21rem;
  }
`;

const EmptyBox = styled.div<{ isDarkMode: boolean }>`
  width: 100%;
  height: 21rem;
  border: ${(props) => (props.isDarkMode ? "0.05rem" : "none")} solid #d9d9d9;
  border-radius: 1.5rem;
  background: ${(props) =>
    props.isDarkMode
      ? "#212739 url('/images/cameraIconDark.png') no-repeat center"
      : "#f6f5f5 url('/images/cameraIcon.png') no-repeat center"};
  background-size: auto;

  @media (min-width: 1024px) {
    width: 28rem;
    cursor: pointer;
  }
`;

const FileInput = styled.input`
  display: none;
`;
