import { IBlogV2 } from "../../types/redux/blogInterface";
import PostWrapper from "./PostWrapper";

const ImagePost = ({ post }: { post: IBlogV2 }) => {
  const media = post?.media?.[0];

  if (!media?.url) return null;

  return (
    <PostWrapper post={post}>
      {media?.url && (
        <img
          src={media.url}
          alt="post"
          className="w-full max-h-[400px] object-cover rounded-xl"
        />
      )}
      {media?.caption && <p className="text-sm mt-2">{media.caption}</p>}
    </PostWrapper>
  );
};

export default ImagePost;
