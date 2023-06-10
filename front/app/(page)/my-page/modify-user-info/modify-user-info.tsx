"use client";

import styled from "styled-components";
import Link from "next/link";
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
import {
  Container,
  Header,
  Divider,
  WrapperInfo,
  Wrapper,
  Title,
  InputBox,
  ProfileImageWrapper,
  InputFile,
  IputAndDescription,
  StyledImage,
  DeleteImage,
  InputDateBox,
  UserModifyButton,
  SpaceDiv,
  ShowIconBox,
  AccountDeletion,
  AlertImage,
  ConfirmCodeInput,
  SendingCodeButton,
  EmailDescription,
  StyledChangePassword,
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

  // TODO: password 주석 시작
  // const [password, setPassword] = useState({
  //   password: "",
  //   confirmPassword: "",
  // });
  // TODO: password 주석 끝

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

    // TODO: 아래 if문 제거 시작
    // if (
    //   password.password === password.confirmPassword && // 비밀번호와 비밀번호 확인이 같은지
    //   password.password.length >= 8 && // 비밀번호가 8자리 이상인지
    //   password.password.search(/[0-9]/g) !== -1 && // 숫자가 포함되어 있는지
    //   password.password.search(/[a-z]/gi) !== -1 && // 영문 대소문자가 포함되어 있는지
    //   password.password.search(/[~!@#$%^&*()_+|<>?:{}]/gi) !== -1 && // 특수문자가 포함되어 있는지
    //   password.password !== "" && // 비밀번호가 공백인지
    //   password.confirmPassword !== "" // 비밀번호 확인이 공백인지
    // ) {
    //   // handleFormSubmit이 실행되면 uploadProfileImage 함수가 실행이 되고
    //   // uploadProfileImage 함수 내에 이미지를 aws 업로드에 성공하면 setUserData로 img 상태를 변경해주면
    //   // useEffect가 실행되면서 modifyUser 함수가 실행된다. => 회원정보 변경
    //   uploadProfileImage();
    // } else {
    //   alert(
    //     "비빌번호를 확인해주세요. 8자리 이상, 대소문자, 숫자, 특수문자가 포함되어어 있어야 합니다."
    //   );
    // }
    // TODO: 아래 if문 제거 끝

    // TODO: 주석 해제
    uploadProfileImage();
  };

  // modifyUserInfo 해당 객체를 회원정보 수정 api에 넣어서 PUT 요청
  // 변경에 성공하면 alert창 띄우고 my-page로 이동
  async function modifyUser() {
    const modifyUserInfo = {
      ...userData,
      // password: password.password, // TODO: 주석처리
    };

    try {
      const response = await axiosBase.patch("users", modifyUserInfo);
      console.log(response);
      alert("회원정보가 수정되었습니다.");
      router.push("/my-page");
    } catch (error) {
      console.error(error);
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
    setPreviewImage(null);
  };

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // if (name === "password" || name === "confirmPassword") {
    //   setPassword({ ...password, [name]: value });
    //   return;
    // }

    // 유저데이타
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
          <StyledChangePassword>비밀번호 변경</StyledChangePassword>
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
            <VerificationEmail
              email={userData?.email}
              handleChangeInput={handleChangeInput}
            />

            <Wrapper>
              <Title>별명 *</Title>
              <InputBox
                type="text"
                name="username"
                value={userData?.username}
                required
                onChange={handleChangeInput}
              />
            </Wrapper>
            <Wrapper>
              <Title>생년월일</Title>

              <InputDateBox
                type="date"
                name="birth_date"
                value={userData?.birth_date}
                required
                onChange={handleChangeInput}
              />
            </Wrapper>
            <SpaceDiv />
            {/* TODO: 비밀번호 입력칸 주석 시작 */}
            {/* <Wrapper>
              <Title>비밀번호 </Title>
              <InputBox
                type="password"
                name="password"
                id="password"
                value={password.password}
                onChange={handleChangeInput}
              />
            </Wrapper>
            <Wrapper>
              <Title>비밀번호 확인</Title>
              <InputBox
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                value={password.confirmPassword}
                onChange={handleChangeInput}
              />
            </Wrapper> */}
            {/* TODO: 비밀번호 입력칸 주석 끝 */}
          </WrapperInfo>

          <ProfileImageWrapper>
            <Title>프로필 이미지</Title>
            <LabelForFile htmlFor="upload-button" onClick={handleLabelClick}>
              {previewImage && (
                <>
                  <StyledImage src={previewImage} alt="Preview" />
                  <button type="button" onClick={handleDeleteImage}>
                    <DeleteImage src="/images/delete-button.png" alt="delete" />
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
