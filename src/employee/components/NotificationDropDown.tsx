import { Bell, Trash2, CheckCircle2 } from "lucide-react";
import { NotificationTypes } from "../../types/notification";
import { getNotifyTime } from "../../utils/DateFormate";

interface NotificationDropDownProps {
  unreadCount: number;
  onClose: () => void;
  notifications: NotificationTypes[];
  onNotificationClick: (notificationId: string) => void;
  onClearOne: (notificationId: string) => void;
  onClearAll: () => void;
  onMarkAllRead: () => void;
  hasMore?: boolean;
  handleLoadMore: () => void;
}

const NotificationDropDown = ({
  hasMore,
  handleLoadMore,
  unreadCount,
  onClose,
  notifications,
  onNotificationClick,
  onClearOne,
  onClearAll,
  onMarkAllRead,
}: NotificationDropDownProps) => {
  return (
    <>
      <div className="fixed inset-0 z-40 " onClick={onClose} />

      <div
        className="fixed top-16 left-1/2 -translate-x-1/2  md:absolute md:top-auto md:left-auto md:right-0 md:translate-x-0 w-80 sm:w-96 max-h-[32rem] bg-background border border-border shadow-xl rounded-lg overflow-hidden z-50"
      >
        {" "}
        {/* Header */}
        <div className="sticky top-0 bg-background border-b border-border px-4 py-3 flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-foreground">Notifications</h3>
            {unreadCount > 0 && (
              <span className="text-xs text-muted-foreground">
                {unreadCount} unread
              </span>
            )}
          </div>

          {/* Actions */}
          {notifications.length > 0 && (
            <div className="flex items-center gap-2">
              <button
                onClick={onMarkAllRead}
                className="text-xs text-blue-600 hover:underline flex items-center gap-1"
              >
                <CheckCircle2 size={14} /> Mark all read
              </button>
              <button
                onClick={onClearAll}
                className="text-xs text-red-600 hover:underline flex items-center gap-1"
              >
                <Trash2 size={14} /> Clear all
              </button>
            </div>
          )}
        </div>
        {/* Notification List */}
        <div className="overflow-y-auto max-h-[28rem]">
          {notifications.length === 0 ? (
            <div className="p-8 text-center">
              <Bell
                size={48}
                className="mx-auto mb-3 text-muted-foreground opacity-50"
              />
              <p className="text-muted-foreground text-sm">
                No notifications yet
              </p>
            </div>
          ) : (
            notifications.map((noti) => (
              <div
                key={noti._id}
                className={`p-4 cursor-pointer border-b border-border hover:bg-accent transition-colors relative ${
                  !noti.isRead ? "bg-blue-50 dark:bg-blue-950/20" : ""
                }`}
              >
                <div className="flex items-start gap-3">
                  {!noti.isRead && (
                    <div className="w-2 h-2 rounded-full bg-blue-600 mt-2 flex-shrink-0" />
                  )}
                  <div
                    className="flex-1 min-w-0"
                    onClick={() => onNotificationClick(noti._id as string)}
                  >
                    <p className="text-sm text-foreground leading-relaxed">
                      {noti.message}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {getNotifyTime(noti.createdAt)}
                    </p>
                  </div>
                  <button
                    className="absolute top-3 right-3 text-red-500 hover:text-red-700"
                    onClick={() => onClearOne(noti._id as string)}
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
        {hasMore && (
          <div className="flex justify-center p-2 ">
            <button
              className="text-blue-800 text-sm font-semibold  hover:text-blue-700"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleLoadMore();
              }}
            >
              Load More
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default NotificationDropDown;
