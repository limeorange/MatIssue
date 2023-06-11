import { useEffect } from "react";
import Image from "next/image";

const WorldcupKakaoShareButton = () => {
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
          title: "맛이슈 이상형 월드컵",
          description: "뭐 먹을지 고민될땐?",
          imageUrl: "/images/logo1.png",
          link: {
            mobileWebUrl: shareUrl,
            webUrl: shareUrl,
          },
        },
        buttons: [
          {
            title: "월드컵 결과 보러가기",
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
          width={60}
          height={50}
          alt="카톡 공유 이미지"
        />
      </div>
    </>
  );
};

export default WorldcupKakaoShareButton;
