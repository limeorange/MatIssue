import React, { useRef, ChangeEvent, ReactElement } from "react";
import styled from "styled-components";
import uploadImage from "@/app/api/aws";

type Props = {
  selectedImage: string;
  handleThumbnailChange: (imageUrl: string) => void;
};

const ThumbnailUpload = ({
  selectedImage,
  handleThumbnailChange,
}: Props): ReactElement => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];

      try {
        const response = await uploadImage(file);
        const imageUrl = response.imageUrl;

        handleThumbnailChange(imageUrl);
      } catch (error) {
        console.error("Image upload failed:", error);
      }
    }
  };

  return (
    <ImageSection>
      <Label>썸네일 등록</Label>
      {selectedImage ? (
        <Image src={selectedImage} alt="thumbnail" onClick={handleImageClick} />
      ) : (
        <EmptyBox onClick={handleImageClick} />
      )}
      <FileInput
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleImageChange}
      />
    </ImageSection>
  );
};

export default ThumbnailUpload;

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

const ImageSection = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
`;

const Image = styled.img`
  cursor: pointer;
  object-fit: cover;
  width: 28rem;
  height: 21rem;
  border-radius: 1.5rem;
`;

const EmptyBox = styled.div`
  width: 28rem;
  height: 21rem;
  background: #f6f5f5 url("/images/cameraIcon.png") no-repeat center;
  background-size: auto;
  border-radius: 1.5rem;
  cursor: pointer;
`;

const FileInput = styled.input`
  display: none;
`;
