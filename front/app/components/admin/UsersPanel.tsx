"use client";

import Image from "next/image";
import styled from "styled-components";

type UserData = {
  user_id: string;
  username: string;
  email: string;
  birthdate: string;
  authority: string;
  state: string;
};

const DUMMY_DATA: UserData[] = [
  {
    user_id: "shagrat",
    username: "ynnsuis",
    email: "shagrat@naver.com",
    birthdate: "2000-01-01",
    authority: "admin",
    state: "활동가능",
  },
  {
    user_id: "shagrat",
    username: "ynnsuis",
    email: "shagrat@naver.com",
    birthdate: "2000-01-01",
    authority: "admin",
    state: "활동가능",
  },
  {
    user_id: "shagrat",
    username: "ynnsuis",
    email: "shagrat@naver.com",
    birthdate: "2000-01-01",
    authority: "admin",
    state: "활동가능",
  },
  {
    user_id: "shagrat",
    username: "ynnsuis",
    email: "shagrat@naver.com",
    birthdate: "2000-01-01",
    authority: "admin",
    state: "활동가능",
  },
  {
    user_id: "shagrat",
    username: "ynnsuis",
    email: "shagrat@naver.com",
    birthdate: "2000-01-01",
    authority: "admin",
    state: "활동가능",
  },
  {
    user_id: "shagrat",
    username: "ynnsuis",
    email: "shagrat@naver.com",
    birthdate: "2000-01-01",
    authority: "admin",
    state: "활동가능",
  },
  {
    user_id: "shagrat",
    username: "ynnsuis",
    email: "shagrat@naver.com",
    birthdate: "2000-01-01",
    authority: "admin",
    state: "활동가능",
  },
  {
    user_id: "shagrat",
    username: "ynnsuis",
    email: "shagrat@naver.com",
    birthdate: "2000-01-01",
    authority: "admin",
    state: "활동가능",
  },
  {
    user_id: "shagrat",
    username: "ynnsuis",
    email: "shagrat@naver.com",
    birthdate: "2000-01-01",
    authority: "admin",
    state: "활동가능",
  },
  {
    user_id: "shagrat",
    username: "ynnsuis",
    email: "shagrat@naver.com",
    birthdate: "2000-01-01",
    authority: "admin",
    state: "활동가능",
  },
];

const Userthel = () => {
  return (
    <PanelContainer>
      <PanelTitle>
        <h1>유저</h1>
      </PanelTitle>
      <PanelList>
        <PanelHeader>
          <input
            type="checkbox"
            style={{ padding: "1rem", marginRight: "1rem", width: "1.8rem" }}
          />
          <ShortSpan>아이디</ShortSpan>
          <ShortSpan>닉네임</ShortSpan>
          <LongSpan>이메일</LongSpan>
          <MediumSpan>생성일</MediumSpan>
          <ShortSpan>권한</ShortSpan>
        </PanelHeader>
        {DUMMY_DATA.map((user, index) => {
          return (
            <PanelItem key={index}>
              <input
                type="checkbox"
                style={{
                  padding: "1rem",
                  marginRight: "1rem",
                  width: "1.8rem",
                }}
              />
              <ShortSpan>{user.user_id}</ShortSpan>
              <ShortSpan>{user.username}</ShortSpan>
              <LongSpan>{user.email}</LongSpan>
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
            </PanelItem>
          );
        })}
      </PanelList>
    </PanelContainer>
  );
};

export default Userthel;

const PanelContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const PanelTitle = styled.div`
  font-size: 20px;
`;

const PanelList = styled.ul`
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: white;
  width: 100%;
  border: 1px solid #ddd;
  border-radius: 0.5rem;
`;

const PanelHeader = styled.li`
  width: 100%;
  display: flex;
  padding: 0.5rem 2rem;
  border-bottom: 1px solid #ddd;
  background-color: #fbe2a1;
`;

const PanelItem = styled.li`
  font-size: 16px;
  font-weight: 400;
  width: 100%;
  display: flex;
  padding: 0.5rem 2rem;
  border-bottom: 1px solid #ddd;
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
