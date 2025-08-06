import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../../hooks/reduxHooks";
import { Blog } from "../../../../types/redux/blogInterface";
import BlogSearchSkelton from "../../../skeltons/blog/BlogSearchSkelton";
import { updateBlogViewThunk } from "../../../../features/blog/blogThunk";
import { toast } from "sonner";

const BlogSearchModal = ({
  blog,
  loading,
  userId,
}: {
  blog: Blog[];
  loading: boolean;
  userId?: string;
}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handlePostClick = (post: Blog) => {
    if (!userId) toast.warning("Please Login to continue read");
    if (!post._id || !userId) return;
    dispatch(updateBlogViewThunk(post._id));
    navigate(`?id=${post._id}`);
  };
  return (
    <div className="max-h-80 w-80 md:w-96 z-10 absolute top-48 md:top-28 md:right-20 bg-white shadow-lg border border-gray-300 overflow-y-auto rounded-md p-4 cursor-pointer">
      {loading ? (
        <BlogSearchSkelton />
      ) : blog.length === 0 ? (
        <p className="text-gray-500 text-center py-4">No results found.</p>
      ) : (
        blog.map((ele) => (
          <div
            key={ele._id}
            className="mb-4 border-b pb-2"
            onClick={() => handlePostClick(ele)}
          >
            <h1 className="font-semibold text-lg text-gray-800">{ele.title}</h1>
            <p className="text-sm text-gray-500">By: {ele.writer}</p>
            <div className="flex flex-wrap gap-2 mt-1">
              {ele.tags?.map((tag) => (
                <span
                  key={tag}
                  className="bg-yellow-100 text-yellow-800 px-2 py-1 text-xs rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default BlogSearchModal;
