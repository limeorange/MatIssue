"use client";

import Image from "next/image";
import styled from "styled-components";
import AdminPagination from "./AdminPagenation";
import { useEffect, useState } from "react";

const AmdinRecipeList = ({ RECIPE_DATA }: { RECIPE_DATA: Recipe[] }) => {
  const limit = 12;
  const [page, setPage] = useState<number>(1);
  const offset = (page - 1) * limit;

  useEffect(() => {
    setPage(1);
  }, []);

  return (
    <>
      <PanelList>
        <PanelListHeader>
          <input
            type="checkbox"
            style={{
              padding: "1rem",
              marginRight: "1rem",
              width: "1.8rem",
            }}
          />
          <ShortSpan>글번호</ShortSpan>
          <LongSpan>제목</LongSpan>
          <ShortSpan>작성자</ShortSpan>
          <MediumSpan>작성일</MediumSpan>
          <ShortSpan>권한</ShortSpan>
        </PanelListHeader>
        {RECIPE_DATA?.slice(offset, offset + limit).map((user, index) => {
          return (
            <PanelListItem key={index}>
              <input
                type="checkbox"
                style={{
                  padding: "1rem",
                  marginRight: "1rem",
                  width: "1.8rem",
                }}
              />
              <ShortSpan>{user.user_id}</ShortSpan>
              <LongSpan>{user.username}</LongSpan>
              <ShortSpan>{user.email}</ShortSpan>
              <MediumSpan>2023-04-03</MediumSpan>
              <ShortSpan>{user.authority}</ShortSpan>
              <Image
                src="/images/admin/editIcon.png"
                width={16}
                height={16}
                alt="edit_icon"
                style={{ boxSizing: "content-box", padding: "1rem" }}
              />
              <Image
                src="/images/admin/deleteIcon.png"
                width={16}
                height={16}
                alt="delete_icon"
                style={{ boxSizing: "content-box", padding: "1rem" }}
              />
            </PanelListItem>
          );
        })}
      </PanelList>
      <PagenationContainer>
        <PagenationBox>
          <AdminPagination
            total={RECIPE_DATA?.length}
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
  width: 100%;
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

const PanelListItem = styled.li`
  font-size: 16px;
  font-weight: 400;
  width: 100%;
  display: flex;
  padding: 0.5rem 2rem;
  border-top: 1px solid #ddd;
  align-items: center;
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

export default AmdinRecipeList;
