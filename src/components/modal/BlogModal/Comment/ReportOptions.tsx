import { useEffect, useState } from "react";
import { reportUserThunk } from "../../../../features/user/userThunk";
import { useAppDispatch, useAppSelector } from "../../../../hooks/reduxHooks";
import { resetUserSlice } from "../../../../features/user/userSlice";

interface CommentOptionsProps {
  from:string;
  userId?: string;
  Id?: string;
  onClose: () => void;
}

const ReportOptions: React.FC<CommentOptionsProps> = ({
  from,
  userId,
  Id,
  onClose,
}) => {
  const dispatch = useAppDispatch();
  const { reportMessage, reportSuccess, error, loading } = useAppSelector(
    (state) => state.user
  );

  const [reason, setReason] = useState("");

  useEffect(() => {
    if (reportSuccess) {
      alert(reportMessage);
      onClose();
      dispatch(resetUserSlice());
    }

    if (error) {
      console.log(error,'error')
      alert(error);
      onClose();
      dispatch(resetUserSlice());
    }
  }, [dispatch, error, onClose, reportMessage, reportSuccess]);

  

  const handleReport = () => {
    if (!reason.trim() || !userId) return;

    dispatch(
      reportUserThunk({
        userId ,
        data: {
          reason,
          from: from,
          fromId: Id,
        },
      })
    );

    setReason("");
  };

  return (
    <div className="fixed inset-0  bg-opacity-30 z-50 flex items-center justify-center">
      <div className="bg-white border border-gray-300 rounded-md shadow-lg w-80 p-5 text-sm relative">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-red-600 text-xl"
          onClick={onClose}
        >
          &times;
        </button>

        <h3 className="text-base font-semibold text-gray-800 mb-3">
          Report User for this {from === "comment" ? "Comment": "Blog"}
        </h3>

        <textarea
          rows={3}
          className="w-full text-sm border border-gray-300 rounded-md p-2 mb-3 focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none"
          placeholder="Reason for reporting..."
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />

        <button
          className="w-full px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 disabled:opacity-50"
          onClick={handleReport}
          disabled={!reason.trim() || loading}
        >
          {loading ? "Reporting..." : "Report"}
        </button>

        {reportSuccess && (
          <p className="text-green-600 text-xs mt-2 text-center">
            {reportMessage}
          </p>
        )}
        {error && (
          <p className="text-red-500 text-xs mt-2 text-center">
            {reportMessage}
          </p>
        )}
      </div>
    </div>
  );
};

export default ReportOptions;
