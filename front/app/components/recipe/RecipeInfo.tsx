import styled from "styled-components";

// 요리 정보 (인원, 시간, 난이도, 종류) 컴포넌트
const RecipeInfo = () => {
  return (
    <>
      <ContainerDiv>
        <RecipeInfoElementDiv>
          <h2>2</h2>
          <span>인분</span>
        </RecipeInfoElementDiv>
        <Divider />
        <RecipeInfoElementDiv>
          <h2>30</h2>
          <span>분</span>
        </RecipeInfoElementDiv>
        <Divider />
        <RecipeInfoElementDiv>
          <h2>초급</h2>
          <span>난이도</span>
        </RecipeInfoElementDiv>
        <Divider />
        <RecipeInfoElementDiv>
          <h2>한식</h2>
          <span>종류</span>
        </RecipeInfoElementDiv>
      </ContainerDiv>
    </>
  );
};

const ContainerDiv = styled.div`
  height: 60px;
  width: 330px;
  background-color: #fff6df;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const RecipeInfoElementDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-right: 24px;
  margin-left: 24px;
  text-align: center;
  
  h2 {
    font-size: 15px;
    font-weight: 500;
]  }

  span {
    font-size: 14px;
  }
`;

const Divider = styled.div`
  height: 45px;
  border-color: #dbd8d0;
  border-width: 0.8px;
`;

export default RecipeInfo;
