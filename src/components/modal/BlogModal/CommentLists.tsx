import { useState } from "react";
import { User2 } from "lucide-react";
import { Comments } from "../../../types/redux/blogInterface";
import { formatTime } from "../../../utils/BlogCommentDate";
import CommentInput from "./CommentInput";

interface CommentsListProps {
  comments: Comments[];
  onClose: () => void;
  handleReplyComment: (commentId: string, replyText: string) => void;
}

const CommentsList: React.FC<CommentsListProps> = ({ comments, onClose, handleReplyComment }) => {
  const [replyingTo, setReplyingTo] = useState<string | null>(null);

 const handleReplySubmit = (text: string, commentId: string) => {
  handleReplyComment(commentId, text);
  setReplyingTo(null);
};


  return (
    <div className="relative">
      <button
        className="absolute right-2 top-2 text-gray-500 hover:text-red-500 text-2xl z-10"
        onClick={onClose}
      >
        &times;
      </button>

      {comments.length > 0 ? (
        <ul className="space-y-4 pt-10">
          {comments.map((comment, idx) => (
            <li
              key={idx}
              className="flex items-start gap-3 px-3 py-2 rounded-md"
            >
              {comment.profile ? (
                <img
                  src={comment.profile}
                  alt={comment.username}
                  className="w-8 h-8 rounded-full object-cover"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
                  <User2 className="w-5 h-5 text-gray-600" />
                </div>
              )}

              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <p className="font-semibold text-sm text-gray-800">
                    {comment.username}
                  </p>
                  {comment.createdAt && (
                    <span className="text-xs text-gray-500">
                      {formatTime(comment.createdAt)}
                    </span>
                  )}
                  <button
                    onClick={() => setReplyingTo(replyingTo === comment._id ? null : comment._id)}
                    className="text-xs text-blue-600 hover:underline"
                  >
                    Reply
                  </button>
                </div>

                <p className="text-sm text-gray-700 mt-1">{comment.comment}</p>

                {replyingTo === comment._id && (
                  <CommentInput
                    isOpen={true}
                    onSubmit={(text) => handleReplySubmit(text, comment._id)}
                    placeholder={`Replying to ${comment.username}`}
                  />
                )}

                {/* Replies */}
                {comment.reply?.length > 0 && (
                  <ul className="mt-3 space-y-2 pl-6 border-l-2 border-gray-200">
                    {comment.reply.map((rep, repIndex) => (
                      <li key={repIndex} className="flex items-start gap-2">
                        {rep.profile ? (
                          <img
                            src={rep.profile}
                            alt={rep.username}
                            className="w-6 h-6 rounded-full object-cover"
                          />
                        ) : (
                          <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center">
                            <User2 className="w-4 h-4 text-gray-600" />
                          </div>
                        )}
                        <div>
                          <div className="flex gap-2 items-center">
                            <span className="text-sm font-medium text-gray-800">
                              {rep.username}
                            </span>
                            {rep.createdAt && (
                              <span className="text-xs text-gray-500">
                                {formatTime(rep.createdAt)}
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-gray-700">
                            {rep.replyText}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 pt-6">No comments yet.</p>
      )}
    </div>
  );
};

export default CommentsList;
