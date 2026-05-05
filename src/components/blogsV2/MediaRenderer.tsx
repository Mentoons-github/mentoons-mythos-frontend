import { MediaItem } from "../../types/redux/blogInterface";

const MediaRenderer = ({ media }: { media?: MediaItem[] }) => {
  if (!media || media.length === 0) return null;

  return (
    <div className="rounded-xl overflow-hidden">
      {media[0]?.type === "image" && (
        <img
          src={media[0]?.url}
          alt="post-media"
          className="w-full max-h-[350px] object-cover rounded-xl"
        />
      )}

      {media[0]?.type === "video" && (
        <video
          src={media[0]?.url}
          controls
          className="w-full max-h-[350px] rounded-xl"
        />
      )}
    </div>
  );
};

export default MediaRenderer