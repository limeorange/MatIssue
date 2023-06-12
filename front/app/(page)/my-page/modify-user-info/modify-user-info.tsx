"use client";

import styled from "styled-components";
import Button from "../../../components/UI/Button";
import React, { useEffect, useState } from "react";
import ConfirmModal from "../../../components/UI/ConfirmModal";
import { useRouter } from "next/navigation";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import uploadImage from "@/app/api/aws";
import { axiosBase } from "@/app/api/axios";
import Cookies from "js-cookie";
import { User } from "../../../types/index";
import VerificationEmail from "@/app/components/my-page/VerificationEmail";
import { toast } from "react-hot-toast";

import {
  Container,
  Header,
  Divider,
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
  AccountDeletion,
  AlertImage,
  StyledChangePassword,
  InputBoxNickName,
  EmailWrapper,
  EmailContainer,
  ContentSection,
  FlexBox,
} from "@/app/styles/my-page/modify-user-info.style";

type LabelForFileProps = {
  backgroundImageUrl?: string;
};

const ModifyUserInfo: React.FC = () => {
  const { data: currentUser } = useQuery<User>(["currentUser"]); //비동기적으로 실행, 서버에서 온 값
  const [userData, setUserData] = useState<any>(); //얘가 먼저 실행되서 밸류 값 undefined, 우리가 갖고 있던 값
  const queryClient = useQueryClient();

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
  const [previewImage, setPreviewImage] = useState<string | null | undefined>(
    currentUser?.img
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
        console.error("Image upload failed:", error);
      }
    }
    setReadyUpdate(true);
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("form 태그 제출");
    console.log("userData 확인: ", userData);
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
      console.log(response);
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

  // 회원 탈퇴 컴포넌트
  const handleDeleteAccount = async () => {
    try {
      const response = await axiosBase.delete("users", {
        data: {
          user_id: userData?.user_id,
          password: userData?.password,
          session_id: "session_id",
        },
      });
      console.log("delete 후 response : ", response);

      if (response.status === 200) {
        queryClient.invalidateQueries(["currentUser"]);
        console.log("회원탈퇴 성공");
        Cookies.remove("session_id");
        console.log("계정이 삭제되었습니다.");
        await axiosBase.post("users/logout");
        router.push("/");
      } else {
        console.error("계정 삭제에 실패하였습니다.");
      }
    } catch (error) {
      console.error("Error occurred while deleting account:", error);
    }
    closeModal();
  };

  // 모달 컨트롤
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  //이미지
  const handleLabelClick = (e: React.MouseEvent<HTMLLabelElement>) => {
    if (previewImage) {
      e.preventDefault();
    }
  };

  //이미지 삭제
  const handleDeleteImage = () => {
    setPreviewImage("");
    setSelectedFile(null);
    setUserData((prev: any) => {
      return { ...prev, img: "" };
    });
  };

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prev: any) => {
      return { ...prev, [name]: value };
    });
  };

  //비밀번호 변경 페이지 라우터
  // const ChangePasswordClick = () => {
  //   router.push("/my-page/modify-user-info/change-password");
  // };

  return (
    <>
      <Container>
        <Header>회원정보수정</Header>
        <Divider />
        <StyledChangePassword
          onClick={() =>
            router.push("/my-page/modify-user-info/change-password")
          }
        >
          비밀번호 변경
        </StyledChangePassword>
        <Wrapper>
          <AccountDeletion onClick={openModal}>회원 탈퇴</AccountDeletion>
          {isModalOpen && (
            <ConfirmModal
              icon={<AlertImage src="/images/alert.png" alt="alert" />}
              message="정말 탈퇴 하시겠습니까?"
              onCancel={closeModal}
              onConfirm={handleDeleteAccount}
            />
          )}
        </Wrapper>
        <form onSubmit={handleFormSubmit}>
          <WrapperInfo>
            <Wrapper>
              <VerificationEmail
                userData={userData}
                handleChangeInput={handleChangeInput}
              />
            </Wrapper>

            <Wrapper>
              <EmailContainer>
                <EmailWrapper>
                  <Title>별명 *</Title>
                  <ContentSection>
                    <FlexBox>
                      <InputBoxNickName
                        type="text"
                        name="username"
                        value={userData?.username}
                        required
                        onChange={handleChangeInput}
                      />
                    </FlexBox>
                  </ContentSection>
                </EmailWrapper>
              </EmailContainer>
            </Wrapper>
            <Wrapper>
              <EmailContainer>
                <EmailWrapper>
                  {" "}
                  <Title>생년월일</Title>
                  <ContentSection>
                    <FlexBox>
                      <InputDateBox
                        type="date"
                        name="birth_date"
                        value={userData?.birth_date}
                        required
                        onChange={handleChangeInput}
                      />
                    </FlexBox>
                  </ContentSection>
                </EmailWrapper>
              </EmailContainer>
            </Wrapper>
            <SpaceDiv />
          </WrapperInfo>

          <ProfileImageWrapper>
            <Title>프로필 이미지</Title>
            <LabelForFile htmlFor="upload-button" onClick={handleLabelClick}>
              {previewImage && (
                <>
                  <StyledImage src={previewImage} alt="Preview" />
                  <button type="button" onClick={handleDeleteImage}>
                    <DeleteImage src="/images/delete-button.svg" alt="delete" />
                  </button>
                </>
              )}
              {!previewImage && (
                <StyledImage src="/images/dongs-logo.png" alt="Default" />
              )}
            </LabelForFile>
            {!previewImage && (
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
  margin-left: 4.1rem;
  border-radius: 0.8rem;
  background-color: #fff9ea;
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
`;
