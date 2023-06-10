import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const useMovingContentByScrolling = () => {
  const [isHeaderVisible, setHeaderVisibility] = useState<boolean>(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const pathname = usePathname();

  const isViewPage = pathname?.startsWith("/recipe/") ? true : false;

  useEffect(() => {
    const handleScroll = () => {
      if (typeof window !== "undefined") {
        const currentScrollPos = window.pageYOffset;
        const isScrollingUp = prevScrollPos > currentScrollPos;

        setHeaderVisibility(
          isScrollingUp || currentScrollPos < 131 || !isViewPage
        );
        setPrevScrollPos(currentScrollPos);
      }
    };

    if (typeof window !== "undefined") {
      window.addEventListener("scroll", handleScroll);

      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, [prevScrollPos]);

  return isHeaderVisible;
};

export default useMovingContentByScrolling;
