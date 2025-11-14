import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import {
  deleteEnquiryThunk,
  SingleEnquiryThunk,
  workshopEnquiriesThunk,
} from "../../../features/workshop/workshopThunk";
import { Eye, Trash2 } from "lucide-react";
import EnquiryDetailModal from "../../components/modals/EnquiryDetailModal";
import DeleteModal from "../../components/modals/deleteModal";
import { toast } from "sonner";
import { resetWorkshopSlice } from "../../../features/workshop/workshopSlice";
import AddWorkshop from "../../components/Workshop/AddWorkshop";
import {
  SearchOptions,
  ShowSort,
  SortButton,
} from "../../components/SortDetails";

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
    dispatch(
      workshopEnquiriesThunk({
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

  const handleView = (enquiryId: string) => {
    dispatch(SingleEnquiryThunk(enquiryId));
    setViewModal(true);
  };

  const handleDelete = (enquiryId: string) => {
    setSelectedId(enquiryId);
    setDeleteModal(true);
  };

  return (
    <div className="pt-3 lg:p-4 ">
      <div className="flex mb-4 h-11 items-center space-x-4 justify-between">
        <SortButton
          onClick={() => setShowSort((prev) => !prev)}
          showSort={showSort}
        />

        <div className="flex gap-3">
          <SearchOptions
            search={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
          />
          <AddWorkshop />
        </div>
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

      {!showTable || loading ? (
        <div className="flex justify-center items-center py-10">
          <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
          <span className="ml-3 ">Loading Workshop details...</span>
        </div>
      ) : enquiries.length == 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center ">
          <div className="w-16 h-16 flex items-center justify-center rounded-full  mb-4">
            📭
          </div>
          <h2 className="text-xl font-semibold ">No Workshop Submissions</h2>
          <p className=" mt-2">It looks like there are no enquiries yet.</p>
        </div>
      ) : (
        <div className=" h-[calc(94vh-110px)] overflow-y-auto hide-scrollbar will-change-scroll transform-gpu mt-5">
          <div className="inline-block min-w-full">
            <table className="min-w-full table-auto border-collapse rounded-md overflow-hidden ">
              <thead className="bg-blue-800 ">
                <tr className="text-white">
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
                      index % 2 == 0 ? "bg-muted" : ""
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
                        className=" font-semibold text-blue-800 rounded-md hover:text-blue-600"
                      >
                        <Eye size={20} />
                      </button>
                      <button
                        onClick={() => handleDelete(enq._id as string)}
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
                Page {enquiriesPage} of {enquiriesTotalPages}
              </span>

              <button
                onClick={() =>
                  setCurrentPage((p) => (p < enquiriesTotalPages ? p + 1 : p))
                }
                disabled={currentPage === enquiriesTotalPages}
                className="px-5 py-2 hover:bg-border border-2 rounded-2xl disabled:bg-foreground/40 text-muted-foreground"
              >
                Next
              </button>
            </div>
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
