import socket from "../socket";

export const joinGroup = (groupId: string) => {
  socket.emit("join-group", groupId);
};

export const sendGroupMessage = (
  groupId: string,
  message: string,
  senderId: string
) => {
  socket.emit("send-group-message", { groupId, message, senderId });
};

export const listenToGroupMessages = (
  callback: (data: {
    sender: {
      _id: string;
      firstName: string;
      lastName: string;
      profilePicture: string;
    };
    message: string;
    groupId: string;
    createdAt: string;
  }) => void
) => {
  socket.on("receive-group-message", callback);
};

export const removeGroupMessageListener = () => {
  socket.off("receive-group-message");
};
