"use client";

import { Comments } from "@/app/types";
import RecipeComment from "./RecipeCommentItem";

/** 요리 댓글 전체 컴포넌트 */
const RecipeComments = ({ comments }: { comments: Comments[] }) => {
  return (
    <div>
      {/* 댓글이 빈 배열인 경우에 대한 예외 처리 */}
      {Array.isArray(comments) &&
        comments.length > 0 &&
        comments.map((comment, index) => (
          <RecipeComment
            key={index}
            comment_author={comment.comment_author}
            comment_text={comment.comment_text}
            comment_id={comment.comment_id}
            comment_like={comment.comment_like}
            created_at={comment.created_at}
            updated_at={comment.updated_at}
            comment_nickname={comment.comment_nickname}
            comment_profile_img={comment.comment_profile_img}
            comment_parent={comment.comment_parent}
          />
        ))}
    </div>
  );
};

export default RecipeComments;
