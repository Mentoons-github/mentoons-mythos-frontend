import { useEffect, useRef } from "react";
import { Chat } from "../../../../types/redux/chatInterfaces";
import { getDateLabel } from "../../../../utils/DateFormate";
import DateLabel from "./DateLabel";
import MessageBubble from "./MessageBubble";

interface MessagesListProps {
  userId?: string;
  messages: Chat[];
  backgroundImage?: string;
  onContainerClick: () => void;
}

const MessagesList = ({
  userId,
  messages,
  backgroundImage,
  onContainerClick,
}: MessagesListProps) => {
  const messageEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const groupedMessages = Object.entries(
    messages.reduce((groups: { [key: string]: Chat[] }, msg) => {
      const label = getDateLabel(msg.createdAt);
      if (!groups[label]) groups[label] = [];
      groups[label].push(msg);
      return groups;
    }, {})
  );

  return (
    <div
      onClick={onContainerClick}
      className=" flex-1 overflow-y-auto hide-scrollbar transform-gpu md:rounded-t-lg p-1 md:p-3 bg-black/80 space-y-4"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "500px",
        backgroundPosition: "center",
      }}
    >
      {messages.length === 0 ? (
        <div className="text-center text-yellow-500 text-2xl ">
          No messages yet
        </div>
      ) : (
        groupedMessages.map(([dateLabel, msgs]) => (
          <div key={dateLabel}>
            <DateLabel date={dateLabel} />
            {msgs.map((msg, i) => {
              const prevMsg = msgs[i - 1];
              const showSenderInfo =
                !prevMsg || prevMsg.sender._id !== msg.sender._id;
              const isCurrentUser = userId === msg.sender._id;

              return (
                <MessageBubble
                  key={i}
                  message={msg}
                  isCurrentUser={isCurrentUser}
                  showSenderInfo={showSenderInfo}
                />
              );
            })}
          </div>
        ))
      )}
      <div ref={messageEndRef} />
    </div>
  );
};

export default MessagesList;
