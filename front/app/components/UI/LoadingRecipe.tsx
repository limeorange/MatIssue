import { PacmanLoader } from "react-spinners";
import styled from "styled-components";

const LoadingRecipe = () => {
  return (
    <LoadingWrapper>
      <PacmanLoader color="#FBD26A" size={25} />
    </LoadingWrapper>
  );
};

export default LoadingRecipe;

const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 11.5rem;
`;
