import { formatTime } from "../../../../utils/BlogCommentDate";
import UserAvatar from "./UserAvatar";

interface Reply {
  profile?: string;
  username: string;
  createdAt?: string;
  replyText: string;
}

interface ReplyItemProps {
  reply: Reply;
}

const ReplyItem: React.FC<ReplyItemProps> = ({ reply }) => {
  return (
    <li className="flex items-start gap-2 space-y-1">
      <UserAvatar profile={reply.profile} username={reply.username} size="sm" />
      <div>
        <div className="flex gap-2 items-center">
          <span className="text-sm font-medium text-gray-800">{reply.username}</span>
          {reply.createdAt && (
            <span className="text-xs text-gray-500">{formatTime(reply.createdAt)}</span>
          )}
          
        </div>
        <p className="text-sm text-gray-700">{reply.replyText}</p>
      </div>
    </li>
  );
};

export default ReplyItem