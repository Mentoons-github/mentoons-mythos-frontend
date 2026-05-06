import { X } from "lucide-react";
import {
  Comments,
  IBlogV2,
  IReply,
  Reward,
} from "../../../../types/redux/blogInterface";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";

import { resetBlogSlice } from "../../../../features/blog/blogSlice";
import { useAppDispatch } from "../../../../hooks/reduxHooks";
import { IUser } from "../../../../types";

import BlogCommentsLeft from "../../../blogsV2/Comments/BlogCommentsLeft";
import BlogCommentRightHeader from "../../../blogsV2/Comments/BlogCommentRightHeader";
import BlogCommentPostContent from "../../../blogsV2/Comments/BlogCommentPostContent";
import BlogCommentComments from "../../../blogsV2/Comments/BlogCommentComments";
import BlogCommentInput from "../../../blogsV2/Comments/BlogCommentInput";

const BlogForComment = ({
  post,
  onClose,
  handleCommentSubmit,
  comments,
  comment,
  setComment,
  commentSubmitLoading,
  handleReplyComment,
  replyMeta,
  setReplyMeta,
  replyComments,
  openReplies,
  setOpenReplies,
  handleFetchReplies,
  rewardPoints,
  rewardModalOpen,
  setRewardModalOpen,
  currentUser,
  handleDeleteComment,
  handleEditComment,
  editCommentId,
  fetchMoreComments,
  hasMoreComments,
}: {
  post: IBlogV2;
  onClose: () => void;
  handleCommentSubmit: () => void;
  comments: Comments[];
  comment: string;
  setComment: Dispatch<SetStateAction<string>>;
  commentSubmitLoading: boolean;
  handleReplyComment: (
    commentId: string,
    userName: string,
    replyToUserId: string,
  ) => void;
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
  replyComments: IReply[];
  openReplies: { [key: string]: boolean };
  setOpenReplies: Dispatch<SetStateAction<{ [key: string]: boolean }>>;
  handleFetchReplies: (commentId: string) => void;
  setRewardModalOpen: Dispatch<SetStateAction<boolean>>;
  rewardModalOpen: boolean;
  rewardPoints: Reward | null;
  currentUser: IUser | null;
  handleDeleteComment: (commentId: string) => void;
  handleEditComment: (commentId: string) => void;
  editCommentId: string | null;
  fetchMoreComments: () => void;
  hasMoreComments: boolean;
}) => {
  const media = post?.media?.[0];
  const hasMedia = !!media;
  const inputRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();
  const [activeOptionId, setActiveOptionId] = useState<string | null>(null);

  const [reportModal, setReportModal] = useState(false);

  const optionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if ((replyMeta || editCommentId) && inputRef.current) {
      inputRef.current.focus();
    }
  }, [editCommentId, replyMeta]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const repliesByComment = replyComments.reduce(
    (acc, r) => {
      if (!acc[r?.commentId]) acc[r?.commentId] = [];
      acc[r.commentId].push(r);
      return acc;
    },
    {} as Record<string, IReply[]>,
  );

  const handleShowOption = (id: string) => {
    setActiveOptionId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center overflow-hidden">
      <X
        onClick={onClose}
        className="absolute top-5 right-5 text-gray-700 lg:text-gray-100 cursor-pointer"
      />
      <div
        className={`bg-background rounded-lg h-[100dvh] lg:h-[90vh] w-full mx-2 sm:mx-4 md:mx-0
                    flex flex-col ${hasMedia ? "lg:flex-row max-w-5xl" : "max-w-xl"}
                    overflow-hidden
                  `}
      >
        {/* LEFT: MEDIA */}
        {hasMedia && <BlogCommentsLeft media={media} />}

        {/* RIGHT SIDE */}
        <div
          className={`w-full ${
            hasMedia ? "lg:w-1/2" : "w-full"
          } flex flex-col min-h-0 h-full`}
        >
          <BlogCommentRightHeader post={post} />

          <BlogCommentPostContent media={media} post={post} />

          <BlogCommentComments
            activeOptionId={activeOptionId}
            comments={comments}
            currentUser={currentUser}
            fetchMoreComments={fetchMoreComments}
            handleDeleteComment={handleDeleteComment}
            handleEditComment={handleEditComment}
            handleFetchReplies={handleFetchReplies}
            handleReplyComment={handleReplyComment}
            handleShowOption={handleShowOption}
            hasMoreComments={hasMoreComments}
            openReplies={openReplies}
            optionRef={optionRef}
            post={post}
            repliesByComment={repliesByComment}
            reportModal={reportModal}
            setActiveOptionId={setActiveOptionId}
            setOpenReplies={setOpenReplies}
            setReportModal={setReportModal}
          />

          {/* INPUT */}
          <BlogCommentInput
            comment={comment}
            commentSubmitLoading={commentSubmitLoading}
            editCommentId={editCommentId}
            handleCommentSubmit={handleCommentSubmit}
            inputRef={inputRef}
            onRewardModalClose={() => {
              setRewardModalOpen(false);
              dispatch(resetBlogSlice());
            }}
            post={post}
            replyMeta={replyMeta}
            rewardModalOpen={rewardModalOpen}
            rewardPoints={rewardPoints}
            setComment={setComment}
            setReplyMeta={setReplyMeta}
          />
        </div>
      </div>
    </div>
  );
};

export default BlogForComment;
