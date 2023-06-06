"use client";

import RecipeComment from "./RecipeComment";

/** 요리 댓글 전체 Props */
type RecipeCommentProps = {
  comments: { comment_author: string; comment_text: string }[];
};

/** 요리 댓글 전체 컴포넌트 */
const RecipeComments: React.FC<RecipeCommentProps> = ({ comments }) => {
  return (
    <div>
      {comments.map((comment, index) => (
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
