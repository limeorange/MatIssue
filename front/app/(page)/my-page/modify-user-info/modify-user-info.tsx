"use client";

import styled from "styled-components";
import Button from "../../../components/UI/Button";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import uploadImage from "@/app/api/aws";
import { axiosBase } from "@/app/api/axios";
import { User } from "../../../types/index";
import VerificationEmail from "@/app/components/my-page/VerificationEmail";
import { toast } from "react-hot-toast";
import darkModeAtom from "@/app/store/darkModeAtom";
import { useRecoilValue } from "recoil";
import AccountDeletionComponent from "@/app/components/my-page/AccountDeletion";
import {
  Container,
  Heading,
  Divider,
  ArrowImage,
  WrapperInfo,
  Wrapper,
  Title,
  ProfileImageWrapper,
  InputFile,
  StyledImage,
  DeleteImage,
  InputDateBox,
  UserModifyButton,
  SpaceDiv,
  StyledChangePassword,
  InputWrapper,
  InputContainer,
  TitleAndPasswordWrapper,
  InputBox,
  ProfileImageTitle,
  DarkModeDeleteImage,
} from "@/app/styles/my-page/modify-user-info.style";

type LabelForFileProps = {
  backgroundImageUrl?: string;
  isDarkMode: boolean;
};

const ModifyUserInfo = () => {
  const { data: currentUser } = useQuery<User>(["currentUser"]); //비동기적으로 실행, 서버에서 온 값
  const [userData, setUserData] = useState<any>(); //얘가 먼저 실행되서 밸류 값 undefined, 우리가 갖고 있던 값
  const queryClient = useQueryClient();
  const defaultImage =
    "https://eliceproject.s3.ap-northeast-2.amazonaws.com/dongs.png";
  const isDarkMode = useRecoilValue(darkModeAtom);

  useEffect(() => {
    // 받아온 data 객체로 상태 저장
    const tempUserInfo = {
      user_id: currentUser?.user_id,
      email: currentUser?.email,
      username: currentUser?.username,
      birth_date: currentUser?.birth_date,
      img: currentUser?.img,
    };
    setUserData(tempUserInfo);
  }, [currentUser]);

  const router = useRouter();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string>(
    currentUser ? currentUser.img : defaultImage
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [readyUpdate, setReadyUpdate] = useState<boolean>(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setSelectedFile(file);
      const reader = new FileReader(); // 파일을 읽어서 base64 형식의 data url을 만든다.
      reader.onload = () => {
        if (reader.readyState === 2) {
          setPreviewImage(reader.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // aws 이미지 업로드 로직
  const uploadProfileImage = async () => {
    if (selectedFile) {
      try {
        const response = await uploadImage(selectedFile);
        const imgUrl = response.imageUrl;
        setUserData((prev: any) => {
          return { ...prev, img: imgUrl };
        });
      } catch (error) {
        toast.error("Image upload failed:(");
      }
    }
    setReadyUpdate(true);
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    uploadProfileImage();
  };

  // modifyUserInfo 해당 객체를 회원정보 수정 api에 넣어서 PUT 요청
  // 변경에 성공하면 alert창 띄우고 my-page로 이동
  // 회원정보수정
  async function modifyUser() {
    const modifyUserInfo = {
      ...userData,
    };

    try {
      const response = await axiosBase.patch("users", modifyUserInfo);
      toast.success("회원정보가 수정되었습니다.");
      router.push("/my-page");
    } catch (error) {
      toast.error("회원정보 수정에 실패하였습니다.");
    }
  }

  useEffect(() => {
    if (readyUpdate) {
      modifyUser();
      setReadyUpdate(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [readyUpdate === true]);

  // 모달 컨트롤
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  //이미지
  const handleLabelClick = (e: React.MouseEvent<HTMLLabelElement>) => {
    if (previewImage !== defaultImage) {
      e.preventDefault();
    }
  };

  //이미지 삭제
  const handleDeleteImage = () => {
    setPreviewImage(defaultImage);
    setSelectedFile(null);
    setUserData((prev: any) => {
      return { ...prev, img: defaultImage };
    });
  };

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prev: any) => {
      return { ...prev, [name]: value };
    });
  };

  return (
    <>
      <Container>
        <TitleAndPasswordWrapper>
          <Heading>회원정보수정</Heading>
          <Divider isDarkMode={isDarkMode} />
          <StyledChangePassword
            isDarkMode={isDarkMode}
            onClick={() =>
              router.push("/my-page/modify-user-info/change-password")
            }
          >
            비밀번호 변경
            <ArrowImage src="/images/right-arrow.svg" alt="arrow-right" />
          </StyledChangePassword>
        </TitleAndPasswordWrapper>

        <form onSubmit={handleFormSubmit}>
          <WrapperInfo>
            <Wrapper>
              <VerificationEmail
                userData={userData}
                handleChangeInput={handleChangeInput}
              />
            </Wrapper>

            <Wrapper>
              <InputContainer>
                <InputWrapper>
                  <Title>별명 *</Title>
                  <InputBox
                    type="text"
                    name="username"
                    value={userData?.username}
                    required
                    onChange={handleChangeInput}
                  />
                </InputWrapper>
              </InputContainer>
            </Wrapper>
            <Wrapper>
              <InputContainer>
                <InputWrapper>
                  <Title>생년월일</Title>
                  <InputDateBox
                    type="date"
                    name="birth_date"
                    value={userData?.birth_date}
                    required
                    onChange={handleChangeInput}
                    isDarkMode={isDarkMode}
                  />
                </InputWrapper>
              </InputContainer>
            </Wrapper>
            <SpaceDiv />
          </WrapperInfo>

          <ProfileImageWrapper>
            <ProfileImageTitle>프로필 이미지</ProfileImageTitle>
            <LabelForFile
              isDarkMode={isDarkMode}
              htmlFor="upload-button"
              onClick={handleLabelClick}
            >
              {previewImage !== defaultImage && (
                <>
                  <StyledImage src={previewImage} alt="Preview" />
                  <button type="button" onClick={handleDeleteImage}>
                    {isDarkMode ? (
                      <DarkModeDeleteImage
                        src="/images/dark_mode_delete-button.svg"
                        alt="delete"
                      />
                    ) : (
                      <DeleteImage
                        src="/images/delete-button.svg"
                        alt="delete"
                      />
                    )}
                  </button>
                </>
              )}
              {previewImage === defaultImage && (
                <StyledImage src={defaultImage} alt="Default" />
              )}
            </LabelForFile>
            {previewImage === defaultImage && (
              <InputFile
                type="file"
                accept="image/*"
                id="upload-button"
                onChange={handleFileChange}
              />
            )}
          </ProfileImageWrapper>
          <UserModifyButton>
            <Button
              type="submit"
              isBgColor={true}
              fullWidth={true}
              isBorderColor={false}
              isHoverColor={false}
            >
              회원 정보 수정
            </Button>
          </UserModifyButton>
          <AccountDeletionComponent
            id={userData?.user_id}
          ></AccountDeletionComponent>
        </form>
      </Container>
    </>
  );
};

export default ModifyUserInfo;

const LabelForFile = styled.label<LabelForFileProps>`
  position: relative;
  width: 19.8rem;
  height: 19.8rem;
  margin-top: 0.3rem;
  border-radius: 0.8rem;
  background-color: ${(props) => (props.isDarkMode ? "#ddd" : "#fff9ea")};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background-image: ${(props) =>
    props.backgroundImageUrl
      ? `url("/images/${props.backgroundImageUrl}")`
      : "none"};
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  @media (min-width: 1024px) {
    margin-left: 4.1rem;
    margin-top: 0;
  }
`;
