"use client";

import Image from "next/image";
import { useState } from "react";
import styled from "styled-components";

const RecipeComment = () => {
  const recipe_nickname = "허니자몽";
  const comment = `볶음밥이랑 같이 먹으면 더 맛있을 것 같아요 레시피 공유 감사합니다~!
     볶음밥이랑 같이 먹으면 더 맛있을 것 같아요 레시피 공유 감사합니다~!
     볶음밥이랑 같이 먹으면 더 맛있을 것 같아요 레시피 공유 감사합니다~!
     볶음밥이랑 같이 먹으면 더 맛있을 것 같아요 레시피 공유 감사합니다~!`;
  const [isEditing, setIsEditing] = useState(false);
  return (
    <>
      <div
        className="flex w-full pb-[1.2rem] mb-[1.2rem] 
      border-b-[0.1rem] border-[#DBD8D0] "
      >
        <ImageWrapperDiv>
          <Image
            src={"/images/recipe-view/기본 프로필.png"}
            alt="기본 프로필 사진"
            fill
            style={{
              objectFit: "cover",
              borderRadius: 20,
            }}
          />
        </ImageWrapperDiv>

        {/* 작성자, 댓글 내용 */}
        <div className="flex flex-col ml-[12px] w-full">
          <div className="flex justify-between">
            <div className="text-[16px] text-[#6F6F6F] font-[500] mb-[3px]">
              {recipe_nickname}
            </div>
            {/* 댓글 수정, 삭제바 */}
            <div className="mt-[0.5rem]">
              <Image
                src={"/images/recipe-view/threedots.svg"}
                alt="댓글 수정, 삭제바"
                width={15}
                height={15}
              />
            </div>
          </div>
          {/* 조건에 따라 textarea로 변경 (삼항연산자) */}
          <div className="text-[15.5px] text-[#6F6F6F] w-full">{comment}</div>
        </div>
      </div>
    </>
  );
};

/** 이미지 감싸는 Div */
const ImageWrapperDiv = styled.div`
  min-width: 5rem;
  min-height: 5rem;
  width: 5rem;
  height: 5rem;
  position: relative;
  border-width: 0.2rem;
  border-color: #fbd26a;
  border-radius: 50%;
  overflow: hidden;
`;

export default RecipeComment;
