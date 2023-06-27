import toast from "react-hot-toast";
import Image from "next/image";
import RecipeKakaoShareButton from "@/app/utils/recipeKakaoShare";
import styled from "styled-components";

type ShareModalProps = {
  recipe_thumbnail: string;
};

/** 공유하기 모달 컴포넌트 */
const ShareModal = ({ recipe_thumbnail }: ShareModalProps) => {
  /** url 복사하는 함수 */
  const copyToClipboard = async () => {
    const currentPageUrl = window.location.href;
    try {
      await navigator.clipboard.writeText(currentPageUrl);
      toast.success("URL이 복사 되었습니다!");
    } catch (err: any) {
      toast.error("URL 복사에 실패했습니다.", err);
    }
  };
  return (
    <>
      <ShareButtonWrapper>
        <div onClick={copyToClipboard}>
          <Image
            src="/images/link.png"
            alt="링크 공유 아이콘"
            width={200}
            height={200}
          />
        </div>
        <RecipeKakaoShareButton recipe_thumbnail={recipe_thumbnail} />
      </ShareButtonWrapper>
    </>
  );
};

/** 링크 공유하기 버튼 Div */
const ShareButtonWrapper = styled.div`
  display: flex;
  position: absolute;
  width: 9rem;

  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  background-color: #ffffff;
  border: 0.7rem solid #ffffff;
  border-radius: 50rem;
  left: -2.1rem;
  top: 4.7rem;

  & div {
    cursor: pointer;
    border-radius: 100%;
    box-shadow: 0 0 0.4rem rgba(0, 0, 0, 0.3);
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-3px);
    }
  }

  @media (min-width: 1024px) {
    width: 11rem;
    left: 6rem;
    top: -0.25rem;
  }
`;

export default ShareModal;
