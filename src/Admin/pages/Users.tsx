import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import {
  blockUserThunk,
  fetchAllUserThunk,
  fetchSingleUserThunk,
} from "../../features/user/userThunk";
import { Switch } from "../../components/ui/switch";
import { toast } from "sonner";
import { resetUserSlice } from "../../features/user/userSlice";
import UserDetailModal from "../components/modals/UserDetailModal";
import UserBlogModal from "../components/modals/UserBlogModal";
import { Eye, Search } from "lucide-react";
import { BiSort } from "react-icons/bi";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

const Users = () => {
  const dispatch = useAppDispatch();
  const {
    allUsers,
    loading,
    blockSuccess,
    blockMessage,
    error,
    singleUser,
    singleUserLoading,
    page,
    totalPage,
  } = useAppSelector((state) => state.user);

  const [showTable, setShowTable] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [blogModal, setBlogModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [showSort, setShowSort] = useState(false);
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");
  const [search, setSearch] = useState("");

  console.log(singleUser, "single user");
  const limit = 10;

  useEffect(() => {
    dispatch(
      fetchAllUserThunk({
        page: currentPage,
        limit,
        sort: sortOrder,
        search,
      })
    );

    const timer = setTimeout(() => {
      setShowTable(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, [currentPage, dispatch, search, sortOrder]);

  useEffect(() => {
    if (blockSuccess) {
      toast.success(blockMessage);
      dispatch(resetUserSlice());
    }
    if (error) {
      toast.error(error);
      dispatch(resetUserSlice());
    }
  }, [blockMessage, dispatch, error, blockSuccess]);

  const handleBlockToggle = (userId: string) => {
    dispatch(blockUserThunk(userId));
  };

  const handleClickMore = (userId: string) => {
    setModalOpen(true);
    dispatch(fetchSingleUserThunk(userId));
  };

  const handleClickBlog = (userId: string) => {
    setBlogModal(true);
    dispatch(fetchSingleUserThunk(userId));
  };

  const handleModal = () => {
    setModalOpen(false);
    setBlogModal(false);
    dispatch(resetUserSlice());
  };

  return (
    <div className="text-white">
      <h1 className="text-2xl font-semibold mb-4">All Users</h1>
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
            placeholder="Search users..."
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

      {!showTable || loading ? (
        <div className="flex justify-center items-center py-10">
          <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
          <span className="ml-3 text-gray-600">Loading user details...</span>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse rounded-md overflow-hidden">
            <thead className="bg-[#E39712] text-white">
              <tr>
                <th className="px-4 py-4 text-left">No</th>
                <th className="px-4 py-4 text-left">Profile</th>
                <th className="px-4 py-4 text-left">User Id</th>
                <th className="px-4 py-4 text-left">Name</th>
                <th className="px-4 py-4 text-left">Email</th>
                <th className="px-4 py-4 text-left">Is Blocked</th>
                <th className="px-4 py-4 text-left">Actions</th>{" "}
              </tr>
            </thead>
            <tbody className="">
              {allUsers.map((user, index) => (
                <tr
                  key={index}
                  className={`border-b ${
                    index % 2 == 0 ? "bg-black/60" : ""
                  } border-gray-600`}
                >
                  <td className="px-4 py-4">{index + 1}</td>
                  <td className="px-4 py-4">
                    {user.profilePicture ? (
                      <img
                        src={user.profilePicture}
                        alt="profile"
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-blue-400 flex items-center justify-center text-white text-sm">
                        {user.firstName[0].toUpperCase()}
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-4">{user._id}</td>
                  <td className="px-4 py-4 font-semibold">
                    {user.firstName} {user.lastName}
                  </td>
                  <td className="px-4 py-4">{user.email}</td>
                  <td className="px-4 py-4">
                    <Switch
                      checked={user.isBlocked}
                      onCheckedChange={() =>
                        user._id && handleBlockToggle(user._id)
                      }
                    />
                  </td>
                  <td className="px-4 py-4 space-x-2">
                    <button
                      onClick={() => handleClickMore(user?._id as string)}
                      className="text-white rounded-md hover:text-[#c68310]"
                    >
                      <Eye size={20} />
                    </button>
                    <button
                      onClick={() => handleClickBlog(user._id as string)}
                      className="px-3 py-1 bg-[#E39712] text-white rounded-md hover:bg-[#c68310]"
                    >
                      Blogs
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex justify-between mt-4 ">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="px-5 py-2 bg-white border-2 border-black text-black rounded-2xl disabled:opacity-50"
            >
              Prev
            </button>
            <span>
              Page {page} of {totalPage}
            </span>
            <button
              onClick={() => setCurrentPage((p) => (p < totalPage ? p + 1 : p))}
              disabled={currentPage === totalPage}
              className="px-5 py-2 bg-white border-2 border-black text-black rounded-2xl disabled:opacity-50"
            >
              Next
            </button>
          </div>

          {modalOpen && (
            <UserDetailModal
              singleUser={singleUser}
              onClose={handleModal}
              singleUserLoading={singleUserLoading}
            />
          )}
          {blogModal && (
            <UserBlogModal
              onClose={handleModal}
              userBlogs={singleUser?.blogs ?? []}
              singleUserLoading={singleUserLoading}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default Users;
