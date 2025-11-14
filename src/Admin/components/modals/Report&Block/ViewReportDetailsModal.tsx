import { Trash2, X } from "lucide-react";
import { Report } from "../../../../types/redux/report";
import { useEffect, useState } from "react";
import DeleteModal from "../deleteModal";
import { useAppDispatch, useAppSelector } from "../../../../hooks/reduxHooks";
import {
  deleteBlogThunk,
  deleteCommentThunk,
} from "../../../../features/blog/blogThunk";
import { toast } from "sonner";
import { resetBlogSlice } from "../../../../features/blog/blogSlice";
import { formatToRealDate } from "../../../../utils/DateFormate";

const ViewReportDetailsModal = ({
  onClose,
  report,
  loading,
}: {
  onClose: () => void;
  report?: Report;
  loading: boolean;
}) => {
  const dispatch = useAppDispatch();
  const { deleteLoading, deleteMessage, deleteSuccess, error } = useAppSelector(
    (state) => state.blog
  );
  const [from, setFrom] = useState("");
  const [fromId, setFromId] = useState("");
  const [deleteModal, setDeleteModal] = useState(false);

  useEffect(() => {
    if (deleteSuccess) {
      toast.success(deleteMessage);
      dispatch(resetBlogSlice());
      setDeleteModal(false);
    }
    if (error) {
      toast.error(error);
      dispatch(resetBlogSlice());
    }
  }, [deleteMessage, deleteSuccess, dispatch, error]);

  const handleDelete = (fromId: string, from: string) => {
    setFrom(from);
    setFromId(fromId);
    setDeleteModal(true);
  };
  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50 ">
      <div className="relative w-full max-w-[350px] md:max-w-2xl max-h-[90vh] overflow-y-auto rounded-xl shadow-lg p-4 md:p-8 bg-secondary hide-scrollbar">
        {/* Close button */}
        <button
          className="absolute top-4 right-4  hover:bg-muted-foreground"
          onClick={onClose}
        >
          <X size={22} />
        </button>

        {loading ? (
          <div className="flex justify-center items-center py-10">
            <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
            <span className="ml-3 ">
              Loading report details...
            </span>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Title */}
            <h2 className="text-2xl font-semibold border-b  pb-2">
              Report Details
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-muted-foreground">Reporter</p>
                <p className="text-lg font-medium">
                  {report?.reportedBy?.firstName} {report?.reportedBy?.lastName}
                </p>
                <p className="text-sm text-gray-500">
                  {report?.reportedBy?.email}
                </p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">Reported User</p>
                <p className="text-lg font-medium">
                  {report?.userId?.firstName} {report?.userId?.lastName}
                </p>
                <p className="text-sm text-muted-foreground">{report?.userId?.email}</p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">Reported From</p>
                <p className="text-base break-words">{report?.from}</p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">{report?.from} ID</p>
                <p className="text-base break-words">{report?.fromId}</p>
              </div>
            </div>

            <div className="flex justify-between">
              <div className="">
                <p className="text-sm text-muted-foreground">Reason</p>
                <p className="text-base">{report?.reason || "N/A"}</p>
              </div>
            </div>
            <div
              className="flex gap-1 justify-end text-red-500 text-sm hover:text-red-600 my-2"
              onClick={() =>
                handleDelete(report?.fromId as string, report?.from as string)
              }
            >
              <Trash2 size={20} />
              <button className="">Delete this {report?.from}</button>
            </div>

            <div className="flex justify-between text-sm text-muted-foreground border-t  pt-4">
              <span>ID: {report?._id}</span>
              <span>
                Date:{" "}
                 {formatToRealDate(report?.createdAt)}
              </span>
            </div>
          </div>
        )}

        {deleteModal && (
          <DeleteModal
            onClose={() => setDeleteModal(false)}
            item={from}
            onConfirm={() =>
              from == "blog"
                ? dispatch(deleteBlogThunk(fromId))
                : dispatch(deleteCommentThunk(fromId))
            }
            loading={deleteLoading}
          />
        )}
      </div>
    </div>
  );
};

export default ViewReportDetailsModal;
