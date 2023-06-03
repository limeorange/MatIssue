import styled from "styled-components";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { axiosBase } from "@/app/api/axios";

const UserModal = () => {
  const router = useRouter();

  const logoutHandler = async () => {
    const id = Cookies.get("auth");

    axiosBase
      .post(
        `users/logout`,
        { session_id: id },
        {
          params: {
            id,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        toast.error("무언가 잘못되었습니다!");
      })
      .finally(() => {
        Cookies.remove("auth");
        console.log(Cookies.get("auth"));
        toast.success("로그아웃 되었습니다.");
      });
  };

  return (
    <UserModalContainer>
      <UserModalList>
        <UserModalItem
          onClick={() => {
            router.push("/myPage");
          }}
        >
          마이페이지
        </UserModalItem>
        <UserModalItem
          onClick={() => {
            router.push("/myPage/modifyUserInfo");
          }}
        >
          회원정보 수정
        </UserModalItem>
        <UserModalItem
          onClick={() => {
            router.push("/myPage/notification");
          }}
        >
          알림
        </UserModalItem>
        <UnderLine />
        <UserModalItem onClick={logoutHandler}>로그아웃</UserModalItem>
      </UserModalList>
    </UserModalContainer>
  );
};

export default UserModal;

const UserModalContainer = styled.div`
  position: absolute;
  z-index: 9;
  top: 4.3rem;
  right: 0;
  width: 13.4rem;
  padding: 0.6rem 0;
  background-color: white;
  box-shadow: 0px 0.1rem 0.3rem rgba(0, 0, 0, 0.25);
  border-radius: 0.5rem;
  font-size: 16px;
  font-weight: 400;
  color: #4f3d21;
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
