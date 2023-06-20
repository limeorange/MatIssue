import { useEffect, useState } from "react";
import Image from "next/image";
import { getRecipeById } from "@/app/api/recipe";
import { useSearchParams } from "next/navigation";

type Recipe = {
  recipe_id: string;
  recipe_title: string;
  recipe_thumbnail: string;
};

const WorldcupKakaoShareButton = () => {
  const shareUrl = typeof window !== "undefined" ? window.location.href : "";
  const searchParams = useSearchParams();
  const id = searchParams?.get("winnerId");

  const [recipe, setRecipe] = useState<Recipe | null>(null);

  useEffect(() => {
    if (id) {
      getRecipeById(id).then(setRecipe);
    }
  }, [id]);

  useEffect(() => {
    if (recipe && typeof window !== "undefined") {
      const { Kakao } = window;

      if (!Kakao.isInitialized()) {
        Kakao.init(process.env.NEXT_PUBLIC_KAKAO_API_KEY);
      }

      Kakao.Link.createDefaultButton({
        container: "#kakao-link-btn",
        objectType: "feed",
        content: {
          title: "맛이슈 이상형 월드컵",
          description: "뭐 먹을지 고민될땐?",
          imageUrl: recipe.recipe_thumbnail,
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
  }, [recipe, shareUrl]);

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
