import { Chat } from "../../../../types/redux/chatInterfaces";
import { getTime } from "../../../../utils/chateDateFormate";

interface MessageBubbleProps {
  message: Chat;
  showSenderInfo: boolean;
  isCurrentUser: boolean;
}

const MessageBubble = ({ message, showSenderInfo, isCurrentUser }: MessageBubbleProps) => {
  return (
    <div
      className={`flex items-start space-x-1 md:space-x-3 mb-2 ${
        isCurrentUser ? "justify-end" : ""
      } ${!showSenderInfo && !isCurrentUser ? "ml-8 md:ml-11 -mt-2" : isCurrentUser? "-mt-2" : "mt-3"}`}
    >
      {!isCurrentUser && showSenderInfo && (
        <img
          src={message.sender.profilePicture || "/default-user.png"}
          alt="avatar"
          className="w-7 h-7 md:w-8 md:h-8 rounded-full"
        />
      )}
      <div
        className={`rounded-lg px-3 py-2 mt-1  min-w-[120px] mr-10 md:mr-0 max-w-[500px] relative ${
          isCurrentUser ? "bg-[#dcf8c6] " : "bg-gray-400"
        }`}
      >
        {!isCurrentUser && showSenderInfo && (
          <p className="text-xs text-blue-600 font-semibold mb-1">
            {message.sender.firstName} {message.sender.lastName}
          </p>
        )}
        <p className="text-sm text-gray-900 whitespace-pre-wrap break-words leading-relaxed">
          {message.message}
        </p>
        <div className="flex justify-end -mt-1">
          <span className="text-[10px] text-gray-500">
            {getTime(message.createdAt)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;
