import { motion } from "framer-motion";
import { IBlogV2 } from "../../types/redux/blogInterface";
import {
  BookOpen,
  Sparkles,
  Stars,
  Moon,
  MapPin,
  CalendarDays,
} from "lucide-react";
import ProfileBlogSkelton from "../skeltons/profile/ProfileBlogSkelton";
import MediaRenderer from "../blogsV2/MediaRenderer";
import { RxVideo } from "react-icons/rx";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../hooks/reduxHooks";
import { useEffect, useState } from "react";
import {
  fetchCurrentUserBlog,
  userSavedBlogsThunk,
} from "../../features/blog/blogThunk";

const cardVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  hover: { scale: 1.02, transition: { duration: 0.2 } },
};

const planetVariants = {
  orbit: {
    rotate: 360,
    transition: { duration: 20, repeat: Infinity, ease: "linear" },
  },
};

const starVariants = {
  twinkle: {
    opacity: [0.3, 1, 0.3],
    scale: [0.8, 1.2, 0.8],
    transition: { duration: 2, repeat: Infinity, ease: "easeInOut" },
  },
};

const floatingVariants = {
  float: {
    y: [-10, 10, -10],
    transition: { duration: 3, repeat: Infinity, ease: "easeInOut" },
  },
};

const ProfileBlogs = ({
  userBlogs,
  blogsLoading,
  blogError,
  userSavedBlogs,
}: {
  userBlogs: IBlogV2[];
  blogsLoading: boolean;
  blogError: string | null | undefined;
  userSavedBlogs: IBlogV2[];
}) => {
  const [activeTab, setActiveTab] = useState<"blogs" | "saved">("blogs");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCurrentUserBlog());
    dispatch(userSavedBlogsThunk());
  }, [dispatch]);

  const currentBlogs = activeTab === "blogs" ? userBlogs : userSavedBlogs;

  const currentTitle = activeTab === "blogs" ? "My Blogs" : "Saved Blogs";
  console.log(userSavedBlogs, "ssssaaa");
  return (
    <div className="w-full max-w-4xl mx-auto pt-4">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <BookOpen className="w-8 h-8 text-gray-800" />

          <h2 className="text-2xl font-bold text-gray-800">{currentTitle}</h2>

          <div className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-medium">
            {currentBlogs.length} {currentBlogs.length === 1 ? "blog" : "blogs"}
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center bg-gray-100 rounded-xl p-1">
          <button
            onClick={() => setActiveTab("blogs")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              activeTab === "blogs"
                ? "bg-white shadow text-black"
                : "text-gray-500 hover:text-black"
            }`}
          >
            My Blogs
          </button>

          <button
            onClick={() => setActiveTab("saved")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              activeTab === "saved"
                ? "bg-white shadow text-black"
                : "text-gray-500 hover:text-black"
            }`}
          >
            Saved
          </button>
        </div>
      </div>

      {blogError && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <p className="text-red-700">{blogError}</p>
        </div>
      )}

      {blogsLoading ? (
        <ProfileBlogSkelton />
      ) : currentBlogs.length === 0 ? (
        <motion.div
          className="flex flex-col items-center justify-center py-16 relative overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-gray-400 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                variants={starVariants}
                animate="twinkle"
                transition={{ delay: Math.random() * 2 }}
              />
            ))}
          </div>

          <div className="relative mb-8">
            <motion.div
              className="w-16 h-16 bg-gradient-to-br from-gray-300 to-gray-600 rounded-full flex items-center justify-center shadow-lg"
              variants={floatingVariants}
              animate="float"
            >
              <Sparkles className="w-8 h-8 text-white" />
            </motion.div>
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              variants={planetVariants}
              animate="orbit"
            >
              <div className="relative w-32 h-32">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-gray-600 rounded-full shadow-md" />
              </div>
            </motion.div>
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              variants={planetVariants}
              animate="orbit"
              transition={{ duration: 15, delay: 0.5 }}
            >
              <div className="relative w-24 h-24">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-gray-700 rounded-full shadow-md" />
              </div>
            </motion.div>
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              variants={planetVariants}
              animate="orbit"
              transition={{ duration: 25, delay: 1 }}
            >
              <div className="relative w-40 h-40">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5 bg-gray-800 rounded-full shadow-md" />
              </div>
            </motion.div>
          </div>

          <motion.div
            className="text-center max-w-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center justify-center gap-2">
              <Moon className="w-6 h-6 text-gray-600" />
              Your Cosmic Journey Awaits
            </h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              The stars are aligned for your first blog post! Share your
              astrological insights, celestial observations, or cosmic wisdom
              with the universe.
            </p>
            <motion.div
              className="flex items-center justify-center gap-2 text-gray-700 font-medium"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Stars className="w-5 h-5" />
              <span>Begin your stellar storytelling</span>
              <Stars className="w-5 h-5" />
            </motion.div>
          </motion.div>

          <motion.div
            className="absolute top-4 right-4 w-2 h-2 bg-gray-400 rounded-full"
            initial={{ x: -50, y: 50, opacity: 0 }}
            animate={{ x: 100, y: -50, opacity: [0, 1, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatDelay: 5,
              ease: "easeOut",
            }}
          />
        </motion.div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {currentBlogs.map((blog, index) => (
            <motion.div
              key={index}
              onClick={() => navigate(`/blog/${blog._id}`)}
              className="md:h-[340px] bg-white relative rounded-2xl shadow-md border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col"
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
            >
              {blog.postType === "text" && (
                <div className="flex-1 flex flex-col justify-between p-5 overflow-hidden">
                  <p className="text-base text-muted-foreground leading-relaxed line-clamp-[10]">
                    {blog.content}
                  </p>
                </div>
              )}

              {/* ───── ARTICLE POST ───── */}
              {blog.postType === "article" && (
                <div className="flex-1 flex flex-col overflow-hidden">
                  {/* Media: fixed portion of card height */}
                  {blog.media && blog.media.length > 0 && (
                    <div className="h-[190px] flex-shrink-0 w-full">
                      <MediaRenderer media={blog.media} />
                    </div>
                  )}
                  {/* Text: fills remaining space, clips overflow */}
                  <div className="flex-1 p-4 overflow-hidden flex flex-col gap-1">
                    <h2 className="font-semibold text-base leading-snug line-clamp-2">
                      {blog.article?.title}
                    </h2>
                    <p className="text-sm text-muted-foreground line-clamp-3">
                      {blog.article?.body}
                    </p>
                  </div>
                </div>
              )}

              {/* ───── EVENT POST ───── */}
              {blog.postType === "event" && (
                <div className="flex-1 flex flex-col overflow-hidden">
                  {blog.media && blog.media.length > 0 && (
                    <div className="h-[180px] flex-shrink-0 w-full">
                      <MediaRenderer media={blog.media} />
                    </div>
                  )}
                  <div className="flex-1 p-4 overflow-hidden flex flex-col gap-1">
                    <h2 className="font-semibold text-base leading-snug line-clamp-2">
                      {blog.event?.title || "Untitled Event"}
                    </h2>
                    {blog.event?.description && (
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {blog.event.description}
                      </p>
                    )}
                    <div className="mt-auto space-y-1 text-xs text-muted-foreground pt-2">
                      {blog.event?.venue && (
                        <div className="flex items-center gap-2">
                          <MapPin size={13} />
                          <span className="truncate">{blog.event.venue}</span>
                        </div>
                      )}
                      {(blog.event?.startDate || blog.event?.endDate) && (
                        <div className="flex items-center gap-2">
                          <CalendarDays size={13} />
                          <span>
                            {blog.event?.startDate &&
                              format(
                                new Date(blog.event.startDate),
                                "dd MMM yyyy",
                              )}
                            {blog.event?.endDate && " – "}
                            {blog.event?.endDate &&
                              format(
                                new Date(blog.event.endDate),
                                "dd MMM yyyy",
                              )}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* ───── IMAGE / VIDEO POST ───── */}
              {(blog.postType === "image" || blog.postType === "video") && (
                <div className="relative flex-1 w-full overflow-hidden">
                  <MediaRenderer media={blog.media} from="profile" />

                  {blog?.media?.[0]?.caption && (
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent px-4 py-3"></div>
                  )}
                </div>
              )}

              {blog.postType === "video" && (
                <div className="absolute top-2 right-3 text-white text-2xl">
                  <RxVideo />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProfileBlogs;
