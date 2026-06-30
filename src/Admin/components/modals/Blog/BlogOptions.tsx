import {
  AlertTriangle,
  Ban,
  EyeOff,
  Trash2,
  MessageCircleOff,
  Eye,
  MessageCircle,
} from "lucide-react";
import { useState } from "react";

interface Props {
  onAction?: (action: string, days?: number) => void;
  isCommentOff: boolean;
  isHidden: boolean;
  isDeleted: boolean;
}

const BlogOptions = ({
  onAction,
  isCommentOff,
  isHidden,
  isDeleted,
}: Props) => {
  const [showBanOptions, setShowBanOptions] = useState(false);
  const actionButtons = [
    {
      label: isDeleted ? "Post Removed" : `Remove Post`,
      action: "delete",
      icon: Trash2,
      className: "text-red-500 hover:bg-red-500/10 hover:text-red-600",
    },

    {
      label: isHidden ? "Show Post" : "Hide Post",
      action: "hide",
      icon: isHidden ? Eye : EyeOff,
      className: "hover:bg-muted text-foreground",
    },

    {
      label: "Warn User",
      action: "warn_user",
      icon: AlertTriangle,
      className: "text-yellow-500 hover:bg-yellow-500/10",
    },

    {
      label: "Ban User",
      action: "ban_user",
      icon: Ban,
      hasInput: true,
      className: "text-red-500 hover:bg-red-500/10",
    },

    {
      label: isCommentOff ? "Turn On Commenting" : "Turn Off Commenting",
      action: "comment_off",
      icon: isCommentOff ? MessageCircle : MessageCircleOff,
      className: "hover:bg-muted text-foreground",
    },
  ];
  return (
    <div className="absolute top-10 right-0 z-[999] w-56 rounded-xl border bg-background shadow-xl ">
      <div className="flex flex-col p-1">
        {actionButtons.map((item) => {
          const Icon = item.icon;

          return (
            <div key={item.action}>
              <button
                type="button"
                onClick={() => {
                  if (item.action === "ban_user") {
                    setShowBanOptions((prev) => !prev);
                    return;
                  }

                  onAction?.(item.action);
                }}
                className={`w-full flex items-center justify-between gap-3 px-4 py-3 text-sm rounded-lg transition-all duration-200 cursor-pointer ${item.className}`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.label}</span>
                </div>
              </button>

              {/* BAN DAYS OPTIONS */}
              {item.action === "ban_user" && showBanOptions && (
                <div className="ml-6 mb-2 flex flex-col gap-1">
                  {[1, 7, 30].map((day) => (
                    <button
                      key={day}
                      onClick={() => onAction?.("ban_user", day)}
                      className="text-left text-xs px-3 py-2 rounded-md hover:bg-muted"
                    >
                      Ban for {day} Day{day > 1 && "s"}
                    </button>
                  ))}

                  <button
                    onClick={() => onAction?.("ban_user", 0)}
                    className="text-left text-xs px-3 py-2 rounded-md hover:bg-muted text-red-500"
                  >
                    Permanent Ban
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BlogOptions;
