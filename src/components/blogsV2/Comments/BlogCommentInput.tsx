import { Dispatch, SetStateAction } from "react";
import { IBlogV2, Reward } from "../../../types/redux/blogInterface";
import RewardModal from "../../modal/RewardModal";

interface Props {
  replyMeta: {
    commentId: string;
    userName: string;
    replyToUserId: string;
  } | null;
  setReplyMeta: Dispatch<
    SetStateAction<{
      commentId: string;
      userName: string;
      replyToUserId: string;
    } | null>
  >;
  post: IBlogV2;
  inputRef: React.RefObject<HTMLInputElement | null>;
  comment: string;
  setComment: Dispatch<SetStateAction<string>>;
  handleCommentSubmit: () => void;
  commentSubmitLoading: boolean;
  editCommentId: string | null;
  rewardModalOpen: boolean;
  onRewardModalClose: () => void;
  rewardPoints: Reward | null;
}

const BlogCommentInput = ({
  replyMeta,
  setReplyMeta,
  post,
  comment,
  inputRef,
  setComment,
  handleCommentSubmit,
  commentSubmitLoading,
  editCommentId,
  rewardModalOpen,
  onRewardModalClose,
  rewardPoints,
}: Props) => {
  return (
    <div className="border-t p-3">
      {/* Reply indicator */}
      {replyMeta && (
        <div className="text-xs mb-1 flex items-center justify-between">
          <span>
            Replying to{" "}
            <span className="text-blue-500 font-medium">
              @{replyMeta.userName}
            </span>
          </span>

          <button
            onClick={() => setReplyMeta(null)}
            className="text-gray-400 hover:text-red-500"
          >
            Cancel
          </button>
        </div>
      )}

      <div className="">
        {post.commentsOff ? (
          <p className="text-sm text-gray-400 text-center">
            Comments are turned off
          </p>
        ) : (
          <div className="flex items-center gap-2 relative">
            <input
              ref={inputRef}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder={
                replyMeta
                  ? `Reply to ${replyMeta.userName}...`
                  : "Add a comment..."
              }
              className="flex-1 px-3 py-2 outline-none text-sm"
            />

            <button
              onClick={handleCommentSubmit}
              disabled={!comment.trim() || commentSubmitLoading}
              className="text-blue-500 font-semibold disabled:opacity-40"
            >
              {editCommentId ? "Edit" : "Post"}
            </button>

            {rewardModalOpen && !editCommentId && (
              <RewardModal
                type="COMMENT"
                points={rewardPoints}
                onClose={onRewardModalClose}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogCommentInput;
