"use client";

import Link from "next/link";
import styled from "styled-components";
import Button from "../../../components/UI/Button";
import React, { useEffect, useState } from "react";
import ConfirmModal from "../../../components/my-page/ConfirmModal";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import uploadImage from "@/app/api/aws";
import { axiosBase } from "@/app/api/axios";
import Cookies from "js-cookie";

type User = {
  user_id: string;
  email: string;
  username: string;
  img: string;
  birth_date: string;
  password: string;
  created_at: string;
  session_id: string;
};

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
      password: "",
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

  const uploadProfileImage = async () => {
    // aws 이미지 업로드 로직
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
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // handleFormSubmit이 실행되면 uploadProfileImage 함수가 실행이 되고
    // uploadProfileImage 함수 내에 이미지를 aws 업로드에 성공하면 setUserData로 img 상태를 변경해주면
    // useEffect가 실행되면서 putUser 함수가 실행된다. => 회원정보 변경
    await uploadProfileImage();
  };

  // TODO: modifyUserInfo 해당 객체를 회원정보 수정 api에 넣어서 PUT 요청
  // 변경에 성공하면 alert창 띄우고 my-page로 이동
  async function putUser() {
    console.log("userData  2 : ", userData);
    try {
      const response = await axiosBase.put("users", userData);
      queryClient.invalidateQueries(["currentUser"]);
      console.log(response);
      alert("회원정보가 수정되었습니다.");
      router.push("/my-page");
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (userData?.img) {
      putUser();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData?.img]);

  const handleDeleteAccount = async () => {
    // const confirmDeletion = window.confirm("정말 탈퇴 하시겠습니까?");
    // if (confirmDeletion) {
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
    // }

    closeModal();
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleLabelClick = (e: React.MouseEvent<HTMLLabelElement>) => {
    if (previewImage) {
      e.preventDefault();
    }
  };

  const handleDeleteImage = () => {
    setPreviewImage(null);
  };

  const handleChageInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // setUserData((prev: any) => { ...prev, [name]: value });
    // fix error
    setUserData((prev: any) => {
      return { ...prev, [name]: value };
    });
  };

  return (
    <>
      <Container>
        <Header>회원정보수정</Header>
        <Divider />

        <Link href="/my-page/modify-user-info/change-password">
          <ChangePassword>비밀번호 변경</ChangePassword>
        </Link>

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
        {/* 어떤 양식을 서버로 전송하기 위해서는 폼 태그를 많이 사용, form 태그은 submit 버튼을 이용해서 서버로 데이터를 전송 */}
        {/* 그래서 submit button까지 form 태그로 감싸줘야 한다. */}
        {/* submit 버튼을 클릭하면 handleFormSubmit 해당 함수가 실행  */}
        {/* form 태그에서 압력값에 접근하기 위해서는 name을 사용! */}
        <form onSubmit={handleFormSubmit}>
          <WrapperInfo>
            <Wrapper>
              <Title>이메일 *</Title>
              <InputBox
                type="email"
                name="email"
                value={userData?.email}
                required
                readOnly
                onChange={handleChageInput}
              />
            </Wrapper>
            <Wrapper>
              <Title>별명 *</Title>
              <InputBox
                type="text"
                name="username"
                value={userData?.username}
                required
                onChange={handleChageInput}
              />
            </Wrapper>
            <Wrapper>
              <Title>생년월일</Title>

              <InputDateBox
                type="date"
                name="birth_date"
                value={userData?.birth_date}
                required
                onChange={handleChageInput}
              />
            </Wrapper>
            <Wrapper>
              <Title>비밀번호 변경</Title>
              <IputAndDescription>
                <InputBox
                  type="password"
                  name="password"
                  value={userData?.password}
                  required
                  onChange={handleChageInput} // input에 입력한 값이 user 객체에 저장
                />
                <PassWordDescription>
                  변경할 비밀번호를 영문, 숫자, 특수문자를 포함한 8자 이상으로
                  입력해 주세요.
                </PassWordDescription>
              </IputAndDescription>
            </Wrapper>
            <Wrapper>
              <Title>비밀번호 확인</Title>
              <IputAndDescription>
                <InputBox
                  type="password"
                  name="password"
                  value={userData?.password}
                  required
                  onChange={handleChageInput}
                />
                <PassWordDescription>
                  변경할 비밀번호를 한 번 더 입력해 주세요.
                </PassWordDescription>
              </IputAndDescription>
            </Wrapper>
          </WrapperInfo>

          <ProfileImageWrapper>
            <Title>프로필 이미지</Title>
            <LabelForFile htmlFor="upload-button" onClick={handleLabelClick}>
              {previewImage ? (
                <>
                  <StyledImage src={previewImage} alt="Preview" />
                  <button type="button" onClick={handleDeleteImage}>
                    <DeleteImage src="/images/delete-button.png" alt="delete" />
                  </button>
                </>
              ) : (
                "클릭하여 사진 업로드"
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

const Container = styled.div`
  position: relative;
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

const ChangePassword = styled.div`
  position: absolute;
  right: 22.4rem;
  top: 13.5rem;
  font-size: 13px;
  text-decoration: underline;
  color: #201ce0;
`;

const AccountDeletion = styled.div`
  position: absolute;
  right: 15.1rem;
  top: 13.5rem;
  font-size: 13px;
  text-decoration: underline;
  color: #e11717;
  cursor: pointer;
`;

const AlertImage = styled.img`
  width: 3rem;
  height: 3rem;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 57rem;
  margin-top: 7rem;
`;

const WrapperInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  margin-top: 7rem;
`;

const Title = styled.h4`
  font-size: 17px;
  margin: 0.5rem 7.5rem 0 0.2rem;
  cursor: pointer;
  color: #4f3d21;
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
  margin-top: 7rem;
`;

const InputFile = styled.input`
  display: none;
`;

const LabelForFile = styled.label<LabelForFileProps>`
  position: relative;
  width: 19.8rem;
  height: 19.8rem;
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

const StyledImage = styled.img`
  width: 19.8rem;
  height: 19.8rem;
`;

const DeleteImage = styled.img`
  position: absolute;
  top: 0.7rem;
  right: 0.6rem;
  width: auto;
  height: auto;
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
  color: #4f3d21;
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
    cursor: pointer;
  }
`;

const IputAndDescription = styled.div`
  display: flex;
  flex-direction: column;
`;

const PassWordDescription = styled.p`
  padding: 0.5rem 0 0 0.5rem;
  font-size: 13px;
  color: #4f3d21;
`;
