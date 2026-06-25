import { X } from "lucide-react";
import {
  Comments,
  IBlogV2,
  IReply,
} from "../../../../types/redux/blogInterface";
import BlogCommentsLeft from "../../../../components/blogsV2/Comments/BlogCommentsLeft";
import BlogCommentRightHeader from "../../../../components/blogsV2/Comments/BlogCommentRightHeader";
import BlogCommentPostContent from "../../../../components/blogsV2/Comments/BlogCommentPostContent";
import { FaUser } from "react-icons/fa";
import { formatTime } from "../../../../utils/BlogCommentDate";
import { FiPlusCircle } from "react-icons/fi";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../hooks/reduxHooks";
import { toast } from "sonner";
import { resetBlogSlice } from "../../../../features/blog/blogSlice";

const AdminViewBlogModal = ({
  onClose,
  post,
  comments,
  replyComments,
  commentTotal,
  handleFetchReplies,
  loading,
  openReplies,
  setOpenReplies,
  fetchComments,
}: {
  onClose: () => void;
  post: IBlogV2 | null;
  loading: boolean;
  comments: Comments[];
  replyComments: IReply[];
  commentTotal: number;
  replyCommentTotal: number;
  openReplies: { [key: string]: boolean };
  handleFetchReplies: (commentId: string) => void;
  setOpenReplies: Dispatch<SetStateAction<{ [key: string]: boolean }>>;
  fetchComments: () => void;
}) => {
  const [viewOption, setViewOption] = useState(false);
  const dispatch = useAppDispatch();
  const { actionLoading, actionSuccess, message, error } = useAppSelector(
    (state) => state.blog,
  );

  useEffect(() => {
    if (actionSuccess) {
      toast.success(message);
      dispatch(resetBlogSlice());
      setViewOption(false);
    }
    if (error) {
      toast.error(error);
      dispatch(resetBlogSlice());
      setViewOption(false);
    }
  }, [actionSuccess, actionLoading, dispatch, error, message, setViewOption]);

  const repliesByComment = replyComments.reduce(
    (acc, r) => {
      if (!acc[r?.commentId]) acc[r?.commentId] = [];
      acc[r.commentId].push(r);
      return acc;
    },
    {} as Record<string, IReply[]>,
  );

  const media = post?.media?.[0];
  const hasMedia = !!media;

  console.log(viewOption, "vieeewwww");

  const handleOptionClick = () => {
    setViewOption((prev) => !prev);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center overflow-hidden"
      onClick={onClose}
    >
      <X
        onClick={onClose}
        className="absolute top-5 right-5 text-gray-700 lg:text-gray-100 cursor-pointer"
      />
      {loading ? (
        <div></div>
      ) : (
        <div
          className={`bg-background rounded-lg h-[100dvh] lg:h-[90vh] w-full mx-2 sm:mx-4 md:mx-0
                    flex flex-col ${hasMedia ? "lg:flex-row max-w-5xl" : "max-w-xl"}
                    overflow-hidden
                  `}
          onClick={(e) => e.stopPropagation()}
        >
          {/* LEFT: MEDIA */}
          {hasMedia && <BlogCommentsLeft media={media} />}

          {/* RIGHT SIDE */}
          <div
            className={`w-full ${
              hasMedia ? "lg:w-1/2" : "w-full"
            } flex flex-col min-h-0 h-full`}
          >
            <BlogCommentRightHeader
              post={post}
              from="admin"
              handleOptionClick={handleOptionClick}
              viewOption={viewOption}
            />

            <BlogCommentPostContent media={media} post={post} />

            <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-5 hide-scrollbar z-50">
              {post?.commentsOff ? (
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
                          {c.createdAt && (
                            <span>{formatTime(c.createdAt)}</span>
                          )}
                        </div>
                      </div>

                      {openReplies[c._id] && (
                        <div className="ml-5 mt-2 border-l pl-3 space-y-3">
                          {repliesByComment[c._id]?.length ? (
                            repliesByComment[c._id].map((r) => (
                              <div
                                key={r._id}
                                className="flex items-start gap-2"
                              >
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

              {comments.length < commentTotal && (
                <button
                  onClick={fetchComments}
                  className="text-2xl flex items-center justify-center w-full"
                >
                  <FiPlusCircle />
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminViewBlogModal;
