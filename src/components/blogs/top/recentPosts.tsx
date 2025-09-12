import { motion } from "framer-motion";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import { useEffect, useRef, useState } from "react";
import {
  fetcheBlogThunk,
  fetchSinglBlogThunk,
  updateBlogViewThunk,
} from "../../../features/blog/blogThunk";
import { format } from "date-fns";
import SinglePostModal from "../../modal/singlePostModal";
import { Blog } from "../../../types/redux/blogInterface";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import RecentBlogSkelton from "../../skeltons/blog/RecentBlogSkelton";
const RecentPosts = ({ userId }: { userId: string }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const {
    data,
    total,
    loading,
    fetchBlogLoading,
    blog: blogFromStore,
  } = useAppSelector((state) => state.blog);

  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(3);
  const containerRef = useRef<HTMLDivElement>(null);
  const hasFetched = useRef(false);

  const blogId = searchParams.get("id");
  const selectedFromList = data.find((b) => b._id === blogId) || null;

  const selectedPost =
    selectedFromList || (blogFromStore?._id === blogId ? blogFromStore : null);

  const fetchBlogs = () => {
    dispatch(fetcheBlogThunk({ skip, limit, sort:"newest", search:"" }));
    setSkip((prev) => prev + limit);
    if (limit !== 10) setLimit(10);
  };


  useEffect(() => {
    if (!hasFetched.current) {
      fetchBlogs();
      hasFetched.current = true;
    }

    if (blogId) {
      if (!userId) {
        toast.warning("Please login to view this post");
        navigate(".", { replace: true });
      }

      if (!selectedFromList) {
        dispatch(fetchSinglBlogThunk(blogId));
      }
    }
  }, [blogId, dispatch, userId]);

  const handlePostClick = (post: Blog) => {
    if (!userId) toast.warning("Please Login to continue read");
    if (!post._id || !userId) return;
    dispatch(updateBlogViewThunk(post._id));
    navigate(`?id=${post._id}`);
  };

  const closeModal = () => {
    navigate(".", { replace: true });
  };

  return (
    <div>
      <motion.h1
        className="text-2xl font-semibold"
        initial={{ y: -20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        Recent Posts
      </motion.h1>
      <motion.div
        className="space-y-6 h-[700px] overflow-auto mt-2"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="space-y-6 px-2" ref={containerRef}>
          {fetchBlogLoading ? (
            <RecentBlogSkelton />
          ) : (
            <>
              {data.map((post) => (
                <motion.div
                  key={post._id}
                  className="md:flex items-start gap-5 cursor-pointer"
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                  onClick={() => handlePostClick(post)}
                >
                  <motion.img
                    src={post?.file ? post?.file : "/assets/logo/Logo 2.png"}
                    alt={post.title}
                    className="w-full h-[200px] md:min-w-[250px] md:max-w-[250px] md:h-[150px] object-cover rounded-md"
                    initial={{ scale: 0.95, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    viewport={{ once: true }}
                  />
                  <div className="flex flex-col justify-between h-full gap-1">
                    <p className="text-sm text-gray-500 font-medium">
                      <span className="text-purple-700">{post.writer}</span> •{" "}
                      {post.createdAt && (
                        <span>
                          {format(new Date(post.createdAt), "dd MMM yyyy")}
                        </span>
                      )}
                    </p>

                    <h2 className="text-lg font-semibold mt-1">{post.title}</h2>
                    <p className="text-sm text-gray-600 mt-1 line-clamp-3">
                      {post.description}
                    </p>

                    <div className="flex gap-2 mt-3 flex-wrap">
                      {Array.isArray(post?.tags) &&
                        post.tags.map((topic, index) => (
                          <span
                            key={index}
                            className="bg-gray-100 text-sm text-green-600 font-medium px-3 py-1 rounded-full"
                          >
                            {topic}
                          </span>
                        ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </>
          )}

          {data.length < total && (
            <button
              onClick={fetchBlogs}
              className="bg-[#E39712] text-white px-4 py-2 rounded hover:bg-[#e39700ed]"
              disabled={loading}
            >
              {fetchBlogLoading ? "Loading..." : "Load More"}
            </button>
          )}
        </div>

        {blogId && selectedPost && (
          <SinglePostModal
            post={selectedPost}
            onClose={closeModal}
            userId={userId}
          />
        )}

        {blogId && !selectedPost && (
          <p className="text-center mt-4 text-gray-600">Loading post...</p>
        )}
      </motion.div>
    </div>
  );
};

export default RecentPosts;
