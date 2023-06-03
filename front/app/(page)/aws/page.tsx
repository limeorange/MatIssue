"use client";
import React, { useState } from "react";
import styled from "styled-components";
import uploadImage from "@/app/api/aws";
import Image from "next/image";

const ImageUploadForm = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setPreviewImage(reader.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (selectedFile) {
      try {
        const response = await uploadImage(selectedFile);
        const imgUrl = response.imageUrl;
        const formData = new FormData();
        formData.append("image", imgUrl);
        console.log(imgUrl);
        // 이후 필요한 로직을 진행합니다.
      } catch (error) {
        console.error("Image upload failed:", error);
      }
    }
  };

  return (
    <StyledDiv>
      <StyledForm onSubmit={handleFormSubmit}>
        <StyledPreviewContainer>
          {previewImage ? (
            <Image src={previewImage} alt="Preview" />
          ) : (
            "미리보기이미지"
          )}
        </StyledPreviewContainer>
        <StyledInput type="file" accept="image/*" onChange={handleFileChange} />
        <StyledButton type="submit">submit</StyledButton>
      </StyledForm>
    </StyledDiv>
  );
};

export default ImageUploadForm;

const StyledDiv = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 20px;
`;

const StyledForm = styled.form`
  background-color: rgba(0, 0, 0, 0.1);
  border: 1px solid black;
  height: 500px;
  width: 500px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 20px;
`;

const StyledPreviewContainer = styled.div`
  height: 200px;
  width: 200px;
  border: 1px solid black;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  color: rgba(0, 0, 0, 0.3);
`;

const StyledInput = styled.input`
  background-color: white;
  height: 40px;
  width: 200px;
  line-height: 3;
`;

const StyledButton = styled.button`
  background-color: rgba(1, 1, 1, 0.5);
  height: 100px;
  width: 200px;
`;
