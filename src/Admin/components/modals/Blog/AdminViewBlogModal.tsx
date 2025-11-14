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
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50 ">
      <div className="relative w-full max-w-[350px] md:max-w-2xl lg:max-w-4xl max-h-[90vh] overflow-y-auto rounded-xl shadow-lg p-4 md:p-8 bg-secondary hide-scrollbar will-change-scroll transform-gpu">
        <button
          className="absolute top-4 right-4 hover:text-muted-foreground"
          onClick={onClose}
        >
          <X size={22} />
        </button>

        {loading ? (
          <div className="flex justify-center items-center py-10">
            <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
            <span className="ml-3 ">Loading blog details...</span>
          </div>
        ) : blog ? (
          <div className="space-y-4 md:space-y-8">
            <h2 className="text-xl md:text-2xl font-semibold border-b  pb-3">
              Blog Details
            </h2>

            <div>
              <h3 className="text-lg font-semibold mb-3 text-blue-800">
                Blog Information
              </h3>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-muted-foreground">Title</p>
                  <p className="text-base font-medium">{blog.title}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Writer</p>
                  <p className="text-base font-medium">
                    {blog.writer || "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Writer ID</p>
                  <p className="text-base font-medium">
                    {blog.writerId || "N/A"}
                  </p>
                </div>

                <div className="col-span-2">
                  <p className="text-sm text-muted-foreground">Blog Image</p>
                  {blog.file ? (
                    <img
                      src={blog.file}
                      alt={blog.title}
                      className="mt-2 w-full max-h-60 object-cover rounded-lg border border-gray-700"
                    />
                  ) : (
                    <p className="text-muted-foreground">No Image Uploaded</p>
                  )}
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3 text-blue-800">Tags</h3>
              {blog.tags && blog.tags.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {blog.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="bg-muted-foreground px-3 py-1 rounded-lg text-sm"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">No tags</p>
              )}
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3 text-blue-800">
                Description
              </h3>
              <p className="text-base whitespace-pre-line">
                {blog.description}
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3 text-blue-800">
                Engagement
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div>
                  <p className="text-sm text-muted-foreground">Likes</p>
                  <p className="text-base font-medium">
                    {blog.likes?.length || 0}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Comments</p>
                  <p className="text-base font-medium">
                    {blog.commentCount || 0}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    Comments Enabled
                  </p>
                  <p className="text-base font-medium">
                    {blog.commentsOff ? "No" : "Yes"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Reports</p>
                  <p className="text-base font-medium">{blog.reportLength}</p>
                </div>
              </div>

              {blog.commentCount && blog.commentCount > 0 ? (
                <div className="mt-6">
                  <button
                    onClick={handleComment}
                    className="px-5 py-2 rounded-lg bg-blue-800 text-white font-semibold hover:bg-blue-700 transition-all"
                  >
                    {showComments ? "Hide Comments" : "Show Comments"}
                  </button>

                  {showComments && (
                    <div className="mt-5 space-y-4">
                      {comments.length > 0 ? (
                        comments.map((cmt, idx) => (
                          <div
                            key={idx}
                            className=" p-4 rounded-lg border  shadow-sm"
                          >
                            {/* Comment Header */}
                            <div className="flex justify-between items-center mb-2">
                              <p className="text-sm text-muted-foreground font-medium">
                                {cmt.username || "Anonymous"}
                                <span className="text-muted-foreground ml-2 text-xs">
                                  •{" "}
                                  {cmt.createdAt
                                    ? new Date(
                                        cmt.createdAt
                                      ).toLocaleDateString()
                                    : "N/A"}
                                </span>
                              </p>
                              <p className="text-xs text-red-500">
                                Reports: {cmt.reportLength || 0}
                              </p>
                            </div>

                            {/* Comment Text */}
                            <p className="text-base leading-relaxed">
                              {cmt.comment}
                            </p>

                            {/* Replies */}
                            {cmt.reply && cmt.reply.length > 0 && (
                              <div className="mt-3">
                                <button
                                  onClick={() =>
                                    setShowReplies((prev) => !prev)
                                  }
                                  className="text-sm text-blue-800 hover:underline"
                                >
                                  {showReplies
                                    ? "Hide Replies"
                                    : `View Replies (${cmt.reply.length})`}
                                </button>

                                {showReplies && (
                                  <div className="mt-3 pl-5 border-l  space-y-3">
                                    {cmt.reply.map((reply, rIdx) => (
                                      <div
                                        key={rIdx}
                                        className=" p-3 rounded-lg border "
                                      >
                                        <div className="flex justify-between items-center mb-1">
                                          <p className="text-sm text-muted-foreground font-medium">
                                            {reply.username || "Anonymous"}
                                            <span className="text-muted-foreground ml-2 text-xs">
                                              •{" "}
                                              {reply.createdAt
                                                ? new Date(
                                                    reply.createdAt
                                                  ).toLocaleDateString()
                                                : "N/A"}
                                            </span>
                                          </p>
                                        </div>
                                        <p className="text-sm leading-relaxed">
                                          {reply.replyText}
                                        </p>
                                      </div>
                                    ))}
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        ))
                      ) : (
                        <p className="text-muted-foreground text-sm">
                          No comments available
                        </p>
                      )}
                    </div>
                  )}
                </div>
              ) : (
                <p className="text-muted-foreground mt-4">No comments available</p>
              )}
            </div>

            <div className="md:flex justify-between text-sm text-muted-foreground border-t pt-4">
              <span >Created On: {formatToRealDate(blog?.createdAt)}</span>
              <span className="block md:inline">ID: {blog._id}</span>
            </div>
          </div>
        ) : (
          <p className="text-center text-muted-foreground">No blog data available.</p>
        )}
      </div>
    </div>
  );
};

export default AdminViewBlogModal;
