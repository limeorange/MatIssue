import {
  LongSpan,
  MediumSpan,
  ShortSpan,
} from "@/app/styles/admin/admin.style";
import { User } from "@/app/types";
import Image from "next/image";
import styled from "styled-components";

type AdminUserItemProps = {
  user: User;
  index: number;
};

const AdminUserItem = (props: AdminUserItemProps) => {
  // const { user_id, username, email, birth_date } = props.user;

  // return (
  //   <PanelListItem key={props.index}>
  //     <input
  //       type="checkbox"
  //       style={{
  //         padding: "1rem",
  //         marginRight: "1rem",
  //         width: "1.8rem",
  //       }}
  //     />
  //     <ShortSpan>{user_id}</ShortSpan>
  //     <ShortSpan>{username}</ShortSpan>
  //     <LongSpan>{email}</LongSpan>
  //     <MediumSpan>{birth_date}</MediumSpan>
  //     <ShortSpan>{session_id}</ShortSpan>
  //     <Image
  //       src="/images/admin/editIcon.png"
  //       width={16}
  //       height={16}
  //       alt="edit_icon"
  //       style={{ boxSizing: "content-box", padding: "1rem" }}
  //     />
  //     <Image
  //       src="/images/admin/deleteIcon.png"
  //       width={16}
  //       height={16}
  //       alt="delete_icon"
  //       style={{ boxSizing: "content-box", padding: "1rem" }}
  //     />
  //   </PanelListItem>
  // );
  return <div></div>;
};

export default AdminUserItem;

const PanelListItem = styled.li`
  font-size: 16px;
  font-weight: 400;
  width: 100%;
  display: flex;
  padding: 0.5rem 2rem;
  border-top: 1px solid #ddd;
  align-items: center;
`;

const IconWrapper = styled.div`
  cursor: pointer;

  &:hover {
    opacity: 0.5;
  }
`;
