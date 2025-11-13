import { getNotifyTime } from "../../../utils/DateFormate";
import { Bell, CheckCircle2, MessageCircle, X } from "lucide-react";
import { BiTask, BiTaskX } from "react-icons/bi";
import { NotificationTypes } from "../../../types/notification";

interface DashboardRecentActivityProps {
  notifications: NotificationTypes[];
  onNotificationClick: (notificationId: string) => void;
}

const DashboardRecentActivity = ({
  onNotificationClick,
  notifications,
}: DashboardRecentActivityProps) => {
  return (
    <div className="bg-secondary rounded-2xl shadow-lg border p-3 md:p-6">
      <h3 className="text-lg md:text-xl font-bold mb-5 flex items-center gap-2">
        <Bell size={24} className="text-blue-800" />
        Recent Activity
      </h3>

      <div className="space-y-3">
        {notifications.slice(0, 3).map((noti, index) => {
          const lastWord = noti.message
            .trim()
            .split(" ")
            .pop()
            ?.replace(/[.,!?]/g, "");

          const isRejected =
            noti.type === "Leave request" && lastWord === "Rejected";
          const isApproved =
            noti.type === "Leave request" && lastWord === "Approved";
          const extensionReject =
            noti.type === "Task extension" &&
            noti.message
              .replace(/['.,!?]/g, "")
              .split(" ")
              .includes("Rejected");

          const extensionApprove =
            noti.type === "Task extension" &&
            noti.message
              .replace(/['.,!?]/g, "") // remove quotes & punctuation
              .split(" ")
              .includes("Approved");

          // choose icon
          const IconComponent = isRejected ? (
            <X className="text-red-600" size={18} />
          ) : isApproved || extensionApprove ? (
            <CheckCircle2 className="text-green-600" size={18} />
          ) : extensionReject ? (
            <BiTaskX className="text-green-600" size={18} />
          ) : noti.type === "message" ? (
            <MessageCircle className="text-blue-600" size={18} />
          ) : noti.type === "Task assign" ? (
            <BiTask className="text-green-600" size={18} />
          ) : (
            <Bell className="text-orange-600" size={18} />
          );
          return (
            <div
              onClick={() => onNotificationClick(noti._id as string)}
              key={index}
              className="flex items-start gap-3 p-3 hover:bg-background rounded-xl transition-all cursor-pointer group"
            >
              <div
                className={`w-10 h-10 rounded-lg flex items-center justify-center 
            ${isRejected || extensionReject ? "bg-red-100" : "bg-green-100"}`}
              >
                {IconComponent}
              </div>

              <div className="flex-1">
                <p className="text-sm font-medium ">{noti.message}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {getNotifyTime(noti.createdAt)}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DashboardRecentActivity;
