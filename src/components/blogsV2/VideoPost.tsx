import { IBlogV2 } from "../../types/redux/blogInterface";
import PostWrapper from "./PostWrapper";

const VideoPost = ({ post }: { post: IBlogV2 }) => {
  const media = post?.media?.[0];

  if (!media?.url) return null;

  return (
    <PostWrapper post={post}>
      {media?.url && (
        <video
          src={media.url}
          controls
          className="w-full max-h-[400px] rounded-xl"
        />
      )}
      {media?.caption && <p className="text-sm mt-2">{media.caption}</p>}
    </PostWrapper>
  );
};

export default VideoPost;
