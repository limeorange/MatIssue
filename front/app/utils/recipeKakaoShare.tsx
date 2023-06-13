import { useEffect } from "react";
import Image from "next/image";

const RecipeKakaoShareButton = () => {
  const shareUrl = typeof window !== "undefined" ? window.location.href : "";

  useEffect(() => {
    if (typeof window !== "undefined") {
      const { Kakao } = window;

      if (!Kakao.isInitialized()) {
        Kakao.init("8f8a30270178844fc3a8e4f1df9a1c22");
      }

      Kakao.Link.createDefaultButton({
        container: "#kakao-link-btn",
        objectType: "feed",
        content: {
          title: "맛이슈 레시피",
          description: "멋진 레시피 구경 가실래요?",
          imageUrl: "/logo.svg",
          link: {
            mobileWebUrl: shareUrl,
            webUrl: shareUrl,
          },
        },
        buttons: [
          {
            title: "레시피 구경가기",
            link: {
              webUrl: shareUrl,
              mobileWebUrl: shareUrl,
            },
          },
        ],
      });
    }
  }, [shareUrl]);

  return (
    <>
      <div>
        <Image
          id="kakao-link-btn"
          src="/images/kakao-talk.png"
          width={200}
          height={200}
          alt="카톡 공유 이미지"
        />
      </div>
    </>
  );
};

export default RecipeKakaoShareButton;
