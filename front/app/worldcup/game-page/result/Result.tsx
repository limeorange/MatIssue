"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Image from "next/image";
import { getRecipeById } from "@/app/api/recipe";
import Logo from "@/app/components/header/Logo";
import { useSearchParams } from "next/navigation";
import Button from "@/app/components/UI/Button";
import LoadingModal from "@/app/components/UI/LoadingModal";
import { toast } from "react-hot-toast";
import Link from "next/link";
import WorldcupKakaoShareButton from "@/app/utils/worldcupKakaoShare";

type StyledComponentProps = {
  isAnimateOut?: boolean;
};

type Recipe = {
  recipe_id: string;
  recipe_title: string;
  recipe_thumbnail: string;
};

const ResultPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams?.get("winnerId");

  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [animation, setAnimation] = useState("opacity-0");

  // Url 복사하는 함수
  const copyToClipboard = async () => {
    const currentPageUrl = window.location.href;
    try {
      await navigator.clipboard.writeText(currentPageUrl);
      toast.success("Url이 복사 되었습니다!");
    } catch (err: any) {
      toast.error("Url 복사에 실패했습니다.", err);
    }
  };

  useEffect(() => {
    setAnimation("opacity-1");
  }, []);

  useEffect(() => {
    if (id) {
      getRecipeById(id)
        .then((data) => {
          setRecipe(data);
        })
        .catch((err) => console.error(err));
    }
  }, [id]);

  if (!recipe) {
    return <LoadingModal />;
  }

  return (
    <>
      <WorldcupLayout className={animation}>
        <Logo />
        <GameHeader>레시피 이상형 월드컵!</GameHeader>
        <GameProgress>
          우승 레시피입니다! <br /> 클릭시 해당 레시피로 이동!
        </GameProgress>
        <WorldcupCard>
          <Link href={`/recipe/${recipe.recipe_id}`} passHref>
            <CardLink>
              <RecipeTitleBox>{recipe.recipe_title}</RecipeTitleBox>
              <ImageWrapper>
                <ImageContainer>
                  <Image
                    src={recipe.recipe_thumbnail}
                    alt={recipe.recipe_title}
                    layout="fill"
                    objectFit="cover"
                    style={{ borderRadius: "1.5rem" }}
                  />
                </ImageContainer>
              </ImageWrapper>
            </CardLink>
          </Link>
          <ShareText>테스트 공유하기</ShareText>
          <ShareButtonBox>
            <div onClick={copyToClipboard}>
              <Image
                src="/images/link.png"
                alt="링크 공유 아이콘"
                width={60}
                height={50}
              />
            </div>
            <WorldcupKakaoShareButton />
          </ShareButtonBox>
        </WorldcupCard>
        <RestartButtonBox>
          <Button
            onClick={() => {
              router.push("/worldcup");
            }}
          >
            <Image
              src="/images/reload.png"
              alt="뒤로가기 아이콘"
              width={30}
              height={30}
            />
            월드컵 다시하기
          </Button>
        </RestartButtonBox>
      </WorldcupLayout>
    </>
  );
};

export default ResultPage;

const WorldcupLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: auto;
  width: 100%;
  max-width: 50rem;
  heigth: 100vh;
  padding: 1.5rem;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);

  opacity: 0;
  transition: opacity 1s;
  &.opacity-1 {
    opacity: 1;
  }
`;

const GameHeader = styled.p<StyledComponentProps>`
  font-size: 60px;
  color: #fbd26a;
  font-family: "Dongle-Bold";
  margin-bottom: -3rem;

  & span {
    font-size: 40px;
  }

  @media (min-width: 1024px) {
    font-size: 80px;
  }
`;

const GameProgress = styled.div`
  font-size: 35px;
  color: #4f3d21;
  margin-bottom: 1rem;
  margin-top: 2rem;
  font-family: "Dongle-Bold";
  transform-origin: center;
  transition: all 0.5s ease;
  opacity: 1;
  text-align: center;

  &.grow {
    transform: scale(0.1);
    opacity: 0;
  }
  &.normal {
    transform: scale(1);
    opacity: 1;
  }
  &.shrink {
    transform: scale(0.1);
    opacity: 0;
  }

  @media (min-width: 1024px) {
    font-size: 50px;
    margin-top: 0;
  }
`;

const RecipeTitleBox = styled.div`
  font-size: 30px;
  color: #4f3d21;
  white-space: pre-line;
  text-align: center;
  transform-origin: center;
  transition: all 0.3s ease;
  opacity: 1;
`;

const WorldcupCard = styled.div`
  font-family: "Dongle-Bold";
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 3rem auto;
  border-radius: 1.5rem;
  width: 100%;
  max-width: 40rem;
  height: 100%;
  max-height: 100%;
  padding: 1.5rem 0rem;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
`;

const CardLink = styled.div`
  transition: transform 0.3s ease;
  &:hover {
    transform: translateY(-5px);
  }
`;

const ImageWrapper = styled.div`
  width: 32.5rem;
  height: 32.5rem;
  overflow: hidden;
  box-shadow: 0 0 0.3rem rgba(0, 0, 0, 0.3);
  border-radius: 1.5rem;
  position: relative;
  transition: transform 0.3s ease;
  cursor: pointer;
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  transition: opacity 0.3s ease;
  opacity: 1;
`;

const ShareText = styled.p`
  font-family: "Dongle-Bold";
  font-size: 30px;
  margin-top: 2rem;
  color: #5c8984;
`;

const ShareButtonBox = styled.div`
  width: 100%;
  max-width: 20rem;
  gap: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem 2rem 2rem 2rem;

  & div {
    cursor: pointer;
    border-radius: 100%;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-3px);
    }
  }
`;

const RestartButtonBox = styled.div`
  width: 100%;
  max-width: 20rem;
  gap: 1rem;
  display: flex;

  & Button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    margin-bottom: 1.5rem;
    height: 5rem;
    font-size: 15px;
    background-color: #fbd26a;
    text-align: center;
    gap: 0.5rem;

    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-3px);
    }
  }
`;
