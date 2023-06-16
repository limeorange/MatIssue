import { useState } from "react";
import { useRouter } from "next/navigation";
import { axiosBase } from "@/app/api/axios";
import { useSetRecoilState } from "recoil";
import { useQueryClient } from "@tanstack/react-query";
import Cookies from "js-cookie";
import styled from "styled-components";

import toast from "react-hot-toast";
import { loginState } from "@/app/store/authAtom";

import LoadingModal from "../UI/LoadingModal";

type UserModalProps = {
  isAdmin: boolean;
  isUserModal: boolean;
  setIsUserModal: React.Dispatch<React.SetStateAction<boolean>>;
};

/** 유저 메뉴 모달 컴포넌트 */
const UserModal = (props: UserModalProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const setIsLoggedIn = useSetRecoilState(loginState);

  const router = useRouter();
  const queryClient = useQueryClient();

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

  /** 모달 메뉴 아이템 클릭시 라우트 핸들러 */
  const routerHandler = (url: string) => {
    props.setIsUserModal(false);
    router.push(`${url}`);
  };

  return (
    <UserModalContainer visible={props.isUserModal}>
      {isLoading && <LoadingModal />}
      <UserModalList>
        {props.isAdmin && (
          <>
            <UserModalItem onClick={() => routerHandler("/admin/user")}>
              관리자페이지
            </UserModalItem>{" "}
            <UnderLine />
          </>
        )}
        <UserModalItem onClick={() => routerHandler("/my-page")}>
          마이페이지
        </UserModalItem>
        <UserModalItem
          onClick={() => {
            routerHandler("/my-page/modify-user-info");
          }}
        >
          회원정보 수정
        </UserModalItem>
        <UserModalItem
          onClick={() => {
            routerHandler("/add-recipe");
          }}
        >
          글쓰기
        </UserModalItem>
        <UserModalItem
          onClick={() => {
            routerHandler("/my-page/scrap");
          }}
        >
          스크랩
        </UserModalItem>
        <UnderLine />
        <UserModalItem onClick={logoutHandler}>로그아웃</UserModalItem>
      </UserModalList>
    </UserModalContainer>
  );
};

export default UserModal;

const UserModalContainer = styled.div<{ visible: boolean }>`
  position: absolute;
  z-index: 90;
  top: 4.3rem;
  right: 0;
  width: 13.4rem;
  padding: 0.6rem 0;
  background-color: white;
  box-shadow: 0px 0.1rem 0.3rem rgba(0, 0, 0, 0.25);
  border-radius: 0.5rem;
  font-size: 13px;
  font-weight: 400;
  color: #4f3d21;

  opacity: ${(props) => (props.visible ? "1" : "0")};
  visibility: ${(props) => (props.visible ? "visible" : "hidden")};

  transition: opacity 0.3s;
`;

const UserModalList = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const UserModalItem = styled.li`
  display: flex;
  width: 100%;
  padding: 0.6rem 1.2rem;

  &:hover {
    cursor: pointer;
    background-color: #fbe2a1;
  }
`;

const UnderLine = styled.div`
  width: 100%;
  border-bottom: 0.1rem solid rgb(200, 200, 200);
`;
