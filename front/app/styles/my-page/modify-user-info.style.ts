import styled from "styled-components";

export const Container = styled.div`
  padding: 1.5rem;
  @media (min-width: 1024px) {
    position: relative;
    width: 100%;
    max-width: 120rem;
    margin: 0 auto;
    padding: 6.4rem 14rem 0;
  }
`;

export const Header = styled.h1`
  padding:0;
  font-size: 20px;
  font-weight: 700;
  color: #4f3d21;
  cursor: pointer;
 
  @media (min-width: 1024px) {
    font-size: 26px;
    padding-left: 2.5rem;
    margin: 0;
  }
`;

export const Divider = styled.div`
  display: none;
  @media (min-width: 1024px) {
    display: block;
    width: 100%;
    height: 1px;
    background-color: #4f3d21;
    margin: 2rem 0;
  }
`;

export const StyledChangePassword = styled.div`
position: relative;
  display: flex;
  align-items: center;
  padding-top: 0.3rem;
  text-decoration: none;
  color:#4f3d21;
  cursor: pointer;
  font-size: 14px;
  @media (min-width: 1024px) {
    position: absolute;
    right: 24.4rem;
    top: 13.5rem;
    text-decoration: underline;
    padding-top: 0;
    color: #201ce0;
  }
`;

export const AccountDeletion = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 0.3rem;
  @media (min-width: 1024px) {
    position: absolute;
    right: 16.1rem;
    top: 13.5rem;
    text-decoration: underline;
    color: #e11717;
    margin-left: 0;
  }

`;

//지우기
export const AlertImage = styled.img`
  width: 3rem;
  height: 3rem;
`;

export const WrapperInfo = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  margin-top: -4rem;
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 7rem;
`;

export const Title = styled.div`
  font-size: 16px;
  cursor: pointer;
  color: #4f3d21;
  margin: 0 4rem 0 0.1rem;
  @media (min-width: 1024px) {
    font-size: 17px;
    min-width: 10rem;
  }
`;

export const InputBox = styled.input<{ isEdit?: boolean }>`
  max-width: 40rem;
  flex-grow: 1;
width: calc(100% - 9rem);
  margin-top: 0.3rem;
  height: 4.8rem;
  border: 0.1rem solid #d2d2d2;
  border-radius: 0.8rem;
  font-size: 16px;
  padding: 0 1.6rem;
 
  &:focus {
    ${(props) => (props.isEdit ? "outline: 0.3rem solid #fbd26a" : "")};
    border: none;
  }
  @media (min-width: 1024px) {
margin-top:0;
width:100%;
  }
`;



export const InputBoxCode = styled.input<{ isEdit?: boolean }>`
max-width: 40rem;
width: calc(100% - 9rem);
height: 4.8rem;
border: 0.1rem solid #d2d2d2;
border-radius: 0.8rem;
font-size: 16px;
padding: 0 1.6rem;
margin-top: 0.3rem;
&:focus {
  ${(props) => (props.isEdit ? "outline: 0.3rem solid #fbd26a" : "")};
  border: none;
}
@media (min-width: 1024px) {
width:100%;
}
`;

export const InputBoxNickName = styled.input`
  width: 40rem;
  height: 4.8rem;
  border: 0.1rem solid #d2d2d2;
  border-radius: 0.8rem;
  font-size: 16px;
  padding: 0 1.6rem;
  margin-left: 4rem;
  &:focus {
    outline: 0.3rem solid #fbd26a;
    border: none;
  }
`;

// export const InputBoxCode = styled.input`
//   width: 40rem;
//   height: 4.8rem;
//   border: 0.1rem solid #d2d2d2;
//   border-radius: 0.8rem;
//   font-size: 16px;
//   padding: 0 1.6rem;
//   margin-left: 1rem;
//   &:focus {
//     outline: 0.3rem solid #fbd26a;
//     border: none;
//   }
// `;

export const ConfirmCodeInput = styled.input`
  width: 20rem;
  height: 4.8rem;
  border: 0.1rem solid #d2d2d2;
  border-radius: 0.8rem;
  font-size: 16px;
  padding: 0 1.6rem;
  &:focus {
    outline: 0.3rem solid #fbd26a;
    border: none;
  }
`;

export const SendingCodeButton = styled.div`
display: flex;
justify-content: center;
align-items: center;
flex-shrink: 1;
  width: 8rem;
  height: 4rem;
  @media (min-width: 1024px) {
    position: absolute;
    right: 22.4rem;
    top: 7rem;
  }
`;

export const ProfileImageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin-top: 7rem;
  @media (min-width: 1024px) {
    flex-direction: row;
    align-items: center;
    
  }
`;

export const InputFile = styled.input`
  display: none;
`;

export const IputAndDescription = styled.div`
  display: flex;
  flex-direction: column;
`;

export const EmailDescription = styled.p`
  padding: 0.5rem;
  font-size: 14px;
  font-weight: 400;
  color: #a17c43;
`;


export const StyledImage = styled.img`
  width: 19.8rem;
  height: 19.8rem;
`;

export const DeleteImage = styled.img`
  position: absolute;
  top: 0.7rem;
  right: 0.6rem;
  width: auto;
  height: auto;
`;

export const InputDateBox = styled.input`
  position: relative;
  width: 100%;
  max-width: 40rem;
  width: calc(100% - 9rem);
  height: 4.8rem;
  border: 0.1rem solid #d2d2d2;
  border-radius: 0.8rem;
  padding: 0 1.6rem;
  margin-top: 0.3rem;
  background: url(/images/calendar.png) no-repeat right 1.6rem center / 2rem
    auto;
  font-size: 15px;
  color: #4f3d21;
  cursor: pointer;
  &:hover {
    outline: 0.3rem solid #fbd26a;
    border: none;
  }
  &::-webkit-calendar-picker-indicator {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: transparent;
    cursor: pointer;
  }
`;

export const UserModifyButton = styled.div`
  width: 100%;
  max-width: 40rem;
  margin: 6rem 0 3.4rem;
  @media (min-width: 1024px) {
    margin: 6rem 0 16rem 13.4rem;
    width: 23rem;

  }
`;

//패스워드 유효성 검사

export const SpaceDiv = styled.div`
  display: block;
  height: 1rem;
`;

export const ShowIconBox = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  top: 1.1rem;
  right: 1.1rem;
  cursor: pointer;
`;

//새로 만든 이메일 스타일, 위에 정리하기
export const ContentSection = styled.div`
  display: flex;
  width: 100%;
  @media (min-width: 1024px) {
  }
`;

export const FlexBox = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
`;

export const EmailContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  @media (min-width: 1024px) {

  }
`;

export const EmailWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  @media (min-width: 1024px) {
    flex-direction: row;
    margin-top: 4.5rem;
  }
`;

// 모바일 버전 추가
export const TitleAndPassword = styled.div`
display:flex;
justify-content:space-between;
margin:1.5rem 0 4.5rem 0; 
@media (min-width: 1024px) {
  display: block;
  margin:0;
}
`;

export const FlexSmallBox = styled.div`
display: flex;
gap: 0.7rem;
align-items: center;
justify-content: space-between;
width: 100%;
`;