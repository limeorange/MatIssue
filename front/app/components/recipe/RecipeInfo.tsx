import styled from "styled-components";

/** 요리 정보 Props */
type RecipeInfoProps = {
  recipe_info: {
    serving: number;
    time: number;
    level: number;
  };
  category: string;
};

/** 요리 정보 (인원, 시간, 난이도, 종류) 컴포넌트 */
const RecipeInfo: React.FC<RecipeInfoProps> = ({ recipe_info, category }) => {
  const { serving, time, level } = recipe_info;

  // level에 따른 라벨링 작업
  let levelText = "";
  switch (level) {
    case 0:
      levelText = "쉬움";
      break;
    case 1:
      levelText = "중간";
      break;
    case 2:
      levelText = "어려움";
      break;
    default:
      break;
  }

  // category에 따른 라벨링 작업
  let categoryText = "";
  switch (category) {
    case "korean":
      categoryText = "한식";
      break;
    case "chinese":
      categoryText = "중식";
      break;
    case "japanese":
      categoryText = "일식";
      break;
    case "western":
      categoryText = "양식";
      break;
    case "vegetarian":
      categoryText = "채식";
      break;
    case "other":
      categoryText = "기타";
      break;
    default:
      break;
  }

  return (
    <>
      <ContainerDiv>
        <RecipeInfoElementDiv>
          <h2>{serving}</h2>
          <span>인분</span>
        </RecipeInfoElementDiv>
        <Divider />
        <RecipeInfoElementDiv>
          <h2>{time}</h2>
          <span>분</span>
        </RecipeInfoElementDiv>
        <Divider />
        <RecipeInfoElementDiv>
          <h2>{levelText}</h2>
          <span>난이도</span>
        </RecipeInfoElementDiv>
        <Divider />
        <RecipeInfoElementDiv>
          <h2>{categoryText}</h2>
          <span>종류</span>
        </RecipeInfoElementDiv>
      </ContainerDiv>
    </>
  );
};

/** 요리 정보 전체 감싸는 Div */
const ContainerDiv = styled.div`
  height: 6rem;
  width: 33rem;
  background-color: #fff6df;
  border-radius: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

/** 요리 정보 요소 감싸는 Div */
const RecipeInfoElementDiv = styled.div`
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
