import { Loader2 } from "lucide-react";

interface RejectReasonModalProps {
  onClose: () => void;
  onSubmit: () => void;
  reason: string;
  setReason: (value: string) => void;
  editLoading: boolean;
}

const RejectReasonModal = ({
  onClose,
  onSubmit,
  reason,
  setReason,
  editLoading,
}: RejectReasonModalProps) => {
  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-[100]">
      <div className="bg-secondary w-[350px] md:w-[400px] p-6 rounded-lg shadow-xl relative">
        <h2 className="text-lg font-semibold mb-4">Reject Leave Request</h2>

        <label className="text-sm font-medium">Reason for Rejection</label>
        <textarea
          className="w-full mt-1 p-2 border rounded-lg bg-background text-sm"
          rows={3}
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />

        <div className="flex justify-end gap-3 mt-5">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg"
          >
            Cancel
          </button>
          <button
            onClick={onSubmit}
            disabled={editLoading}
            className="px-5 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-white flex items-center gap-2 disabled:opacity-70"
          >
            {editLoading && <Loader2 className="h-4 w-4 animate-spin" />}
            Reject
          </button>
        </div>
      </div>
    </div>
  );
};

export default RejectReasonModal;
