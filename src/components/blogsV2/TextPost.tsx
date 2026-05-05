import { IBlogV2 } from "../../types/redux/blogInterface";
import PostWrapper from "./PostWrapper";
import { Dispatch, SetStateAction } from "react";

const TextPost = ({
  post,
  commentClick,
  activeMenuId,
  setActiveMenuId,
}: {
  post: IBlogV2;
  commentClick: (postId: string) => void;
  activeMenuId: string | null;
  setActiveMenuId: Dispatch<SetStateAction<string | null>>;
}) => {
  return (
    <PostWrapper
      post={post}
      commentClick={commentClick}
      activeMenuId={activeMenuId}
      setActiveMenuId={setActiveMenuId}
    >
      <p className="text-base text-muted-foreground leading-relaxed">{post.content}</p>
    </PostWrapper>
  );
};

export default TextPost;
