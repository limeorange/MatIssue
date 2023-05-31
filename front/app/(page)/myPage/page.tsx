"use client";
import styled from "styled-components";
import Button from "../../components/UI/Button";

const MyPage = () => {
  return (
    <>
      <NavUl>
        <NavItem>프로필</NavItem>
        <NavItem>회원정보수정</NavItem>
        <NavItem>알림</NavItem>
      </NavUl>
      <Container>
        <Wrapper>
          <ProfileWrapper>
            <NotificationIcon
              src="/images/notification.png"
              alt="알림 아이콘"
            />
            <NotificationDot />

            <RoundImage>
              <ProfileImage src="/images/dongs-logo.png" alt="profile" />
            </RoundImage>
            <NickName>닉네임</NickName>
            <ModifyUserButton>회원정보수정</ModifyUserButton>
            <Divider />
            <MyRecipeIcon src="/images/recipe-icon.png" alt="레시피 아이콘" />
            <MyRecipeTitle>나의 레시피</MyRecipeTitle>
            <MyRecipeCount>5</MyRecipeCount>
            <UploadRecipe>레시피 올리기</UploadRecipe>
            <Button type="button" isBgColor={true}>
              레시피 올리기
            </Button>
          </ProfileWrapper>
          <RecipeListWrapper>
            <MyRecipeHeading>나의 레시피</MyRecipeHeading>
            <MyRecipeCount>5</MyRecipeCount>
            <RecipeList>
              <RecipeCard>
                <div>이미지</div>
                <div>이름</div>
                <span>tesates</span>
              </RecipeCard>
              <RecipeCard>
                <div>이미지</div>
                <div>이름</div>
                <span>tesates</span>
              </RecipeCard>
              <RecipeCard>
                <div>이미지</div>
                <div>이름</div>
                <span>tesates</span>
              </RecipeCard>
              <RecipeCard>
                <div>이미지</div>
                <div>이름</div>
                <span>tesates</span>
              </RecipeCard>
              <RecipeCard>
                <div>이미지</div>
                <div>이름</div>
                <span>tesates</span>
              </RecipeCard>
              <RecipeCard>
                <div>이미지</div>
                <div>이름</div>
                <span>tesates</span>
              </RecipeCard>
              <RecipeCard>
                <div>이미지</div>
                <div>이름</div>
                <span>tesates</span>
              </RecipeCard>
              <RecipeCard>
                <div>이미지</div>
                <div>이름</div>
                <span>tesates</span>
              </RecipeCard>
              <RecipeCard>
                <div>이미지</div>
                <div>이름</div>
                <span>tesates</span>
              </RecipeCard>
              <RecipeCard>
                <div>이미지</div>
                <div>이름</div>
                <span>tesates</span>
              </RecipeCard>
            </RecipeList>
          </RecipeListWrapper>
        </Wrapper>
      </Container>
    </>
  );
};

export default MyPage;

// 네비게이션 바

const Container = styled.div`
  width: 100%;
  max-width: 120rem;
  margin: 0 auto;
`;

const NavUl = styled.ul`
  display: flex;
  height: 6rem;
  justify-content: center;
  border-bottom: 0.1rem solid rgb(200, 200, 200);
  gap: 4.8rem;
`;

const NavItem = styled.li`
  display: flex;
  position: relative;
  box-sizing: content-box;
  align-items: center;
  border-bottom: 0.25rem solid #ffffff;
  padding: 1.3rem 1.3rem 0.9rem 1.3rem;
  font-size: 1.8rem;
  font-weight: 600;
  color: #4f3d21;
  &:hover {
    cursor: pointer;
    color: #f8b551;
    border-bottom: 0.35rem solid #f8b551;
    transition: all 0.2s ease-in-out;
  }
`;

// 플필 레시피 래퍼
const Wrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-top: 3rem;
`;

const ProfileWrapper = styled.div`
  position: relative;
  width: 27rem;
  height: 47.8rem;
  padding: 3rem 2.5rem 1.8rem;
  border: 0.1rem solid rgb(200, 200, 200);
  border-radius: 2.3rem;
  box-shadow: rgba(63, 71, 77, 0.06) 0px 0.2rem 0.4rem 0px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 4.5rem;
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

const NickName = styled.h2`
  font-size: 2.6rem;
  font-weight: 700;
  margin: 1rem;
  color: #4f3d21;
`;

const ModifyUserButton = styled.button`
  width: 9.6rem;
  height: 3rem;
  border: 0.2rem solid #fbd26a;
  border-radius: 1.5rem;
  color: #4f3d21;
  font-size: 1.23rem;
  font-weight: 500;
  &:hover {
    background-color : #fbd26a;
    transition: all 0.2s ease-in-out;
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: #ccc;
  margin: 2rem 0;
`;

const MyRecipeIcon = styled.img`
  width: 2.8rem;
  height: 2.8rem;
  align-items: center;
`;

const MyRecipeTitle = styled.h4`
  margin-top: 0.4rem;
  font-size: 1.5rem;
  font-weight: 500;
  color: #4f3d21;
`;

const MyRecipeCount = styled.h4`
  margin-top: 0.4rem;
  font-size: 1.7rem;
  font-weight: 700;
  color: #4f3d21;
`;

const UploadRecipe = styled.button`
  width: 12.8rem;
  height: 5.2rem;
  margin-top: 1.8rem;
  font-size: 1.6rem;
  font-weight: 700;
  border-radius: 1.5rem;
  background-color: #fbd26a;
  color: #4f3d21;
  &:hover {
    background-color : #F8B551;
    transition: all 0.2s ease-in-out;
`;

// 레시피
const RecipeListWrapper = styled.div`
  width: 100%;
`;

const MyRecipeHeading = styled.h2`
  font-size: 1.8rem;
`;

const RecipeList = styled.div`
  // 3개씩 보여주는 grid 코드
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 1.6rem;
`;

const RecipeCard = styled.div``;
