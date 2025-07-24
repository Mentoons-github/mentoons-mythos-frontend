import { useState } from "react";
import ReplyItem from "./ReplyItem";

interface Reply {
  profile?: string;
  username: string;
  createdAt?: string;
  replyText: string;
}

interface RepliesSectionProps {
  replies: Reply[];
  commentId: string;
}

const RepliesSection: React.FC<RepliesSectionProps> = ({ replies }) => {
  const [isVisible, setIsVisible] = useState(false);

  if (!replies?.length) return null;

  return (
    <div className="mt- pl-3">
      <button
        onClick={() => setIsVisible(!isVisible)}
        className="text-xs text-blue-600 hover:underline"
      >
        {isVisible ? 'Hide Replies' : `View Replies (${replies.length})`}
      </button>
      
      {isVisible && (
        <ul className="mt-3 space-y-2 pl-6 border-l-2 border-gray-200">
          {replies.map((reply, index) => (
            <ReplyItem key={index} reply={reply} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default RepliesSection