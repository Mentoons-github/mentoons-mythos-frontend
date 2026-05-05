import { CalendarDays, MapPin, X } from "lucide-react";
import {
  Comments,
  IBlogV2,
  IReply,
  Reward,
} from "../../../../types/redux/blogInterface";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";

import { BlogFormatDate } from "../../../../utils/DateFormate";
import { format } from "date-fns";
import { formatTime } from "../../../../utils/BlogCommentDate";
import { FaUser } from "react-icons/fa";
import RewardModal from "../../RewardModal";
import { resetBlogSlice } from "../../../../features/blog/blogSlice";
import { useAppDispatch } from "../../../../hooks/reduxHooks";
import { BsThreeDots } from "react-icons/bs";
import { IUser } from "../../../../types";
import CommentHeader from "../Comment/CommentHeader";
import { FiPlusCircle } from "react-icons/fi";

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
  const isImage = media?.type === "image";
  const isVideo = media?.type === "video";
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
        {hasMedia && (
          <div className="w-full lg:w-1/2 bg-background/80 flex items-center justify-center max-h-[40vh] lg:max-h-full">
            {isImage && (
              <img src={media.url} className="w-full h-full object-contain" />
            )}
            {isVideo && (
              <video
                src={media.url}
                controls
                className="w-full h-full object-contain"
              />
            )}
          </div>
        )}

        {/* RIGHT SIDE */}
        <div
          className={`w-full ${
            hasMedia ? "lg:w-1/2" : "w-full"
          } flex flex-col min-h-0 h-full`}
        >
          {/* HEADER */}
          <div className="p-4 border-b flex items-center gap-3">
            <div className="flex-shrink-0 flex justify-end  w-10 h-10 overflow-hidden rounded-full bg-muted-foreground ">
              {post.user?.profilePicture ? (
                <img
                  src={post.user?.profilePicture}
                  alt={post.user?.lastName || "User"}
                  className="object-cover w-full h-full cursor-pointer"
                />
              ) : (
                <FaUser className="w-8 h-8 mx-auto my-auto text-background" />
              )}
            </div>
            <div>
              <p className="font-semibold">
                {post.user?.firstName} {post.user?.lastName}
              </p>
              <p className="text-xs text-muted-foreground">
                {post.createdAt && BlogFormatDate(post.createdAt)}
              </p>
            </div>
          </div>
          {media?.caption && (
            <div className="p-4 space-y-3 ">
              <p className="text-sm text-muted-foreground">{media.caption}</p>
            </div>
          )}

          {/* POST CONTENT */}
          <div className="p-4 space-y-3 ">
            {/* TEXT POST */}
            {post.postType === "text" && (
              <p className="text-sm text-muted-foreground">{post.content}</p>
            )}

            {/* ARTICLE */}
            {post.postType === "article" && (
              <div>
                <h2 className="font-semibold text-lg">{post.article?.title}</h2>
                <p className="text-sm text-muted-foreground mt-1">
                  {post.article?.body}
                </p>
              </div>
            )}

            {/* EVENT */}
            {post.postType === "event" && (
              <div className="space-y-1">
                <h2 className="text-lg font-semibold text-foreground/80">
                  {post.event?.title || "Untitled Event"}
                </h2>

                {post.event?.description && (
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {post.event.description}
                  </p>
                )}

                <div className="space-y-2 text-sm text-muted-foreground">
                  {post.event?.venue && (
                    <div className="flex items-center gap-2">
                      <MapPin size={16} />
                      <span>{post.event.venue}</span>
                    </div>
                  )}

                  {(post.event?.startDate || post.event?.endDate) && (
                    <div className="flex items-center gap-2">
                      <CalendarDays size={16} />
                      <span>
                        {post.event?.startDate &&
                          format(new Date(post.event.startDate), "dd MMM yyyy")}
                        {post.event?.endDate && " - "}
                        {post.event?.endDate &&
                          format(new Date(post.event.endDate), "dd MMM yyyy")}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* CAPTION (for media posts) */}
            {post.content && post.postType !== "text" && (
              <p className="text-sm text-muted-foreground">{post.content}</p>
            )}

            {/* TAGS */}
            {post.tags && post?.tags?.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {post?.tags.map((tag: string, i: number) => (
                  <span
                    key={i}
                    className="text-xs bg-muted px-2 py-1 rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* COMMENTS */}
          <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-5 hide-scrollbar z-50">
            {post.commentsOff ? (
              <p className="text-muted-foreground text-sm text-center">
                Comments are turned off
              </p>
            ) : comments?.length ? (
              comments.map((c) => (
                <div key={c._id} className="flex items-start gap-3 group">
                  <div className="flex-shrink-0 flex justify-end  w-8 h-8 overflow-hidden rounded-full bg-muted-foreground ">
                    {c.userId?.profilePicture ? (
                      <img
                        src={c.userId?.profilePicture}
                        alt={c.userId.lastName || "User"}
                        className="object-cover w-full h-full cursor-pointer"
                      />
                    ) : (
                      <FaUser className="w-6 h-6 mx-auto my-auto text-background" />
                    )}
                  </div>

                  <div className="flex flex-col space-y-3">
                    <div>
                      <div className="text-sm ">
                        <span className="font-semibold text-primary mr-2">
                          {c.userId.firstName + " " + c.userId.lastName}
                        </span>
                        <span className="text-foreground/80 break-words break-all whitespace-pre-wrap min-w-0 ">
                          {c.comment}
                        </span>
                      </div>

                      <div className="flex items-center gap-4 mt-1 text-xs text-muted-foreground">
                        {c.createdAt && <span>{formatTime(c.createdAt)}</span>}

                        <button
                          className="hover:text-blue-600 font-medium"
                          onClick={() =>
                            handleReplyComment(
                              c._id,
                              c?.userId?.firstName + " " + c?.userId?.lastName,
                              c?.userId?._id as string,
                            )
                          }
                        >
                          Reply
                        </button>
                        <div className="relative" ref={optionRef}>
                          <BsThreeDots
                            className="block lg:hidden lg:group-hover:block cursor-pointer text-lg"
                            onClick={() => handleShowOption(c._id)}
                          />
                          {activeOptionId === c._id && (
                            <CommentHeader
                              commentId={c._id}
                              commentUserId={c.userId._id as string}
                              currentUser={currentUser}
                              reportModal={reportModal}
                              handleReportOption={() => setReportModal(true)}
                              onClose={() => setActiveOptionId(null)}
                              handleDeleteComment={handleDeleteComment}
                              handleEditComment={handleEditComment}
                              onCloseReportModal={() => {
                                setReportModal(false);
                                setActiveOptionId(null);
                              }}
                            />
                          )}
                        </div>
                      </div>
                    </div>

                    {openReplies[c._id] && (
                      <div className="ml-5 mt-2 border-l pl-3 space-y-3">
                        {repliesByComment[c._id]?.length ? (
                          repliesByComment[c._id].map((r) => (
                            <div key={r._id} className="flex items-start gap-2">
                              <div className="flex-shrink-0 flex justify-end  w-6 h-6 overflow-hidden rounded-full bg-muted-foreground ">
                                {r.userId?.profilePicture ? (
                                  <img
                                    src={r.userId?.profilePicture}
                                    alt={r.userId?.firstName || "User"}
                                    className="object-cover w-full h-full cursor-pointer"
                                  />
                                ) : (
                                  <FaUser className="w-4 h-4 mx-auto my-auto text-background" />
                                )}
                              </div>

                              <div className="text-sm">
                                <div>
                                  <span className="font-semibold mr-2">
                                    {r.userId.firstName} {r.userId.lastName}
                                  </span>

                                  {r.replyToUserId && (
                                    <span className="text-blue-500 mr-1 font-medium">
                                      @
                                      {r.replyToUserId.firstName +
                                        " " +
                                        r.replyToUserId.lastName}
                                    </span>
                                  )}

                                  <span className="text-foreground/80 break-words break-all whitespace-pre-wrap min-w-0">
                                    {r.replyText}
                                  </span>
                                </div>

                                <div className="text-xs text-muted-foreground mt-1 flex gap-3">
                                  {r.createdAt && (
                                    <span>{formatTime(r.createdAt)}</span>
                                  )}

                                  <button
                                    onClick={() =>
                                      handleReplyComment(
                                        c._id,
                                        `${r.userId.firstName} ${r.userId.lastName}`,
                                        r?.userId?._id as string,
                                      )
                                    }
                                    className="hover:text-blue-500 font-medium"
                                  >
                                    Reply
                                  </button>
                                  <div className="relative" ref={optionRef}>
                                    <BsThreeDots
                                      className="block lg:hidden lg:group-hover:block cursor-pointer text-lg"
                                      onClick={() =>
                                        handleShowOption(r._id as string)
                                      }
                                    />
                                    {activeOptionId === r._id && (
                                      <CommentHeader
                                        commentId={r._id}
                                        commentUserId={r.userId._id as string}
                                        currentUser={currentUser}
                                        reportModal={reportModal}
                                        handleReportOption={() =>
                                          setReportModal(true)
                                        }
                                        onClose={() => setActiveOptionId(null)}
                                        handleDeleteComment={
                                          handleDeleteComment
                                        }
                                        onCloseReportModal={() => {
                                          setReportModal(false);
                                          setActiveOptionId(null);
                                        }}
                                        handleEditComment={handleEditComment}
                                      />
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))
                        ) : (
                          <p className="text-xs text-gray-400">
                            No replies yet
                          </p>
                        )}
                        {repliesByComment[c._id]?.length < c.replyCount && (
                          <button
                            onClick={() => handleFetchReplies(c._id)}
                            className="text-2xl flex items-center justify-center w-full"
                          >
                            <FiPlusCircle />
                          </button>
                        )}
                      </div>
                    )}

                    {c.replyCount > 0 && (
                      <button
                        className="text-xs ml-5 text-gray-500 hover:text-blue-500 self-start"
                        onClick={() => {
                          const isOpening = !openReplies[c._id];

                          setOpenReplies((prev) => ({
                            ...prev,
                            [c._id]: isOpening,
                          }));

                          if (isOpening) {
                            handleFetchReplies(c._id);
                          }
                        }}
                      >
                        {openReplies[c._id]
                          ? "Hide replies"
                          : `View replies (${c.replyCount})`}
                      </button>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-muted-foreground text-sm">No comments yet</p>
            )}

            {hasMoreComments && (
              <button
                onClick={fetchMoreComments}
                className="text-2xl flex items-center justify-center w-full"
              >
                <FiPlusCircle />
              </button>
            )}
          </div>

          {/* INPUT */}
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
                      onClose={() => {
                        setRewardModalOpen(false);
                        dispatch(resetBlogSlice());
                      }}
                    />
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogForComment;
