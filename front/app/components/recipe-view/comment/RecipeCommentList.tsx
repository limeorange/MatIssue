"use client";

import RecipeComment from "./RecipeCommentItem";

/** 요리 댓글 전체 Props */
type RecipeCommentProps = {
  comments: {
    comment_author: string;
    comment_text: string;
    comment_like: number;
    comment_id: string;
    created_at: string;
    comment_parent: string;
    updated_at: string;
  };
};

/** 요리 댓글 전체 컴포넌트 */
const RecipeComments: React.FC<RecipeCommentProps> = ({ comments }) => {
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
          />
        ))}
    </div>
  );
};

export default RecipeComments;
