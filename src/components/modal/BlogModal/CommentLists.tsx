import { Comments } from "../../../types/redux/blogInterface";
import CloseButton from "./Comment/CloseButton";
import CommentItem from "./Comment/CommetItem";


interface CommentsListProps {
  comments: Comments[];
  onClose: () => void;
  handleReplyComment: (commentId: string, replyText: string) => void;
}

const CommentsList: React.FC<CommentsListProps> = ({ 
  comments, 
  onClose, 
  handleReplyComment 
}) => {
  return (
    <div className="relative">
      <CloseButton onClose={onClose} />

      {comments.length > 0 ? (
        <ul className="space-y-4 pt-10">
          {comments.map((comment, idx) => (
            <CommentItem 
              key={idx} 
              comment={comment} 
              onReply={handleReplyComment}
            />
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 pt-6">No comments yet.</p>
      )}
    </div>
  );
};

export default CommentsList;