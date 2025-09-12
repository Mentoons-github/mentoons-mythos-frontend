import { X } from "lucide-react";
import { Career } from "../../../../types/redux/careerInterface";
import { formatToRealDate } from "../../../../utils/DateFormate";

const ViewApplicationModal = ({
  onClose,
  application,
  loading,
}: {
  onClose: () => void;
  application: Career | null;
  loading: boolean;
}) => {
  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50 text-white">
      <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-xl shadow-lg p-8 bg-gradient-to-t from-[#141414] to-[#2b2b2b] hide-scrollbar">
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
              Loading application details...
            </span>
          </div>
        ) : (
          <div className="space-y-8">
            <h2 className="text-2xl font-semibold border-b border-gray-600 pb-3">
              Application Details
            </h2>

            <div>
              <h3 className="text-lg font-semibold mb-3 text-[#E39712]">
                Personal Information
              </h3>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-gray-400">Name</p>
                  <p className="text-base font-medium">{application?.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Email</p>
                  <p className="text-base font-medium">{application?.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Mobile Number</p>
                  <p className="text-base font-medium">
                    {application?.mobileNumber}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Gender</p>
                  <p className="text-base font-medium">
                    {application?.gender || "Not specified"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Location</p>
                  <p className="text-base font-medium">
                    {application?.cLocation || "Not specified"}
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3 text-[#E39712]">
                Job Information
              </h3>
              <div className="grid grid-cols-3 gap-6">
                <div>
                  <p className="text-sm text-gray-400">Position Applied</p>
                  <p className="text-base font-medium">
                    {application?.position}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Resume</p>
                  {application?.resume ? (
                    <a
                      href={application.resume}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:underline font-medium"
                    >
                      View Resume
                    </a>
                  ) : (
                    <p className="text-gray-400">No Resume</p>
                  )}
                </div>
                <div>
                  <p className="text-sm text-gray-400">Application Status</p>
                  <p className="text-base font-medium">{application?.status}</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3 text-[#E39712]">
                Cover Note
              </h3>
              <p className="text-base leading-relaxed">
                {application?.coverNote || (
                  <span className="text-gray-400">No message provided</span>
                )}
              </p>
            </div>

            <div className="flex justify-between text-sm text-gray-400 border-t border-gray-600 pt-4">
              <span>
                Applied On: {formatToRealDate(application?.createdAt)}
              </span>
              <span>ID: {application?._id}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewApplicationModal;
