import { Dispatch, SetStateAction } from "react";
import { IBlogV2 } from "../../types/redux/blogInterface";
import MediaRenderer from "./MediaRenderer";
import PostWrapper from "./PostWrapper";

const ArticlePost = ({
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
      <div className="space-y-3">
        <MediaRenderer media={post.media} />

        <div className="bg-muted p-3 rounded-lg">
          <h2 className="font-semibold text-lg">{post.article?.title}</h2>

          <p className="text-sm text-muted-foreground line-clamp-3">
            {post.article?.body}
          </p>
        </div>
      </div>
    </PostWrapper>
  );
};

export default ArticlePost;
