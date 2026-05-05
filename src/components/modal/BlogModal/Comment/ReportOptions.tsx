import { useEffect, useState } from "react";
import { reportUserThunk } from "../../../../features/user/userThunk";
import { useAppDispatch, useAppSelector } from "../../../../hooks/reduxHooks";
import { resetUserSlice } from "../../../../features/user/userSlice";
import { toast } from "sonner";
import { REPORT_REASONS } from "../../../../constants/blogs/reportResons";
import { X } from "lucide-react";

interface CommentOptionsProps {
  from: string;
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
    (state) => state.user,
  );

  const [selectedReason, setSelectedReason] = useState("");
  const [customReason, setCustomReason] = useState("");

  const isOtherSelected = selectedReason.toLowerCase() === "other reasons";

  useEffect(() => {
    if (reportSuccess) {
      toast.success(reportMessage);
      onClose();
      dispatch(resetUserSlice());
    }

    if (error) {
      toast.warning(error);
      onClose();
      dispatch(resetUserSlice());
    }
  }, [dispatch, error, onClose, reportMessage, reportSuccess]);

  // handle selecting reason
  const handleSelect = (reason: string) => {
    setSelectedReason(reason);

    if (reason.toLowerCase() !== "other") {
      setCustomReason(""); // clear input if not "Other"
    }
  };

  // handle submit
  const handleReport = () => {
    if (!userId || !selectedReason) return;

    const finalReason = isOtherSelected ? customReason : selectedReason;

    if (!finalReason.trim()) return;

    dispatch(
      reportUserThunk({
        userId,
        data: {
          reason: finalReason,
          from,
          fromId: Id,
        },
      }),
    );

    setSelectedReason("");
    setCustomReason("");
  };

  return (
    <div
      className="fixed inset-0 z-[1000] bg-black/20 flex items-center justify-center"
      onClick={onClose}
    >
      <div
        className="bg-muted rounded-xl shadow-xl w-[500px] p-5 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-3 right-3 text-gray-400 hover:text-red-500 text-xl"
          onClick={onClose}
        >
          <X />
        </button>

        {/* Title */}
        <h3 className="text-lg font-semibold mb-4">
          Report {from === "comment" ? "Comment" : "Post"}
        </h3>

        {/* Reason list */}
        <div className="space-y-2 mb-4 ">
          {REPORT_REASONS.map((r) => (
            <div
              key={r}
              onClick={() => handleSelect(r)}
              className={`px-3 py-2 rounded-md border-t cursor-pointer text-base transition
                ${
                  selectedReason === r
                    ? "bg-red-50 border-red-400 text-red-600"
                    : "hover:bg-gray-100"
                }`}
            >
              {r}
            </div>
          ))}
        </div>

        {/* Other reason input */}
        {isOtherSelected && (
          <textarea
            rows={3}
            className="w-full text-sm border rounded-md p-2 mb-4 focus:outline-none focus:ring-1 focus:ring-red-400 resize-none"
            placeholder="Tell us more..."
            value={customReason}
            onChange={(e) => setCustomReason(e.target.value)}
          />
        )}

        {/* Submit button */}
        <button
          onClick={handleReport}
          disabled={
            !selectedReason ||
            (isOtherSelected && !customReason.trim()) ||
            loading
          }
          className="w-full py-2 rounded-md bg-red-500 text-white font-medium hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          {loading ? "Reporting..." : "Submit Report"}
        </button>
      </div>
    </div>
  );
};

export default ReportOptions;
