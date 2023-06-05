"use client";
import Link from "next/link";
import styled from "styled-components";
import Button from "../../../components/UI/Button";
import React, { useEffect, useState } from "react";
import ConfirmModal from "../../../components/my-page/ConfirmModal";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import uploadImage from "@/app/api/aws";
import { axiosBase } from "@/app/api/axios";

type User = {
  user_id: string;
  email: string;
  username: string;
  img: string;
  birth_date: string;
  password: string;
  created_at: string;
};

type LabelForFileProps = {
  backgroundImageUrl?: string;
};

const ModifyUserInfo: React.FC = () => {
  const { data: currentUser } = useQuery<User>(["currentUser"]); //비동기적으로 실행, 서버에서 온 값
  const [userData, setUserData] = useState<any>(); //얘가 먼저 실행되서 밸류 값 undefined, 우리가 갖고 있던 값

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
  const [date, setDate] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
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

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // userData 데이터 확인

    // 변경한 데이터를 객체에다 담아서 서버에 전송
    // 객체를 만들고 그 안에 key와 value를 넣어줘야 한다.
    // value는  e.currentTarget.name명.value로 접근 가능
    // const modifyUserInfo = {
    //   user_id: currentUser?.user_id,
    //   email: e.currentTarget.user_email.value,
    //   username: e.currentTarget.nickname.value,
    //   birth_date: e.currentTarget.birth.value,
    //   password: "", // 사용자가 입력해야 되니 때문에 공백
    //   img: "", // aws에 업로드한 이미지 url을 넣기 때문에 공백으로 처리
    // };

    // aws 이미지 업로드 로직
    if (selectedFile) {
      try {
        const response = await uploadImage(selectedFile); // aws에 이미지 업로드하기 위한 코드
        const imgUrl = response.imageUrl; // aws 업로드 후 반환된 이미지 aws url
        // modifyUserInfo.img = imgUrl; // 객체에 이미지 aws url 추가
        console.log("imgUrl : ", imgUrl);
        setUserData({ ...userData, img: imgUrl });
      } catch (error) {
        console.error("Image upload failed:", error);
      }
    }

    // PUT /api/users/
    // TODO: modifyUserInfo 해당 객체를 회원정보 수정 api에 넣어서 PUT 요청
    // 변경에 성공하면 alert창 띄우고 my-page로 이동
    console.log(userData);
    try {
      const response = await axiosBase.put("users", userData);
      console.log(response);
      alert("회원정보가 수정되었습니다.");
      router.push("/my-page");
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteAccount = () => {
    router.push("/");
    // 회원 탈퇴 로직을 처리하는 함수
    console.log("계정이 삭제되었습니다.");
    closeModal();
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleDeleteImage = () => {};

  const handleChageInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
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
              <Title>비밀번호 *</Title>
              <InputBox
                type="password"
                name="password"
                value={userData?.password}
                required
                onChange={handleChageInput} // input에 입력한 값이 user 객체에 저장
              />
            </Wrapper>
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
          </WrapperInfo>
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
          <ProfileImageWrapper>
            <Title>프로필 이미지</Title>
            <LabelForFile
              htmlFor="upload-button"
              // backgroundImageUrl="recipe-icon.png"
            >
              {previewImage && (
                <>
                  <StyledImage src={previewImage} alt="Preview" />
                  {handleDeleteImage && (
                    <button type="button" onClick={handleDeleteImage}>
                      <DeleteImage
                        src="/images/delete-button.png"
                        alt="delete"
                      />
                    </button>
                  )}
                </>
              )}
              {!previewImage && "클릭하여 사진 업로드"}
            </LabelForFile>
            <InputFile
              type="file"
              accept="image/*"
              id="upload-button"
              onChange={handleFileChange}
            />
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
  width: 55rem;
  margin-top: 7rem;
`;

const WrapperInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 55rem;
  margin-top: 7rem;
`;

const Title = styled.h4`
  font-size: 17px;
  margin: 0.5rem 5.9rem 0 0.2rem;
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
