"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useRecoilState } from "recoil";
import { EIState, SNState, TFState, JPState } from "@/app/store/mbtiAtom";
import Button from "@/app/components/UI/Button";
import styled from "styled-components";

type QuestionType = {
  ques: string;
  ans1: string;
  ans2: string;
};

type DataType = {
  [key: number]: QuestionType;
};

type StyledComponentProps = {
  progress: number;
};

const TestPage = () => {
  const router = useRouter();
  const [count, setCount] = useState(1);
  const [progressStep, setProgressStep] = useState(0);
  const [EI, setEI] = useRecoilState(EIState);
  const [SN, setSN] = useRecoilState(SNState);
  const [TF, setTF] = useRecoilState(TFState);
  const [JP, setJP] = useRecoilState(JPState);

  let [data] = useState<DataType>({
    1: {
      ques: "드디어 기다리던 주말이에요!\n주말에 나는?",
      ans1: "날씨도 좋은데 친구들이랑 \n브런치 맛집 가자고 해야지!",
      ans2: "집에서 치킨 먹으면서 밀린 드라마나 봐야겠다~",
    },
    2: {
      ques: "모처럼 친구들과의 점심 약속!\n예약을 맡은 내가 정한 식당은?",
      ans1: "점심에도 사람들로 붐비는\n활기찬 분위기의 핫플레이스!",
      ans2: "오랜만에 만나는 친구들이니,\n조용한 분위기에서 대화할 수 있는 룸으로 갈까?",
    },
    3: {
      ques: "이사한 집에 손님들이 오기로 했어요!\n식사를 준비하는 나의 모습은?",
      ans1: "기본적인 것만 차려놓고,\n다같이 요리하면서 재밌게 보내자!",
      ans2: "우리 집 까지 와주는 손님들을 위해\n완벽한 식사를 대접해야지!",
    },
    4: {
      ques: "꼬르륵.. 배가 고파요.\n음식 메뉴를 고르는 나의 모습은?",
      ans1: "음.. 역시 배고플 땐\n항상 먹던 중국집이지~",
      ans2: "우와, 이런 가게도 생겼네?\n오늘은 여기서 먹어볼까?",
    },
    5: {
      ques: "지인들과 캠핑에 왔어요!\n음식을 준비하는 나, 어떤 스타일인가요?",
      ans1: "맛이슈에서 본 레시피대로\n빈틈 없이 준비해야지!",
      ans2: "내가 곧 레시피!\n나만의 방식으로 모두를 놀래켜 주겠어!",
    },
    6: {
      ques: `'우리 나중에 햄버거집 차리자!'\n친구의 말에 나의 대답은?`,
      ans1: "지금 얼마나 모았어?\n직장은 그만두려고?",
      ans2: "가게 이름은 뭘로 할까?\n위치는 어디가 좋으려나~",
    },
    7: {
      ques: "내가 준비한 요리가 마음에 안든다는\n친구의 반응.. 나의 대답은?",
      ans1: "그래? 어떤 부분이\n마음에 안들었는지 얘기해줘",
      ans2: "헉, 별로였어?\n미안해.. 다음엔 더 맛있게 만들어줄게!",
    },
    8: {
      ques: "식당을 고르는 내가\n더 중요하게 생각하는 건?",
      ans1: "탄단지 영양소를\n골고루 섭취할 수 있다니, 여기다!",
      ans2: "와 여기 분위기 대박!\n분위기에 취해보자~",
    },
    9: {
      ques: "요리 학원에 수업을 들으러 왔어요.\n수업을 듣는 나의 모습은?",
      ans1: `'여기선 이렇게 하면 되는구나.'\n논리적이고, 순차적으로 수업을 들어요`,
      ans2: "요리는 역시 감으로!\n내가 했을 땐 이렇게 하는게 더 맛있던데?",
    },
    10: {
      ques: "평소에 너무 가고 싶었던\nSNS에서 핫하다는 유명 맛집에 왔어요! 메뉴를 고를 때 나는?",
      ans1: "오늘을 위해 리뷰까지 하나하나 검토했지.\n일단 스테이크 하나랑..",
      ans2: "와 역시 맛집이라 그런가? 다 맛있어보여.\n이것도 시키고 저것도 시키자!",
    },
    11: {
      ques: "장을 보려고 마트에 왔어요!\n장을 볼 때 나의 모습은?",
      ans1: "오늘 저녁은 파스타니까..\n맛이슈 레시피에서 뭐뭐 필요하다고 했었지?",
      ans2: "요즘은 이렇게도 나오네?\n밀키트랑 냉동식품도 몇 개 사둘까?",
    },
    12: {
      ques: "음식 준비를 마친 후,\n나의 주방 상태는?",
      ans1: "정리는 그때그때!\n치울게 없는 깔끔 그 자체~",
      ans2: "싱크대에 쌓여있는\n온갖 조리도구와 냄비들",
    },
  });

  const goBack = () => {
    if (count > 1) {
      setCount((count) => count - 1);
      setProgressStep((step) => step - 1);
    }
  };

  const goNext = (buttonNumber: number) => {
    if (buttonNumber === 1) {
      // 버튼 1에만 해당하는 로직
      if (count <= 3) {
        setEI(EI - 1);
      } else if (count >= 4 && count <= 6) {
        setSN(SN - 1);
      } else if (count >= 7 && count <= 9) {
        setTF(TF - 1);
      } else if (count >= 10 && count <= 12) {
        setJP(JP - 1);
      }
    } else {
      // 버튼 2에만 해당하는 로직
      if (count <= 3) {
        setEI(EI - 1);
      } else if (count >= 4 && count <= 6) {
        setSN(SN - 1);
      } else if (count >= 7 && count <= 9) {
        setTF(TF - 1);
      } else if (count >= 10 && count <= 12) {
        setJP(JP - 1);
      }
    }

    // 공통 로직
    if (count === 12) {
      router.push("/mbti/result-page");
    } else {
      setCount((prevCount) => prevCount + 1);
      setProgressStep((prevStep) => prevStep + 1);
    }
  };

  return (
    <>
      <PageWrapper>
        <PageTitle>
          M<span>uk</span>BTI 테스트
        </PageTitle>
        <ProgressSection>
          <BackButton onClick={goBack}>←</BackButton>
          <ProgressBar progress={(progressStep / 12) * 100} />
          <ProgressNumber>{`${count}/12`}</ProgressNumber>
        </ProgressSection>
        <QuestionNum>Q{count}.</QuestionNum>
        <Question>{data[count].ques}</Question>
        <AnswerButtonContainer>
          <Button
            isBgColor={true}
            isBorderColor={false}
            isHoverColor={false}
            onClick={() => goNext(1)}
          >
            {data[count].ans1}
          </Button>
          <Button
            isBgColor={true}
            isBorderColor={false}
            isHoverColor={false}
            onClick={() => goNext(2)}
          >
            {data[count].ans2}
          </Button>
        </AnswerButtonContainer>
      </PageWrapper>
    </>
  );
};

export default TestPage;

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 3em;
`;

const PageTitle = styled.p`
  font-size: 80px;
  color: #fbd26a;
  font-family: "Dongle-Bold";
  margin-bottom: -3rem;

  & span {
    font-size: 40px;
  }
`;

const QuestionNum = styled.div`
  font-size: 50px;
  color: #4f3d21;
  margin-bottom: 5rem;
  font-family: "Dongle-Bold";
`;

const Question = styled.div`
  font-size: 15px;
  color: #4f3d21;
  white-space: pre-line;
  text-align: center;
`;

const AnswerButtonContainer = styled.div`
  margin-top: 8rem;
  display: flex;
  flex-direction: column;
  gap: 3rem;
  width: 100%;
  max-width: 40rem;

  & Button {
    width: 100%;
    height: 7rem;
    font-size: 15px;
    text-align: center;
    white-space: pre-line;
    line-height: 1.5;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    transition: transform 0.3s ease;

    &:hover {
      transform: translateY(-3px);
    }

    &:active {
      transform: translateY(0px);
    }
  }
`;

const ProgressSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 40rem;
  padding: 0 1rem;
  margin-top: 3rem;
  margin-bottom: 3rem;
`;

const BackButton = styled.button`
  background-color: #fbd26a;
  color: white;
  border-radius: 10rem;
  width: 5%;
  margin-right: 1rem;
`;

const ProgressBar = styled.div<StyledComponentProps>`
  width: 100%;
  height: 20px;
  border-radius: 10px;
  background-color: #eee;
  overflow: hidden;
  &::after {
    content: "";
    display: block;
    width: ${({ progress }) => `${progress}%`};
    height: 100%;
    background-color: #7e6b4d;
    border-radius: 10px;
    transition: width 0.3s;
  }
`;

const ProgressNumber = styled.div`
  font-size: 13px;
  margin-left: 1rem;
`;
