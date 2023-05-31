"use client";

import React, { useState, useRef, ChangeEvent } from "react";
import styled from "styled-components";

const categories = ["한식", "중식", "일식", "양식"];
const peopleCount = [1, 2, 3, 4, 5];
const times = ["15분 이내", "30분 이내", "1시간 이내", "1시간 이상"];
const difficulties = ["상", "중", "하"];

const RecipeForm = () => {
  const [selectedCategory, setCategory] = useState("");
  const [selectedPeople, setPeople] = useState("");
  const [selectedTime, setTime] = useState("");
  const [selectedDifficulty, setDifficulty] = useState("");
  const [selectedImage, setSelectedImage] = useState("");
  const [recipeTitle, setRecipeTitle] = useState("");
  const [cookingIntro, setCookingIntro] = useState("");
  const [ingredient, setIngredient] = useState("");
  const [quantity, setQuantity] = useState("");
  const [ingredients, setIngredients] = useState([
    { ingredient: "", quantity: "" },
  ]);

  const handleCategoryChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value);
  };

  const handlePeopleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setPeople(e.target.value);
  };

  const handleTimeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setTime(e.target.value);
  };

  const handleDifficultyChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setDifficulty(e.target.value);
  };

  const handleThumbnailChange = (imageUrl: string) => {
    setSelectedImage(imageUrl);
  };

  const ThumbnailUpload = () => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleImageClick = () => {
      if (fileInputRef.current) {
        fileInputRef.current.click();
      }
    };

    // 섬네일 등록
    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
        const file = e.target.files[0];
        const imageUrl = URL.createObjectURL(file);
        setSelectedImage(imageUrl);
      }
    };

    return (
      <ImageSection>
        <Label>썸네일 등록</Label>
        {selectedImage ? (
          <Image
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
      </ImageSection>
    );
  };

  // 유튜브 링크
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
                src={`https://www.youtube.com/embed/${
                  videoLink.split("v=")[1]
                }`}
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

  const handleRecipeTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setRecipeTitle(e.target.value);
  };

  const handleCookingIntroChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setCookingIntro(e.target.value);
  };

  // 재료와 양 변경 핸들러
  const handleIngredientChange = (
    e: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newIngredients = [...ingredients];
    newIngredients[index].ingredient = e.target.value;
    setIngredients(newIngredients);
  };

  const handleQuantityChange = (
    e: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newIngredients = [...ingredients];
    newIngredients[index].quantity = e.target.value;
    setIngredients(newIngredients);
  };

  // 재료와 양 추가 핸들러
  const handleAddIngredient = () => {
    setIngredients([...ingredients, { ingredient: "", quantity: "" }]);
  };

  // 재료 등록 컴포넌트
  const IngredientSection = () => {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          marginTop: "7.2rem",
        }}
      >
        <Label>재료 등록</Label>
        <div style={{ display: "flex", flexDirection: "column" }}>
          {ingredients.map((_, index) => (
            <IngredientRow key={index}>
              <IngredientInput
                type="text"
                value={ingredients[index].ingredient}
                onChange={(e) => handleIngredientChange(e, index)}
                placeholder="재료"
              />
              <QuantityInput
                type="text"
                value={ingredients[index].quantity}
                onChange={(e) => handleQuantityChange(e, index)}
                placeholder="재료의 양"
              />
            </IngredientRow>
          ))}
          <button type="button" onClick={handleAddIngredient}>
            재료 추가
          </button>
        </div>
      </div>
    );
  };

  return (
    <FormWrapper>
      <Title>레시피 등록하기</Title>
      <MainSection>
        <ImageContainer>
          <ThumbnailUpload />
        </ImageContainer>
        <div>
          <InfoSection>
            <LabelWithInfo>
              <Label>카테고리</Label>
              <Info>
                <Select
                  value={selectedCategory}
                  onChange={handleCategoryChange}
                >
                  <option value="" disabled hidden>
                    종류
                  </option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </Select>
              </Info>
            </LabelWithInfo>
          </InfoSection>
          <InfoSection>
            <LabelWithInfo>
              <Label>요리정보</Label>
              <Info>
                <Select value={selectedPeople} onChange={handlePeopleChange}>
                  <option value="" disabled hidden>
                    인원
                  </option>
                  {peopleCount.map((count) => (
                    <option key={count} value={count}>
                      {count}
                    </option>
                  ))}
                </Select>
                <Select value={selectedTime} onChange={handleTimeChange}>
                  <option value="" disabled hidden>
                    시간
                  </option>
                  {times.map((time) => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))}
                </Select>
                <Select
                  value={selectedDifficulty}
                  onChange={handleDifficultyChange}
                >
                  <option value="" disabled hidden>
                    난이도
                  </option>
                  {difficulties.map((difficulty) => (
                    <option key={difficulty} value={difficulty}>
                      {difficulty}
                    </option>
                  ))}
                </Select>
              </Info>
            </LabelWithInfo>
          </InfoSection>
        </div>
      </MainSection>
      <RecipeTitle>
        <Label>레시피 제목</Label>
        <Input
          type="text"
          value={recipeTitle}
          onChange={handleRecipeTitleChange}
          placeholder="ex) 소고기 미역국 끓이기"
        />
      </RecipeTitle>
      <CookingIntro>
        <Label>요리 소개</Label>
        <TextArea
          value={cookingIntro}
          onChange={handleCookingIntroChange}
          placeholder="요리 소개를 입력해주세요."
        />
      </CookingIntro>
      <VideoSection />
      <IngredientSection />
    </FormWrapper>
  );
};

export default RecipeForm;

// 공통 스타일 적용
const Label = styled.label`
  width: 8.8rem;
  height: 2.1rem;
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 600;
  font-size: 1.8rem;
  line-height: 2.1rem;
  color: #4f3d21;
  margin-right: 3rem;
  padding-top: 0.5rem;
`;

const Select = styled.select`
  box-sizing: border-box;
  width: 13.5rem;
  height: 3.6rem;
  border: 0.1rem solid #d9d9d9;
  border-radius: 5rem;
  padding-left: 1rem;
  margin: 0.5rem 0;
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 400;
  font-size: 1.6rem;
  line-height: 1.9rem;
`;

const Input = styled.input`
  box-sizing: border-box;
  width: 57.2rem;
  height: 3.6rem;
  border: 0.1rem solid #d9d9d9;
  border-radius: 1.5rem;
  padding-left: 1rem;
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 400;
  font-size: 1.6rem;
  line-height: 1.9rem;
`;

const TextArea = styled.textarea`
  box-sizing: border-box;
  width: 57.2rem;
  height: 10rem;
  border: 0.1rem solid #d9d9d9;
  border-radius: 1.5rem;
  padding-left: 1rem;
  padding-top: 1rem;
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 400;
  font-size: 1.6rem;
  line-height: 1.9rem;
  ::placeholder {
    color: #a9a9a9;
  }
`;

// 전체 폼 스타일링
const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  width: 70rem;
  align-items: flex-start;
  margin: 5rem auto 0;
  background-color: rgba(1, 1, 1, 0.2);
`;

const Title = styled.h2`
  width: 14.8rem;
  height: 2.7rem;
  font-family: "Inter";
  font-style: normal;
  font-weight: 600;
  font-size: 2.2rem;
  line-height: 2.7rem;
  color: #4f3d21;
  margin: 0;
`;

const MainSection = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 2rem;
`;

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
  margin-right: 4.9rem;
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
  background: #f6f5f5;
  border-radius: 1.5rem;
  cursor: pointer;
`;

const FileInput = styled.input`
  display: none;
`;

const InfoSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 2rem;
`;

const LabelWithInfo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
`;

const RecipeTitle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  margin-top: 10rem;
`;

const CookingIntro = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  margin-top: 2rem;
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
  font-size: 1.6rem;
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
  width: 17.4rem;
  height: 11.6rem;
  background: #f6f5f5;
  border-radius: 1.5rem;
`;

const IngredientInput = styled(Input)`
  width: 27.5rem;
  height: 3.6rem;
  margin-right: 1.2rem;
  margin-bottom: 1.5rem;
`;

const QuantityInput = styled(Input)`
  width: 12.5rem;
  height: 3.6rem;
`;

const IngredientRow = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;
