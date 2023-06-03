"use client";
import Link from "next/link";
import styled from "styled-components";
import Button from "../../../components/UI/Button";
import React, { useState } from "react";

const ModifyUserInfo = () => {
  const [date, setDate] = useState("");
  const [selectedImage, setSelectedImage] = useState("/images/dongs-logo.png");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedImage(URL.createObjectURL(event.target.files[0]));
    }
  };

  return (
    <>
      <Container>
        <Header>회원정보수정</Header>
        <Divider />

        <Wrapper>
          <Title>이메일 *</Title>
          <InputBox type="email" name="email" required />
        </Wrapper>
        <Wrapper>
          <Title>이름 *</Title>
          <InputBox type="text" name="name" required />
        </Wrapper>
        <Wrapper>
          <Title>별명 *</Title>
          <InputBox type="text" name="nickname" required />
        </Wrapper>
        <Wrapper>
          <Title>생년월일</Title>

          <InputDateBox
            type="date"
            value={date}
            onChange={(event) => setDate(event.target.value)}
            required
          />
        </Wrapper>
        <ProfileImageWrapper>
          <Title>프로필 이미지</Title>
          <Wrapper>
            <LabelForFile
              backgroundImageUrl={selectedImage}
              htmlFor="upload-button"
            />
            <InputFile
              type="file"
              onChange={handleFileChange}
              accept="image/*"
              id="upload-button"
            />
          </Wrapper>
        </ProfileImageWrapper>
        <UserModifyButton>
          <Button
            type="button"
            isBgColor={true}
            fullWidth={true}
            isBorderColor={false}
            isHoverColor={false}
          >
            회원 정보 수정
          </Button>
        </UserModifyButton>
      </Container>
    </>
  );
};

export default ModifyUserInfo;

const Container = styled.div`
  width: 100%;
  max-width: 120rem;
  margin: 0 auto;
  padding: 6.4rem 14rem 0;
`;

const Header = styled.h1`
  font-size: 26px;
  font-weight: 700;
  color: #4f3d21;
  padding-left: 2.5rem;
  cursor: pointer;
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: #4f3d21;
  margin: 2rem 0;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 55rem;
  margin-top: 5.9rem;
`;

const Title = styled.h4`
  font-size: 17px;
  margin: 0.5rem 5.9rem 0 0.2rem;
  cursor: pointer;
`;

const InputBox = styled.input`
  width: 40rem;
  height: 4.8rem;
  border: 0.1rem solid #d2d2d2;
  border-radius: 0.8rem;
  font-size: 15px;
  padding: 0 1.6rem;
  &:focus {
    outline: 0.3rem solid #fbd26a;
    border: none;
  }
`;

const ProfileImageWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const InputFile = styled.input`
  display: none;
`;

const LabelForFile = styled.label<{ backgroundImageUrl: string }>`
  width: 19.8rem;
  height: 19.8rem;
  background: ${(props) => `#fff9ea url(${props.backgroundImageUrl})`};
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  cursor: pointer;
`;

const UserModifyButton = styled.div`
  margin: 6rem 0 0 15rem;
  width: 23rem;
`;

const InputDateBox = styled.input`
  position: relative;
  width: 40rem;
  height: 4.8rem;
  border: 0.1rem solid #d2d2d2;
  border-radius: 0.8rem;
  padding: 0 1.6rem;
  background: url(/images/calendar.png) no-repeat right 1.6rem center / 2rem
    auto;
  font-size: 15px;
  cursor: pointer;
  &:hover {
    outline: 0.3rem solid #fbd26a;
    border: none;
  }
  &::-webkit-calendar-picker-indicator {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: transparent;
    color: transparent;
    cursor: pointer;
  }
`;
