import { axiosBase } from "@/app/api/axios";
import {
  LongSpan,
  MediumSpan,
  ShortSpan,
  XLongSpan,
} from "@/app/styles/admin/admin.style";
import { Recipe } from "@/app/types";
import { useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import styled from "styled-components";

type AdminRecipeItemProps = {
  recipe: Recipe;
  index: number;
};

const AdminRecipeItem = (props: AdminRecipeItemProps) => {
  const {
    recipe_title,
    recipe_category,
    recipe_id,
    user_nickname,
    created_at,
  } = props.recipe;

  const router = useRouter();
  const client = useQueryClient();

  const deleteHanlder = () => {
    if (window.confirm("정말로 삭제하시겠습니까?")) {
      axiosBase
        .delete(`recipes/${recipe_id}`)
        .then((res) => {
          client.invalidateQueries(["recipes"]);
          toast.success("레시피가 성공적으로 삭제되었습니다.");
        })
        .catch((err: any) => {
          toast.success(err.response.data.detail);
        })
        .finally(() => {});
    } else {
      return;
    }
  };

  return (
    <PanelListItem key={props.index}>
      <input
        type="checkbox"
        style={{
          padding: "1rem",
          marginRight: "1rem",
          width: "1.8rem",
        }}
      />

      <XLongSpan onClick={() => router.push(`/recipe/${recipe_id}`)}>
        <LinkedSpan>{recipe_title}</LinkedSpan>
      </XLongSpan>
      <ShortSpan>{recipe_category}</ShortSpan>
      <MediumSpan>{user_nickname}</MediumSpan>
      <MediumSpan>{created_at.slice(0, 10)}</MediumSpan>
      <IconWrapper onClick={deleteHanlder}>
        <Image
          src="/images/admin/deleteIcon.png"
          width={16}
          height={16}
          alt="delete_icon"
          style={{
            boxSizing: "content-box",
            padding: "1rem",
          }}
        />
      </IconWrapper>
    </PanelListItem>
  );
};

export default AdminRecipeItem;

const LinkedSpan = styled.span`
  cursor: pointer;
  text-decoration: underline;
`;

const PanelListItem = styled.li`
  font-size: 16px;
  font-weight: 400;
  width: 100%;
  display: flex;
  padding: 0.5rem 2rem;
  border-top: 1px solid #ddd;
  align-items: center;
`;

const IconWrapper = styled.div`
  cursor: pointer;

  &:hover {
    opacity: 0.5;
  }
`;
