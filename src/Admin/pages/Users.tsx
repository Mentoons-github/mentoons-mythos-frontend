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
import { Eye } from "lucide-react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { IoFilter } from "react-icons/io5";
import UserFilterModal from "../components/modals/UserFilterModal";
import { SearchOptions, ShowSort, SortButton } from "../components/SortDetails";

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
  const [showFilters, setShowFilters] = useState(false);
  const [filterBy, setFilterBy] = useState("");
  const [filterModal, setFilterModal] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("");
  const [selectedFilterValue, setSelectedFilterValue] = useState("");

  const limit = 10;

  useEffect(() => {
    if (!filterBy || (filterBy && selectedFilterValue)) {
      dispatch(
        fetchAllUserThunk({
          page: currentPage,
          limit,
          sort: sortOrder,
          search,
          filterBy,
          filterValue: selectedFilterValue,
        })
      );
    }

    const timer = setTimeout(() => {
      setShowTable(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, [currentPage, dispatch, filterBy, search, selectedFilterValue, sortOrder]);

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

  const handleModal = () => {
    setModalOpen(false);
    setBlogModal(false);
    dispatch(resetUserSlice());
  };

  return (
    <div className="pt-3 lg:p-4">
      <div className="flex mb-4 h-11 items-center space-x-1 md:space-x-4 justify-between">
        <div className="flex h-full gap-1 md:gap-3">
          <div
            className="md:w-40 h-full px-2 md:px-4 flex items-center justify-between 
                     border rounded-lg cursor-pointer 
                      hover:bg-muted transition-all duration-200"
            onClick={() => setShowFilters((prev) => !prev)}
          >
            <div className="flex items-center space-x-2">
              <IoFilter size={22} className="text-blue-800" />
              <h3 className="text-[16px] font-semibold hidden md:block">
                Filter
              </h3>
            </div>

            <div className="md:ml-2 ">
              {showFilters ? (
                <IoIosArrowUp size={20} className="" />
              ) : (
                <IoIosArrowDown size={20} className="" />
              )}
            </div>
          </div>

          <SortButton
            onClick={() => setShowSort((prev) => !prev)}
            showSort={showSort}
          />
        </div>

        <SearchOptions
          search={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
        />
      </div>
      {showFilters && (
        <div>
          {(filterBy || selectedFilterValue) && (
            <p
              className="text-xs text-blue-800 cursor-pointer -mt-2 mb-1"
              onClick={() => {
                setSelectedFilterValue("");
                setFilterBy("");
                setCurrentPage(1);
                setShowFilters(false);
              }}
            >
              Clear filter
            </p>
          )}
          <div className="flex gap-3 mb-2">
            {["Rashi", "Intelligence", "Block"].map((filter) => (
              <button
                key={filter}
                onClick={() => {
                  setFilterBy(filter as "Rashi" | "Intelligence" | "Block");
                  setSelectedFilterValue("");
                  setCurrentPage(1);
                  setFilterModal(true);
                  setSelectedFilter(filter);
                }}
                className={`px-4 py-2 rounded-lg border transition-all duration-200 ${
                  filterBy === filter
                    ? "bg-blue-800 text-white "
                    : " border hover:bg-muted"
                }`}
              >
                {filter === "Rashi"
                  ? "Rashi"
                  : filter == "Intelligence"
                  ? "Intelligence"
                  : "Block"}
              </button>
            ))}
            {filterModal && (
              <UserFilterModal
                onClose={() => setFilterModal(false)}
                data={selectedFilter}
                onSelect={(value) => {
                  setSelectedFilterValue(value);
                  setCurrentPage(1);
                }}
              />
            )}
          </div>
        </div>
      )}

      {showSort && (
        <ShowSort
          sortOrder={sortOrder}
          onClick={(sort) => {
            setSortOrder(sort as "newest" | "oldest");
            setCurrentPage(1);
          }}
        />
      )}

      {!showTable || loading ? (
        <div className="flex justify-center items-center py-10">
          <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
          <span className="ml-3 ">Loading user details...</span>
        </div>
      ) : allUsers.length == 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center ">
          <div className="w-16 h-16 flex items-center justify-center rounded-full bg-gray-700/40 mb-4">
            📭
          </div>
          <h2 className="text-xl font-semibold ">No Users found</h2>
          <p className="text-muted-foreground mt-2">
            It looks like there are no users.
          </p>
        </div>
      ) : (
        <div className="h-[calc(90vh-110px)] overflow-x-auto overflow-y-auto hide-scrollbar will-change-scroll transform-gpu mt-5">
          <div className="inline-block min-w-full">
            <table className="w-full table-auto border-collapse rounded-md ">
              <thead className="bg-blue-800">
                <tr className="text-white">
                  <th className="md:px-4 px-2 md:py-4 py-2 text-left">No</th>
                  <th className="md:px-4 px-2 md:py-4 py-2 text-left">
                    Profile
                  </th>
                  <th className="md:px-4 px-2 md:py-4 py-2 text-left">
                    User Id
                  </th>
                  <th className="md:px-4 px-2 md:py-4 py-2 text-left">Name</th>
                  <th className="md:px-4 px-2 md:py-4 py-2 text-left">Email</th>
                  <th className="md:px-4 px-2 md:py-4 py-2 text-left">
                    Is Blocked
                  </th>
                  <th className="md:px-4 px-2 md:py-4 py-2 text-left">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="">
                {allUsers.map((user, index) => (
                  <tr
                    key={index}
                    className={`border-b ${
                      index % 2 == 0 ? "bg-muted" : ""
                    } border-gray-600`}
                  >
                    <td className="md:px-4 px-2 md:py-4 py-2">{index + 1}</td>
                    <td className="md:px-4 px-2 md:py-4 py-2">
                      {user.profilePicture ? (
                        <img
                          src={user.profilePicture}
                          alt="profile"
                          className="w-10 h-10 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-[#02599c] flex items-center justify-center text-[20px] text-white">
                          {user?.firstName[0].toUpperCase()}
                        </div>
                      )}
                    </td>
                    <td className="md:px-4 px-2 md:py-4 py-2">{user._id}</td>
                    <td className="md:px-4 px-2 md:py-4 py-2 font-semibold">
                      {user.firstName} {user.lastName}
                    </td>
                    <td className="md:px-4 px-2 md:py-4 py-2">{user.email}</td>
                    <td className="md:px-4 px-2 md:py-4 py-2">
                      <Switch
                        checked={user.isBlocked}
                        onCheckedChange={() =>
                          user._id && handleBlockToggle(user._id)
                        }
                      />
                    </td>
                    <td className="md:px-4 px-2 md:py-4 py-2 space-x-2">
                      <button
                        onClick={() => handleClickMore(user?._id as string)}
                        className="text-blue-800 rounded-md hover:text-blue-700"
                      >
                        <Eye size={20} />
                      </button>
                      {/* <button
                        onClick={() => handleClickBlog(user._id as string)}
                        className="px-3 py-1 font-semibold text-blue-800 rounded-md hover:text-blue-600"
                      >
                        Blogs
                      </button> */}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="flex justify-between mt-4 w-full">
              <button
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
                className="px-5 py-2 hover:bg-border border-2 rounded-2xl disabled:bg-foreground/40 text-muted-foreground"
              >
                Prev
              </button>
              <span>
                Page {page} of {totalPage}
              </span>
              <button
                onClick={() =>
                  setCurrentPage((p) => (p < totalPage ? p + 1 : p))
                }
                disabled={currentPage === totalPage}
                className="px-5 py-2 hover:bg-border border-2 rounded-2xl disabled:bg-foreground/40 text-muted-foreground"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}
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
  );
};

export default Users;
