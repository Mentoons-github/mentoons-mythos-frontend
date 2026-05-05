import { CalendarDays, MapPin } from "lucide-react";
import { IBlogV2 } from "../../types/redux/blogInterface";
import PostWrapper from "./PostWrapper";
import { format } from "date-fns";
import MediaRenderer from "./MediaRenderer";
import { Dispatch, SetStateAction } from "react";

const EventPost = ({
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
  const event = post.event;

  return (
    <PostWrapper
      post={post}
      commentClick={commentClick}
      activeMenuId={activeMenuId}
      setActiveMenuId={setActiveMenuId}
    >
      <div className="rounded-2xl border p-4 space-y-3">
        <MediaRenderer media={post.media} />

        <h2 className="text-lg font-semibold text-foreground/80">
          {event?.title || "Untitled Event"}
        </h2>

        {event?.description && (
          <p className="text-sm text-muted-foreground line-clamp-3">
            {event.description}
          </p>
        )}

        <div className="space-y-2 text-sm text-muted-foreground">
          {event?.venue && (
            <div className="flex items-center gap-2">
              <MapPin size={16} />
              <span>{event.venue}</span>
            </div>
          )}

          {(event?.startDate || event?.endDate) && (
            <div className="flex items-center gap-2">
              <CalendarDays size={16} />
              <span>
                {event?.startDate &&
                  format(new Date(event.startDate), "dd MMM yyyy")}
                {event?.endDate && " - "}
                {event?.endDate &&
                  format(new Date(event.endDate), "dd MMM yyyy")}
              </span>
            </div>
          )}
        </div>
      </div>
    </PostWrapper>
  );
};

export default EventPost;
