import { useEffect } from "react";
import Image from "next/image";

type ShareModalProps = {
  recipe_thumbnail: string;
};

const RecipeKakaoShareButton: React.FC<ShareModalProps> = ({
  recipe_thumbnail,
}) => {
  const shareUrl = typeof window !== "undefined" ? window.location.href : "";
  console.log("recipe_thumbnail", recipe_thumbnail);

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
          title: "맛이슈 레시피",
          description: "멋진 레시피 구경 가실래요?",
          imageUrl: recipe_thumbnail,
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
