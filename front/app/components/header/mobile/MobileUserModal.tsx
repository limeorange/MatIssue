"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import styled from "styled-components";
import Logo from "../Logo";
import Image from "next/image";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { User } from "@/app/types";
import Cookies from "js-cookie";
import { axiosBase } from "@/app/api/axios";
import { useRecoilState } from "recoil";
import { loginState } from "@/app/store/authAtom";

import { toast } from "react-hot-toast";

import getCurrentUser from "@/app/api/user";

import LoadingModal from "../../UI/LoadingModal";

type MobileUserModalProps = {
  isModal: boolean;
  setIsModal: React.Dispatch<React.SetStateAction<boolean>>;
  initialCurrentUser: User;
};

/** 모바일 전용 사이드 유저 모달 */
const MobileUserModal = (props: MobileUserModalProps) => {
  // 현재 로그인된 유저정보 가져옴
  const { data: currentUser } = useQuery<User>(
    ["currentUser"],
    () => getCurrentUser(),
    {
      refetchOnWindowFocus: false,
      retry: 0,
      initialData: props.initialCurrentUser,
    }
  );

  const [scrollPosition, setScrollPosition] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useRecoilState<boolean>(loginState);
  const queryClient = useQueryClient();
  const router = useRouter();

  /** 모달 사라지면서 스크롤 가능하게 하는 핸들러 */
  const closeModalHandler = () => {
    document.body.style.overflow = "auto";
    window.scrollTo(0, scrollPosition);
    props.setIsModal(false);
  };

  /** 모달 내 nav 클릭시 라우팅 및 모달 닫는 핸들러 */
  const routerHandler = (url: string) => {
    closeModalHandler();
    router.push(`${url}`);
  };

  /** 로그아웃 핸들러 */
  const logoutHandler = async () => {
    setIsLoading(true);
    axiosBase
      .post(`users/logout`)
      .then((res) => {
        Cookies.remove("session-id");
        setIsLoggedIn(false);
        queryClient.removeQueries(["currentUser"]);
        queryClient.removeQueries(["currentUserRecipes"]);
        router.refresh();
        props.setIsModal(false);
        toast.success("로그아웃 되었습니다.");
      })
      .catch((err) => {
        toast.error(
          err.response.data.detail
            ? err.response.data.detail
            : "로그아웃에 실패하였습니다."
        );
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  // 모달 여부에따라 스크롤 동작여부 설정
  useEffect(() => {
    if (props.isModal) {
      setScrollPosition(window.pageYOffset);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [props.isModal]);

  return (
    <>
      {isLoading && <LoadingModal />}

      <Backdrop isModal={props.isModal} onClick={closeModalHandler} />
      <ModalContainer isModal={props.isModal}>
        <Logo />
        {currentUser ? (
          <ProfileWrapper>
            <ProfileImgWrapper>
              <Image
                src={currentUser.img}
                width={24}
                height={24}
                alt="profile"
              />
            </ProfileImgWrapper>

            {currentUser.username}
          </ProfileWrapper>
        ) : (
          <AuthWraaper>
            <LoginButton
              onClick={() => {
                routerHandler("/auth/login");
              }}
            >
              로그인
            </LoginButton>
            <SignButton
              onClick={() => {
                routerHandler("/auth/signup");
              }}
            >
              회원가입
            </SignButton>
          </AuthWraaper>
        )}

        <MenuList>
          <MenuItem onClick={() => routerHandler("my-page")}>
            마이페이지
          </MenuItem>
          <MenuItem onClick={() => routerHandler("my-page/modify-user-info")}>
            회원정보수정
          </MenuItem>
          <MenuItem onClick={() => routerHandler("my-page/scrap")}>
            스크랩
          </MenuItem>
          <MenuItem onClick={() => routerHandler("my-page/notification")}>
            알림
          </MenuItem>
          <MenuItem onClick={() => routerHandler("my-page/add-recipe")}>
            글쓰기
          </MenuItem>
        </MenuList>
        <CategoryList>
          <MenuItem
            onClick={() =>
              routerHandler("/recipes/category/best?category=best")
            }
          >
            베스트 레시피
          </MenuItem>
          <MenuItem
            onClick={() =>
              routerHandler("/recipes/category/newest?category=newest")
            }
          >
            최신 레시피
          </MenuItem>
          <MenuItem
            onClick={() =>
              routerHandler("/recipes/category/honmuk?category=honmuk")
            }
          >
            혼먹 레시피
          </MenuItem>
          <MenuItem
            onClick={() =>
              routerHandler("/recipes/category/vegetarian?category=vegetarian")
            }
          >
            비건 레시피
          </MenuItem>
        </CategoryList>
        {isLoggedIn && (
          <LogoutButton onClick={logoutHandler}>로그아웃</LogoutButton>
        )}
      </ModalContainer>
    </>
  );
};

export default MobileUserModal;

const Backdrop = styled.div<{ isModal: boolean }>`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9999;
  display: ${(props) => (props.isModal ? "block" : "none")};
  transition: opacity 0.3s ease-in-out;
`;

const ModalContainer = styled.div<{ isModal: boolean }>`
  display: flex;
  flex-direction: column;
  position: fixed;
  z-index: 10000;
  left: 0;
  top: 0;
  width: 25rem;
  height: 100vh;
  background-color: white;
  padding: 2rem;
  gap: 1rem;
  font-size: 16px;

  transform: translateX(${(props) => (props.isModal ? "0" : "-100%")});
  opacity: ${(props) => (props.isModal ? "1" : "0")};

  transition: all 0.3s ease-in-out;
`;

const AuthWraaper = styled.div`
  display: flex;
  gap: 1rem;
  padding: 1rem 0;
  border-bottom: 1px solid #ccc;
`;

const LoginButton = styled.button`
  text-align: center;
  padding: 0.8rem 1.6rem;
  border-radius: 0.5rem;
  border: 0.1rem solid #fbd26a;
  width: 50%;
`;

const SignButton = styled.button`
  text-align: center;
  padding: 0.8rem 1.6rem;
  border-radius: 0.5rem;
  background-color: #fbd26a;
  width: 50%;
`;

const ProfileWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.8rem 0;
  border-bottom: 1px solid #ccc;
`;

const ProfileImgWrapper = styled.div`
  border-radius: 5rem;
  overflow: hidden;
`;

const MenuList = styled.ul`
  display: flex;
  flex-direction: column;
  padding-bottom: 1rem;
  border-bottom: 1px solid #ccc;
`;

const MenuItem = styled.li`
  padding: 0.8rem;
`;

const CategoryList = styled.ul`
  display: flex;
  flex-direction: column;
  padding-bottom: 1rem;
  font-size: 16px;
  font-weight: 500;
  border-bottom: 1px solid #ccc;
`;

const LogoutButton = styled.button`
  padding: 0.8rem;
  border-radius: 0.5rem;
  text-align: left;
`;
