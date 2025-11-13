import socket from "../socket";

export const joinUser = (userId: string) => {
  socket.emit("join-user", userId);
};

export const listenToNotifications = (
  callback: (notification: {
    _id: string;
    receiverId: string;
    message: string;
    type: string;
    isRead: boolean;
    createdAt: string;
    relatedId: string;
  }) => void
) => {
  socket.on("receive-notification", callback);
};

export const removeNotificationListener = () => {
  socket.off("receive-notification");
};

export const sendNotification = (
  receiverId: string,
  receiverModel: "Admin" | "Employee",
  message: string,
  type: string,
  relatedId: string
) => {
  socket.emit("send-notification", {
    receiverId,
    receiverModel,
    message,
    type,
    relatedId,
  });
};
