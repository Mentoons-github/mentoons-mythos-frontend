import { useEffect, useState } from "react";
import { deleteBlogThunk } from "../../../features/blog/blogThunk";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import { Blog } from "../../../types/redux/blogInterface";
import { toast } from "sonner";
import { resetBlogSlice } from "../../../features/blog/blogSlice";
import DeleteModal from "./deleteModal";

interface ModalProps {
  userBlogs: Blog[] | [];
  singleUserLoading: boolean;
  onClose: () => void;
}

const UserBlogModal: React.FC<ModalProps> = ({
  userBlogs,
  onClose,
  singleUserLoading,
}) => {
  const dispatch = useAppDispatch();
  const { deleteLoading, deleteMessage, deleteSuccess, error, blogId } = useAppSelector(
    (state) => state.blog
  );
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [deleteModal, setDeleteModal] = useState(false);
  const [currentBlogId, setCurrentBlogId] = useState("");

  useEffect(() => {
    if (userBlogs && userBlogs.length > 0) {
      setBlogs(userBlogs);
    }
  }, [userBlogs]);

  useEffect(() => {
    if (deleteSuccess) {
      toast.success(deleteMessage);
      dispatch(resetBlogSlice());
      setBlogs((prev) => prev.filter((b) => b._id !== blogId));
      setDeleteModal(false);
    }
    if (error) {
      toast.error(error);
      dispatch(resetBlogSlice());
    }
  }, [blogId, deleteMessage, deleteSuccess, dispatch, error]);

  const handleDelete = (blogId: string) => {
    setCurrentBlogId(blogId);
    setDeleteModal(true);
    // dispatch(deleteBlogThunk(blogId));
  };
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-40 italic">
      <div className="bg-secondary rounded-lg shadow-2xl p-6 hide-scrollbar w-full max-w-5xl relative overflow-y-auto max-h-[90vh]">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 hover:text-muted-foreground text-2xl font-bold"
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold mb-6 border-b pb-3">
          User Blogs
        </h2>

        <h2 className=" text-xl font-semibold mb-2">
          Totol Blogs: {blogs?.length}
        </h2>

        {singleUserLoading ? (
          <div className="flex justify-center items-center py-10">
            <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
            <span className="ml-3 font-medium">
              Loading blog details...
            </span>
          </div>
        ) : blogs.length === 0 ? (
          <p className="text-center italic">
            This user has not created any blogs yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {blogs.map((val) => (
              <div
                key={val._id}
                className="border rounded-lg shadow-md hover:shadow-lg transition p-4 "
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-semibold text-indigo-700">
                    {val.title}
                  </h3>
                  <span className="text-sm">
                    {val.createdAt
                      ? new Date(val.createdAt).toLocaleDateString()
                      : "No date"}
                  </span>
                </div>

                {val.file && (
                  <img
                    src={val.file}
                    alt={val.title}
                    className="w-full h-40 object-cover rounded-md mb-3"
                  />
                )}

                <p className=" text-sm mb-3 max-h-24 overflow-y-auto">
                  {val.description}
                </p>

                {val.tags && val.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-3">
                    {val.tags.map((tag, ind) => (
                      <span
                        key={ind}
                        className=" py-1 text-indigo-700 text-xs rounded-md"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}

                <div className="text-sm flex justify-between items-center">
                  <div>
                    <p>
                      <strong>Writer:</strong> {val.writer}
                    </p>
                    <p>
                      <strong>Blog ID:</strong>{" "}
                      <span className="">{val._id}</span>
                    </p>
                  </div>
                  <div>
                    <button
                      className="p-2 bg-red-600 rounded-md text-white"
                      onClick={() => handleDelete(val._id as string)}
                    >
                      Delete Blog
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {deleteModal && (
        <DeleteModal
          onClose={() => setDeleteModal(false)}
          onConfirm={() => dispatch(deleteBlogThunk(currentBlogId))}
          item="Blog"
          loading = {deleteLoading}
        />
      )}
    </div>
  );
};

export default UserBlogModal;
