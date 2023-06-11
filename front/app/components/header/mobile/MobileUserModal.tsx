import styled from "styled-components";
import Logo from "../Logo";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type MobileUserModalProps = {
  isModal: boolean;
  setIsModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const MobileUserModal = (props: MobileUserModalProps) => {
  const [scrollPosition, setScrollPosition] = useState<number>(0);
  const router = useRouter();

  const closeModalHandler = () => {
    document.body.style.overflow = "auto";
    window.scrollTo(0, scrollPosition);
    props.setIsModal(false);
  };

  useEffect(() => {
    if (props.isModal) {
      setScrollPosition(window.pageYOffset);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [props.isModal]);

  return (
    <>
      <Backdrop isModal={props.isModal} onClick={closeModalHandler} />
      <ModalContainer isModal={props.isModal}>
        <Logo />
        <ProfileWrapper>
          <Image
            src="/images/profileIcon.png"
            width={18}
            height={18}
            alt="profile"
          />
          장윤수님
        </ProfileWrapper>
        <MenuList>
          <MenuItem onClick={() => router.push("my-page")}>마이페이지</MenuItem>
          <MenuItem onClick={() => router.push("my-page/modify-user-info")}>
            회원정보수정
          </MenuItem>
          <MenuItem onClick={() => router.push("my-page/scrap")}>
            스크랩
          </MenuItem>
          <MenuItem onClick={() => router.push("my-page/notification")}>
            알림
          </MenuItem>
          <MenuItem onClick={() => router.push("my-page/add-recipe")}>
            글쓰기
          </MenuItem>
        </MenuList>
      </ModalContainer>
    </>
  );
};

export default MobileUserModal;

const Backdrop = styled.div<{ isModal: boolean }>`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9999;
  display: ${(props) => (props.isModal ? "block" : "none")};
  transition: opacity 0.3s ease-in-out;
`;

const ModalContainer = styled.div<{ isModal: boolean }>`
  display: flex;
  flex-direction: column;
  position: fixed;
  z-index: 10000;
  left: 0;
  top: 0;
  width: 25rem;
  height: 100vh;
  background-color: white;
  padding: 2rem;
  gap: 2rem;
  font-size: 16px;

  transform: translateX(${(props) => (props.isModal ? "0" : "-100%")});
  opacity: ${(props) => (props.isModal ? "1" : "0")};

  transition: all 0.3s ease-in-out;
`;

const ProfileWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 0;
  border-bottom: 1px solid #ccc;
`;

const MenuList = styled.ul`
  display: flex;
  flex-direction: column;
`;

const MenuItem = styled.li`
  padding: 0.8rem 0;
`;
