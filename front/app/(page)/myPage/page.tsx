"use client";
import Link from "next/link";
import styled from "styled-components";
import Button from "../../components/UI/Button";
import RecipeCards from "../../components/recipe-card/RecipeCard";
import { useState } from "react";

interface Recipe {
  image: string;
  title: string;
  author: string;
  likes: number;
  view: string;
  id: string;
  timestamp: number;
}

const DUMMY_DATA: Recipe[] = [
  {
    image: "/images/sushi1.png",
    title: "기가 막히는 초밥 만들기",
    author: "목동최고미남정훈",
    likes: 1234,
    view: "15,324",
    id: "ex1",
    timestamp: 1,
  },
  {
    image: "/images/sushi2.png",
    title: "혼자 알기 아까운 후토마끼 레시피",
    author: "킹갓제너럴팀장윤수",
    likes: 1112,
    view: "15,324",
    id: "ex2",
    timestamp: 2,
  },
  {
    image: "/images/sushi3.png",
    title: "전여자친구가 해주던 그 맛의 유부초밥",
    author: "영앤리치톨엔인텔리",
    likes: 1134,
    view: "15,324",
    id: "ex3",
    timestamp: 3,
  },
  {
    image: "/images/sushi4.png",
    title: "자취생을 위한 초간단 계란 초밥",
    author: "브라우니물어",
    likes: 1435,
    view: "15,324",
    id: "ex4",
    timestamp: 4,
  },
  {
    image: "/images/sushi1.png",
    title: "기가 막히는 초밥 만들기",
    author: "목동최고미남정훈",
    likes: 1144,
    view: "15,324",
    id: "ex1",
    timestamp: 5,
  },
  {
    image: "/images/sushi2.png",
    title: "혼자 알기 아까운 후토마끼 레시피",
    author: "킹갓제너럴팀장윤수",
    likes: 1518,
    view: "15,324",
    id: "ex2",
    timestamp: 6,
  },
  {
    image: "/images/sushi3.png",
    title: "전여자친구가 해주던 그 맛의 유부초밥",
    author: "영앤리치톨엔인텔리",
    likes: 2324,
    view: "15,324",
    id: "ex3",
    timestamp: 8,
  },
  {
    image: "/images/sushi4.png",
    title: "자취생을 위한 초간단 계란 초밥",
    author: "브라우니물어",
    likes: 3324,
    view: "15,324",
    id: "ex4",
    timestamp: 11,
  },
  {
    image: "/images/sushi1.png",
    title: "기가 막히는 초밥 만들기",
    author: "목동최고미남정훈",
    likes: 1888,
    view: "15,324",
    id: "ex1",
    timestamp: 9,
  },
  {
    image: "/images/sushi2.png",
    title: "혼자 알기 아까운 후토마끼 레시피",
    author: "킹갓제너럴팀장윤수",
    likes: 1999,
    view: "15,324",
    id: "ex2",
    timestamp: 10,
  },
  {
    image: "/images/sushi3.png",
    title: "전여자친구가 해주던 그 맛의 유부초밥",
    author: "영앤리치톨엔인텔리",
    likes: 4324,
    view: "15,324",
    id: "ex3",
    timestamp: 14,
  },
  {
    image: "/images/sushi4.png",
    title: "자취생을 위한 초간단 계란 초밥",
    author: "브라우니물어",
    likes: 1098,
    view: "15,324",
    id: "ex4",
    timestamp: 12,
  },
  {
    image: "/images/sushi1.png",
    title: "기가 막히는 초밥 만들기",
    author: "목동최고미남정훈",
    likes: 1987,
    view: "15,324",
    id: "ex1",
    timestamp: 13,
  },
  {
    image: "/images/sushi2.png",
    title: "혼자 알기 아까운 후토마끼 레시피",
    author: "킹갓제너럴팀장윤수",
    likes: 1324,
    view: "15,324",
    id: "ex2",
    timestamp: 16,
  },
  {
    image: "/images/sushi3.png",
    title: "전여자친구가 해주던 그 맛의 유부초밥",
    author: "영앤리치톨엔인텔리",
    likes: 1324,
    view: "15,324",
    id: "ex3",
    timestamp: 15,
  },
  {
    image: "/images/sushi4.png",
    title: "자취생을 위한 초간단 계란 초밥",
    author: "브라우니물어",
    likes: 1551,
    view: "15,324",
    id: "ex4",
    timestamp: 20,
  },
];

const MyPage = () => {
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>(DUMMY_DATA);
  return (
    <>
      <Container>
        <Wrapper>
          <ProfileContainer>
            <Link href="/myPage/notification">
              <NotificationIcon
                src="/images/notification.png"
                alt="알림 아이콘"
              />
              <NotificationDot />
            </Link>

            <RoundImage>
              <ProfileImage src="/images/dongs-logo.png" alt="profile" />
            </RoundImage>
            <NickName>닉네임</NickName>
            <Link href="/myPage/modifiyUserInfo">
              <ModifyUserButton>
                <Button
                  type="button"
                  isBorderColor={true}
                  fullWidth={true}
                  fullHeight={true}
                  isSmallFont={true}
                  isHoverColor={true}
                >
                  회원정보수정
                </Button>
              </ModifyUserButton>
            </Link>
            <Divider />
            <StyledLink href="/myPage">
              <MyRecipeIcon src="/images/recipe-icon.png" alt="레시피 아이콘" />
              <MyRecipeTitle>나의 레시피</MyRecipeTitle>
              <MyRecipeCount>5</MyRecipeCount>
            </StyledLink>

            <UploadRecipeButton>
              <Button
                type="button"
                isBgColor={true}
                fullWidth={true}
                isBorderColor={false}
                isHoverColor={false}
              >
                레시피 올리기
              </Button>
            </UploadRecipeButton>
          </ProfileContainer>
          <RecipeListContainer>
            <RecipeHeading>나의 레시피</RecipeHeading>
            <RecipeHeadingCount>5</RecipeHeadingCount>

            <RecipeList>
              {filteredRecipes.map((data, index) => (
                <RecipeCards key={index} data={data} />
              ))}
            </RecipeList>
          </RecipeListContainer>
        </Wrapper>
      </Container>
    </>
  );
};

export default MyPage;

const Container = styled.div`
  width: 100%;
  max-width: 120rem;
  margin: 0 auto;
`;

// 프로필 카드

const Wrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  padding-top: 5rem;
`;

const ProfileContainer = styled.div`
  position: relative;
  width: 38rem;
  height: 47.8rem;
  padding: 3rem 2.5rem 1.8rem;
  border: 0.1rem solid rgb(200, 200, 200);
  border-radius: 2.3rem;
  box-shadow: rgba(63, 71, 77, 0.06) 0px 0.2rem 0.4rem 0px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 5rem 0 2.5rem;
`;

const NotificationIcon = styled.img`
  position: absolute;
  top: 2rem;
  right: 2.1rem;
  width: 1.95rem;
  height: 2.2rem;
  color: #4f3d21;
`;

const NotificationDot = styled.div`
  position: absolute;
  top: 2.265rem;
  right: 2.265rem;
  width: 0.5rem;
  height: 0.5rem;
  background-color: #fe642e;
  border-radius: 50%;
`;

const RoundImage = styled.div`
  width: 12rem;
  height: 12rem;
  border-radius: 50%;
  overflow: hidden;
  border: 0.1rem solid rgb(200, 200, 200);
`;

const ProfileImage = styled.img`
  width: 100%
  height: 100%
  object-fit: cover;
`;

const NickName = styled.h1`
  font-size: 26px;
  font-weight: 700;
  margin: 1rem;
  color: #4f3d21;
`;

const ModifyUserButton = styled.button`
  width: 10rem;
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: #ccc;
  margin: 2rem 0;
`;

const StyledLink = styled.a`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MyRecipeIcon = styled.img`
  width: 2.8rem;
  height: 2.8rem;
`;

const MyRecipeTitle = styled.h4`
  margin-top: 0.4rem;
  font-size: 15px;
  font-weight: 500;
  color: #4f3d21;
`;

const MyRecipeCount = styled.h4`
  margin-top: 0.4rem;
  font-size: 17px;
  font-weight: 700;
  color: #4f3d21;
`;

const UploadRecipeButton = styled.div`
  margin-top: 1.8rem;
  width: 14rem;
`;

// 레시피 리스트

const RecipeListContainer = styled.div`
  width: 100%;
`;

const RecipeHeading = styled.span`
  font-size: 18px;
  letter-spacing: 0.01em;
  margin: 0 0.5rem 0 0.7rem;
  font-weight: 600;
  color: #4f3d21;
`;

const RecipeHeadingCount = styled.span`
  font-size: 17px;
  font-weight: 700;
  color: #545454;
`;

const RecipeList = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 1.6rem;
  margin-top: 1.5rem;
`;
