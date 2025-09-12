import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import {
  deleteEnquiryThunk,
  SingleEnquiryThunk,
  workshopEnquiriesThunk,
} from "../../../features/workshop/workshopThunk";
import { Eye, Search, Trash2 } from "lucide-react";
import EnquiryDetailModal from "../../components/modals/EnquiryDetailModal";
import DeleteModal from "../../components/modals/deleteModal";
import { toast } from "sonner";
import { resetWorkshopSlice } from "../../../features/workshop/workshopSlice";
import { BiSort } from "react-icons/bi";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import AddWorkshop from "../../components/Workshop/AddWorkshop";

const WorkshopEnquiries = () => {
  const dispatch = useAppDispatch();
  const {
    enquiries,
    loading,
    enquiriesPage,
    enquiriesTotalPages,
    singleEnquiry,
    singleLoading,
    deleteMessage,
    deleteSuccess,
    deleteLoading,
    error,
  } = useAppSelector((state) => state.workshop);

  const [viewModal, setViewModal] = useState<boolean>(false);
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [selectedId, setSelectedId] = useState<string>("");
  const [showTable, setShowTable] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [showSort, setShowSort] = useState(false);
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");
  const [search, setSearch] = useState("");

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
    dispatch(workshopEnquiriesThunk({ page: currentPage, limit, sort: sortOrder, search  }));
    const timer = setTimeout(() => {
      setShowTable(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, [currentPage, dispatch, search, sortOrder]);

  const handleView = (enquiryId: string) => {
    dispatch(SingleEnquiryThunk(enquiryId));
    setViewModal(true);
  };

  const handleDelete = (enquiryId: string) => {
    setSelectedId(enquiryId);
    setDeleteModal(true);
  };

  return (
    <div className="p-4 text-white ">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold mb-4">Workshop Enquiries</h1>
        <AddWorkshop/>
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

      {!showTable || loading ? (
        <div className="flex justify-center items-center py-10">
          <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
          <span className="ml-3 text-gray-600">
            Loading Workshop details...
          </span>
        </div>
      ) : enquiries.length == 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center text-gray-400">
          <div className="w-16 h-16 flex items-center justify-center rounded-full bg-gray-700/40 mb-4">
            📭
          </div>
          <h2 className="text-xl font-semibold text-white">
            No Workshop Submissions
          </h2>
          <p className="text-gray-400 mt-2">
            It looks like there are no enquiries yet.
          </p>
        </div>
      ) : (
        <div className=" h mt-5 ">
          <table className="min-w-full table-auto border-collapse rounded-md overflow-hidden ">
            <thead className="bg-[#E39712] text-white">
              <tr>
                <th className="px-4 py-4 text-left">No</th>
                <th className="px-4 py-4 text-left">Enquiry Id</th>
                <th className="px-4 py-4 text-left">Name</th>
                <th className="px-4 py-4 text-left">Email</th>
                <th className="px-4 py-4 text-left">Mobile Number</th>
                <th className="px-4 py-4 text-left">Category</th>
                <th className="px-4 py-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="">
              {enquiries?.map((enq, index) => (
                <tr
                  key={index}
                  className={`border-b ${
                    index % 2 == 0 ? "bg-black/60" : ""
                  } border-gray-600`}
                >
                  <td className="px-4 py-4">{index + 1}</td>
                  <td className="px-4 py-4">{enq?._id}</td>
                  <td className="px-4 py-4">
                    {enq?.firstName} {enq?.lastName}
                  </td>
                  <td className="px-4 py-4">{enq?.email}</td>
                  <td className="px-4 py-4">{enq?.mobileNumber}</td>
                  <td className="px-4 py-4">Age {enq?.category}</td>
                  <td className="px-4 py-4 space-x-3">
                    <button
                      onClick={() => handleView(enq?._id as string)}
                      className=" text-white rounded-md hover:text-[#c68310]"
                    >
                      <Eye size={20} />
                    </button>
                    <button
                      onClick={() => handleDelete(enq._id as string)}
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
              Page {enquiriesPage} of {enquiriesTotalPages}
            </span>

            <button
              onClick={() =>
                setCurrentPage((p) => (p < enquiriesTotalPages ? p + 1 : p))
              }
              disabled={currentPage === enquiriesTotalPages}
              className="px-5 py-2 bg-white border-2 border-black text-black rounded-2xl disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {viewModal && (
        <EnquiryDetailModal
          onClose={() => setViewModal(false)}
          enquiry={singleEnquiry ?? undefined}
          loading={singleLoading}
        />
      )}

      {deleteModal && (
        <DeleteModal
          item="Enquiry"
          onClose={() => setDeleteModal(false)}
          onConfirm={() => {
            dispatch(deleteEnquiryThunk(selectedId ?? ""));
            setDeleteModal(false);
          }}
          loading={deleteLoading}
        />
      )}
    </div>
  );
};

export default WorkshopEnquiries;
