import { MediaItem } from "../../types/redux/blogInterface";

const MediaRenderer = ({
  media,
  from,
}: {
  media?: MediaItem[];
  from?: string;
}) => {
  if (!media || media.length === 0) return null;

  return (
    <div className="w-full h-full min-h-[inherit]">
      {media[0]?.type === "image" && (
        <img
          src={media[0]?.url}
          alt="post-media"
          className="w-full h-full min-h-[260px] max-h-[350px] object-cover block"
        />
      )}
      {media[0]?.type === "video" && (
        <video
          src={media[0]?.url}
          controls={!from}
          className="w-full h-full min-h-[260px] max-h-[350px] object-cover block bg-black"
        />
      )}
    </div>
  );
};

export default MediaRenderer;
