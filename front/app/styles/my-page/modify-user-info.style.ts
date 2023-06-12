import styled from "styled-components";

export const Container = styled.div`
  position: relative;
  width: 100%;
  max-width: 120rem;
  margin: 0 auto;
  padding: 6.4rem 14rem 0;
`;

export const Header = styled.h1`
  font-size: 26px;
  font-weight: 700;
  color: #4f3d21;
  padding-left: 2.5rem;
  cursor: pointer;
`;

export const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: #4f3d21;
  margin: 2rem 0;
`;

export const StyledChangePassword = styled.div`
  position: absolute;
  right: 24.4rem;
  top: 13.5rem;
  font-size: 14px;
  text-decoration: underline;
  color: #201ce0;
  cursor: pointer;
`;

export const AccountDeletion = styled.div`
  position: absolute;
  right: 16.1rem;
  top: 13.5rem;
  font-size: 14px;
  text-decoration: underline;
  color: #e11717;
  cursor: pointer;
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
  width: 100%;
  margin-top: 6rem;
`;

export const Title = styled.div`
  font-size: 17px;
  cursor: pointer;
  color: #4f3d21;
  padding-top: 1rem;
`;

export const InputBox = styled.input<{ isEdit?: boolean }>`
  width: 40rem;
  height: 4.8rem;
  border: 0.1rem solid #d2d2d2;
  border-radius: 0.8rem;
  font-size: 16px;
  padding: 0 1.6rem;
  margin-left: 2.5rem;
  &:focus {
    ${(props) => (props.isEdit ? "outline: 0.3rem solid #fbd26a" : "")};
    border: none;
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

export const InputBoxCode = styled.input`
  width: 40rem;
  height: 4.8rem;
  border: 0.1rem solid #d2d2d2;
  border-radius: 0.8rem;
  font-size: 16px;
  padding: 0 1.6rem;
  margin-left: 1rem;
  &:focus {
    outline: 0.3rem solid #fbd26a;
    border: none;
  }
`;

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
  position: absolute;
  right: 22.4rem;
  top: 7rem;
  width: 12rem;
  height: 4.8rem;
`;

export const ProfileImageWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 7rem;
`;

export const InputFile = styled.input`
  display: none;
`;

export const IputAndDescription = styled.div`
  display: flex;
  flex-direction: column;
`;

export const EmailDescription = styled.p`
  padding: 0.5rem 0 0 3.48rem;
  font-size: 14px;
  font-weight: 400;
  color: #a17c43;
`;

export const CodeDescription = styled.p`
  padding: 0.5rem 0 0 2rem;
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
  width: 40rem;
  height: 4.8rem;
  border: 0.1rem solid #d2d2d2;
  border-radius: 0.8rem;
  padding: 0 1.6rem;
  margin-left: 2.3rem;
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
  margin: 6rem 0 0 13.4rem;
  width: 23rem;
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
  margin-left: 5rem;
`;

export const FlexBox = styled.div`
  display: flex;
  flex-direction: column;
`;

export const EmailContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const EmailWrapper = styled.div`
  display: flex;
`;
