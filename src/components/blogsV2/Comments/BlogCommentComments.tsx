import { FaUser } from "react-icons/fa";
import { formatTime } from "../../../utils/DateFormate";
import { BsThreeDots } from "react-icons/bs";
import CommentHeader from "../../modal/BlogModal/Comment/CommentHeader";
import { Comments, IBlogV2, IReply } from "../../../types/redux/blogInterface";
import { IUser } from "../../../types";
import { FiPlusCircle } from "react-icons/fi";
import { Dispatch, SetStateAction } from "react";

interface Props {
  post: IBlogV2;
  comments: Comments[];
  optionRef: React.RefObject<HTMLDivElement | null>;
  handleReplyComment: (
    commentId: string,
    userName: string,
    replyToUserId: string,
  ) => void;
  handleShowOption: (id: string) => void;
  activeOptionId: string | null;
  currentUser: IUser | null;
  reportModal: boolean;
  setReportModal: Dispatch<SetStateAction<boolean>>;
  setActiveOptionId: Dispatch<SetStateAction<string | null>>;
  handleDeleteComment: (commentId: string) => void;
  handleEditComment: (commentId: string) => void;
  openReplies: { [key: string]: boolean };
  repliesByComment: Record<string, IReply[]>;
  handleFetchReplies: (commentId: string) => void;
  setOpenReplies: Dispatch<SetStateAction<{ [key: string]: boolean }>>;
  hasMoreComments: boolean;
  fetchMoreComments: () => void;
}

const BlogCommentComments = ({
  comments,
  post,
  optionRef,
  handleReplyComment,
  handleShowOption,
  activeOptionId,
  currentUser,
  reportModal,
  setReportModal,
  setActiveOptionId,
  handleDeleteComment,
  handleEditComment,
  openReplies,
  repliesByComment,
  handleFetchReplies,
  setOpenReplies,
  hasMoreComments,
  fetchMoreComments,
}: Props) => {
  return (
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
                                  handleDeleteComment={handleDeleteComment}
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
                    <p className="text-xs text-gray-400">No replies yet</p>
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
  );
};

export default BlogCommentComments;
