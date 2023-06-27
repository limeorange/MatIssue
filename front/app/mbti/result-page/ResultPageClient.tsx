"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { MBTIState } from "@/app/store/mbtiAtom";
import { useRecoilState } from "recoil";
import Image from "next/image";
import Button from "@/app/components/UI/Button";
import Logo from "@/app/components/header/Logo";
import KakaoShareButton from "@/app/utils/kakaoShare";
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  LineShareButton,
  LineIcon,
  EmailShareButton,
  EmailIcon,
} from "react-share";
import { toast } from "react-hot-toast";
import { Recipe } from "@/app/types";
import styled from "styled-components";
import darkModeAtom from "@/app/store/darkModeAtom";

type ResultData = {
  [key: string]: {
    per: string;
    rank: string;
    talk: string[];
    text: string;
    text2: string;
    img: string;
    food: string;
  };
};

type CompatibilityData = {
  [key: string]: {
    compatible: string;
    incompatible: string;
  };
};

// MBTI 데이터
const resultData: ResultData = {
  ENTJ: {
    per: "2.73%",
    rank: "16",
    talk: [
      "- 이상을 현실화시키는 하면 된다!는 마인드가 강해요.\n자신의 재능과 가능성을 믿죠.\n- 리더십이 있어 모든 일을 카리스마 있게 주도적으로 해요.\n- 다이어트한다 하면 그날 바로 운동 끊고,\n식단 짜는 우주 최강 실행력!\n- 겉모습만 보면 무뚝뚝해보이지만 실제론 속도 깊고\n알찬 영양가 있는 성격이에요.",
    ],
    text: "- 타인의 감정을 생각하지 않고,\n직설적으로 말할 때가 있어요.",
    text2: "변화를 추구하는 오마카세 스시",
    img: "/images/mbti/ENTJ.png",
    food: "초밥",
  },
  ESTJ: {
    per: "4.56%",
    rank: "11",
    talk: [
      "- 어딜 가든 일 잘한다고 인정 받고,\n논리정연하게 말도 잘해요.\n- 자기 객관화가 잘 되어 있어 본인에 대해 잘 알아요.\n- 계획 없이 이루어지는 건 없어요.\n본인이 짠 계획을 추진하는 능력이 있어요.\n- 맺고 끊는 게 확실해요.\n어떤 일을 시작하면 깔끔하게 끝맺음을 잘해요.",
    ],
    text: "- 원리원칙에 근거해 사고하다 보니\n융통성이 부족할 때가 가끔 있어요.",
    text2: "실용적이고 간편하게 먹을 수 있는 샌드위치",
    img: "/images/mbti/ESTJ.png",
    food: "샌드위치",
  },
  ENTP: {
    per: "5.04%",
    rank: "10",
    talk: [
      "- 당당하고 자존감이 높아 어딜 가든 주목 받는 성격이에요.\n- 언어의 연금술사! 재치있는 언변 능력을 가졌어요.\n토론을 매우 좋아하는 편!\n- 다재다능하고 뭐든 하면 곧 잘하는 습득력이 있어요.\n- 사고가 유연해 생각의 전환이 빨라요.\n독창적인 아이디어를 많이 내는 편이에요.",
    ],
    text: "- 어떤 일을 마무리 짓기 전에 다른 관심사가 생겨\n매듭 짓지 못할 때가 많아요.",
    text2: "빈틈 없이 다채로운 맛의 타코",
    img: "/images/mbti/ENTP.png",
    food: "타코",
  },
  ESTP: {
    per: "2.94%",
    rank: "15",
    talk: [
      "- 센터는 나의 것! 어딜가나 존재감 확실해요.\n- 눈치도 빠르고 사회생활 잘해요.\n남들 앞에서 말하는 거 어렵지 않아요.\n- 겉과 속이 같아요. 행동, 표정, 말투가 속마음 그 자체!\n솔직하고 쿨해요.\n- 항상 높은 텐션으로 주변 사람들의 에너지를 북돋아줘요.",
    ],
    text: "- 때론 자존심을 굽히지 않고,\n자기 고집대로 밀고 나갈 때가 있어요.",
    text2: "어디서나 존재감 확실한 고수",
    img: "/images/mbti/ESTP.png",
    food: "고수",
  },
  ENFJ: {
    per: "6.09%",
    rank: "9",
    talk: [
      "- 인류애가 넘쳐요. 그럴 수 있지 라는 말로\n모두를 이해하고공감해 보려고 해요.\n- 지인들 챙겨주는 거 너무 너무 좋아하고,\n진심을 담아서 챙겨요.\n- 믓찐 사람이 되고 싶어요. 카리스마 넘치고 자기 길을 멋지게\n개척해나가는 사람들! 동경해요.\n- 오늘 할 일 쭉 생각해두고 메모장에 정리해놔야\n마음이 편해져요.",
    ],
    text: "- 기분이 안좋아도 좋다고 말할 때가 있어요.\n이럴 땐 감정에 솔직하지 못해서 속상해요.",
    text2: "다양한 재료가 조화롭게 어우러진 비빔밥",
    img: "/images/mbti/ENFJ.png",
    food: "비빔밥",
  },
  ESFJ: {
    per: "8.35%",
    rank: "3",
    talk: [
      "- 친절과 배려의 아이콘! 몸에 베인 양보로\n늘 상대방을 먼저 생각해요.\n- 내가 손해보더라도 상대방이 나로 인해 행복하면\n그걸로 됐어요.\n- 고민상담 기깔나게 잘 들어주고 공감도 잘해줘요.\n- 누구와도 잘 지내는 사교적인 성격이에요.",
    ],
    text: "- 항상 남들을 먼저 생각하다보니 그만큼 눈치도 많이 봐요.",
    text2: "언제나 친근한 맛의 파스타",
    img: "/images/mbti/ESFJ.png",
    food: "파스타",
  },
  ENFP: {
    per: "12.60%",
    rank: "2",
    talk: [
      "- 낙천적이고 웃음이 많아요.\n같이 있으면 유쾌하고 기분이 좋아져요.\n- 시야가 넓고 이것저것 관심이 많다보니\n다방면에 재능이 많아요.\n- 얘기하는 거 너무 좋아요. 같이 있으면\n어색함 없이 대화를 이어갈 수 있어요.",
    ],
    text: "- 감정기복이 있어요.\n하루에도 기분이 오르락 내리락할 때가 많죠.",
    text2: "다양한 맛이 느껴지는 트로피카나 스무디",
    img: "/images/mbti/ENFP.png",
    food: "스무디",
  },
  ESFP: {
    per: "6.36%",
    rank: "6",
    talk: [
      "- 대표적인 인싸 유형, 사람들을 좋아하고 사람들이 좋아해요.\n- 같이 있으면 긍정 에너지 뿜뿜!\n주변 사람들 기분 좋게 해줘요.\n- 단순해요. 안좋은 일 있어서 기분 안좋다가도 금방 잊어요.",
    ],
    text: "- 계획 없이 충동적으로 행동할 때가 많아요.",
    text2: "파티의 분위기를 살리는 피자",
    img: "/images/mbti/ESFP.png",
    food: "피자",
  },
  INTJ: {
    per: "3.75%",
    rank: "13",
    talk: [
      "- 굉장히 열심히 살아요.\n본인의 목적 달성을 위해 공부하고 노력하는 스타일!\n- 겉보기엔 냉철해도 친한 사람에겐 한없이 잘 챙겨줘요.\n- 어떤한 일을 하기 전에 머릿 속에 결과까지\n다 그려질 정도로 두뇌회전이 빨라요.",
    ],
    text: "- 가끔 인간미 없다는 소리를 듣고,\n가면을 쓰고 사회생활을 하기도 해요.",
    text2: "세심한 레시피로 만들어진 머핀",
    img: "/images/mbti/INTJ.png",
    food: "머핀",
  },
  ISTJ: {
    per: "4.28%",
    rank: "12",
    talk: [
      "- 근면 성실의 아이콘! 책임감이 강하고 꼼꼼해요.\n- 현실 감각이 뛰어난 편.\n실용적이고 원칙대로 하는 거 좋아해요.\n- 지하철 탈 때 빠른 환승구부터 찾아요.\n교통편, 동선은 미리미리 체크해야죠.\n- 새로운 것보단 늘 먹던 음식, 익숙한 메뉴, 가성비를 선호해요.",
    ],
    text: "- 기존의 방식을 고수하는 성향이 있어,\n융통성 없다는 소리를 들을 때도 있어요.",
    text2: "전통적이고 신뢰할 수 있는 맛의 카레",
    img: "/images/mbti/ISTJ.png",
    food: "카레",
  },
  INTP: {
    per: "6.28%",
    rank: "7",
    talk: [
      "- 논리적으로 분석하고 전략적으로 접근할 수 있는\n일을 좋아해요.\n- 머리가 비상하고 은근 천재적인 면이 있어요.\n- 관심사에 하나 꽂히면 전문가 수준의 지식을 갖출 정도로\n지적 호기심이 강해요.\n- 내향적이지만 자기주간 뚜렷하고 호불호도 확실해요.",
    ],
    text: "- 공감능력이 부족해 사회성이 없다는 소리를 종종 듣기도 해요.",
    text2: "독특하고 창의적인 맛의 케이크",
    img: "/images/mbti/INTP.png",
    food: "케이크",
  },
  ISTP: {
    per: "3.11%",
    rank: "14",
    talk: [
      "- 새로운 거 배우는 거 좋아해요!\n그게 지식 습득이든, 스포츠든, 취미든!\n- 뭔가에 꽂히면 A to Z,\n그 주변 물건까지 다 사는 덕후기질 발휘!\n- 할 일 미룰 때까지 미루는데 벼락치기를 잘해서\n생각보다 결과가 좋아요.\n- 새로운 변화나 상황에 뛰어난 적응력을 가지고 있어요.",
    ],
    text: "- 뭐든 쉽게 질리는 탓에\n한 가지 일을 끈기있게 하는 건 어려워요.",
    text2: "간단하고 즉흥적인 라면",
    img: "/images/mbti/ISTP.png",
    food: "라면",
  },
  INFJ: {
    per: "6.25%",
    rank: "8",
    talk: [
      "- 겉모습은 잔잔해보이지만 안에서는 항상\n끝도 없는 생각들이 휘몰아쳐요.\n- 세심하고 사려깊은 마음씨로\n주변인들에게 맞춤형 배려를 잘해요.\n- 미래 계획하는 거 좋아하고 근거 없이 얘기하는 건 싫어요.\n- 인간의 존재 의미, 본질에 대한 심오하고\n깊은 생각도 많이 하는 편이에요.\n- 언뜻 보면 외향인 같은데 혼자만의 시간이 굉장히 중요해요.",
    ],
    text: "- 생각이 너무 많다보니 굳이 하지 않아도 될 생각까지 해요.",
    text2: "복잡하고 깊은 맛의 와인",
    img: "/images/mbti/INFJ.png",
    food: "와인",
  },
  ISFJ: {
    per: "7.66%",
    rank: "4",
    talk: [
      "- 완벽주의 성향이 있어\n어떻게든 끝까지 해내는 인내심이 있어요.\n- 정리하는 걸 좋아해요.일의 시작에 앞서 할 일, 상황,\n주변을 항상 정리하고 시작해요.\n- 예의 바르고 온화한 성품, 말을 항상 조심히 하는 편이에요.\n- 자기가 속한 공동체 사람들과\n잘 지내는 조화로운 성격이에요.\n- 공감능력 100%, 남이 당한 슬픈 일 듣다가\n나도 모르게 울고 있진 않나요?",
    ],
    text: "- 항상 주변 상황에 예민하고 걱정이 많아요.",
    text2: "가슴을 따뜻하게 하는 치킨 스프",
    img: "/images/mbti/ISFJ.png",
    food: "스프",
  },
  INFP: {
    per: "13.39%",
    rank: "1",
    talk: [
      "- 상상력이 풍부해요. 드라마나 영화에 과몰입해서\n주인공 되는 상상 많이 해요.\n- 타인의 감정과 마음을 잘 헤아릴 줄 알아요.\n모두가 상처받지 않았으면 좋겠어요.\n- 일기 쓰면서 내 감정과 생각 정리하는 거 좋아해요.\n나만의 감성과 낭만을 곁들여서요.\n- 가치 있다고 생각되는 일에는 물불 가리지 않는\n열정을 보일 때도 있어요!",
    ],
    text: "- 사소한 일에 쉽게 우울해지는 유리 멘탈이에요.",
    text2: "겉보기와는 다른 독특한 맛의 과일 타르트",
    img: "/images/mbti/INFP.png",
    food: "타르트",
  },
  ISFP: {
    per: "6.61%",
    rank: "5",
    talk: [
      "- 살어리 살어리랏다~ 느긋하고 여유로운 성격이에요.\n- 같이 있으면 편안하고 말을 은근 재밌게 해요.\n모두에게 잘 맞춰주는 편.\n- 작은 것에도 쉽게 행복감을 느껴요.\n- 나보다 남을 낫게 여기는 겸손한 마음을 가졌어요.",
    ],
    text: "- 누워있는 걸 너무 좋아하다 보니 늘어질 땐 한없이 게을러요.",
    text2: "하루를 여유롭게, 아메리카노",
    img: "/images/mbti/ISFP.png",
    food: "커피",
  },
};

// 궁합 데이터
const compatibilityData: CompatibilityData = {
  ESFJ: {
    compatible: "INTP",
    incompatible: "INTJ",
  },
  ESTJ: {
    compatible: "INFP",
    incompatible: "INFJ",
  },
  ISFJ: {
    compatible: "ENTP",
    incompatible: "ENTJ",
  },
  ESTP: {
    compatible: "INFJ",
    incompatible: "INFP",
  },
  ESFP: {
    compatible: "INTJ",
    incompatible: "INTP",
  },
  ISTJ: {
    compatible: "ENFP",
    incompatible: "ENFJ",
  },
  ENFJ: {
    compatible: "ISTP",
    incompatible: "ISTJ",
  },
  ISFP: {
    compatible: "ENTJ",
    incompatible: "ENTP",
  },
  ISTP: {
    compatible: "ENFJ",
    incompatible: "ENFP",
  },
  ENTJ: {
    compatible: "ISFP",
    incompatible: "ISFJ",
  },
  INFJ: {
    compatible: "ESTP",
    incompatible: "ESTJ",
  },
  ENFP: {
    compatible: "ISTJ",
    incompatible: "ISTP",
  },
  ENTP: {
    compatible: "ISFJ",
    incompatible: "ISFP",
  },
  INTJ: {
    compatible: "ESFP",
    incompatible: "ESFJ",
  },
  INFP: {
    compatible: "ESTJ",
    incompatible: "ESTP",
  },
  INTP: {
    compatible: "ESFJ",
    incompatible: "ESFP",
  },
};

const ResultPageClient = ({ recipes }: { recipes: Recipe[] }) => {
  // BackEnd에서 recipes 데이터 받아와 상태에 저장
  const [recipeData, setRecipeData] = useState([...recipes]);

  // TestPage에서 저장된 MBTI 결과 상태 받아옴
  const [MBTI, setMBTI] = useRecoilState(MBTIState);

  // 성향에 따른 레시피 데이터 출력 상태
  const [recipeToShow, setRecipeToShow] = useState<Recipe | null>(null);
  const router = useRouter();

  // 첫 렌더링 애니메이션
  const [animation, setAnimation] = useState("opacity-0");

  // 다크모드 상태
  const [isDarkMode, setIsDarkMode] = useRecoilState(darkModeAtom);

  // 현재 페이지 url 주소 받아옴
  let currentPageUrl;

  if (typeof window !== "undefined") {
    currentPageUrl = window.location.href;
  }

  // Url 복사하는 함수
  const copyToClipboard = async () => {
    if (typeof window !== "undefined") {
      const currentPageUrl = window.location.href;
      try {
        await navigator.clipboard.writeText(currentPageUrl);
        toast.success("Url이 복사 되었습니다!");
      } catch (err: any) {
        toast.error("Url 복사에 실패했습니다.", err);
      }
    }
  };

  // 렌더링 시 페이지 애니메이션
  useEffect(() => {
    setAnimation("opacity-1");
  }, []);

  // urlParams에서 MBTI 가져와 MBTI state에 저장 (새로고침 해도 결과 데이터 유지됨)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      const savedMBTI = urlParams.get("MBTI");
      if (savedMBTI) {
        setMBTI((prevMBTI) => (prevMBTI = savedMBTI));
      }
    }
  }, [setMBTI]);

  // MBTI 결과가 변경될 때마다 urlParmas에 저장
  useEffect(() => {
    if (MBTI && typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      urlParams.set("MBTI", MBTI);
      window.history.replaceState({}, "", `?${urlParams.toString()}`);
    }
  }, [MBTI]);

  useEffect(() => {
    setRecipeData([...recipes]);
  }, [recipes]);

  // 받아온 recipes 데이터에서 결과 값에 따른 레시피 뽑아서 출력
  useEffect(() => {
    const food = resultData[MBTI]?.food;
    if (food) {
      const matchedRecipe = recipeData.find((recipe) =>
        recipe.recipe_title.includes(food)
      );
      if (matchedRecipe) setRecipeToShow(matchedRecipe);
    }
  }, [MBTI, recipeData]);

  return (
    <>
      <ResultPageLayout className={animation} isDarkMode={isDarkMode}>
        <Logo />
        <PageTitle>
          나의 M<span style={{ color: "#fbd26a" }}>uk</span>BTI는?
        </PageTitle>
        <MBTIimageWrapper>
          <Image
            src={resultData[MBTI]?.img}
            alt="MBTI 이미지"
            width={200}
            height={200}
          />
        </MBTIimageWrapper>
        <MBTIResultTextWrapper isDarkMode={isDarkMode}>
          {resultData[MBTI]?.text2}
        </MBTIResultTextWrapper>
        <MBTIResultWrapper isDarkMode={isDarkMode}>{MBTI}</MBTIResultWrapper>
        <MBTIcardContainer isDarkMode={isDarkMode}>
          <PercentWrapper isDarkMode={isDarkMode}>
            전체 결과 중 {resultData[MBTI]?.per}
          </PercentWrapper>
          <RankWrapper isDarkMode={isDarkMode}>
            전체 순위 {resultData[MBTI]?.rank}위
          </RankWrapper>
          <DivBar isDarkMode={isDarkMode}>-</DivBar>
          <TextTitleWrapper isDarkMode={isDarkMode}>
            이런 장점을 가졌어요!
          </TextTitleWrapper>
          <TextWrapper isDarkMode={isDarkMode}>
            {resultData[MBTI]?.talk.join(", ")}
          </TextWrapper>
          <TextTitleWrapper
            style={{ marginTop: "2rem" }}
            isDarkMode={isDarkMode}
          >
            이런 고민도 있어요
          </TextTitleWrapper>
          <TextWrapper isDarkMode={isDarkMode}>
            {resultData[MBTI]?.text}
          </TextWrapper>
          <FoodTitleWrapper isDarkMode={isDarkMode}>
            나에게 어울리는 소울푸드는?
          </FoodTitleWrapper>
          <FoodContainer>
            <TextWrapper isDarkMode={isDarkMode}>
              {recipeToShow?.recipe_title}
            </TextWrapper>
            {recipeToShow && (
              <Image
                src={recipeToShow.recipe_thumbnail}
                alt="레시피 이미지"
                width={300}
                height={300}
              />
            )}
          </FoodContainer>
          <ButtonWrapper>
            <Button
              onClick={() => router.push(`/recipe/${recipeToShow?.recipe_id}`)}
            >
              레시피 보러 가기
            </Button>
          </ButtonWrapper>
          <DivBar isDarkMode={isDarkMode}>-</DivBar>
          <MBTICompatibilityContainer>
            <CompatibilityTextContainer style={{ color: "#9AC5F4" }}>
              💙찰떡 궁합💙
              <CompatibilityResultContainer>
                <Image
                  src={resultData[compatibilityData[MBTI]?.compatible]?.img}
                  alt="찰떡 궁합 MBTI 이미지"
                  width={100}
                  height={100}
                />
                {`${resultData[compatibilityData[MBTI]?.compatible]?.food}, ${
                  compatibilityData[MBTI]?.compatible
                }`}
              </CompatibilityResultContainer>
            </CompatibilityTextContainer>

            <CompatibilityTextContainer style={{ color: "#EA906C" }}>
              💔환장 궁합💔
              <CompatibilityResultContainer>
                <Image
                  src={resultData[compatibilityData[MBTI]?.incompatible]?.img}
                  alt="환장 궁합 MBTI 이미지"
                  width={100}
                  height={100}
                />
                {`${resultData[compatibilityData[MBTI]?.incompatible]?.food}, ${
                  compatibilityData[MBTI]?.incompatible
                }`}
              </CompatibilityResultContainer>
            </CompatibilityTextContainer>
          </MBTICompatibilityContainer>
          <DivBar isDarkMode={isDarkMode}>-</DivBar>
          <ShareText isDarkMode={isDarkMode}>테스트 공유하기</ShareText>
          <ShareButtonContainer>
            <div onClick={copyToClipboard}>
              <Image
                src="/images/link.png"
                alt="링크 공유 아이콘"
                width={60}
                height={50}
              />
            </div>
            <KakaoShareButton />
            {currentPageUrl && (
              <StyledFacebookShareButton url={currentPageUrl}>
                <FacebookIcon size={60} round />
              </StyledFacebookShareButton>
            )}
          </ShareButtonContainer>
          {currentPageUrl && (
            <ShareButtonContainer>
              <StyledTwitterShareButton url={currentPageUrl}>
                <TwitterIcon size={60} round />
              </StyledTwitterShareButton>
              <StyledLineShareButton url={currentPageUrl}>
                <LineIcon size={60} round />
              </StyledLineShareButton>
              <StyledEmailShareButton url={currentPageUrl}>
                <EmailIcon size={60} round />
              </StyledEmailShareButton>
            </ShareButtonContainer>
          )}
        </MBTIcardContainer>
        <ButtonWrapper>
          <Button
            onClick={() => {
              router.push("/mbti");
            }}
          >
            <Image
              src="/images/reload.png"
              alt="뒤로가기 아이콘"
              width={30}
              height={30}
            />
            테스트 다시하기
          </Button>
        </ButtonWrapper>
      </ResultPageLayout>
    </>
  );
};

export default ResultPageClient;

const ResultPageLayout = styled.div<{ isDarkMode: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: auto;
  width: 100%;
  max-width: 50rem;
  heigth: 100vh;
  padding: 2rem 1.5rem 0 1.5rem;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  background-color: ${(props) =>
    props.isDarkMode ? "rgba(255, 255, 255, 0.1)" : props.theme.white};

  opacity: 0;
  transition: opacity 1s;
  &.opacity-1 {
    opacity: 1;
  }

  @media (min-width: 768px) {
    padding: 1.5rem 0rem;
  }
`;

const PageTitle = styled.p`
  font-family: "Dongle-Bold";
  font-size: 70px;
  color: #fbd26a;
  margin-bottom: -3rem;

  & span {
    font-size: 40px;
  }

  @media (min-width: 768px) {
    font-size: 80px;
  }
`;

const MBTIimageWrapper = styled.div`
  font-size: 40px;
  margin: 3rem auto;
`;

const MBTIResultTextWrapper = styled.div<{ isDarkMode: boolean }>`
  font-family: "Dongle-Bold";
  font-size: 32px;
  color: ${(props) =>
    props.isDarkMode ? props.theme.lightGrey : props.theme.brown};

  @media (min-width: 768px) {
    font-size: 40px;
  }
`;

const MBTIResultWrapper = styled.div<{ isDarkMode: boolean }>`
  font-family: "Dongle-Bold";
  font-size: 50px;
  color: ${(props) => (props.isDarkMode ? "pink" : props.theme.brown)};
`;

const DivBar = styled.div<{ isDarkMode: boolean }>`
  width: 3.5rem;
  height: 0.5rem;
  margin: 2rem auto;
  color: ${(props) =>
    props.isDarkMode ? "rgba(255, 255, 255, 0)" : "rgb(147, 112, 98, 0)"};
  background-color: ${(props) =>
    props.isDarkMode ? props.theme.lightNavy : "rgb(147, 112, 98, 0.5)"};
`;

const MBTIcardContainer = styled.div<{ isDarkMode: boolean }>`
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
  background-color: ${(props) =>
    props.isDarkMode ? "rgba(255, 255, 255, 0.2)" : props.theme.white};
`;

const PercentWrapper = styled.div<{ isDarkMode: boolean }>`
  font-size: 40px;
  font-family: "Dongle-Bold";
  color: ${(props) =>
    props.isDarkMode ? props.theme.lightGrey : props.theme.brown};
`;

const RankWrapper = styled.div<{ isDarkMode: boolean }>`
  font-size: 38px;
  font-family: "Dongle-Bold";
  color: ${(props) =>
    props.isDarkMode ? props.theme.deepYellow : "rgb(154, 110, 96)"};
`;

const TextTitleWrapper = styled.div<{ isDarkMode: boolean }>`
  font-size: 30px;
  font-family: "Dongle-Bold";
  color: ${(props) =>
    props.isDarkMode ? props.theme.yellow : props.theme.deepYellow};
`;

const TextWrapper = styled.div<{ isDarkMode: boolean }>`
  font-size: 22px;
  font-family: "Dongle-Bold";
  color: ${(props) =>
    props.isDarkMode ? props.theme.white : props.theme.grey};
  text-align: center;
  white-space: pre-line;

  @media (min-width: 768px) {
    font-size: 25px;
  }
`;

const FoodTitleWrapper = styled.div<{ isDarkMode: boolean }>`
  font-size: 30px;
  font-family: "Dongle-Bold";
  color: ${(props) =>
    props.isDarkMode ? props.theme.yellow : props.theme.deepYellow};
  margin-top: 3.5rem;
`;

const FoodContainer = styled.div`
  padding: 1.5rem;
  max-width: 30rem;
  font-family: "Dongle-Bold";

  img {
    object-fit: cover;
    border-radius: 1.5rem;
  }
`;

const ShareText = styled.p<{ isDarkMode: boolean }>`
  font-family: "Dongle-Bold";
  font-size: 30px;
  color: ${(props) => (props.isDarkMode ? props.theme.lightYellow : "#5c8984")};
`;

const ShareButtonContainer = styled.div`
  width: 100%;
  max-width: 36rem;
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

const StyledFacebookShareButton = styled(FacebookShareButton)`
  border-radius: 100%;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-3px);
  }
`;

const StyledTwitterShareButton = styled(TwitterShareButton)`
  border-radius: 100%;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-3px);
  }
`;

const StyledLineShareButton = styled(LineShareButton)`
  border-radius: 100%;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-3px);
  }
`;

const StyledEmailShareButton = styled(EmailShareButton)`
  border-radius: 100%;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-3px);
  }
`;

const ButtonWrapper = styled.div`
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

const MBTICompatibilityContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 2rem 0;
  font-family: "Dongle-Bold";
  gap: 4rem;
`;

const CompatibilityTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 30px;
`;

const CompatibilityResultContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
