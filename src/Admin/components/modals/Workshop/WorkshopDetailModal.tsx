import { X } from "lucide-react";
import { WorkshopI } from "../../../../types/redux/workshopInterface";
import { formatToRealDate } from "../../../../utils/DateFormate";

const WorkshopDetailModal = ({
  onClose,
  workshop,
  loading,
}: {
  onClose: () => void;
  workshop?: WorkshopI;
  loading: boolean;
}) => {
  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50 ">
      <div className="relative w-full max-w-[350px] md:max-w-2xl max-h-[90vh] overflow-y-auto rounded-xl shadow-lg p-4 md:p-8 bg-secondary hide-scrollbar">
        {/* Close button */}
        <button
          className="absolute top-4 right-4 hover:text-muted-foreground"
          onClick={onClose}
        >
          <X size={22} />
        </button>

        {loading ? (
          <div className="flex justify-center items-center py-10">
            <div className="w-10 h-10 border-4 border-blue-800 border-t-transparent rounded-full animate-spin"></div>
            <span className="ml-3 ">
              Loading workshop details...
            </span>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Title */}
            <h2 className="text-2xl font-semibold border-b pb-2">
              Workshop Details
            </h2>

            <div className="flex justify-between">
              <div className=" space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Workshop ID</p>
                  <p className="text-[16px] font-medium break-all">
                    {workshop?._id}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Age Group</p>
                  <p className="text-[16px] font-medium">{workshop?.age}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Amount</p>
                  <p className="text-[16px] font-medium">₹{workshop?.amount}</p>
                </div>
              </div>
              <div className=" w-52">
                <img
                  src={workshop?.img}
                  alt="Workshop"
                  className="w-full rounded-lg shadow-md"
                />
              </div>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Focus</p>
              <p className="text-[16px] font-medium">{workshop?.focus}</p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground mb-2">Activities</p>
              <ul className="list-disc list-inside text-[16px] font-medium space-y-1">
                {workshop?.activities?.map((act, i) => (
                  <li key={i}>{act}</li>
                ))}
              </ul>
            </div>

            <div className="flex justify-between text-sm text-muted-foreground border-t pt-4">
              <span>Total Enquiries: {workshop?.enquiries?.length ?? 0}</span>
              <span>Created: {formatToRealDate(workshop?.createdAt)}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkshopDetailModal;
