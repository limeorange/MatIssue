import React, { useState, useRef, ChangeEvent } from "react";
import styled from "styled-components";

const StyledImageSection = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
`;

const StyledImage = styled.img`
  cursor: pointer;
  object-fit: cover;
  width: 280px;
  height: 210px;
  border-radius: 15px;
`;

const StyledLabel = styled.label`
  width: 88px;
  height: 21px;
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 21px;
  color: #4f3d21;
  margin-right: 30px;
`;

const EmptyBox = styled.div`
  width: 280px;
  height: 210px;
  background: #f6f5f5;
  border-radius: 15px;
  cursor: pointer;
`;

const FileInput = styled.input`
  display: none;
`;

interface ThumbnailUploadProps {
  onThumbnailChange: (imageUrl: string) => void;
}

const ThumbnailUpload: React.FC<ThumbnailUploadProps> = ({
  onThumbnailChange,
}) => {
  const [selectedImage, setSelectedImage] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
      onThumbnailChange(imageUrl);
    }
  };

  return (
    <StyledImageSection>
      <StyledLabel>썸네일 등록</StyledLabel>
      {selectedImage ? (
        <StyledImage
          src={selectedImage}
          alt="thumbnail"
          onClick={handleImageClick}
        />
      ) : (
        <EmptyBox onClick={handleImageClick} />
      )}
      <FileInput
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleImageChange}
      />
    </StyledImageSection>
  );
};

export default ThumbnailUpload;
