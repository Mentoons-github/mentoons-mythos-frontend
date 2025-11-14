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
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
      <div className="relative w-full max-w-[350px] md:max-w-2xl lg:max-w-3xl max-h-[90vh] overflow-y-auto rounded-xl shadow-lg p-3 md:p-8 bg-secondary hide-scrollbar">
        {/* Close button */}
        <button
          className="absolute top-4 right-4 hover:text-muted-foreground"
          onClick={onClose}
        >
          <X size={22} />
        </button>

        {loading ? (
          <div className="flex justify-center items-center py-10">
            <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
            <span className="ml-3 text-muted-foreground">
              Loading application details...
            </span>
          </div>
        ) : (
          <div className="space-y-8">
            <h2 className="text-xl md:text-2xl font-bold border-b  pb-3">
              Application Details
            </h2>

            <div>
              <h3 className="text-lg font-semibold mb-3 text-blue-800">
                Personal Information
              </h3>
              <div className="grid md:grid-cols-2 ml-3 md:ml-0 gap-3 md:gap-6">
                <div>
                  <p className="text-sm text-muted-foreground">Name</p>
                  <p className="text-base font-medium">{application?.name}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="text-base font-medium">{application?.email}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Mobile Number</p>
                  <p className="text-base font-medium">
                    {application?.mobileNumber}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Gender</p>
                  <p className="text-base font-medium">
                    {application?.gender || "Not specified"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Location</p>
                  <p className="text-base font-medium">
                    {application?.cLocation || "Not specified"}
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3 text-blue-800">
                Job Information
              </h3>
              <div className="grid md:grid-cols-3 ml-3 md:ml-0 gap-3 md:gap-6">
                <div>
                  <p className="text-sm text-muted-foreground">Position Applied</p>
                  <p className="text-base font-medium">
                    {application?.position}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Resume</p>
                  {application?.resume ? (
                    <a
                      href={application.resume}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-violet-700 hover:underline font-medium"
                    >
                      View Resume
                    </a>
                  ) : (
                    <p className="text-muted-foreground">No Resume</p>
                  )}
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Application Status</p>
                  <p className="text-base font-medium">{application?.status}</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3 text-blue-800">
                Cover Note
              </h3>
              <p className="text-base leading-relaxed">
                {application?.coverNote || (
                  <span className="text-muted-foreground">No message provided</span>
                )}
              </p>
            </div>

            <div className="md:flex tify-between text-sm text-muted-foreground border-t  pt-4">
              <span>
                Applied On: {formatToRealDate(application?.createdAt)}
              </span>
              <span className="block md:inline mt-1 md:mt-0">ID: {application?._id}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewApplicationModal;
