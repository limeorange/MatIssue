import { Recipe } from "@/app/types";
import styled from "styled-components";

import MobileRecipeCard from "../recipe-card/main/MobileRecipeCard";
import { useRouter } from "next/navigation";
import Image from "next/image";

type MainMobileListingRecipeProps = {
  recipes: Recipe[];
  url: string;
};

const MainMobileListingRecipe = (props: MainMobileListingRecipeProps) => {
  const router = useRouter();

  return (
    <MobileListingRecipe>
      {props.recipes?.slice(0, 20).map((item: Recipe) => (
        <MobileRecipeCard key={item.recipe_id} recipe={item} />
      ))}
      <MoreViewBtnWrapper
        onClick={() => {
          router.push(`${props.url}`);
        }}
      >
        <Image
          src="images/main/moreView.svg"
          width={18}
          height={15}
          alt="more_view"
        />
        더보기
      </MoreViewBtnWrapper>
    </MobileListingRecipe>
  );
};

export default MainMobileListingRecipe;

const MobileListingRecipe = styled.div`
  display: flex;
  overflow-x: auto;
  gap: 1.5rem;
  align-items: center;
  width: 100%;

  > div {
    flex-shrink: 0;
  }

  @media (min-width: 1024px) {
    display: none;
  }
`;

const MoreViewBtnWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 14px;
  padding: 0 2rem;
  gap: 0.4rem;

  img {
    box-sizing: content-box;
    width: 1.6rem;
    height: 1.6rem;
    background-color: #fbd26a;
    border-radius: 5rem;
    padding: 1rem;
  }
`;
