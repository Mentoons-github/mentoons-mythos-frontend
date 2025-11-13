import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import ThemeToggle from "../../components/ThemToggle";
import { Bell, ChevronDown, ChevronUp } from "lucide-react";
import UserShow from "../../Admin/components/UserShow";
import {
  getSingleEmployeeThunk,
  getSingleTaskDetailsThunk,
} from "../../features/admin/adminThunk";
import {
  listenToNotifications,
  removeNotificationListener,
} from "../../socket/events/notificationEvents";
import { NotificationTypes } from "../../types/notification";
import {
  deleteAllNotificationsThunk,
  deleteSingleNotificationThunk,
  getNotificationsThunk,
  getUnreadCountThunk,
  markAllNotificationsAsReadThunk,
  markNotificationAsReadThunk,
} from "../../features/notification/notificationThunk";
import NotificationDropDown from "./NotificationDropDown";
import ViewTaskDetailsModal from "./modals/ViewTaskDetailsModal";
import { toast } from "sonner";
import { resetNotificationState } from "../../features/notification/notificationSlice";
import { getSingleLeaveRequestThunk } from "../../features/attendance_leave/attendance_leaveThunk";
import ViewSingleLeaveRequestModal from "./modals/ViewSingleLeaveRequestModal";

const EmployeeHeader = () => {
  const { user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const location = useLocation();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState<NotificationTypes[]>([]);
  const [unreadCount, setUnreadCount] = useState<number>(0);
  const [viewTaskModal, setViewTaskModal] = useState(false);
  const [viewLeaveRequestModal, setViewLeaveRequestmodal] = useState(false);
  const { singleTask, singleLoading, singleEmployee } = useAppSelector(
    (state) => state.admin
  );
  const { singleLeaveRequest, singleLoading: leaveLoading } = useAppSelector(
    (state) => state.attendance_leave
  );
  const {
    delteSuccess,
    markAllReadSuccess,
    message,
    error,
    notifications: reduxNotifications,
    hasMore,
  } = useAppSelector((state) => state.notification);

  useEffect(() => {
    if (delteSuccess || markAllReadSuccess) {
      toast.success(message);
      dispatch(resetNotificationState());
    }
    if (error) {
      toast.error(error);
      dispatch(resetNotificationState());
    }
  }, [delteSuccess, dispatch, error, markAllReadSuccess, message]);

  // Fetch employee profile
  useEffect(() => {
    if (user?._id) dispatch(getSingleEmployeeThunk(user._id));
  }, [dispatch, user?._id]);

  useEffect(() => {
    if (!user?._id) return;

    listenToNotifications((notification) => {
      setNotifications((prev) => [notification, ...prev]);
      setUnreadCount((prev) => prev + 1);
    });

    return () => removeNotificationListener();
  }, [user?._id]);

  useEffect(() => {
    if (!user?._id) return;

    dispatch(getNotificationsThunk({ limit: 10, lastDate: "" }))
      .unwrap()
      .then((fetched: NotificationTypes[]) => setNotifications(fetched))
      .catch(() => setNotifications([]));

    dispatch(getUnreadCountThunk())
      .unwrap()
      .then((count: number) => setUnreadCount(count))
      .catch(() => setUnreadCount(0));
  }, [dispatch, user?._id]);

  useEffect(() => {
    setNotifications(reduxNotifications);
  }, [reduxNotifications]);

  const handleNotificationClick = async (notificationId: string) => {
    const notification = notifications.find((n) => n._id === notificationId);
    if (!notification) return;

    const notificationFrom = notification.type;

    if (!notification.isRead) {
      // Only mark as read and decrease count if it's unread
      await dispatch(markNotificationAsReadThunk(notificationId));

      setNotifications((prev) =>
        prev.map((n) => (n._id === notificationId ? { ...n, isRead: true } : n))
      );
      setUnreadCount((prev) => Math.max(prev - 1, 0));
    }

    if (
      notificationFrom === "Task assign" ||
      notificationFrom === "Task extension"
    ) {
      setViewTaskModal(true);
      setShowNotifications(false);
      dispatch(getSingleTaskDetailsThunk(notification.relatedId));
    } else if (notificationFrom === "Leave request") {
      setViewLeaveRequestmodal(true);
      setShowNotifications(false);
      dispatch(getSingleLeaveRequestThunk(notification.relatedId));
    }
  };

  const handleLoadMore = () => {
    const lastNotification = notifications[notifications.length - 1];
    dispatch(
      getNotificationsThunk({
        limit: 10,
        lastDate: lastNotification?.createdAt,
      })
    );
  };

  const path = location.pathname.split("/").filter(Boolean).pop();
  const pageTitle = path ? formatSegment(path) : "Dashboard";

  function formatSegment(segment: string) {
    return segment
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }

  return (
    <nav className="w-full h-16 shadow-md px-2 md:px-6 border-b bg-background">
      <div className="flex justify-between items-center h-full">
        <h1 className="md:text-xl font-bold">{pageTitle}</h1>

        <div className="flex space-x-5 items-center">
          <div className="relative">
            <div
              className="relative cursor-pointer hover:opacity-80 transition-opacity"
              onClick={() => setShowNotifications((prev) => !prev)}
            >
              <Bell size={24} className="text-foreground" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center shadow-sm">
                  {unreadCount > 99 ? "99+" : unreadCount}
                </span>
              )}
            </div>

            {/* Notification Dropdown */}
            {showNotifications && (
              <NotificationDropDown
                hasMore={hasMore ?? undefined}
                handleLoadMore={handleLoadMore}
                unreadCount={unreadCount}
                onClose={() => setShowNotifications(false)}
                notifications={notifications}
                onNotificationClick={handleNotificationClick}
                onMarkAllRead={async () => {
                  await dispatch(markAllNotificationsAsReadThunk());
                  setNotifications((prev) =>
                    prev.map((n) => ({ ...n, isRead: true }))
                  );
                  setUnreadCount(0);
                }}
                onClearAll={async () => {
                  await dispatch(deleteAllNotificationsThunk());
                  setNotifications([]);
                  setUnreadCount(0);
                }}
                onClearOne={async (notificationId: string) => {
                  await dispatch(deleteSingleNotificationThunk(notificationId));
                  setNotifications((prev) =>
                    prev.filter((n) => n._id !== notificationId)
                  );
                  const deleted = notifications.find(
                    (n) => n._id === notificationId
                  );
                  if (deleted && !deleted.isRead) {
                    setUnreadCount((prev) => Math.max(prev - 1, 0));
                  }
                }}
              />
            )}
          </div>

          <ThemeToggle />

          <div className="flex items-center gap-2 px-2 py-1 rounded-md relative bg-secondary">
            <div>
              {singleEmployee?.profileImage ? (
                <img
                  src={singleEmployee.profileImage}
                  alt="Profile"
                  className="w-12 h-12 rounded-full object-cover border-2"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-[#02599c] flex items-center justify-center text-[20px] text-white">
                  {singleEmployee?.name[0].toUpperCase()}
                </div>
              )}
            </div>
            <div className="hidden md:block">
              <h3>
                {user?.firstName} {user?.lastName}
              </h3>
              <p className="text-xs text-muted-foreground">{user?.email}</p>
            </div>
            <div
              onClick={() => setShowUserMenu((prev) => !prev)}
              className="cursor-pointer hover:opacity-70 transition-opacity"
            >
              {!showUserMenu ? (
                <ChevronDown size={20} />
              ) : (
                <ChevronUp size={20} />
              )}
            </div>
            {showUserMenu && (
              <UserShow onClose={() => setShowUserMenu(false)} />
            )}
          </div>
        </div>
      </div>

      {viewTaskModal && (
        <ViewTaskDetailsModal
          onClose={() => setViewTaskModal(false)}
          loading={singleLoading}
          task={singleTask ?? undefined}
        />
      )}
      {viewLeaveRequestModal && (
        <ViewSingleLeaveRequestModal
          onClose={() => setViewLeaveRequestmodal(false)}
          singleLoading={leaveLoading}
          leaveRequest={singleLeaveRequest ?? undefined}
        />
      )}
    </nav>
  );
};

export default EmployeeHeader;
