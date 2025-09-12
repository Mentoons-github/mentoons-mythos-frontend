import { useEffect, useState } from "react";
import AddWorkshop from "../../components/Workshop/AddWorkshop";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import {
  deleteWorkshopThunk,
  getWorkshopsThunk,
  SingleWorkshopThunk,
} from "../../../features/workshop/workshopThunk";
import { Eye, PenSquare, Search, Trash2 } from "lucide-react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { BiSort } from "react-icons/bi";
import WorkshopDetailModal from "../../components/modals/Workshop/WorkshopDetailModal";
import DeleteModal from "../../components/modals/deleteModal";
import { toast } from "sonner";
import { resetWorkshopSlice } from "../../../features/workshop/workshopSlice";
import EditWorkshopModal from "../../components/modals/Workshop/EditWorkshopModal";

const AllWorkshops = () => {
  const [showTable, setShowTable] = useState(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [showSort, setShowSort] = useState(false);
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");
  const [search, setSearch] = useState("");
  const [viewModal, setViewModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [selectedId, setSelectedId] = useState("");

  const dispatch = useAppDispatch();
  const {
    workshops,
    workshopsPage,
    workshopsTotalPages,
    singleWorkshop,
    singleLoading,
    deleteLoading,
    deleteSuccess,
    deleteMessage,
    error,
  } = useAppSelector((state) => state.workshop);

  const limit = 10;

  useEffect(() => {
    if (deleteSuccess) {
      toast.success(deleteMessage);
      dispatch(resetWorkshopSlice());
    }
    if (error) {
      toast.error(error);
      dispatch(resetWorkshopSlice());
    }
  }, [deleteMessage, deleteSuccess, dispatch, error]);

  useEffect(() => {
    dispatch(getWorkshopsThunk({ page: 1, limit, sort: sortOrder, search }));
  }, [dispatch, search, sortOrder]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTable(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleView = (workshopId: string) => {
    setViewModal(true);
    dispatch(SingleWorkshopThunk(workshopId));
  };

  const handleDelete = (workshopId: string) => {
    setDeleteModal(true);
    setSelectedId(workshopId);
  };

  const handleEdit = (workshopId: string) => {
    setEditModal(true);
    setSelectedId(workshopId);
    dispatch(SingleWorkshopThunk(workshopId));
  };

  return (
    <div className="text-white p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold mb-4">All Jobs</h1>
        <AddWorkshop />
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

        <div className="relative mt-2">
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
            placeholder="Search enquiries..."
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

      {!showTable ? (
        <div className="flex justify-center items-center py-10">
          <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
          <span className="ml-3 text-gray-600">Loading Job details...</span>
        </div>
      ) : (
        <div className="  overflow-y-auto hide-scrollbar will-change-scroll transform-gpu mt-5">
          <table className="min-w-full table-auto border-collapse rounded-md overflow-hidden ">
            <thead className="bg-[#E39712] text-white">
              <tr>
                <th className="px-4 py-4 text-left">No</th>
                <th className="px-4 py-4 text-left">Workshop Id</th>
                <th className="px-4 py-4 text-left">Category</th>
                <th className="px-4 py-4 text-left">Price</th>
                <th className="px-4 py-4 text-left">Enquriries</th>
                <th className="px-4 py-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="">
              {workshops?.map((workshop, index) => (
                <tr
                  key={index}
                  className={`border-b ${
                    index % 2 == 0 ? "bg-black/60" : ""
                  } border-gray-600`}
                >
                  <td className="px-4 py-4">{index + 1}</td>
                  <td className="px-4 py-4">{workshop?._id}</td>
                  <td className="px-4 py-4 font-semibold">{workshop?.age}</td>
                  <td className="px-4 py-4 font-semibold">
                    {workshop?.amount}
                  </td>
                  <td className="px-4 py-4 font-semibold">
                    {workshop?.enquiries?.length}
                  </td>
                  <td className="px-4 py-4 space-x-3">
                    <button
                      onClick={() => handleView(workshop?._id as string)}
                      className=" text-white rounded-md hover:text-[#c68310]"
                    >
                      <Eye size={20} />
                    </button>
                    <button
                      onClick={() => handleEdit(workshop._id as string)}
                      className="  text-white rounded-md hover:text-[#2210c6]"
                    >
                      <PenSquare size={20} />
                    </button>
                    <button
                      onClick={() => handleDelete(workshop._id as string)}
                      className="  text-white rounded-md hover:text-[#d32a08]"
                    >
                      <Trash2 size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex justify-between mt-4">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="px-5 py-2 bg-white border-2 border-black text-black rounded-2xl disabled:opacity-50"
            >
              Prev
            </button>

            <span>
              Page {workshopsPage} of {workshopsTotalPages}
            </span>

            <button
              onClick={() =>
                setCurrentPage((p) => (p < workshopsTotalPages ? p + 1 : p))
              }
              disabled={currentPage === workshopsTotalPages}
              className="px-5 py-2 bg-white border-2 border-black text-black rounded-2xl disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {viewModal && (
        <WorkshopDetailModal
          onClose={() => setViewModal(false)}
          workshop={singleWorkshop ?? undefined}
          loading={singleLoading}
        />
      )}

      {deleteModal && (
        <DeleteModal
          item="Workshop"
          onClose={() => setDeleteModal(false)}
          onConfirm={() => {
            dispatch(deleteWorkshopThunk(selectedId));
            setDeleteModal(false);
          }}
          loading={deleteLoading}
        />
      )}

      {editModal && (
        <EditWorkshopModal
          onClose={() => setEditModal(false)}
          workshop={singleWorkshop}
          loading={singleLoading}
        />
      )}
    </div>
  );
};

export default AllWorkshops;
