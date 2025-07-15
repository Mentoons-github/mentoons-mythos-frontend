import { motion } from "framer-motion";
import { Blog } from "../../types/redux/blogInterface";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { AiOutlineLike } from "react-icons/ai";
import { GoComment } from "react-icons/go";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { commentBlogThunk, likeBlogThunk } from "../../features/blog/blogThunk";
import { AiFillLike } from "react-icons/ai";

interface Props {
  post: Blog;
  onClose: () => void;
  userId: string;
}

const SinglePostModal = ({ post, onClose, userId }: Props) => {
  const dispatch = useAppDispatch();
  const [inputOpen, setInputOpen] = useState(false);
  const [input, setInput] = useState<string>("");
  const postFromRedux = useAppSelector((state) =>
    state.blog.data.find((b) => b._id === post._id)
  );

  const currentPost = postFromRedux || post;

  console.log(input, "input");

  const handleLike = (blogId?: string) => {
    if (!blogId) return;
    dispatch(likeBlogThunk(blogId));
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const handleSubmit = (
    e: React.FormEvent<HTMLFormElement>,
    blogId?: string
  ) => {
    e.preventDefault();
    console.log(blogId,'blogidddd')
    if (!blogId) return;
    dispatch(commentBlogThunk({ blogId, comment: input }));
    setInput(""); // Optionally clear input after comment
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
      <motion.div
        className="bg-white p-6 rounded-lg w-full max-w-xl shadow-xl max-h-[100vh]"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">{post.title}</h2>
          <button
            className="text-gray-500 hover:text-red-500 text-2xl"
            onClick={onClose}
          >
            &times;
          </button>
        </div>

        <img
          src={post.file || "/assets/logo/Logo 2.png"}
          alt={post.title}
          className="w-full h-58 object-cover rounded-md mb-4"
        />

        <p className="text-sm text-gray-600 mb-2">
          <span className="font-semibold text-purple-700">{post.writer}</span> •{" "}
          {post.createdAt && (
            <span>{format(new Date(post.createdAt), "dd MMM yyyy")}</span>
          )}
        </p>

        <div className="max-h-56 overflow-y-auto pr-2 mb-4">
          <p className="text-gray-800 whitespace-pre-line">
            {post.description}
          </p>
        </div>

        <div className="flex gap-2 flex-wrap">
          {Array.isArray(post.tags) &&
            post.tags.map((tag, idx) => (
              <span
                key={idx}
                className="bg-gray-200 text-sm text-green-600 font-medium px-3 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
        </div>
        {inputOpen && (
          <form
            className="flex mt-2 h-8 space-x-4 pr-4"
            onSubmit={(e) => handleSubmit(e, post._id)}
          >
            <input
              type="text"
              name="input"
              id=""
              onChange={(e) => setInput(e.target.value)}
              className="w-full border-2 pl-3 text-sm rounded-md font-semibold"
              placeholder="Write comments"
            />
            <button type="submit">Post</button>
          </form>
        )}
        <div className="flex justify-between mt-2">
          <div className=" flex space-x-5">
            <div
              className="flex items-center space-x-2 cursor-pointer"
              onClick={() => handleLike(post._id)}
            >
              {currentPost?.likes?.includes(userId) ? (
                <AiFillLike className="text-2xl " />
              ) : (
                <AiOutlineLike className="text-2xl text-gray-700" />
              )}
              <p className="text-sm font-medium">
                {currentPost?.likes?.includes(userId) ? "Unlike" : "Like"}
              </p>
            </div>

            <div
              className="flex space-x-1 cursor-pointer"
              onClick={() => setInputOpen(true)}
            >
              <GoComment className="text-2xl" />
              <p>Comment</p>
            </div>
          </div>
          <div className="flex space-x-6">
            <div>{currentPost?.likes?.length || 0} Likes</div>
            <div className="cursor-pointer">
              {currentPost?.comments?.length || 0} Comments
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SinglePostModal;
