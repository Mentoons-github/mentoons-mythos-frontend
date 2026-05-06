import { format } from "date-fns";
import { CalendarDays, MapPin } from "lucide-react";
import { IBlogV2, MediaItem } from "../../../types/redux/blogInterface";

const BlogCommentPostContent = ({
  media,
  post,
}: {
  post: IBlogV2;
  media?: MediaItem;
}) => {
  return (
    <div className="p-4 space-y-3 ">
      {media?.caption && (
        <p className="text-sm text-muted-foreground">{media.caption}</p>
      )}
      {/* TEXT POST */}
      {post.postType === "text" && (
        <p className="text-sm text-muted-foreground">{post.content}</p>
      )}

      {/* ARTICLE */}
      {post.postType === "article" && (
        <div>
          <h2 className="font-semibold text-lg">{post.article?.title}</h2>
          <p className="text-sm text-muted-foreground mt-1">
            {post.article?.body}
          </p>
        </div>
      )}

      {/* EVENT */}
      {post.postType === "event" && (
        <div className="space-y-1">
          <h2 className="text-lg font-semibold text-foreground/80">
            {post.event?.title || "Untitled Event"}
          </h2>

          {post.event?.description && (
            <p className="text-sm text-muted-foreground line-clamp-3">
              {post.event.description}
            </p>
          )}

          <div className="space-y-2 text-sm text-muted-foreground">
            {post.event?.venue && (
              <div className="flex items-center gap-2">
                <MapPin size={16} />
                <span>{post.event.venue}</span>
              </div>
            )}

            {(post.event?.startDate || post.event?.endDate) && (
              <div className="flex items-center gap-2">
                <CalendarDays size={16} />
                <span>
                  {post.event?.startDate &&
                    format(new Date(post.event.startDate), "dd MMM yyyy")}
                  {post.event?.endDate && " - "}
                  {post.event?.endDate &&
                    format(new Date(post.event.endDate), "dd MMM yyyy")}
                </span>
              </div>
            )}
          </div>
        </div>
      )}

      {post.content && post.postType !== "text" && (
        <p className="text-sm text-muted-foreground">{post.content}</p>
      )}

      {/* TAGS */}
      {post.tags && post?.tags?.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {post?.tags.map((tag: string, i: number) => (
            <span key={i} className="text-xs bg-muted px-2 py-1 rounded-full">
              #{tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default BlogCommentPostContent;
