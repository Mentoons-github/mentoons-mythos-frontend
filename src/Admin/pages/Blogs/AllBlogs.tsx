import { useEffect, useState } from "react";
import {
  deleteBlogThunk,
  fetcheBlogThunk,
  fetchSinglBlogThunk,
  getCommentBlogThunk,
} from "../../../features/blog/blogThunk";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import { Eye, Search, Trash2 } from "lucide-react";
import DeleteModal from "../../components/modals/deleteModal";
import { toast } from "sonner";
import { resetBlogSlice } from "../../../features/blog/blogSlice";
import AdminViewBlogModal from "../../components/modals/Blog/AdminViewBlogModal";
import { BiSort } from "react-icons/bi";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

const AllBlogs = () => {
  const dispatch = useAppDispatch();
  const {
    adminBlog,
    total,
    deleteLoading,
    loading,
    deleteMessage,
    deleteSuccess,
    error,
    blog,
    fetchBlogLoading,
    comments,
  } = useAppSelector((state) => state.blog);

  const [selectedId, setSelectedId] = useState("");
  const [deleteModal, setDeleteModal] = useState(false);
  const [viewModal, setViewModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [showTable, setShowTable] = useState(false);
  const [showSort, setShowSort] = useState(false);
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");
  const [search, setSearch] = useState("");
  const limit = 10;

  // Calculate total pages
  const totalPages = Math.ceil(total / limit);

  useEffect(() => {
    if (deleteSuccess) {
      toast.success(deleteMessage);
      dispatch(resetBlogSlice());
    }
    if (error) {
      toast.error(error);
      dispatch(resetBlogSlice());
    }
  }, [deleteMessage, deleteSuccess, dispatch, error]);

  useEffect(() => {
    const skip = (currentPage - 1) * limit;
    dispatch(fetcheBlogThunk({ skip, limit, sort: sortOrder, search }));

    const timer = setTimeout(() => {
      setShowTable(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, [currentPage, dispatch, search, sortOrder]);

  const handleDelete = (blogId: string) => {
    setSelectedId(blogId);
    setDeleteModal(true);
  };

  const handleView = (blogId: string) => {
    setSelectedId(blogId);
    setViewModal(true);
    dispatch(fetchSinglBlogThunk(blogId));
  };

  return (
    <div className="p-4 text-white">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold mb-4">Blogs</h1>
      </div>

      <div className="flex mb-4 h-11 items-center space-x-4 justify-between">
        <div
          className="w-40 h-full px-4 flex items-center justify-between 
                                         border text-white rounded-lg cursor-pointer 
                                         shadow-md hover:bg-black/80 transition-all duration-200"
          onClick={() => setShowSort((prev) => !prev)}
        >
          <div className="flex items-center space-x-2">
            <BiSort size={22} className="text-[#E39712]" />
            <h3 className="text-[16px] font-medium">Sort By</h3>
          </div>
          <div className="ml-2">
            {showSort ? (
              <IoIosArrowUp size={20} className="text-gray-300" />
            ) : (
              <IoIosArrowDown size={20} className="text-gray-300" />
            )}
          </div>
        </div>

        <div className="relative">
          <Search
            size={15}
            className="absolute top-3.5 left-2 text-gray-400 "
          />
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Search blogs..."
            className="w-64 px-4 py-2 rounded-lg border border-gray-600 pl-7 
                               bg-black/40 text-white placeholder-gray-400 
                               focus:outline-none focus:ring-2 focus:ring-[#E39712]"
          />
        </div>
      </div>
      {showSort && (
        <div className="flex gap-3 mb-2">
          {["newest", "oldest"].map((sort) => (
            <button
              key={sort}
              onClick={() => {
                setSortOrder(sort as "newest" | "oldest");
                setCurrentPage(1);
              }}
              className={`px-4 py-2 rounded-lg border transition-all duration-200 ${
                sortOrder === sort
                  ? "bg-[#E39712] text-white border-[#E39712]"
                  : "bg-black/40 text-gray-300 border-gray-600 hover:bg-black/70"
              }`}
            >
              {sort === "newest" ? "Newest → Oldest" : "Oldest → Newest"}
            </button>
          ))}
        </div>
      )}

      {!showTable && loading ? (
        <div className="flex justify-center items-center py-10">
          <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
          <span className="ml-3 text-gray-600">Loading Blogs...</span>
        </div>
      ) : adminBlog.length == 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center text-gray-400">
          <div className="w-16 h-16 flex items-center justify-center rounded-full bg-gray-700/40 mb-4">
            📭
          </div>
          <h2 className="text-xl font-semibold text-white">No Blogs</h2>
          <p className="text-gray-400 mt-2">
            It looks like there are no blogs yet. Check back later.
          </p>
        </div>
      ) : (
        <div className="mt-5">
          <table className="min-w-full table-auto border-collapse rounded-md overflow-hidden">
            <thead className="bg-[#E39712] text-white">
              <tr>
                <th className="px-4 py-4 text-left">No</th>
                <th className="px-4 py-4 text-left">Blog Id</th>
                <th className="px-4 py-4 text-left">Writer Id</th>
                <th className="px-4 py-4 text-left">Writer Name</th>
                <th className="px-4 py-4 text-left">Title</th>
                <th className="px-4 py-4 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {adminBlog?.map((blog, index) => (
                <tr
                  key={index}
                  className={`border-b ${
                    index % 2 === 0 ? "bg-black/60" : ""
                  } border-gray-600`}
                >
                  <td className="px-4 py-4">
                    {(currentPage - 1) * limit + index + 1}
                  </td>
                  <td className="px-4 py-4">{blog?._id}</td>
                  <td className="px-4 py-4">{blog?.writerId}</td>
                  <td className="px-4 py-4">{blog?.writer}</td>
                  <td className="px-4 py-4">{blog?.title}</td>
                  <td className="px-4 py-4 space-x-3">
                    <button
                      onClick={() => handleView(blog?._id as string)}
                      className=" text-white rounded-md hover:text-[#c68310]"
                    >
                      <Eye size={20} />
                    </button>
                    <button
                      onClick={() => handleDelete(blog._id as string)}
                      className="  text-white rounded-md hover:text-[#d32a08]"
                    >
                      <Trash2 size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="flex justify-between mt-4">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="px-5 py-2 bg-white border-2 border-black text-black rounded-2xl disabled:opacity-50"
            >
              Prev
            </button>

            <span>
              Page {currentPage} of {totalPages}
            </span>

            <button
              onClick={() =>
                setCurrentPage((p) => (p < totalPages ? p + 1 : p))
              }
              disabled={currentPage === totalPages}
              className="px-5 py-2 bg-white border-2 border-black text-black rounded-2xl disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      )}
      {deleteModal && (
        <DeleteModal
          item="Blog"
          onClose={() => setDeleteModal(false)}
          onConfirm={() => {
            dispatch(deleteBlogThunk(selectedId));
            setDeleteModal(false);
          }}
          loading={deleteLoading}
        />
      )}

      {viewModal && (
        <AdminViewBlogModal
          blog={blog}
          onClose={() => setViewModal(false)}
          loading={fetchBlogLoading}
          commentShow={() => dispatch(getCommentBlogThunk(selectedId))}
          comments={comments}
        />
      )}
    </div>
  );
};

export default AllBlogs;
