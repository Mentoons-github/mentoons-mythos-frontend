import { useEffect, useState } from "react";
import AddWorkshop from "../../components/Workshop/AddWorkshop";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import {
  deleteWorkshopThunk,
  getWorkshopsThunk,
  SingleWorkshopThunk,
} from "../../../features/workshop/workshopThunk";
import { Eye, PenSquare, Trash2 } from "lucide-react";
import WorkshopDetailModal from "../../components/modals/Workshop/WorkshopDetailModal";
import DeleteModal from "../../components/modals/deleteModal";
import { toast } from "sonner";
import { resetWorkshopSlice } from "../../../features/workshop/workshopSlice";
import EditWorkshopModal from "../../components/modals/Workshop/EditWorkshopModal";
import {
  SearchOptions,
  ShowSort,
  SortButton,
} from "../../components/SortDetails";

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
    loading,
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
    dispatch(
      getWorkshopsThunk({ page: currentPage, limit, sort: sortOrder, search })
    );
  }, [currentPage, dispatch, search, sortOrder]);

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
    <div className="pt-3 lg:p-4">
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
          <span className="ml-3 ">Loading Job details...</span>
        </div>
      ) : workshops.length == 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center ">
          <div className="w-16 h-16 flex items-center justify-center rounded-full  mb-4">
            📭
          </div>
          <h2 className="text-xl font-semibold ">No Workshops</h2>
          <p className="text-muted-foreground mt-2">
            It looks like there are no workshops yet.
          </p>
        </div>
      ) : (
        <div className="  h-[calc(94vh-110px)] overflow-y-auto hide-scrollbar will-change-scroll transform-gpu mt-5">
          <div className="inline-block min-w-full">
            <table className="min-w-full table-auto border-collapse rounded-md overflow-hidden ">
              <thead className="bg-blue-800 ">
                <tr className="text-white">
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
                      index % 2 == 0 ? "bg-muted" : ""
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
                    <td className="px-4 py-4 flex space-x-3">
                      <button
                        onClick={() => handleView(workshop?._id as string)}
                        className=" font-semibold text-blue-800 rounded-md hover:text-blue-600"
                      >
                        <Eye size={20} />
                      </button>
                      <button
                        onClick={() => handleEdit(workshop._id as string)}
                        className=" font-semibold text-blue-800 rounded-md hover:text-blue-600"
                      >
                        <PenSquare size={20} />
                      </button>
                      <button
                        onClick={() => handleDelete(workshop._id as string)}
                        className=" font-semibold text-red-600 rounded-md hover:text-red-700"
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
                className="px-5 py-2 hover:bg-border border-2 rounded-2xl disabled:bg-foreground/40 text-muted-foreground"
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
                className="px-5 py-2 hover:bg-border border-2 rounded-2xl disabled:bg-foreground/40 text-muted-foreground"
              >
                Next
              </button>
            </div>
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
