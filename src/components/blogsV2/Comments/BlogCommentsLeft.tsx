import { MediaItem } from "../../../types/redux/blogInterface";

interface Props {
  media: MediaItem;
}

const BlogCommentsLeft = ({ media }: Props) => {
  const isImage = media?.type === "image";
  const isVideo = media?.type === "video";
  return (
    <div className="w-full lg:w-1/2 bg-background/80 flex items-center justify-center max-h-[40vh] lg:max-h-full">
      {isImage && (
        <img src={media.url} className="w-full h-full object-contain" />
      )}
      {isVideo && (
        <video
          src={media.url}
          controls
          className="w-full h-full object-contain"
        />
      )}
    </div>
  );
};

export default BlogCommentsLeft;
