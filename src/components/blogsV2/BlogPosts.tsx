import { motion } from "framer-motion";
import { Dispatch, SetStateAction, useEffect, useRef } from "react";

import { useSearchParams } from "react-router-dom";

import { IBlogV2 } from "../../types/redux/blogInterface";
import RecentBlogSkelton from "../skeltons/blog/RecentBlogSkelton";
import ArticlePost from "./ArticlePost";
import EventPost from "./EventPost";
import TextPost from "./TextPost";
import MediaPost from "./MediaPost";

export const RenderPost = ({
  post,
  commentClick,
  activeMenuId,
  setActiveMenuId,
}: {
  post: IBlogV2;
  commentClick: (postId: string) => void;
  activeMenuId: string | null;
  setActiveMenuId: Dispatch<SetStateAction<string | null>>;
}) => {
  switch (post.postType) {
    case "text":
      return (
        <TextPost
          post={post}
          commentClick={commentClick}
          activeMenuId={activeMenuId}
          setActiveMenuId={setActiveMenuId}
        />
      );
    case "image":
      return (
        <MediaPost
          post={post}
          commentClick={commentClick}
          activeMenuId={activeMenuId}
          setActiveMenuId={setActiveMenuId}
        />
      );
    case "video":
      return (
        <MediaPost
          post={post}
          commentClick={commentClick}
          activeMenuId={activeMenuId}
          setActiveMenuId={setActiveMenuId}
        />
      );
    case "article":
      return (
        <ArticlePost
          post={post}
          commentClick={commentClick}
          activeMenuId={activeMenuId}
          setActiveMenuId={setActiveMenuId}
        />
      );
    case "event":
      return (
        <EventPost
          post={post}
          commentClick={commentClick}
          activeMenuId={activeMenuId}
          setActiveMenuId={setActiveMenuId}
        />
      );
    default:
      return null;
  }
};

interface Props {
  data: IBlogV2[];
  total: number;
  loading: boolean;
  fetchBlogLoading: boolean;
  blogFromStore: IBlogV2 | null;
  commentClick: (postId: string) => void;
  activeMenuId: string | null;
  setActiveMenuId: Dispatch<SetStateAction<string | null>>;
  fetchMore: () => void;
  isFirstLoad: React.MutableRefObject<boolean>;
}

const BlogPosts = ({
  data,
  total,
  loading,
  fetchBlogLoading,
  blogFromStore,
  commentClick,
  activeMenuId,
  setActiveMenuId,
  fetchMore,
  isFirstLoad,
}: Props) => {
  const [searchParams] = useSearchParams();

  const containerRef = useRef<HTMLDivElement>(null);
  const blogId = searchParams.get("id");
  const selectedFromList = data.find((b) => b._id === blogId) || null;
  const loaderRef = useRef<HTMLDivElement | null>(null);
  const fetchMoreRef = useRef(fetchMore);

  useEffect(() => {
    fetchMoreRef.current = fetchMore;
  }, [fetchMore]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (
          entries[0].isIntersecting &&
          !isFirstLoad.current &&
          data.length < total
        ) {
          fetchMoreRef.current(); // isFetching guard is now inside fetchMoreBlogs
        }
      },
      { rootMargin: "300px", threshold: 0 },
    );

    const el = loaderRef.current;
    if (el) observer.observe(el);
    return () => {
      if (el) observer.unobserve(el);
    };
  }, [data.length, total]);

  const selectedPost =
    selectedFromList || (blogFromStore?._id === blogId ? blogFromStore : null);

  return (
    <div className="">
      <motion.div
        className="space-y-6 mt-6"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="space-y-6 " ref={containerRef}>
          {fetchBlogLoading && data.length === 0 ? (
            <RecentBlogSkelton />
          ) : (
            <>
              {data.map((post) => (
                <motion.div
                  key={post._id}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <RenderPost
                    post={post}
                    commentClick={commentClick}
                    activeMenuId={activeMenuId}
                    setActiveMenuId={setActiveMenuId}
                  />
                </motion.div>
              ))}
            </>
          )}

          {data.length < total && (
            <div
              ref={loaderRef}
              className="h-16 flex justify-center items-center"
            >
              {loading && <p>Loading...</p>}
            </div>
          )}
        </div>

        {blogId && !selectedPost && (
          <p className="text-center mt-4 text-gray-600">Loading post...</p>
        )}
      </motion.div>
    </div>
  );
};

export default BlogPosts;
