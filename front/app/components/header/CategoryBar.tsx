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
          {isModal && <CategoryModal />}
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
  height: 51px;
  color: #4f3d21;
`;

const CategoryUl = styled.ul`
  display: flex;
  gap: 20px;
`;

const CategoryLi = styled.li`
  display: flex;
  position: relative;
  box-sizing: content-box;
  align-items: center;
  gap: 8px;
  border-bottom: 4px solid #ffffff;
  padding: 13px 13px 9px 13px;
  &:hover {
    cursor: pointer;
    font-weight: 600;
    border-bottom: 4px solid #f8b551;
  }
`;
