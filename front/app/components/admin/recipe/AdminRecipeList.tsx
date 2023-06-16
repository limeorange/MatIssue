"use client";

import styled from "styled-components";
import AdminPagination from "../AdminPagenation";
import { useEffect, useState } from "react";
import { Recipe } from "@/app/types";
import AdminRecipeItem from "./AdminRecipeItem";

const AdminRecipeList = ({ recipes }: { recipes: Recipe[] }) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);

  const limit = 10;
  const offset = (page - 1) * limit;

  useEffect(() => {
    setPage(1);
  }, []);

  return (
    <>
      <PanelList>
        <PanelListHeader>
          <input
            type="checkbox"
            style={{
              padding: "1rem",
              marginRight: "1rem",
              width: "1.8rem",
            }}
          />

          <XLongSpan>제목</XLongSpan>
          <ShortSpan>카테고리</ShortSpan>
          <MediumSpan>작성자</MediumSpan>
          <MediumSpan>작성일</MediumSpan>
        </PanelListHeader>
        {recipes
          ?.slice(offset, offset + limit)
          .map((item: Recipe, index: number) => (
            <AdminRecipeItem key={index} recipe={item} index={index} />
          ))}
      </PanelList>
      <PagenationContainer>
        <PagenationBox>
          <AdminPagination
            total={recipes?.length}
            limit={limit}
            page={page}
            setPage={setPage}
          />
        </PagenationBox>
      </PagenationContainer>
    </>
  );
};

const PanelList = styled.ul`
  width: 90rem;
  display: flex;
  flex-direction: column;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 0.5rem;
  margin-left: 3rem;
`;

const PanelListHeader = styled.li`
  display: flex;
  padding: 0.5rem 2rem;
  background-color: #fbe2a1;
`;

const XShortSpan = styled.span`
  padding: 0.8rem 1.2rem;
  width: 8rem;
`;

const ShortSpan = styled(XShortSpan)`
  width: 13rem;
`;

const MediumSpan = styled(XShortSpan)`
  width: 18rem;
`;

const LongSpan = styled(XShortSpan)`
  width: 25rem;
`;

const XLongSpan = styled(XShortSpan)`
  width: 30rem;
`;

const PagenationContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const PagenationBox = styled.div`
  font-size: 16px;
`;

export default AdminRecipeList;
