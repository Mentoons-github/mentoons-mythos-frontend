import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { useLocation } from "react-router-dom";
import { Bell, ChevronDown, ChevronUp } from "lucide-react";
import { useEffect, useState } from "react";
import UserShow from "./UserShow";
import ThemeToggle from "../../components/ThemToggle";
import NotificationDropDown from "../../employee/components/NotificationDropDown";
import { NotificationTypes } from "../../types/notification";
import {
  getSingleEmployeeThunk,
  getSingleTaskDetailsThunk,
} from "../../features/admin/adminThunk";
import {
  listenToNotifications,
  removeNotificationListener,
} from "../../socket/events/notificationEvents";
import {
  deleteAllNotificationsThunk,
  deleteSingleNotificationThunk,
  getNotificationsThunk,
  getUnreadCountThunk,
  markAllNotificationsAsReadThunk,
  markNotificationAsReadThunk,
} from "../../features/notification/notificationThunk";
import TaskViewModal from "./modals/Employee/TaskViewModal";
import { toast } from "sonner";
import { resetNotificationState } from "../../features/notification/notificationSlice";
import ViewLeaveRequestModal from "./modals/Employee/ViewLeaveRequestModal";
import { getSingleLeaveRequestThunk } from "../../features/attendance_leave/attendance_leaveThunk";

const AdminNav = () => {
  const { user } = useAppSelector((state) => state.user);
  const location = useLocation();
  const [show, setShow] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState<NotificationTypes[]>([]);
  const [unreadCount, setUnreadCount] = useState<number>(0);
  const dispatch = useAppDispatch();
  const [viewTaskModal, setViewTaskModal] = useState(false);
  const [viewLeaveRequestModal, setViewLeaveRequestmodal] = useState(false);

  // Fetch employee profile
  useEffect(() => {
    if (user?._id) dispatch(getSingleEmployeeThunk(user._id));
  }, [dispatch, user?._id]);

  const { singleLoading, singleTask } = useAppSelector((state) => state.admin);
  const {
    delteSuccess,
    markAllReadSuccess,
    message,
    error,
    notifications: reduxNotifications,
    hasMore,
  } = useAppSelector((state) => state.notification);
  const {
    singleLoading: leaveLoading,
    singleLeaveRequest,
    editLoading,
    editSuccess,
  } = useAppSelector((state) => state.attendance_leave);

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

  useEffect(() => {
    if (editSuccess) {
      setViewLeaveRequestmodal(false);
    }
  }, [editSuccess]);

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
      notificationFrom === "Task submission" ||
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
  

  const path = location.pathname.split("/").filter(Boolean).pop();

  const pageTitle = path ? formatSegment(path) : "Dashboard";

  function formatSegment(segment: string) {
    return segment
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }

  const handleLoadMore = () => {
    const lastNotification = notifications[notifications.length - 1];
    dispatch(
      getNotificationsThunk({
        limit: 10,
        lastDate: lastNotification?.createdAt,
      })
    );
  };

  return (
    <nav className="w-full h-16 shadow-md px-6 border-b">
      <div className="flex justify-between items-center h-full">
        <h1 className="md:text-xl font-bold ml-5 md:ml-10 lg:ml-0">{pageTitle}</h1>

        <div className="flex space-x-2 md:space-x-5 items-center">
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
                hasMore={hasMore}
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
          <div className="flex items-center gap-2  px-2 py-1 rounded-md relative">
            <div>
              {user?.profilePicture ? (
                <img
                  src={user.profilePicture}
                  alt="Profile"
                  className="w-12 h-12 rounded-full object-cover border-2 "
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-[#02599c] flex items-center justify-center text-[20px] text-white">
                  {user?.firstName[0].toUpperCase()}
                </div>
              )}
            </div>
            <div className="hidden md:block">
              <h3>
                {user?.firstName} {user?.lastName}
              </h3>
              <p className="text-xs text-muted-foreground">{user?.email}</p>
            </div>
            <div className=" " onClick={() => setShow((pre) => !pre)}>
              {!show ? <ChevronDown size={20} /> : <ChevronUp size={20} />}
            </div>
            {show && <UserShow onClose={() => setShow(false)} />}
          </div>
        </div>
      </div>
      {viewTaskModal && (
        <TaskViewModal
          onClose={() => setViewTaskModal(false)}
          loading={singleLoading}
          task={singleTask ?? undefined}
        />
      )}
      {viewLeaveRequestModal && (
        <ViewLeaveRequestModal
          onClose={() => setViewLeaveRequestmodal(false)}
          leaveRequest={singleLeaveRequest ?? undefined}
          singleLoading={leaveLoading}
          editLoading={editLoading}
        />
      )}
    </nav>
  );
};

export default AdminNav;
