import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import AdminAssessment from "../AdminAssessment";
import {
  deleteInitialAssessmentSubmissionThunk,
  getInitialAssessmentSubmissionsThunk,
  getSingleInitialAssessmentSubmissionsThunk,
} from "../../../features/assessment/assessmentThunk";
import { Eye, Trash2 } from "lucide-react";
import {
  SearchOptions,
  ShowSort,
  SortButton,
} from "../../components/SortDetails";
import ViewInitialAssessmentDetailsModal from "../../components/modals/Assessment/ViewInitialAssessmentDetailsModal";
import DeleteModal from "../../components/modals/deleteModal";
import { toast } from "sonner";
import { resetAssessmentSlice } from "../../../features/assessment/assessmentSlice";

const InitialSubmissions = () => {
  const dispatch = useAppDispatch();
  const {
    initialTotalPages,
    initialPage,
    initialSubmissions,
    singleInitialLoading,
    singleInitialDetails,
    loading,
    deleteLoading,
    deleteSuccess,
    message,
    error,
  } = useAppSelector((state) => state.assessment);
  const [modalOpen, setModalOpen] = useState(false);
  const [showTable, setShowTable] = useState(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [showSort, setShowSort] = useState(false);
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");
  const [search, setSearch] = useState("");
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedId, setSelectedId] = useState("");

  const limit = 10;

  const handleView = (submissionsId: string) => {
    setModalOpen(true);
    dispatch(getSingleInitialAssessmentSubmissionsThunk(submissionsId));
  };

  useEffect(() => {
    if (deleteSuccess) {
      toast.success(message);
      dispatch(resetAssessmentSlice());
    }
    if (error) {
      toast.warning(error);
      dispatch(resetAssessmentSlice());
    }
  }, [deleteSuccess, dispatch, error, message]);

  useEffect(() => {
    dispatch(
      getInitialAssessmentSubmissionsThunk({
        page: currentPage,
        limit,
        sort: sortOrder,
        search,
      })
    );
  }, [currentPage, dispatch, search, sortOrder]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTable(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleDelete = (assessmentId: string) => {
    setSelectedId(assessmentId);
    setDeleteModal(true);
  };

  return (
    <div className="pt-3 lg:p-4">
      <div className="flex mb-4 h-11 items-center space-x-4 justify-between">
        <SortButton
          onClick={() => setShowSort((prev) => !prev)}
          showSort={showSort}
        />

        <div className="flex gap-2">
          <SearchOptions
            search={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
          />
          <AdminAssessment />
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
          <span className="ml-3 ">Loading Submission details...</span>
        </div>
      ) : initialSubmissions.length == 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center text-gray-400">
          <div className="w-16 h-16 flex items-center justify-center rounded-full bg-gray-700/40 mb-4">
            📭
          </div>
          <h2 className="text-xl font-semibold text-white">
            No Submissions found
          </h2>
          <p className="text-muted-foreground mt-2">
            It looks like there are no submissions.
          </p>
        </div>
      ) : (
        <div className="h-[calc(90vh-110px)] overflow-x-auto overflow-y-auto hide-scrollbar will-change-scroll transform-gpu mt-5">
          <div className="inline-block min-w-full">
            <table className="min-w-full table-auto border-collapse rounded-md overflow-hidden">
              <thead className="bg-blue-800 ">
                <tr className="text-white">
                  <th className="md:px-4 px-2 md:py-4 py-2 text-left">No</th>
                  <th className="md:px-4 px-2 md:py-4 py-2 text-left">
                    Submission ID
                  </th>
                  <th className="md:px-4 px-2 md:py-4 py-2 text-left">
                    Submitted Type
                  </th>
                  <th className="md:px-4 px-2 md:py-4 py-2 text-left">
                    User Name
                  </th>
                  <th className="md:px-4 px-2 md:py-4 py-2 text-left">
                    Email Id
                  </th>
                  <th className="md:px-4 px-2 md:py-4 py-2 text-left">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="">
                {initialSubmissions.map((data, index) => (
                  <tr
                    key={index}
                    className={`border-b ${
                      index % 2 == 0 ? "bg-muted" : ""
                    } border-gray-600`}
                  >
                    <td className="md:px-4 px-2 md:py-4 py-2">{index + 1}</td>
                    <td className="md:px-4 px-2 md:py-4 py-2">{data._id}</td>
                    <td className="md:px-4 px-2 md:py-4 py-2">
                      {data.assessmentType}
                    </td>
                    <td className="md:px-4 px-2 md:py-4 py-2 font-semibold">
                      {data.userId.firstName} {data.userId.lastName}
                    </td>
                    <td className="md:px-4 px-2 md:py-4 py-2">
                      {data.userId.email}
                    </td>
                    <td className="md:px-4 px-2 md:py-4 py-2 space-x-3 ">
                      <button
                        onClick={() => handleView(data?._id as string)}
                        className=" font-semibold text-blue-800 rounded-md hover:text-blue-600"
                      >
                        <Eye size={20} />
                      </button>
                      <button
                        onClick={() => handleDelete(data._id as string)}
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
                Page {initialPage} of {initialTotalPages}
              </span>

              <button
                onClick={() =>
                  setCurrentPage((p) => (p < initialTotalPages ? p + 1 : p))
                }
                disabled={currentPage === initialTotalPages}
                className="px-5 py-2 hover:bg-border border-2 rounded-2xl disabled:bg-foreground/40 text-muted-foreground"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}

      {modalOpen && (
        <ViewInitialAssessmentDetailsModal
          onClose={() => setModalOpen(false)}
          details={singleInitialDetails ?? undefined}
          singleSubmissionLoading={singleInitialLoading}
        />
      )}

      {deleteModal && (
        <DeleteModal
          item="Submitted assessment"
          onClose={() => setDeleteModal(false)}
          onConfirm={() => {
            dispatch(deleteInitialAssessmentSubmissionThunk(selectedId));
            setDeleteModal(false);
          }}
          loading={deleteLoading}
        />
      )}
    </div>
  );
};

export default InitialSubmissions;
