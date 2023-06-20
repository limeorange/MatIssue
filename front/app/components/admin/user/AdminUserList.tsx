"use client";

import Image from "next/image";
import styled from "styled-components";
import AdminPagination from "../AdminPagenation";
import { useEffect, useState } from "react";
import { User } from "@/app/types";
import AdminUserItem from "./AdminUserItem";

const AdminUserList = ({ users }: { users: User[] }) => {
  const limit = 10;
  const [page, setPage] = useState<number>(1);
  const offset = (page - 1) * limit;

  useEffect(() => {
    setPage(1);
  }, []);

  return (
    <>
      <PanelList>
        <PanelListHeader>
          <ShortSpan>아이디</ShortSpan>
          <ShortSpan>닉네임</ShortSpan>
          <LongSpan>이메일</LongSpan>
          <MediumSpan>생년월일</MediumSpan>
          <MediumSpan>생성일</MediumSpan>
        </PanelListHeader>
        {users.slice(offset, offset + limit).map((item: User) => (
          <AdminUserItem key={item.user_id} user={item} />
        ))}
      </PanelList>
      <PagenationContainer>
        <PagenationBox>
          <AdminPagination
            total={users.length}
            limit={limit}
            page={page}
            setPage={setPage}
          />
        </PagenationBox>
      </PagenationContainer>
    </>
  );
};

const PanelList = styled.ul`
  width: 100rem;
  display: flex;
  flex-direction: column;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 0.5rem;
  margin-left: 3rem;
`;

const PanelListHeader = styled.li`
  width: 100%;
  display: flex;
  padding: 0.5rem 2rem;
  background-color: #fbe2a1;
`;

const ShortSpan = styled.span`
  padding: 0.8rem 1.2rem;
  width: 13rem;
`;

const MediumSpan = styled.span`
  padding: 0.8rem 1.2rem;
  width: 18rem;
`;

const LongSpan = styled.span`
  padding: 0.8rem 1.2rem;
  width: 25rem;
`;

const PagenationContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const PagenationBox = styled.div`
  font-size: 16px;
`;

export default AdminUserList;
