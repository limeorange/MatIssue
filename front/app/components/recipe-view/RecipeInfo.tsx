import styled from "styled-components";

/** 요리 정보 Props */
type RecipeInfoProps = {
  recipe_info: {
    serving: number;
    time: number;
    level: number;
  };
  recipe_category: string;
};

/** 요리 정보 (인원, 시간, 난이도, 종류) 컴포넌트 */
const RecipeInfo = ({ recipe_info, recipe_category }: RecipeInfoProps) => {
  const { serving, time, level } = recipe_info;

  // level에 따른 라벨링 작업
  const levelLabel: { [key: number]: string } = {
    0: "쉬움",
    1: "중간",
    2: "어려움",
  };
  const levelText = levelLabel[level];

  // category에 따른 라벨링 작업
  const categoryLabel: { [key: string]: string } = {
    korean: "한식",
    chinese: "중식",
    japanese: "일식",
    western: "양식",
    vegetarian: "채식",
    other: "기타",
  };
  const categoryText = categoryLabel[recipe_category];

  return (
    <>
      <RecipeInfoContainer>
        <RecipeInfoElement>
          <h2>{serving}</h2>
          <span>인분</span>
        </RecipeInfoElement>
        <Divider />
        <RecipeInfoElement>
          {time === 61 ? <h2>1시간</h2> : <h2>{time}</h2>}
          {time === 61 ? <span>이상</span> : <span>분</span>}
        </RecipeInfoElement>
        <Divider />
        <RecipeInfoElement>
          <h2>{levelText}</h2>
          <span>난이도</span>
        </RecipeInfoElement>
        <Divider />
        <RecipeInfoElement>
          <h2>{categoryText}</h2>
          <span>종류</span>
        </RecipeInfoElement>
      </RecipeInfoContainer>
    </>
  );
};

/** 요리 정보 전체 감싸는 Div */
const RecipeInfoContainer = styled.div`
  height: 6rem;
  width: 33rem;
  background-color: #fff6df;
  border-radius: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

/** 요리 정보 요소 감싸는 Div */
const RecipeInfoElement = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-right: 2.4rem;
  margin-left: 2.4rem;
  text-align: center;
  
  h2 {
    font-size: 15px;
    font-weight: 500;
]  }

  span {
    font-size: 14px;
  }
`;

/** 요리 정보 요소 구분선 */
const Divider = styled.div`
  height: 4.5rem;
  border-color: #dbd8d0;
  border-width: 0.08rem;
`;

export default RecipeInfo;
