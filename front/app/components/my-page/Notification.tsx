import React, { useState, useEffect } from "react";
import Link from "next/link";
import axiosBase from "axios";
import styled from "styled-components";
import Image from "next/image";

interface NotificationData {
  id?: number;
  userImage?: string;
  title?: string;
  message?: string;
  link?: string;
  time?: string | number;
}

const Notifications = () => {
  const [notifications, setNotifications] = useState<NotificationData[]>([
    {
      id: 1,
      userImage: "https://picsum.photos/200/300",
      title: "레시피 이름",
      message: " 아이좋아님이 회원님의 레시피를 좋아합니다.",
      link: "/page1",
      time: "(화) 오전 10:07",
    },
    {
      id: 2,
      userImage: "https://picsum.photos/200/300",
      title: "레시피 이름",
      message: " 아이좋아님이 회원님의 레시피를 좋아합니다.",
      link: "/page2",
      time: "(화) 오전 10:07",
    },
    {
      id: 3,
      userImage: "https://picsum.photos/200/300",
      title: "레시피 이름",
      message: " 아이좋아님이 회원님의 레시피를 좋아합니다.",
      link: "/page3",
      time: "(화) 오전 10:07",
    },
    {
      id: 4,
      userImage: "https://picsum.photos/200/300",
      title: "레시피 이름",
      message:
        " 최고다님이 회원님의 레시피에 댓글을 남겼습니다: “따라하기 쉬워요”",
      link: "/page1",
      time: "(화) 오전 10:07",
    },
    {
      id: 5,
      userImage: "https://picsum.photos/200/300",
      title: "레시피 이름",
      message:
        " 최고다님이 회원님의 레시피에 댓글을 남겼습니다: “따라하기 쉬워요”",
      link: "/page2",
      time: "(화) 오전 10:07",
    },
    {
      id: 6,
      userImage: "https://picsum.photos/200/300",
      title: "레시피 이름",
      message:
        " 최고다님이 회원님의 레시피에 댓글을 남겼습니다: “최고의 레시피”",
      link: "/page3",
      time: "(화) 오전 10:07",
    },
  ]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const data = { username: "myusername", password: "mypassword" }; // 실제로 전송하고자 하는 데이터를 이곳에 입력합니다.
        const response = await axiosBase.post<NotificationData[]>(
          `users/me`,
          data
        );
        setNotifications(response.data);
      } catch (error) {
        console.error("Failed to fetch notifications:", error);
      }
    };

    fetchNotifications();
  }, []);

  return (
    <NotificationContainer>
      <NotificationHeading>알림</NotificationHeading>
      <NotificationHeadingCount>
        {notifications.length}
      </NotificationHeadingCount>

      {notifications.map((notification) => (
        <NotificationItem href={notification.link} key={notification.id}>
          <RoundImage>
            <ProfileImage
              src={notification.userImage as string}
              alt={notification.title}
            />
          </RoundImage>
          <NotificationTextWrapper>
            <RecipeTitle>{notification.title}</RecipeTitle>
            <NotificationMessage>{notification.message}</NotificationMessage>
          </NotificationTextWrapper>
          <NotificationDate>{notification.time}</NotificationDate>
        </NotificationItem>
      ))}
    </NotificationContainer>
  );
};

export default Notifications;

const NotificationContainer = styled.div`
  width: 66.8rem;
  height: 100%;
`;

const NotificationHeading = styled.span`
  font-size: 18px;
  letter-spacing: 0.01em;
  margin: 0 0.5rem 0 0.7rem;
  font-weight: 600;
  color: #4f3d21;
`;

const NotificationHeadingCount = styled.span`
  font-size: 17px;
  font-weight: 700;
  color: #545454;
`;

const NotificationItem = styled.a`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 59.9rem;
  height: 5.3rem;
  border-radius: 1rem;
  background-color: #ffffff;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
    rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
  margin: 1.5rem 0 0 0;
  padding: 0.5rem 1rem 0.5rem 1rem;
  cursor: pointer;
  transition: all 0.15s ease-in-out;
  &:hover {
    transform: scale(1.03);
    box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.2);
  }
`;

const RoundImage = styled.div`
  flex-shrink: 0;
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 1rem;
`;

const ProfileImage = styled.img`
width: 100%
  height: 100%
  object-fit: cover;
  background-color: #fff9ea;
`;

const NotificationTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const RecipeTitle = styled.span`
  font-size: 12px;
  font-weight: 400;
  color: #00000;
`;

const NotificationMessage = styled.span`
  font-size: 16px;
  font-weight: 500;
  color: #00000;
`;

const NotificationDate = styled.span`
  position: absolute;
  top: 0.6rem;
  right: 1.4rem;
  font-size: 12px;
  font-weight: 400;
  color: #545454;
  z-index: 50;
`;
