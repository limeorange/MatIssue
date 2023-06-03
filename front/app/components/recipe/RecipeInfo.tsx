import styled from "styled-components";

// 인원, 시간, 난이도, 종류
const peopleCount = 2;
const cookingTime = 30;
const cookingLevel = "초급";
const category = "한식";

/** 요리 정보 (인원, 시간, 난이도, 종류) 컴포넌트 */
const RecipeInfo = () => {
  return (
    <>
      <ContainerDiv>
        <RecipeInfoElementDiv>
          <h2>{peopleCount}</h2>
          <span>인분</span>
        </RecipeInfoElementDiv>
        <Divider />
        <RecipeInfoElementDiv>
          <h2>{cookingTime}</h2>
          <span>분</span>
        </RecipeInfoElementDiv>
        <Divider />
        <RecipeInfoElementDiv>
          <h2>{cookingLevel}</h2>
          <span>난이도</span>
        </RecipeInfoElementDiv>
        <Divider />
        <RecipeInfoElementDiv>
          <h2>{category}</h2>
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
