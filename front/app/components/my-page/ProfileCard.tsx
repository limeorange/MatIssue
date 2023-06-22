"use client";

import styled from "styled-components";
import Button from "../../components/UI/Button";
import { Recipe, User } from "@/app/types";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { getRecipeByCurrentId } from "@/app/api/recipe";
import getCurrentUser from "@/app/api/user";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useRecoilValue } from "recoil";
import darkModeAtom from "@/app/store/darkModeAtom";

type MemoItemProps = {
  created_at: string;
  recipe_id: string;
  recipe_like: number;
  recipe_thumbnail: string;
  recipe_title: string;
  recipe_view: number;
  user_id: string;
  user_nickname: string;
};

type ScrapItemProps = {
  scrapData: MemoItemProps;
  memo: string;
  user_id: string;
};

const ProfileCard = () => {
  // 캐시에 저장된 현재 유저정보를 가져옴
  const { data: currentUser } = useQuery<User>(["currentUser"], () =>
    getCurrentUser()
  );

  // 캐시에 저장된 현재 유저가 작성한 레시피들을 가져옴
  const { data: currentUserRecipes } = useQuery<Recipe[]>(
    ["currentUserRecipes"],
    () => getRecipeByCurrentId()
  );

  const [parsedMemo, setParsedMemo] = useState<ScrapItemProps[]>([]);
  const isDarkMode = useRecoilValue(darkModeAtom);

  const router = useRouter();

  // 나의 스크랩 개수 추출을 위한 parsedMemo 정의
  useEffect(() => {
    if (typeof window !== "undefined") {
      const existingMemo = localStorage.getItem("scrapMemo");
      const parsedMemo = existingMemo ? JSON.parse(existingMemo) : [];
      const currentUserMemo = parsedMemo.filter(
        (item: ScrapItemProps) => item.user_id === currentUser?.user_id
      );
      setParsedMemo(currentUserMemo);
    }
  }, []);

  return (
    <ProfileContainer isDarkMode={isDarkMode}>
      <ProfileWrapper>
        <LinkBtn
          onClick={() => {
            router.push("/my-page/notification");
          }}
        ></LinkBtn>

        <ProfileBox>
          <ImageAndNickNameWrapper>
            <RoundImage>
              <Image
                src={currentUser?.img || "/images/dongs-logo.png"}
                height={120}
                width={120}
                style={{ objectFit: "cover" }}
                alt="profile-image"
              />
            </RoundImage>
            <NickName>{currentUser?.username}</NickName>
          </ImageAndNickNameWrapper>
          <ProfileContentsBox>
            <FollowAndFollowingWrapper>
              <FollowerAndCountBox>
                <Follower>팔로워</Follower>
                <FollowerCount>{currentUser?.fans.length}</FollowerCount>
              </FollowerAndCountBox>
              <FollowDivider isDarkMode={isDarkMode} />
              <FollowingAndCountBox>
                <Following>팔로잉</Following>
                <FollowingCount>
                  {currentUser?.subscriptions.length}
                </FollowingCount>
              </FollowingAndCountBox>
            </FollowAndFollowingWrapper>

            <LinkBtn
              onClick={() => {
                router.push("/my-page/modify-user-info");
              }}
            >
              <ModifyUserButtonWrapper>
                <Button
                  isBorderColor={true}
                  fullWidth={true}
                  fullHeight={true}
                  isMediumFont={true}
                  isHoverColor={true}
                >
                  회원정보수정
                </Button>
              </ModifyUserButtonWrapper>
            </LinkBtn>
            <Divider />

            {/* 나의 레시피 버튼 */}
            <RecipeAndScrapIconWrapper>
              <LinkBtn
                onClick={() => {
                  router.push("/my-page");
                }}
              >
                <RecipeAndScrapIcon
                  src={
                    isDarkMode
                      ? "/images/dark_mode_myrecipe.svg"
                      : "/images/my-page/my_recipe.svg"
                  }
                  alt="레시피 아이콘"
                />
                <RecipeAndScrapTitle>My 레시피</RecipeAndScrapTitle>
                <RecipeAndScrapCount>
                  {currentUserRecipes?.length}
                </RecipeAndScrapCount>
              </LinkBtn>

              {/* 나의 스크랩 버튼 */}
              <LinkBtn
                onClick={() => {
                  router.push("/my-page/scrap");
                }}
              >
                <RecipeAndScrapIcon
                  src={
                    isDarkMode
                      ? "/images/dark_mode_myscrap.svg"
                      : "/images/recipe-view/scrap_full.svg"
                  }
                  alt="스크랩 아이콘"
                />
                <RecipeAndScrapTitle>My 스크랩</RecipeAndScrapTitle>
                <RecipeAndScrapCount>{parsedMemo.length}</RecipeAndScrapCount>
              </LinkBtn>
            </RecipeAndScrapIconWrapper>
          </ProfileContentsBox>
        </ProfileBox>

        <LinkBtn
          onClick={() => {
            router.push("/add-recipe");
          }}
        >
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
        </LinkBtn>
      </ProfileWrapper>
    </ProfileContainer>
  );
};

export default ProfileCard;

const ProfileContainer = styled.div<{ isDarkMode: boolean }>`
  height: 23.7rem;
  border-bottom: 0.1rem solid rgb(200, 200, 200);
  @media (min-width: 1024px) {
    border: 0.1rem solid rgb(200, 200, 200);
    border-radius: 2.3rem;
    box-shadow: rgba(63, 71, 77, 0.06) 0px 0.2rem 0.4rem 0px;
    border-radius: 2.3rem;
    height: 49.5rem;
    margin-right: 4rem;
    margin-top: 4.1rem;
    background-color: ${(props) =>
      props.isDarkMode ? "rgba(255, 255, 255, 0.1)" : "#fff"};
  }
`;

const ProfileWrapper = styled.div`
  width: 100%;
  padding: 2.9rem 0 1.5rem;
  @media (min-width: 1024px) {
    position: relative;
    padding: 3rem 2.5rem 1.8rem;
    width: 26.8rem;
    height: 47.8rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    
`;

const LinkBtn = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  flex-direction: column;
`;

const ProfileBox = styled.div`
  display: flex;
  gap: 2.5rem;
  justify-content: center;
  align-items: end;
  margin-bottom: 0.5rem;
  @media (min-width: 1024px) {
    flex-direction: column;
    align-items: center;
    gap: 0;
    margin-bottom: 0;
  }
`;

const ImageAndNickNameWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 0.5rem;
  @media (min-width: 1024px) {
    gap: 0;
  }
`;

const RoundImage = styled.div`
  display: flex;
  width: 8.7rem;
  height: 8.7rem;
  border-radius: 50%;
  overflow: hidden;
  @media (min-width: 1024px) {
    width: 12rem;
    height: 12rem;
  }
`;

const NickName = styled.h5`
  font-size: 17px;
  font-weight: 600;
  margin-bottom: 2rem;
  @media (min-width: 1024px) {
    font-size: 26px;
    margin: 1rem;
  }
`;

const ProfileContentsBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
  @media (min-width: 1024px) {
    align-items: center;
  }
`;

const FollowAndFollowingWrapper = styled.div`
  display: flex;
  padding: 0 0.5rem 0.5rem;
  margin-bottom: 0.8rem;
`;

const FollowerAndCountBox = styled.div`
  display: flex;
  gap: 0.4rem;
`;

const Follower = styled.h2`
  font-size: 14px;
  font-weight: 550;
`;

const FollowerCount = styled.h3`
  font-size: 14px;
  font-weight: 500;
`;

const FollowDivider = styled.div<{ isDarkMode: boolean }>`
  border-left: 1px solid ${(props) => (props.isDarkMode ? "#fff" : "#4F3D21")};
  height: 2.5em;
  display: inline-block;
  margin: 0.2rem 0.8rem 0;
`;

const FollowingAndCountBox = styled.div`
  display: flex;
  gap: 0.4rem;
`;

const Following = styled.h2`
  font-size: 14px;
  font-weight: 550;
`;

const FollowingCount = styled.h3`
  font-size: 14px;
  font-weight: 500;
`;

const ModifyUserButtonWrapper = styled.div`
  display: none;
  @media (min-width: 1024px) {
    display: flex;
    width: 12rem;
  }
`;

const Divider = styled.div`
  @media (min-width: 1024px) {
    display: flex;
    width: 20rem;
    height: 1px;
    background-color: #ccc;
    margin: 2rem 0;
  }

  @media (max-width: 1023px) {
    display: none;
  }
`;

const RecipeAndScrapIconWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 1.8rem;
  margin-bottom: 2rem;
  @media (min-width: 1024px) {
    margin: 0;
  }
`;

const RecipeAndScrapIcon = styled.img`
  width: 2.8rem;
  height: 2.8rem;
`;

const RecipeAndScrapTitle = styled.h2`
  font-size: 13px;
  font-weight: 550;
`;

const RecipeAndScrapCount = styled.h3`
  font-size: 15px;
  font-weight: 500;
  @media (min-width: 1024px) {
    font-size: 18px;
    font-weight: 600;
  }
`;

const UploadRecipeButton = styled.div`
  width: 100%;
  @media (min-width: 1024px) {
    margin-top: 1.8rem;
    width: 14rem;
  }
`;
