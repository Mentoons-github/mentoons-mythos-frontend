import { Dispatch, SetStateAction } from "react";
import { IBlogV2 } from "../../types/redux/blogInterface";
import MediaRenderer from "./MediaRenderer";
import PostWrapper from "./PostWrapper";

const MediaPost = ({
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
      <div className="space-y-2">
        <MediaRenderer media={post.media} />

        {post?.media?.[0]?.caption && (
          <p className="text-sm text-muted-foreground">{post.media[0].caption}</p>
        )}
      </div>
    </PostWrapper>
  );
};

export default MediaPost;
