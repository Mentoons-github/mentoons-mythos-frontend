import { X } from "lucide-react";
import { Blog, Comments } from "../../../../types/redux/blogInterface";
import { useState } from "react";
import { formatToRealDate } from "../../../../utils/DateFormate";

const AdminViewBlogModal = ({
  onClose,
  blog,
  loading,
  commentShow,
  comments,
}: {
  onClose: () => void;
  blog: Blog | null;
  loading: boolean;
  commentShow: () => void;
  comments: Comments[];
}) => {
  const [showComments, setShowComments] = useState(false);
  const [showReplies, setShowReplies] = useState(false);

  console.log(comments, "blog");
  const handleComment = () => {
    setShowComments((pre) => !pre);
    commentShow();
  };
  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50 text-white">
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-xl shadow-lg p-8 bg-gradient-to-t from-[#141414] to-[#2b2b2b] hide-scrollbar will-change-scroll transform-gpu">
        <button
          className="absolute top-4 right-4 text-gray-300 hover:text-white"
          onClick={onClose}
        >
          <X size={22} />
        </button>

        {loading ? (
          <div className="flex justify-center items-center py-10">
            <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
            <span className="ml-3 text-gray-400">Loading blog details...</span>
          </div>
        ) : blog ? (
          <div className="space-y-8">
            <h2 className="text-2xl font-semibold border-b border-gray-600 pb-3">
              Blog Details
            </h2>

            <div>
              <h3 className="text-lg font-semibold mb-3 text-[#E39712]">
                Blog Information
              </h3>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-gray-400">Title</p>
                  <p className="text-base font-medium">{blog.title}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Writer</p>
                  <p className="text-base font-medium">
                    {blog.writer || "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Writer ID</p>
                  <p className="text-base font-medium">
                    {blog.writerId || "N/A"}
                  </p>
                </div>

                <div className="col-span-2">
                  <p className="text-sm text-gray-400">Blog Image</p>
                  {blog.file ? (
                    <img
                      src={blog.file}
                      alt={blog.title}
                      className="mt-2 w-full max-h-60 object-cover rounded-lg border border-gray-700"
                    />
                  ) : (
                    <p className="text-gray-400">No Image Uploaded</p>
                  )}
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3 text-[#E39712]">
                Tags
              </h3>
              {blog.tags && blog.tags.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {blog.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="bg-gray-700 px-3 py-1 rounded-lg text-sm"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-gray-400">No tags</p>
              )}
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3 text-[#E39712]">
                Description
              </h3>
              <p className="text-base whitespace-pre-line">
                {blog.description}
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3 text-[#E39712]">
                Engagement
              </h3>
              <div className="grid grid-cols-4 gap-6">
                <div>
                  <p className="text-sm text-gray-400">Likes</p>
                  <p className="text-base font-medium">
                    {blog.likes?.length || 0}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Comments</p>
                  <p className="text-base font-medium">
                    {blog.commentCount || 0}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Comments Enabled</p>
                  <p className="text-base font-medium">
                    {blog.commentsOff ? "No" : "Yes"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Total Reports</p>
                  <p className="text-base font-medium">{blog.reportLength}</p>
                </div>
              </div>

              {blog.commentCount && blog.commentCount > 0 && (
                <button
                  onClick={handleComment}
                  className="mt-4 px-4 py-2 rounded-lg bg-[#E39712] text-black font-semibold hover:bg-[#c97f0a] transition-all"
                >
                  {showComments ? "Hide Comments" : "Show Comments"}
                </button>
              )}
            </div>

            {comments.length > 0 ? (
              comments.map((cmt, idx: number) => {
                return (
                  <div
                    key={idx}
                    className="bg-gray-800/50 p-3 rounded-lg border border-gray-700"
                  >
                    <div className="flex justify-between text-sm text-gray-400">
                      <p>
                        {cmt.username || "Anonymous"} •{" "}
                        {cmt.createdAt
                          ? new Date(cmt.createdAt).toLocaleDateString()
                          : "N/A"}
                      </p>
                      <p className="text-xs text-red-400">
                        Reports: {cmt.reportLength || 0}
                      </p>
                    </div>

                    <p className="text-base mt-1">{cmt.comment}</p>

                    {cmt.reply && cmt.reply.length > 0 && (
                      <button
                        onClick={() => setShowReplies(!showReplies)}
                        className="mt-2 text-sm text-[#E39712] hover:underline"
                      >
                        {showReplies
                          ? "Hide Replies"
                          : `View Replies (${cmt.reply.length})`}
                      </button>
                    )}

                    {showReplies && cmt.reply && (
                      <div className="mt-3 pl-5 border-l-2 border-gray-600 space-y-3">
                        {cmt.reply.map((reply, rIdx) => (
                          <div
                            key={rIdx}
                            className="bg-gray-700/40 p-2 rounded-lg border border-gray-600"
                          >
                            <div className="flex justify-between text-sm text-gray-400">
                              <p>
                                {reply.username || "Anonymous"} •{" "}
                                {reply.createdAt
                                  ? new Date(
                                      reply.createdAt
                                    ).toLocaleDateString()
                                  : "N/A"}
                              </p>
                            </div>
                            <p className="text-base mt-1">{reply.replyText}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })
            ) : (
              <p className="text-gray-400">No comments available</p>
            )}

            <div className="flex justify-between text-sm text-gray-400 border-t border-gray-600 pt-4">
              <span>
                Created On:{" "}
                 {formatToRealDate(blog?.createdAt)}
              </span>
              <span>ID: {blog._id}</span>
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-400">No blog data available.</p>
        )}
      </div>
    </div>
  );
};

export default AdminViewBlogModal;
