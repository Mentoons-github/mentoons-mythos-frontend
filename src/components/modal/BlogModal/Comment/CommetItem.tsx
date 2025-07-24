import { useState } from "react";
import UserAvatar from "./UserAvatar";
import CommentHeader from "./CommentHeader";
import { Comments } from "../../../../types/redux/blogInterface";
import CommentInput from "../CommentInput";
import RepliesSection from "./ReplySection";

interface CommentItemProps {
  comment: Comments;
  onReply: (commentId: string, replyText: string) => void;
}

const CommentItem: React.FC<CommentItemProps> = ({ comment, onReply }) => {
  const [replyingTo, setReplyingTo] = useState<string | null>(null);

  const handleReplySubmit = (text: string) => {
    onReply(comment._id, text);
    setReplyingTo(null);
  };

  const toggleReply = () => {
    setReplyingTo(replyingTo === comment._id ? null : comment._id);
  };

  return (
    <li className="flex items-start gap-3 px-3 py- rounded-md">
      <UserAvatar profile={comment.profile} username={comment.username} />

      <div className="flex-1">
        <CommentHeader
        commentId = {comment._id}
        userId = {comment.userId}
          username={comment.username}
          createdAt={comment.createdAt}
          onReply={toggleReply}
        />

        <p className="text-sm text-gray-700 mt-1">{comment.comment}</p>

        {replyingTo === comment._id && (
          <CommentInput
            isOpen={true}
            onSubmit={handleReplySubmit}
            placeholder={`Replying to ${comment.username}`}
          />
        )}

        <RepliesSection replies={comment.reply} commentId={comment._id} />
      </div>
    </li>
  );
};

export default CommentItem;
