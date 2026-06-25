import { useEffect, useRef, useState } from "react";
import {
  deleteBlogThunk,
  fetcheBlogThunk,
  fetchSinglBlogThunk,
  getCommentBlogThunk,
  getReplyCommentBlogThunk,
} from "../../../features/blog/blogThunk";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import { Eye, Trash2 } from "lucide-react";
import DeleteModal from "../../components/modals/deleteModal";
import { toast } from "sonner";
import { resetBlogSlice } from "../../../features/blog/blogSlice";
// import AdminViewBlogModal from "../../components/modals/Blog/AdminViewBlogModal";
import {
  SearchOptions,
  ShowSort,
  SortButton,
} from "../../components/SortDetails";
import { formatToRealDate } from "../../../utils/DateFormate";
import AdminViewBlogModal from "../../components/modals/Blog/AdminViewBlogModal";

const AllBlogs = () => {
  const dispatch = useAppDispatch();
  const {
    data,
    total,
    deleteLoading,
    loading,
    deleteMessage,
    deleteSuccess,
    error,
    blog,
    fetchBlogLoading,
    comments,
    replyCommentTotal,
    replyComments,
    commentTotal,
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

  const [openReplies, setOpenReplies] = useState<{ [key: string]: boolean }>(
    {},
  );
  const isCommentFetching = useRef(false);
  const replySkipMap = useRef<{ [key: string]: number }>({});
  const replyFetchingMap = useRef<{ [key: string]: boolean }>({});
  const commentSkipRef = useRef(0);
  const commentLimit = 5;

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
    dispatch(fetcheBlogThunk({ skip, limit, sort: sortOrder, from: "admin" }));

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

  const handleFetchReplies = async (commentId: string) => {
    if (replyFetchingMap.current[commentId]) return;
    replyFetchingMap.current[commentId] = true;
    const skip = replySkipMap.current[commentId] || 0;
    await dispatch(getReplyCommentBlogThunk({ commentId, skip, limit: 5 }));
    replySkipMap.current[commentId] = skip + 5;
    replyFetchingMap.current[commentId] = false;
  };

  const fetchComments = async () => {
    if (isCommentFetching.current) return;
    isCommentFetching.current = true;
    await dispatch(
      getCommentBlogThunk({
        blogId: selectedId as string,
        skip: commentSkipRef.current,
        limit: commentLimit,
      }),
    );
    commentSkipRef.current += commentLimit;
    isCommentFetching.current = false;
  };

  useEffect(() => {
    if (!selectedId) return;
    commentSkipRef.current = 0;
    dispatch(resetBlogSlice());
    fetchComments();
  }, [selectedId]);

  return (
    <div className="pt-3 lg:p-4 ">
      <div className="flex mb-4 h-11 items-center space-x-4 justify-between">
        <SortButton
          onClick={() => setShowSort((prev) => !prev)}
          showSort={showSort}
        />

        <SearchOptions
          search={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
        />
      </div>
      {showSort && (
        <ShowSort
          sortOrder={sortOrder}
          onClick={(sort) => {
            setSortOrder(sort as "newest" | "oldest");
            setCurrentPage(1);
          }}
        />
      )}

      {!showTable && loading ? (
        <div className="flex justify-center items-center py-10">
          <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
          <span className="ml-3 ">Loading Blogs...</span>
        </div>
      ) : data.length == 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center ">
          <div className="w-16 h-16 flex items-center justify-center rounded-full  mb-4">
            📭
          </div>
          <h2 className="text-xl font-semibold ">No Blogs</h2>
          <p className="text-muted-foreground mt-2">
            It looks like there are no blogs yet. Check back later.
          </p>
        </div>
      ) : (
        <div className="h-[calc(94vh-110px)] overflow-y-auto hide-scrollbar will-change-scroll transform-gpu mt-5">
          <div className="inline-block min-w-full">
            <table className="min-w-full table-auto border-collapse rounded-md overflow-hidden">
              <thead className="bg-blue-800 ">
                <tr className="text-white">
                  <th className="px-4 py-4 text-left">No</th>
                  <th className="px-4 py-4 text-left">Blog Id</th>
                  <th className="px-4 py-4 text-left">Bloger Name</th>
                  <th className="px-4 py-4 text-left">Post type</th>
                  <th className="px-4 py-4 text-left">Date</th>
                  <th className="px-4 py-4 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {data?.map((blog, index) => (
                  <tr
                    key={index}
                    className={`border-b ${
                      index % 2 == 0 ? "bg-muted" : ""
                    } border-gray-600`}
                  >
                    <td className="px-4 py-4">
                      {(currentPage - 1) * limit + index + 1}
                    </td>
                    <td className="px-4 py-4">{blog?._id}</td>
                    <td className="px-4 py-4">{`${blog?.user?.firstName} ${blog.user?.lastName}`}</td>
                    <td className="px-4 py-4">{blog?.postType}</td>
                    <td className="px-4 py-4">
                      {formatToRealDate(blog?.createdAt)}
                    </td>
                    <td className="px-4 py-4 flex space-x-3">
                      <button
                        onClick={() => handleView(blog?._id as string)}
                        className=" font-semibold text-blue-800 rounded-md hover:text-blue-600"
                      >
                        <Eye size={20} />
                      </button>
                      <button
                        onClick={() => handleDelete(blog._id as string)}
                        className=" font-semibold text-red-600 rounded-md hover:text-red-700"
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
                className="px-5 py-2 hover:bg-border border-2 rounded-2xl disabled:bg-foreground/40 text-muted-foreground"
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
                className="px-5 py-2 hover:bg-border border-2 rounded-2xl disabled:bg-foreground/40 text-muted-foreground"
              >
                Next
              </button>
            </div>
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
          post={blog}
          onClose={() => {
            setViewModal(false);
            setSelectedId("");
          }}
          loading={fetchBlogLoading}
          comments={comments}
          replyCommentTotal={replyCommentTotal}
          replyComments={replyComments}
          commentTotal={commentTotal}
          fetchComments={fetchComments}
          handleFetchReplies={handleFetchReplies}
          openReplies={openReplies}
          setOpenReplies={setOpenReplies}
        />
      )}
    </div>
  );
};

export default AllBlogs;
