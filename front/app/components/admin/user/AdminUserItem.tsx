import { axiosBase } from "@/app/api/axios";
import {
  LongSpan,
  MediumSpan,
  ShortSpan,
} from "@/app/styles/admin/admin.style";
import { User } from "@/app/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { useState } from "react";
import { toast } from "react-hot-toast";
import styled from "styled-components";

type AdminUserItemProps = {
  user: User;
};

const AdminUserItem = (props: AdminUserItemProps) => {
  const { user_id, username, email, birth_date, created_at } = props.user;

  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [newUsername, setNewUsername] = useState<string>(username);

  const client = useQueryClient();

  // useMutation 훅을 사용하여 API 호출 처리
  const mutation = useMutation((newUsername: string) =>
    axiosBase.patch("users", { ...props.user, username: newUsername })
  );

  const editHandler = () => {
    console.log(user_id);
    if (window.confirm("정말로 유저의 정보륿 변경하시겠습니까?")) {
      // 비동기 API 호출 실행
      mutation.mutate(newUsername, {
        onSuccess: (data) => {
          // 성공 시 동작
          client.invalidateQueries(["users"]);
          toast.success("유저 정보가 성공적으로 변경되었습니다.");
        },
        onError: (error) => {
          // 실패 시 동작
          toast.error("네트워크 연결에 문제가 있습니다.");
        },
        onSettled: () => {
          // API 호출 완료 시 동작
          setIsEdit(false);
        },
      });
    }
  };

  // const deleteHanlder = () => {
  //   if (window.confirm("정말로 유저를 탈퇴 시키겠습니까?")) {
  //     axiosBase
  //       .delete(`users`, { user_id, password: "" })
  //       .then((res) => {
  //         client.invalidateQueries(["users"]);
  //         toast.success("유저가 성공적으로 탈퇴 되었습니다.");
  //       })
  //       .catch((err: any) => {
  //         toast.error("네트워크 연결에 문제가 있습니다.");
  //       })
  //       .finally(() => {});
  //   } else {
  //     return;
  //   }
  // };

  return (
    <PanelListItem>
      <ShortSpan>{user_id}</ShortSpan>
      {isEdit ? (
        <ShortInput
          onChange={(e) => setNewUsername(e.target.value)}
          value={newUsername}
        />
      ) : (
        <ShortSpan>{username}</ShortSpan>
      )}

      <LongSpan>{email}</LongSpan>
      <MediumSpan>{birth_date}</MediumSpan>
      <MediumSpan>{created_at.slice(0, 10)}</MediumSpan>
      {isEdit ? (
        <IconWrapper onClick={editHandler}>
          <Image
            src="/images/admin/checkIcon.svg"
            width={16}
            height={16}
            alt="check_icon"
            style={{ boxSizing: "content-box", padding: "1rem" }}
          />
        </IconWrapper>
      ) : (
        <IconWrapper onClick={() => setIsEdit(true)}>
          <Image
            src="/images/admin/editIcon.png"
            width={16}
            height={16}
            alt="edit_icon"
            style={{ boxSizing: "content-box", padding: "1rem" }}
          />
        </IconWrapper>
      )}

      {/* <IconWrapper onClick={deleteHanlder}>
        <Image
          src="/images/admin/deleteIcon.png"
          width={16}
          height={16}
          alt="delete_icon"
          style={{ boxSizing: "content-box", padding: "1rem" }}
        />
      </IconWrapper> */}
    </PanelListItem>
  );
};

export default AdminUserItem;
const LinkedSpan = styled.span`
  cursor: pointer;
  text-decoration: underline;
`;

const PanelListItem = styled.li`
  font-size: 16px;
  font-weight: 400;
  width: 100%;
  display: flex;
  padding: 0.5rem 2rem;
  border-top: 1px solid #ddd;
  align-items: center;
`;

const ShortInput = styled.input`
  padding: 0.8rem 1.2rem;
  width: 13rem;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
`;

const IconWrapper = styled.div`
  cursor: pointer;

  &:hover {
    opacity: 0.5;
  }
`;
