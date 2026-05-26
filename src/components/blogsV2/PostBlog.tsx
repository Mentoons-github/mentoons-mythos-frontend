import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import RewardModal from "../modal/RewardModal";
import { resetBlogSlice } from "../../features/blog/blogSlice";
import { createBlogThunk } from "../../features/blog/blogThunk";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import useSignInSignUp from "../../hooks/useSignInSignUpModal";
import { IUser } from "../../types";
import { useNavigate } from "react-router-dom";
import { Image, Video, Calendar, PenSquare } from "lucide-react";
import PostUploadModal from "../modal/BlogModal/BlogUpload/PostUploadModal";
import { FaUser } from "react-icons/fa6";
import BadgeRewardModal from "../modal/badge/BadgeRewardModal";

type PostType = "image" | "video" | "event" | "article" | "text" | null;

const PHOTO_POST = [
  {
    icon: Image,
    purpose: "image",
  },
  {
    icon: Video,
    purpose: "Video",
  },
  {
    icon: Calendar,
    purpose: "Event",
  },
  {
    icon: PenSquare,
    purpose: "Article",
  },
];

const PostBlog = ({ user }: { user: IUser }) => {
  const dispatch = useAppDispatch();
  const { showModal } = useSignInSignUp();

  const [rewardModalOpen, setRewardModalOpen] = useState(false);
  const navigate = useNavigate();
  const textInputRef = useRef<HTMLDivElement | null>(null);
  const [isTextInputActive, setIsTextInputActive] = useState(false);
  const [selectedPostType, setSelectedPostType] = useState<PostType>(null);
  const [badgeModalOpen, setBadgeModalOpen] = useState(false);

  const [input, setInput] = useState({
    tags: "",
    description: "",
    commentsOff: false,
  });
  const { error, loading, message, createblogSuccess, rewardPoints, badge } =
    useAppSelector((state) => state.blog);

  // const wordCount = input.description.trim().split(/\s+/).length;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        textInputRef.current &&
        !textInputRef.current.contains(event.target as Node)
      ) {
        setIsTextInputActive(false);
      }
    };

    if (isTextInputActive) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isTextInputActive]);

  useEffect(() => {
    if (createblogSuccess) {
      toast.success(message);
      setRewardModalOpen(true);
      if (badge?.name) {
        setBadgeModalOpen(true);
      }
    }
    if (error) {
      toast.error(error);
      dispatch(resetBlogSlice());
    }
  }, [badge?.name, createblogSuccess, dispatch, error, message, rewardPoints]);

  const handleSelectPostType = (type: PostType) => {
    if (!user) {
      showModal("Blog");
      return;
    }
    setSelectedPostType(type);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    if (name === "description") {
      const words = value.trim().split(/\s+/).filter(Boolean);
      if (words.length > 500) return;
    }

    setInput({ ...input, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      showModal("Blog");
      return;
    }

    const payload = {
      postType: "text" as const,
      content: input.description,
      tags: input.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
      commentsOff: input.commentsOff,
    };

    dispatch(createBlogThunk(payload));
    setInput({ description: "", tags: "", commentsOff: false });
  };

  return (
    <motion.div
      className=""
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <motion.h1
        className=" text-2xl md:text-lg ml-3 md:ml-0 font-medium mb-4 "
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Start Blogging
      </motion.h1>

      <div className="relative flex flex-col w-full p-5 bg- border border-muted-foreground rounded-2xl shadow-md ">
        {/* Top Section: Avatar + Blog Input */}
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 flex justify-end w-10 h-10 md:w-12 md:h-12 overflow-hidden rounded-full ring-2 ">
            {user?.profilePicture ? (
              <img
                onClick={() => navigate("/adda/user-profile")}
                src={user?.profilePicture}
                alt={user?.firstName + " " + user.lastName || "User"}
                className="object-cover w-full h-full cursor-pointer"
              />
            ) : (
              <FaUser className="w-6 h-6 md:w-8 md:h-8 mx-auto my-auto text-gray-400" />
            )}
          </div>

          <div ref={textInputRef} className="flex flex-col w-full gap-3">
            {isTextInputActive ? (
              <div>
                <textarea
                  rows={5}
                  placeholder="✍️ Share your thoughts..."
                  value={input.description}
                  onChange={handleChange}
                  name="description"
                  autoFocus
                  className="w-full resize-none px-4 py-3 text-sm border  rounded-xl font-inter focus:outline-none focus:ring  transition"
                />
                <div className="w-full">
                  <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                    Tags (seperate by coma)
                  </label>
                  <input
                    type="text"
                    value={input.tags}
                    onChange={handleChange}
                    name="tags"
                    className="w-full resize-none px-4 py-3 text-sm border rounded-xl font-inter focus:outline-none focus:ring transition"
                    placeholder="tag1, tag2, tag3"
                  />
                </div>
              </div>
            ) : (
              <input
                type="text"
                placeholder="✍️ Share your thoughts..."
                value={input.description}
                name="description"
                onChange={handleChange}
                onFocus={() => setIsTextInputActive(true)}
                className="w-full px-4 py-3 text-sm border  rounded-xl font-inter focus:outline-none focus:ring  transition"
              />
            )}
            {input.description.trim() && (
              <div className="flex justify-end">
                <button
                  onClick={handleSubmit}
                  disabled={
                    input.description.trim() === ""
                    // input.title.trim() === "" ||
                    // wordCount < 20 ||
                    // wordCount > 250
                  }
                  className="px-5 py-2 text-sm font-semibold text-background bg-foreground rounded-lg shadow hover:bg-foreground/80 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                >
                  {loading ? "Publishing..." : "Publish"}
                </button>
              </div>
            )}
          </div>
        </div>

        <hr className="w-full my-4 border-t " />

        <div className="flex items-center justify-between gap-1">
          {PHOTO_POST.map(({ icon: Icon, purpose }, index) => (
            <button
              key={index}
              onClick={() =>
                handleSelectPostType(purpose.toLocaleLowerCase() as PostType)
              }
              className="group relative flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium text-muted-foreground transition rounded-lg hover:bg-foreground/60 hover:text-muted flex-1"
            >
              <Icon className="w-5 h-5" />

              <span className="figtree hidden sm:inline whitespace-nowrap">
                {purpose}
              </span>

              <span className="sm:hidden absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs rounded px-2 py-1 whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-10">
                {purpose}
              </span>
            </button>
          ))}
        </div>
      </div>

      {rewardModalOpen && (
        <RewardModal
          type="POST"
          points={rewardPoints}
          onClose={() => {
            setRewardModalOpen(false);
            dispatch(resetBlogSlice());
          }}
        />
      )}

      {selectedPostType && (
        <PostUploadModal
          onClose={() => setSelectedPostType(null)}
          postType={selectedPostType}
        />
      )}

      {badgeModalOpen && (
        <BadgeRewardModal
          open={badgeModalOpen}
          onClose={() => setBadgeModalOpen(false)}
          badge={badge}
        />
      )}
    </motion.div>
  );
};

export default PostBlog;
