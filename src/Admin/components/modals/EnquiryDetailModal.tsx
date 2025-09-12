import { X } from "lucide-react";
import { EnquiryI } from "../../../types/redux/workshopInterface";
import { formatToRealDate } from "../../../utils/DateFormate";

const EnquiryDetailModal = ({
  onClose,
  enquiry,
  loading,
}: {
  onClose: () => void;
  enquiry?: EnquiryI;
  loading: boolean;
}) => {
  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50 text-white">
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-xl shadow-lg p-8 bg-gradient-to-t from-[#141414] to-[#4a4a4b] hide-scrollbar">
        {/* Close button */}
        <button
          className="absolute top-4 right-4 text-gray-300 hover:text-white"
          onClick={onClose}
        >
          <X size={22} />
        </button>

        {loading ? (
          <div className="flex justify-center items-center py-10">
            <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
            <span className="ml-3 text-gray-400">
              Loading enquiry details...
            </span>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Title */}
            <h2 className="text-2xl font-semibold border-b border-gray-600 pb-2">
              Enquiry Details
            </h2>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-gray-400">First Name</p>
                <p className="text-lg font-medium">{enquiry?.firstName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Last Name</p>
                <p className="text-lg font-medium">{enquiry?.lastName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Email</p>
                <p className="text-lg font-medium">{enquiry?.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Phone</p>
                <p className="text-lg font-medium">{enquiry?.mobileNumber}</p>
              </div>
            </div>

            <div>
              <p className="text-sm text-gray-400">Message</p>
              {enquiry?.message ? (
                <p className="text-base">{enquiry?.message}</p>
              ) : (
                <p className="text-base text-gray-400">No message</p>
              )}
            </div>

            <div className="flex justify-between text-sm text-gray-400 border-t border-gray-600 pt-4">
              <span>Category: {enquiry?.category}</span>
              <span>
                Date:{" "}
                {formatToRealDate(enquiry?.createdAt)}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EnquiryDetailModal;
