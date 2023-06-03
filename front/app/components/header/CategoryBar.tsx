"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import styled from "styled-components";
import CategoryModal from "./CategoryModal";

const CategoryBar = () => {
  const router = useRouter();
  const [isModal, setIsModal] = useState<boolean>(false);

  return (
    <CategoryBarDiv>
      <CategoryUl>
        <CategoryLi
          onMouseOver={() => setIsModal(true)}
          onMouseOut={() => setIsModal(false)}
        >
          <CategoryModal isModal={isModal} />
          <div>
            <Image
              src="/images/listIcon.png"
              alt="list_icon"
              width={14}
              height={12}
            />
          </div>
          음식 카테고리
        </CategoryLi>
        <CategoryLi onClick={() => router.push("/category/best")}>
          베스트 레시피
        </CategoryLi>
        <CategoryLi onClick={() => router.push("/category/newest")}>
          최신 레시피
        </CategoryLi>
        <CategoryLi onClick={() => router.push("/category/honmuk")}>
          혼먹 레시피
        </CategoryLi>
        <CategoryLi onClick={() => router.push("/category/vegan")}>
          비건 레시피
        </CategoryLi>
      </CategoryUl>
    </CategoryBarDiv>
  );
};

export default CategoryBar;

const CategoryBarDiv = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 5rem;
  color: #4f3d21;
`;

const CategoryUl = styled.ul`
  display: flex;
  gap: 2rem;
`;

const CategoryLi = styled.li`
  display: flex;
  position: relative;
  box-sizing: content-box;
  align-items: center;
  gap: 0.8rem;
  border-bottom: 0.4rem solid #ffffff;
  padding: 1.3rem 1.3rem 0.9rem 1.3rem;
  &:hover {
    cursor: pointer;
    font-weight: 600;
    border-bottom: 0.4rem solid #f8b551;
  }

  transition: all 0.3s;
`;
