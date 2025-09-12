import React from "react";
import { singleSubmission } from "../../../types/redux/assessmentInterface";

interface ModalProps {
  onClose: () => void;
  singleSubmissionLoading: boolean;
  details: singleSubmission[];
}

const SingleSubmissionModal: React.FC<ModalProps> = ({
  onClose,
  singleSubmissionLoading,
  details,
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-40 italic">
      <div className="bg-[#6f6c6c] rounded-2xl shadow-2xl p-6 w-full max-w-4xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-black/50 hover:text-black text-xl font-bold"
        >
          ✕
        </button>

        <h2 className="text-2xl font-semibold mb-6 text-white border-b pb-3">
          Assessment Submission Details
        </h2>

        {singleSubmissionLoading ? (
          <p className="text-white italic">Loading submission details...</p>
        ) : !details || details.length === 0 ? (
          <p className="text-center text-white italic">
            No submission details available.
          </p>
        ) : (
          <div className="overflow-y-auto hide-scrollbar max-h-[70vh] pr-2 space-y-6 pt-2">
            {details.map((ele, index) => (
              <div
                key={ele._id}
                className="border rounded-lg p-5 bg-[#6f6c6c] shadow-sm"
              >
                <h3 className="text-lg font-semibold text-white mb-3">
                  Q{index + 1}. {ele.question}
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
                  {ele.options.map((opt, i) => (
                    <div
                      key={i}
                      className="p-2 text-sm border rounded-md bg-[#6f6c6c] text-white"
                    >
                      {opt}
                    </div>
                  ))}
                </div>

                <div className="mt-2">
                  <span className="font-semibold text-white">
                    Submitted Answer:
                  </span>
                  <span className="ml-2 px-3 py-1 rounded-md bg-amber-50 text-yellow-700 font-medium">
                    {ele.answer}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SingleSubmissionModal;
