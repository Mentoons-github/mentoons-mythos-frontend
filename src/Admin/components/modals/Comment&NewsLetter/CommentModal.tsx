import { IAboutComment } from "../../../../types/redux/about&newsletter";
import { X } from "lucide-react";
import { formatToRealDate } from "../../../../utils/DateFormate";

const CommentModal = ({
  onClose,
  comment,
  loading,
}: {
  onClose: () => void;
  comment?: IAboutComment;
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
            <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
            <span className="ml-3 ">
              Loading comment details...
            </span>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Title */}
            <h2 className="text-2xl font-semibold border-b  pb-2">
              Comment Details
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-muted-foreground">User Name</p>
                <p className="text-lg font-medium">{comment?.name}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">User Email</p>
                <p className="text-lg font-medium">{comment?.email}</p>
              </div>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Message</p>
              {comment?.comment ? (
                <p className="text-base">{comment?.comment}</p>
              ) : (
                <p className="text-base text-muted-foreground">No message</p>
              )}
            </div>

            <div className="md:flex justify-between text-sm text-muted-foreground border-t pt-4">
              <span>CommentId: {comment?._id}</span>
              <span className="block md:inline">Date: {formatToRealDate(comment?.createdAt)}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentModal;
