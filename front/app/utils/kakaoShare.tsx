import { useEffect } from "react";
import Image from "next/image";

const KakaoShareButton = () => {
  const shareUrl = typeof window !== "undefined" ? window.location.href : "";

  useEffect(() => {
    if (typeof window !== "undefined") {
      const { Kakao } = window;

      if (!Kakao.isInitialized()) {
        Kakao.init(process.env.NEXT_PUBLIC_KAKAO_API_KEY);
      }

      Kakao.Link.createDefaultButton({
        container: "#kakao-link-btn",
        objectType: "feed",
        content: {
          title: "맛이슈 MukBTI 테스트",
          description: "나와 어울리는 음식은?",
          imageUrl:
            "https://eliceproject.s3.amazonaws.com/20230614055800160_%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202023-06-14%20%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE%203.04.04.png",
          link: {
            mobileWebUrl: shareUrl,
            webUrl: shareUrl,
          },
        },
        buttons: [
          {
            title: "테스트 결과 보러가기",
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

export default KakaoShareButton;
